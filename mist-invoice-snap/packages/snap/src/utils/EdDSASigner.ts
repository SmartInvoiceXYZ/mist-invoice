// Cloned and modified from @usemist/sdk

import { buildEddsa, buildBabyjub } from "circomlibjs";


export interface EdDSASignature {
  R8: [Uint8Array, Uint8Array];
  S: bigint;
}

export class EdDSASigner {
  private _eddsa: any;
  private _babyjub: any;
  private _privateKey?: Uint8Array;
  private _publicKey?: [Uint8Array, Uint8Array];

  constructor(privKey: Uint8Array) {
    this._privateKey = privKey;
  }

  get initialized() {
    return (
      this._eddsa !== undefined &&
      this._babyjub !== undefined &&
      this._privateKey !== undefined &&
      this._publicKey !== undefined
    );
  }

  get pubKey(): [Uint8Array, Uint8Array] {
    if (!this._publicKey) throw Error("Not initialized");
    return this._publicKey;
  }

  get babyjub(): any {
    if (!this._babyjub) throw Error("Not initialized");
    return this._babyjub;
  }

  get scalarPubKey(): [bigint, bigint] {
    if (!this._publicKey) throw Error("Not initialized");
    return [
      this._babyjub.F.toObject(this._publicKey[0]),
      this._babyjub.F.toObject(this._publicKey[1]),
    ];
  }

  async init() {
    if (this.initialized) return this;
    this._eddsa = await buildEddsa();
    this._babyjub = await buildBabyjub();
    this._publicKey = await this._eddsa.prv2pub(this._privateKey);
    return this;
  }

  async sign(message: string | bigint): Promise<EdDSASignature> {
    const m = this._babyjub.F.e(BigInt(message).toString());
    const signature = this._eddsa.signPoseidon(this._privateKey, m);
    if (!this.verify(m, signature, this.pubKey))
      throw Error("generated invalid eddsa signature");
    return signature;
  }

  async signFormatted(message: string | bigint): Promise<[bigint, bigint, bigint]> {
    const m = this._babyjub.F.e(BigInt(message).toString());
    const signature = this._eddsa.signPoseidon(this._privateKey, m);
    if (!this.verify(m, signature, this.pubKey))
      throw Error("generated invalid eddsa signature");
    return [this._babyjub.F.toObject(signature.R8[0]), this._babyjub.F.toObject(signature.R8[1]), signature.S]
  }

  async verify(
    message: string | bigint,
    signature: EdDSASignature,
    pubKey: [Uint8Array, Uint8Array]
  ) {
    const m = this._babyjub.F.e(BigInt(message).toString());
    return this._eddsa.verifyPoseidon(m, signature, pubKey);
  }
}