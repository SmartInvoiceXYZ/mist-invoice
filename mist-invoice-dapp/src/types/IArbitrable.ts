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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface IArbitrableInterface extends Interface {
  getFunction(
    nameOrSignature: "rule" | "rule(uint256,uint256)"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Ruling" | "Ruling(address,uint256,uint256)"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "rule",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rule(uint256,uint256)",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "rule", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rule(uint256,uint256)",
    data: BytesLike
  ): Result;
}

export namespace RulingEvent {
  export type InputTuple = [
    _arbitrator: AddressLike,
    _disputeID: BigNumberish,
    _ruling: BigNumberish
  ];
  export type OutputTuple = [
    _arbitrator: string,
    _disputeID: bigint,
    _ruling: bigint
  ];
  export interface OutputObject {
    _arbitrator: string;
    _disputeID: bigint;
    _ruling: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IArbitrable extends BaseContract {
  connect(runner?: ContractRunner | null): IArbitrable;
  waitForDeployment(): Promise<this>;

  interface: IArbitrableInterface;

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

  rule: TypedContractMethod<
    [_disputeID: BigNumberish, _ruling: BigNumberish],
    [void],
    "nonpayable"
  >;

  "rule(uint256,uint256)": TypedContractMethod<
    [_disputeID: BigNumberish, _ruling: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "rule"
  ): TypedContractMethod<
    [_disputeID: BigNumberish, _ruling: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "rule(uint256,uint256)"
  ): TypedContractMethod<
    [_disputeID: BigNumberish, _ruling: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Ruling"
  ): TypedContractEvent<
    RulingEvent.InputTuple,
    RulingEvent.OutputTuple,
    RulingEvent.OutputObject
  >;
  getEvent(
    key: "Ruling(address,uint256,uint256)"
  ): TypedContractEvent<
    Ruling_address_uint256_uint256_Event.InputTuple,
    Ruling_address_uint256_uint256_Event.OutputTuple,
    Ruling_address_uint256_uint256_Event.OutputObject
  >;

  filters: {
    "Ruling(address,uint256,uint256)": TypedContractEvent<
      RulingEvent.InputTuple,
      RulingEvent.OutputTuple,
      RulingEvent.OutputObject
    >;
    Ruling: TypedContractEvent<
      RulingEvent.InputTuple,
      RulingEvent.OutputTuple,
      RulingEvent.OutputObject
    >;
  };
}
