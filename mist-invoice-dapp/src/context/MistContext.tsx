import React, { createContext, useContext, useEffect, useState } from "react";

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import skiffCrypto from "@skiff-org/skiff-crypto";
import { BytesLike } from "ethers";
import randombytes from "randombytes";
import { useIndexedDB } from "react-indexed-db-hook";
import { logDebug, logError } from "../utils";
import { Web3Context } from "./Web3Context";

export type MistData = {
  merkleRoot?: BytesLike;
  clientRandom: BytesLike;
  providerRandom: BytesLike;
  clientKey: BytesLike;
  providerKey: BytesLike;
};

export type MistContextType = {
  data?: MistData;
  loading: boolean;
  getClientProof: () => BytesLike[] | undefined;
};

export const MistContext = createContext<MistContextType>({
  getClientProof: () => undefined,
  loading: true
});

export const MistContextProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { getByID, add } = useIndexedDB(process.env.MIST_DB_NAME || "");
  const { account } = useContext(Web3Context);
  const [data, setData] = useState<MistData>();
  const [tree, setTree] =
    useState<StandardMerkleTree<(BytesLike | undefined)[]>>();
  const [loading, setLoading] = useState(false);

  const providerAddress = process.env.MIST_PROVIDER_ADDRESS || "";

  useEffect(() => {
    if (!account || !providerAddress || !data) return;
    const values = [
      [account, data.clientRandom],
      [providerAddress, data.providerRandom]
    ];

    const _tree = StandardMerkleTree.of(values, ["address", "bytes32"]);
    setTree(_tree);
    setData({
      ...data,
      merkleRoot: _tree.root
    });
  }, [account, providerAddress, data]);

  const generate = () => {
    const clientRandom = randombytes(32);
    const providerRandom = randombytes(32);
    const clientKey = skiffCrypto.generateSymmetricKey();
    const providerKey = skiffCrypto.generateSymmetricKey();

    const generated = {
      clientRandom,
      providerRandom,
      clientKey,
      providerKey
    };

    setData(generated);

    return generated;
  };

  useEffect(() => {
    if (account) {
      setLoading(true);
      try {
        getByID<MistData>(account).then((res) => {
          if (res) {
            logDebug("Using existing data");
            setData(res);
          } else {
            logDebug("Generating new data");
            res = generate();
            add(res, account).then(() => {
              setData(res);
            });
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
  }, [account]);

  const getClientProof = () => {
    if (account && tree && data) {
      const proof = tree.getProof([account, data.clientRandom]);
      return proof;
    }
    return undefined;
  };

  return (
    <MistContext.Provider value={{ data, loading, getClientProof }}>
      {children}
    </MistContext.Provider>
  );
};
