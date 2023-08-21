import {
  IncrementalMerkleTree,
  MerkleProof,
} from '@zk-kit/incremental-merkle-tree';
import { AbiCoder, getBigInt, keccak256 } from 'ethers';
import { poseidon2 } from 'poseidon-lite';
import { zeroValue } from '../../merkle';

export class Account {
  address: string;
  accountId: bigint;
  merkleTree: IncrementalMerkleTree;
  quorum: number;

  constructor(address: string, treeDepth: number, quorum?: number) {
    this.address = address;
    this.accountId = getBigInt(
      keccak256(new AbiCoder().encode(['address'], [address])),
    );
    this.merkleTree = new IncrementalMerkleTree(
      poseidon2,
      treeDepth,
      zeroValue(this.accountId),
      2,
    );
    this.quorum = quorum ?? 1;
  }

  get root(): bigint {
    return this.merkleTree.root;
  }

  get depth(): number {
    return this.merkleTree.depth;
  }

  get zeroValue(): bigint {
    return this.merkleTree.zeroes[0];
  }

  get members(): bigint[] {
    return this.merkleTree.leaves;
  }

  indexOf(pubkey: [bigint, bigint], role: bigint): number {
    const pk = poseidon2([pubkey[0], pubkey[1]]);
    const commitment = poseidon2([pk, role]);
    return this.merkleTree.indexOf(commitment);
  }

  setQuorum(quorum: number) {
    this.quorum = quorum;
  }

  addMember(pubkey: [bigint, bigint], role: bigint) {
    const pk = poseidon2([pubkey[0], pubkey[1]]);
    const commitment = poseidon2([pk, role]);
    this.merkleTree.insert(commitment);
  }

  addSpender(pubkey: [bigint, bigint]) {
    const aclRole = BigInt(1);
    this.addMember(pubkey, aclRole);
  }

  addGuardian(pubkey: [bigint, bigint]) {
    const aclRole = BigInt(0);
    this.addMember(pubkey, aclRole);
  }

  removeSpender(pubkey: [bigint, bigint]) {
    const aclRole = BigInt(1);
    const index = this.indexOf(pubkey, aclRole);
    this.merkleTree.delete(index);
  }

  removeGuardian(pubkey: [bigint, bigint]) {
    const aclRole = BigInt(0);
    const index = this.indexOf(pubkey, aclRole);
    this.merkleTree.delete(index);
  }

  generateMerkleProof(index: number): MerkleProof {
    const merkleProof = this.merkleTree.createProof(index);
    merkleProof.siblings = merkleProof.siblings.map((sibling) => sibling[0]);
    return merkleProof;
  }
}
