import {
  IncrementalMerkleTree,
  MerkleProof,
} from '@zk-kit/incremental-merkle-tree';
import { BytesLike, keccak256, toBigInt, toTwos, zeroPadValue } from 'ethers';
import { poseidon2 } from 'poseidon-lite';

export function zeroValue(accountId: BytesLike | number | bigint): bigint {
  accountId = toTwos(toBigInt(accountId), 256).toString(16);
  accountId = zeroPadValue(accountId, 32);
  const encoding = new TextEncoder();
  return BigInt(keccak256(encoding.encode(accountId))) >> BigInt(8);
}

export function createMerkleTree(
  id: number | bigint,
  leaves: bigint[],
  merkleDepth: number,
) {
  const tree = new IncrementalMerkleTree(
    poseidon2,
    merkleDepth,
    zeroValue(id),
    2,
  );
  leaves.forEach((leaf) => {
    tree.insert(leaf);
  });
  return tree;
}

export function createMerkleProof(
  tree: IncrementalMerkleTree,
  leaf: bigint,
): MerkleProof {
  const proof = tree.createProof(tree.indexOf(leaf));
  return proof;
}
