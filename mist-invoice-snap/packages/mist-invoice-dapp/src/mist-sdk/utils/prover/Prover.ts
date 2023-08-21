import { toBigInt } from 'ethers';
import {
  ProverAccountParams,
  ProverBalanceParams,
  ProverUTXOParams,
  MISTAPIBalanceParams,
  MISTAPIUTXOParams,
  MISTAPIAccountParams,
  ProverOutput,
} from './types';

export class Prover {
  baseURI: string;
  apiKey: string;

  constructor(params: { baseURI: string; apiKey?: string }) {
    this.baseURI = params.baseURI;
    this.apiKey = params.apiKey || '';
  }

  async proveAccountMembership(
    inputs: ProverAccountParams,
  ): Promise<ProverOutput> {
    const body: MISTAPIAccountParams = {
      root: toBigInt(inputs.root).toString(),
      message: toBigInt(inputs.message).toString(),
      publicKey: [
        toBigInt(inputs.publicKey[0]).toString(),
        toBigInt(inputs.publicKey[1]).toString(),
      ],
      role: toBigInt(inputs.role).toString(),
      signature: [
        toBigInt(inputs.signature[0]).toString(),
        toBigInt(inputs.signature[1]).toString(),
        toBigInt(inputs.signature[2]).toString(),
      ],
      pathIndices: inputs.pathIndices.map((i) => toBigInt(i).toString()),
      pathSiblings: inputs.pathSiblings.map((s) => toBigInt(s).toString()),
    };
    const res = await fetch(`${this.baseURI}/prover/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.apiKey,
      },
      body: JSON.stringify(body),
    });
    return (await res.json()) as ProverOutput;
  }

  async proveBalance(inputs: ProverBalanceParams): Promise<ProverOutput> {
    const body: MISTAPIBalanceParams = {
      root: toBigInt(inputs.root).toString(),
      registryRoot: toBigInt(inputs.registryRoot).toString(),
      nullifiers: inputs.nullifiers.map((n) => toBigInt(n).toString()),
      token: toBigInt(inputs.token).toString(),
      balance: toBigInt(inputs.balance).toString(),
      publicKey: [
        toBigInt(inputs.publicKey[0]).toString(),
        toBigInt(inputs.publicKey[1]).toString(),
      ],
      signature: [
        toBigInt(inputs.signature[0]).toString(),
        toBigInt(inputs.signature[1]).toString(),
        toBigInt(inputs.signature[2]).toString(),
      ],
      role: toBigInt(inputs.role).toString(),
      aclRoot: toBigInt(inputs.aclRoot).toString(),
      aclPathSiblings: inputs.aclPathSiblings.map((s) =>
        toBigInt(s).toString(),
      ),
      aclPathIndices: inputs.aclPathIndices.map((i) => toBigInt(i).toString()),
      quorum: toBigInt(inputs.quorum).toString(),
      accountId: toBigInt(inputs.accountId).toString(),
      nullifyingKey: toBigInt(inputs.nullifyingKey).toString(),
      registryPathSiblings: inputs.registryPathSiblings.map((s) =>
        toBigInt(s).toString(),
      ),
      registryPathIndices: inputs.registryPathIndices.map((i) =>
        toBigInt(i).toString(),
      ),
      tokenIds: inputs.tokenIds.map((i) => toBigInt(i).toString()),
      inAmounts: inputs.inAmounts.map((i) => toBigInt(i).toString()),
      inRandoms: inputs.inRandoms.map((i) => toBigInt(i).toString()),
      inPathElements: inputs.inPathElements.map((i) =>
        i.map((j) => j.toString()),
      ),
      inPathIndices: inputs.inPathIndices.map((i) => toBigInt(i).toString()),
    };
    const res = await fetch(`${this.baseURI}/prover/balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.apiKey,
      },
      body: JSON.stringify(body),
    });
    return (await res.json()) as ProverOutput;
  }

  async proveUTXO(inputs: ProverUTXOParams): Promise<ProverOutput> {
    const body: MISTAPIUTXOParams = {
      root: toBigInt(inputs.root).toString(),
      registryRoot: toBigInt(inputs.registryRoot).toString(),
      extDataHash: toBigInt(inputs.extDataHash).toString(),
      inNullifiers: inputs.inNullifiers.map((n) => toBigInt(n).toString()),
      outCommitments: inputs.outCommitments.map((c) => toBigInt(c).toString()),
      publicKeys: inputs.publicKeys.map((pk) => [
        toBigInt(pk[0]).toString(),
        toBigInt(pk[1]).toString(),
      ]),
      signatures: inputs.signatures.map((s) => [
        toBigInt(s[0]).toString(),
        toBigInt(s[1]).toString(),
        toBigInt(s[2]).toString(),
      ]),
      roles: inputs.roles.map((r) => toBigInt(r).toString()),
      aclRoot: toBigInt(inputs.aclRoot).toString(),
      aclPathSiblings: inputs.aclPathSiblings.map((s) =>
        s.map((i) => toBigInt(i).toString()),
      ),
      aclPathIndices: inputs.aclPathIndices.map((i) =>
        i.map((j) => toBigInt(j).toString()),
      ),
      accountId: toBigInt(inputs.accountId).toString(),
      nullifyingKey: toBigInt(inputs.nullifyingKey).toString(),
      registryPathSiblings: inputs.registryPathSiblings.map((s) =>
        toBigInt(s).toString(),
      ),
      registryPathIndices: inputs.registryPathIndices.map((i) =>
        toBigInt(i).toString(),
      ),
      token: toBigInt(inputs.token).toString(),
      tokenId: toBigInt(inputs.tokenId).toString(),
      inAmounts: inputs.inAmounts.map((i) => toBigInt(i).toString()),
      inRandoms: inputs.inRandoms.map((i) => toBigInt(i).toString()),
      inPathElements: inputs.inPathElements.map((i) =>
        i.map((j) => j.toString()),
      ),
      inPathIndices: inputs.inPathIndices.map((i) => toBigInt(i).toString()),
      outAmounts: inputs.outAmounts.map((i) => toBigInt(i).toString()),
      outAccountHashes: inputs.outAccountHashes.map((i) =>
        toBigInt(i).toString(),
      ),
    };
    const res = await fetch(`${this.baseURI}/prover/utxo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.apiKey,
      },
      body: JSON.stringify(body),
    });
    return (await res.json()) as ProverOutput;
  }
}
