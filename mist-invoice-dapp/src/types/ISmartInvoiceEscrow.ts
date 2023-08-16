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
  AddressLike,
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

export interface ISmartInvoiceEscrowInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "amounts"
      | "amounts()"
      | "client"
      | "client()"
      | "init"
      | "init(address,uint256[],bytes)"
      | "lock"
      | "lock(bytes32)"
      | "locked"
      | "locked()"
      | "milestone"
      | "milestone()"
      | "provider"
      | "provider()"
      | "release(uint256)"
      | "release()"
      | "releaseTokens"
      | "releaseTokens(address)"
      | "released"
      | "released()"
      | "resolve"
      | "resolve(uint256,uint256,bytes32)"
      | "resolver"
      | "resolver()"
      | "token"
      | "token()"
      | "withdraw"
      | "withdraw()"
      | "withdrawTokens"
      | "withdrawTokens(address)"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "amounts", values?: undefined): string;
  encodeFunctionData(functionFragment: "amounts()", values?: undefined): string;
  encodeFunctionData(functionFragment: "client", values?: undefined): string;
  encodeFunctionData(functionFragment: "client()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [AddressLike, BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "init(address,uint256[],bytes)",
    values: [AddressLike, BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "lock", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "lock(bytes32)",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "locked", values?: undefined): string;
  encodeFunctionData(functionFragment: "locked()", values?: undefined): string;
  encodeFunctionData(functionFragment: "milestone", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "milestone()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "provider", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "provider()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "release(uint256)",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "release()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "releaseTokens",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "releaseTokens(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "released", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "released()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resolve",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolve(uint256,uint256,bytes32)",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "resolver", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "resolver()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(functionFragment: "token()", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens(address)",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "amounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "amounts()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "client", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "client()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "init(address,uint256[],bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lock(bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "locked()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "milestone", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "milestone()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "provider", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "provider()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "release(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "release()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "releaseTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "releaseTokens(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "released", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "released()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "resolve(uint256,uint256,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolver", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "resolver()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokens(address)",
    data: BytesLike
  ): Result;
}

export interface ISmartInvoiceEscrow extends BaseContract {
  connect(runner?: ContractRunner | null): ISmartInvoiceEscrow;
  waitForDeployment(): Promise<this>;

  interface: ISmartInvoiceEscrowInterface;

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

  amounts: TypedContractMethod<[], [bigint[]], "nonpayable">;

  "amounts()": TypedContractMethod<[], [bigint[]], "nonpayable">;

  client: TypedContractMethod<[], [string], "nonpayable">;

  "client()": TypedContractMethod<[], [string], "nonpayable">;

  init: TypedContractMethod<
    [_recipient: AddressLike, _amounts: BigNumberish[], _data: BytesLike],
    [void],
    "nonpayable"
  >;

  "init(address,uint256[],bytes)": TypedContractMethod<
    [_recipient: AddressLike, _amounts: BigNumberish[], _data: BytesLike],
    [void],
    "nonpayable"
  >;

  lock: TypedContractMethod<[_details: BytesLike], [void], "payable">;

  "lock(bytes32)": TypedContractMethod<
    [_details: BytesLike],
    [void],
    "payable"
  >;

  locked: TypedContractMethod<[], [boolean], "nonpayable">;

  "locked()": TypedContractMethod<[], [boolean], "nonpayable">;

  milestone: TypedContractMethod<[], [bigint], "nonpayable">;

  "milestone()": TypedContractMethod<[], [bigint], "nonpayable">;

  "release(uint256)": TypedContractMethod<
    [_milestone: BigNumberish],
    [void],
    "nonpayable"
  >;

  "release()": TypedContractMethod<[], [void], "nonpayable">;

  releaseTokens: TypedContractMethod<
    [_token: AddressLike],
    [void],
    "nonpayable"
  >;

  "releaseTokens(address)": TypedContractMethod<
    [_token: AddressLike],
    [void],
    "nonpayable"
  >;

  released: TypedContractMethod<[], [bigint], "nonpayable">;

  "released()": TypedContractMethod<[], [bigint], "nonpayable">;

  resolve: TypedContractMethod<
    [
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  "resolve(uint256,uint256,bytes32)": TypedContractMethod<
    [
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  resolver: TypedContractMethod<[], [string], "nonpayable">;

  "resolver()": TypedContractMethod<[], [string], "nonpayable">;

  token: TypedContractMethod<[], [string], "nonpayable">;

  "token()": TypedContractMethod<[], [string], "nonpayable">;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  "withdraw()": TypedContractMethod<[], [void], "nonpayable">;

  withdrawTokens: TypedContractMethod<
    [_token: AddressLike],
    [void],
    "nonpayable"
  >;

  "withdrawTokens(address)": TypedContractMethod<
    [_token: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "amounts"
  ): TypedContractMethod<[], [bigint[]], "nonpayable">;
  getFunction(
    nameOrSignature: "amounts()"
  ): TypedContractMethod<[], [bigint[]], "nonpayable">;
  getFunction(
    nameOrSignature: "client"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "client()"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "init"
  ): TypedContractMethod<
    [_recipient: AddressLike, _amounts: BigNumberish[], _data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "init(address,uint256[],bytes)"
  ): TypedContractMethod<
    [_recipient: AddressLike, _amounts: BigNumberish[], _data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lock"
  ): TypedContractMethod<[_details: BytesLike], [void], "payable">;
  getFunction(
    nameOrSignature: "lock(bytes32)"
  ): TypedContractMethod<[_details: BytesLike], [void], "payable">;
  getFunction(
    nameOrSignature: "locked"
  ): TypedContractMethod<[], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "locked()"
  ): TypedContractMethod<[], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "milestone"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "milestone()"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "provider"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "provider()"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "release(uint256)"
  ): TypedContractMethod<[_milestone: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "release()"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "releaseTokens"
  ): TypedContractMethod<[_token: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "releaseTokens(address)"
  ): TypedContractMethod<[_token: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "released"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "released()"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "resolve"
  ): TypedContractMethod<
    [
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "resolve(uint256,uint256,bytes32)"
  ): TypedContractMethod<
    [
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "resolver"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "resolver()"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "token()"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw()"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<[_token: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawTokens(address)"
  ): TypedContractMethod<[_token: AddressLike], [void], "nonpayable">;

  filters: {};
}
