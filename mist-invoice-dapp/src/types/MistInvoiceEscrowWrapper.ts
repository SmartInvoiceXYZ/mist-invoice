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

export declare namespace MistInvoiceEscrowWrapper {
  export type MistDataStruct = {
    merkleRoot: BytesLike;
    clientRandom: BytesLike;
    providerRandom: BytesLike;
    clientKey: BytesLike;
    providerKey: BytesLike;
  };

  export type MistDataStructOutput = [
    merkleRoot: string,
    clientRandom: string,
    providerRandom: string,
    clientKey: string,
    providerKey: string
  ] & {
    merkleRoot: string;
    clientRandom: string;
    providerRandom: string;
    clientKey: string;
    providerKey: string;
  };
}

export interface MistInvoiceEscrowWrapperInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "INVOICE_FACTORY"
      | "INVOICE_FACTORY()"
      | "createInvoice"
      | "createInvoice((bytes,bytes,bytes,bytes,bytes),uint256[],bytes,bytes32)"
      | "mistPool"
      | "mistPool()"
      | "privateDeposit"
      | "privateDeposit(address)"
      | "privateDispute"
      | "privateDispute(address,bytes32,bytes)"
      | "privateRelease"
      | "privateRelease(address,bytes,uint256)"
      | "privateWithdraw"
      | "privateWithdraw(address,bytes)"
      | "resolve"
      | "resolve(address,uint256,uint256,bytes32)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "INVOICE_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "INVOICE_FACTORY()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createInvoice",
    values: [
      MistInvoiceEscrowWrapper.MistDataStruct,
      BigNumberish[],
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createInvoice((bytes,bytes,bytes,bytes,bytes),uint256[],bytes,bytes32)",
    values: [
      MistInvoiceEscrowWrapper.MistDataStruct,
      BigNumberish[],
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "mistPool", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mistPool()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "privateDeposit",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "privateDeposit(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "privateDispute",
    values: [AddressLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "privateDispute(address,bytes32,bytes)",
    values: [AddressLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "privateRelease",
    values: [AddressLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "privateRelease(address,bytes,uint256)",
    values: [AddressLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "privateWithdraw",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "privateWithdraw(address,bytes)",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolve",
    values: [AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolve(address,uint256,uint256,bytes32)",
    values: [AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "INVOICE_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "INVOICE_FACTORY()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createInvoice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createInvoice((bytes,bytes,bytes,bytes,bytes),uint256[],bytes,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mistPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mistPool()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "privateDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateDeposit(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateDispute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateDispute(address,bytes32,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateRelease",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateRelease(address,bytes,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "privateWithdraw(address,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "resolve(address,uint256,uint256,bytes32)",
    data: BytesLike
  ): Result;
}

export interface MistInvoiceEscrowWrapper extends BaseContract {
  connect(runner?: ContractRunner | null): MistInvoiceEscrowWrapper;
  waitForDeployment(): Promise<this>;

  interface: MistInvoiceEscrowWrapperInterface;

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

  INVOICE_FACTORY: TypedContractMethod<[], [string], "view">;

  "INVOICE_FACTORY()": TypedContractMethod<[], [string], "view">;

  createInvoice: TypedContractMethod<
    [
      _mistData: MistInvoiceEscrowWrapper.MistDataStruct,
      _amounts: BigNumberish[],
      _data: BytesLike,
      _type: BytesLike
    ],
    [string],
    "nonpayable"
  >;

  "createInvoice((bytes,bytes,bytes,bytes,bytes),uint256[],bytes,bytes32)": TypedContractMethod<
    [
      _mistData: MistInvoiceEscrowWrapper.MistDataStruct,
      _amounts: BigNumberish[],
      _data: BytesLike,
      _type: BytesLike
    ],
    [string],
    "nonpayable"
  >;

  mistPool: TypedContractMethod<[], [string], "view">;

  "mistPool()": TypedContractMethod<[], [string], "view">;

  privateDeposit: TypedContractMethod<
    [_invoiceAddr: AddressLike],
    [void],
    "nonpayable"
  >;

  "privateDeposit(address)": TypedContractMethod<
    [_invoiceAddr: AddressLike],
    [void],
    "nonpayable"
  >;

  privateDispute: TypedContractMethod<
    [_invoiceAddr: AddressLike, _details: BytesLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;

  "privateDispute(address,bytes32,bytes)": TypedContractMethod<
    [_invoiceAddr: AddressLike, _details: BytesLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;

  privateRelease: TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike, _milestone: BigNumberish],
    [void],
    "nonpayable"
  >;

  "privateRelease(address,bytes,uint256)": TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike, _milestone: BigNumberish],
    [void],
    "nonpayable"
  >;

  privateWithdraw: TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;

  "privateWithdraw(address,bytes)": TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;

  resolve: TypedContractMethod<
    [
      _invoiceAddr: AddressLike,
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  "resolve(address,uint256,uint256,bytes32)": TypedContractMethod<
    [
      _invoiceAddr: AddressLike,
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "INVOICE_FACTORY"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "INVOICE_FACTORY()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "createInvoice"
  ): TypedContractMethod<
    [
      _mistData: MistInvoiceEscrowWrapper.MistDataStruct,
      _amounts: BigNumberish[],
      _data: BytesLike,
      _type: BytesLike
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createInvoice((bytes,bytes,bytes,bytes,bytes),uint256[],bytes,bytes32)"
  ): TypedContractMethod<
    [
      _mistData: MistInvoiceEscrowWrapper.MistDataStruct,
      _amounts: BigNumberish[],
      _data: BytesLike,
      _type: BytesLike
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "mistPool"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "mistPool()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "privateDeposit"
  ): TypedContractMethod<[_invoiceAddr: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "privateDeposit(address)"
  ): TypedContractMethod<[_invoiceAddr: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "privateDispute"
  ): TypedContractMethod<
    [_invoiceAddr: AddressLike, _details: BytesLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "privateDispute(address,bytes32,bytes)"
  ): TypedContractMethod<
    [_invoiceAddr: AddressLike, _details: BytesLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "privateRelease"
  ): TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike, _milestone: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "privateRelease(address,bytes,uint256)"
  ): TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike, _milestone: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "privateWithdraw"
  ): TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "privateWithdraw(address,bytes)"
  ): TypedContractMethod<
    [_invoiceAddr: AddressLike, _proof: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "resolve"
  ): TypedContractMethod<
    [
      _invoiceAddr: AddressLike,
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "resolve(address,uint256,uint256,bytes32)"
  ): TypedContractMethod<
    [
      _invoiceAddr: AddressLike,
      _clientAward: BigNumberish,
      _providerAward: BigNumberish,
      _details: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  filters: {};
}
