import React, { createContext, useContext, useEffect, useState } from 'react';

import { TransferType, UTXONote } from '@usemist/sdk';
import {
  IncrementalMerkleTree,
  MerkleProof,
} from '@zk-kit/incremental-merkle-tree';
import { BytesLike, ethers, getBigInt, keccak256 } from 'ethers';
import { poseidon2 } from 'poseidon-lite';
import { randomBytes } from 'crypto';
import { useIndexedDB } from '../indexeddb';
import { logDebug, logError } from '../utils';
import { Web3Context } from './Web3Context';
import { connectSnap, getSnap, sendHello } from '@/snap/utils';
import {
  MetaMaskContext,
  MetamaskActions,
  MetamaskState,
} from './MetamaskContext';

export type MistData = {
  merkleRoot?: BytesLike;
  clientRandom?: BytesLike;
  providerRandom?: BytesLike;
  clientKey?: BytesLike;
  providerKey?: BytesLike;
};

export type MistSecret = {
  merkleRoot?: bigint;
  providerHash: bigint;
  clientHash: bigint;
  encData: BytesLike[];
};

export const SNARK_SCALAR_FIELD =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;
export const CLIENT_SIGNAL =
  getBigInt(keccak256('client')) % SNARK_SCALAR_FIELD;
export const PROVIDER_SIGNAL =
  getBigInt(keccak256('provider')) % SNARK_SCALAR_FIELD;
export const NULLIFYING_KEY =
  getBigInt(keccak256('nullifier')) % SNARK_SCALAR_FIELD;

export type MistContextType = {
  data?: MistData;
  secret?: MistSecret;
  loading: boolean;
  getClientProof: () => MerkleProof | undefined;
  handleConnectClick?: () => void;
  state?: MetamaskState;
};

export const MistContext = createContext<MistContextType>({
  getClientProof: () => undefined,
  loading: true,
});

export const MistContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { getByID, add } = useIndexedDB(process.env.MIST_DB_NAME || '');
  const { account } = useContext(Web3Context);
  const [data, setData] = useState<MistData>();
  const [secret, setSecret] = useState<MistSecret>();
  const [tree, setTree] = useState<IncrementalMerkleTree>();
  const [loading, setLoading] = useState(false);

  const providerAddress = process.env.MIST_PROVIDER_ADDRESS || '';

  // FROM MM SNAP TEMPLATE SITE
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendHelloClick = async () => {
    try {
      await sendHello();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };
  //////////////////////////////////////////////////////////

  useEffect(() => {
    if (!account || !providerAddress || !data) return;
    const values = [
      [account, data.clientRandom],
      [providerAddress, data.providerRandom],
    ];

    const _tree = new IncrementalMerkleTree(poseidon2, 2, 0, 2, values);
    setTree(_tree);
    setData({
      ...data,
      merkleRoot: _tree.root,
    });
  }, [account, providerAddress, data]);

  useEffect(() => {
    const generate = async () => {
      const random = getBigInt(randomBytes(32).toString('hex'));
      const tokenAddress = '0x...';
      const amounts = [100, 200, 300, 400, 500]; // dummy values
      // Contains bytes[] of encrypted note, clientKey and providerKey for each amount
      const encData = await Promise.all(
        amounts.map(async (amount) => {
          const note = new UTXONote({
            sender: account || '',
            receiver: providerAddress,
            amount: BigInt(amount),
            token: tokenAddress,
            identifier: BigInt(0),
            random,
            transferType: TransferType.Deposit,
            nullifyingKey: NULLIFYING_KEY,
          });
          return await note.encryptPacked('goerli');
        }),
      );
      const clientId = getBigInt(
        keccak256(
          ethers.AbiCoder.defaultAbiCoder().encode(['address'], [account]),
        ),
      );
      const providerId = getBigInt(
        keccak256(
          ethers.AbiCoder.defaultAbiCoder().encode(
            ['address'],
            [providerAddress],
          ),
        ),
      );
      const clientHash = poseidon2([
        poseidon2([clientId, NULLIFYING_KEY]),
        random,
      ]);
      const providerHash = poseidon2([
        poseidon2([providerId, NULLIFYING_KEY]),
        random,
      ]);

      const newSecret = {
        providerHash,
        clientHash,
        encData,
      };

      setSecret(newSecret);
      return secret;
    };

    async function genAddRes() {
      let res = await generate();
      add(res, account).then(() => {
        setSecret(res);
      });
    }

    if (account) {
      setLoading(true);
      try {
        getByID<MistData>(account).then((res) => {
          if (res) {
            logDebug('Using existing data');
            setData(res);
          } else {
            logDebug('Generating new data');
            genAddRes();
            // res = generate();
            // add(res, account).then(() => {
            //   setData(res);
            // });
          }
        });
      } catch (e) {
        logError(e);
      } finally {
        setLoading(false);
      }
    } else {
      setData(undefined);
    }
  }, [account, add, data, getByID]);

  const getClientProof = () => {
    if (account && tree && data) {
      const proof = tree.createProof(
        tree.indexOf(poseidon2([getBigInt(account), CLIENT_SIGNAL])),
      );
      return proof;
    }
    return undefined;
  };

  return (
    <MistContext.Provider
      value={{
        data,
        secret,
        loading,
        getClientProof,
        handleConnectClick,
        state,
      }}
    >
      {children}
    </MistContext.Provider>
  );
};
