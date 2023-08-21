/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace Pairing {
  export type G1PointStruct = { X: BigNumberish; Y: BigNumberish };

  export type G1PointStructOutput = [X: bigint, Y: bigint] & {
    X: bigint;
    Y: bigint;
  };

  export type G2PointStruct = {
    X: [BigNumberish, BigNumberish];
    Y: [BigNumberish, BigNumberish];
  };

  export type G2PointStructOutput = [
    X: [bigint, bigint],
    Y: [bigint, bigint]
  ] & { X: [bigint, bigint]; Y: [bigint, bigint] };
}

export declare namespace Verifier {
  export type ProofStruct = {
    A: Pairing.G1PointStruct;
    B: Pairing.G2PointStruct;
    C: Pairing.G1PointStruct;
  };

  export type ProofStructOutput = [
    A: Pairing.G1PointStructOutput,
    B: Pairing.G2PointStructOutput,
    C: Pairing.G1PointStructOutput
  ] & {
    A: Pairing.G1PointStructOutput;
    B: Pairing.G2PointStructOutput;
    C: Pairing.G1PointStructOutput;
  };
}

export interface VerifierInterface extends Interface {
  getFunction(nameOrSignature: "verify" | "verifyProof"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verify",
    values: [
      Verifier.ProofStruct,
      BigNumberish,
      [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyProof",
    values: [
      [BigNumberish, BigNumberish],
      [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      [BigNumberish, BigNumberish],
      BigNumberish[]
    ]
  ): string;

  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyProof",
    data: BytesLike
  ): Result;
}

export interface Verifier extends BaseContract {
  connect(runner?: ContractRunner | null): Verifier;
  waitForDeployment(): Promise<this>;

  interface: VerifierInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  verify: TypedContractMethod<
    [
      proof: Verifier.ProofStruct,
      root: BigNumberish,
      digest: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      signal: BigNumberish
    ],
    [boolean],
    "view"
  >;

  verifyProof: TypedContractMethod<
    [
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: BigNumberish[]
    ],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "verify"
  ): TypedContractMethod<
    [
      proof: Verifier.ProofStruct,
      root: BigNumberish,
      digest: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      signal: BigNumberish
    ],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifyProof"
  ): TypedContractMethod<
    [
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: BigNumberish[]
    ],
    [boolean],
    "view"
  >;

  filters: {};
}
