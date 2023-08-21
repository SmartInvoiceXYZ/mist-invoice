import React, { createContext, useContext, useEffect, useState } from 'react';

import { TransferType, UTXONote } from '../mist-sdk';
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
import { DBConfig } from '@/dbconfig';

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

const utf8Encode = new TextEncoder();

export const SNARK_SCALAR_FIELD =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;
export const CLIENT_SIGNAL =
  getBigInt(keccak256(utf8Encode.encode('client'))) % SNARK_SCALAR_FIELD;
export const PROVIDER_SIGNAL =
  getBigInt(keccak256(utf8Encode.encode('provider'))) % SNARK_SCALAR_FIELD;
export const NULLIFYING_KEY =
  getBigInt(keccak256(utf8Encode.encode('nullifier'))) % SNARK_SCALAR_FIELD;

export type MistContextType = {
  data?: MistData;
  secret?: MistSecret;
  loading: boolean;
  amounts?: bigint[];
  receiver?: string;
  tokenAddress?: string;
  getClientProof: () => MerkleProof | undefined;
  handleSnapConnectClick: () => void;
  setAmounts: (amounts: bigint[]) => void;
  setReceiver: (receiver: string) => void;
  setTokenAddress: (tokenAddress: string) => void;
  state?: MetamaskState;
};

export const MistContext = createContext<MistContextType>({
  handleSnapConnectClick: () => undefined,
  getClientProof: () => undefined,
  loading: true,
  setAmounts: () => {},
  setReceiver: () => {},
  setTokenAddress: () => {},
});

export const MistContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { getByID, add } = useIndexedDB(DBConfig.name, DBConfig);
  const { account } = useContext(Web3Context);
  const [data, setData] = useState<MistData>();
  const [secret, setSecret] = useState<MistSecret>();
  const [tree, setTree] = useState<IncrementalMerkleTree>();
  const [loading, setLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');
  const [amounts, setAmounts] = useState<bigint[]>([]);

  const providerAddress = process.env.MIST_PROVIDER_ADDRESS || '';

  // FROM MM SNAP TEMPLATE SITE
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleSnapConnectClick = async () => {
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
      // Contains bytes[] of encrypted note, clientKey and providerKey for each amount
      const encData = await Promise.all(
        amounts.map(async (amount, i) => {
          const note = new UTXONote({
            sender: account || '',
            receiver: receiver || '',
            amount,
            token: tokenAddress,
            identifier: BigInt(i),
            random,
            transferType: TransferType.Deposit,
            nullifyingKey: NULLIFYING_KEY,
          });
          const encryptedNote = await note.encrypt('goerli');
          return ethers.AbiCoder.defaultAbiCoder().encode(
            [
              'tuple(string encryptedData, string encryptedSenderKey, string encryptedReceiverKey)',
            ],
            [encryptedNote],
          );
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
        getByID(account).then((res) => {
          if (res) {
            logDebug('Using existing data');
            setData(res);
          } else {
            logDebug('Generating new data');
            genAddRes();
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
  }, [account, receiver, tokenAddress, amounts]);

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
        amounts,
        receiver,
        tokenAddress,
        loading,
        getClientProof,
        handleSnapConnectClick,
        setAmounts,
        setReceiver,
        setTokenAddress,
        state,
      }}
    >
      {children}
    </MistContext.Provider>
  );
};
