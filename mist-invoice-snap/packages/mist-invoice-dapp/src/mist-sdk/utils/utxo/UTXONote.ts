import { getBytes, keccak256, randomBytes, AbiCoder, toBigInt } from 'ethers';
import { poseidon2, poseidon3, poseidon4 } from 'poseidon-lite';

import { Lit } from '../encryption';
import { TransferType } from './types';

export class UTXONote {
  private _index?: number;
  sender: string;
  receiver: string;
  token: bigint;
  tokenAddress: string;
  identifier: bigint;
  amount: bigint;
  random: bigint;
  memo?: string;
  private _nullifier?: bigint;
  private _commitment?: bigint;
  nullifyingKey: bigint;
  transferType: TransferType;
  private abiCoder = new AbiCoder();

  constructor(params: {
    index?: number;
    sender: string;
    receiver: string;
    token: string;
    identifier: bigint;
    amount: bigint;
    memo?: string;
    random?: bigint;
    commitment?: bigint;
    nullifyingKey: bigint;
    transferType?: TransferType;
  }) {
    if (!params.random) {
      params.random = toBigInt(getBytes(randomBytes(32)));
    }
    if (!params.transferType) {
      params.transferType = TransferType.Transfer;
    }
    this._index = params.index;
    this.tokenAddress = params.token;
    this.token = BigInt(params.token);
    this.identifier = params.identifier;
    this.receiver = params.receiver;
    this.sender = params.sender;
    this.amount = params.amount;
    this.random = params.random ?? toBigInt(getBytes(randomBytes(32)));
    this.transferType = params.transferType;
    this.nullifyingKey = params.nullifyingKey;
    if (params.memo) this.memo = params.memo;
    if (params.commitment) this._commitment = params.commitment;
  }

  get index(): number {
    if (!this._index && this._index !== 0) throw new Error('Index is not set');
    return this._index;
  }

  setIndex(index: number) {
    this._index = index;
  }

  getNullifier(): bigint {
    if (this._nullifier) return this._nullifier;
    if (!this._index && this._index !== 0) throw new Error('Index is not set');
    const nullifierHash = poseidon3([
      this.nullifyingKey,
      BigInt(this._index),
      this.random,
    ]);
    this._nullifier = nullifierHash;
    return this._nullifier;
  }

  getCommitment(): bigint {
    if (this._commitment) return this._commitment;
    const accountHash = this.getAccountHash();
    const commitmentHash = poseidon4([
      accountHash,
      this.token,
      this.identifier,
      this.amount,
    ]);
    this._commitment = commitmentHash;
    return this._commitment;
  }

  getAccountHash(): bigint {
    if (this.transferType === TransferType.Withdrawal) {
      return BigInt(
        keccak256(this.abiCoder.encode(['address'], [this.receiver])),
      );
    }
    const accountId = BigInt(
      keccak256(this.abiCoder.encode(['address'], [this.receiver])),
    );
    const accountHashKey = poseidon2([accountId, this.nullifyingKey]);
    return poseidon2([accountHashKey, this.random]);
  }

  async encrypt(chain: string) {
    const lit = new Lit();
    const encryption = await lit.encryptNote(chain, {
      sender: this.sender,
      receiver: this.receiver,
      token: this.tokenAddress,
      identifier: BigInt(this.identifier).toString(),
      amount: BigInt(this.amount).toString(),
      random: BigInt(this.random).toString(),
    });
    return encryption;
  }

  async encryptPacked(chain: string) {
    const encryption = await this.encrypt(chain);
    const encoded = this.abiCoder.encode(
      [
        'tuple(string encryptedData, string encryptedSenderKey, string encryptedReceiverKey)',
      ],
      [encryption],
    );
    return encoded;
  }
}
