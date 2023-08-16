/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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
} from "../common";

export interface InvoiceCreationScriptInterface extends Interface {
  getFunction(
    nameOrSignature: "IS_SCRIPT" | "IS_SCRIPT()" | "run" | "run()"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "IS_SCRIPT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "IS_SCRIPT()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "run", values?: undefined): string;
  encodeFunctionData(functionFragment: "run()", values?: undefined): string;

  decodeFunctionResult(functionFragment: "IS_SCRIPT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "IS_SCRIPT()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "run", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "run()", data: BytesLike): Result;
}

export interface InvoiceCreationScript extends BaseContract {
  connect(runner?: ContractRunner | null): InvoiceCreationScript;
  waitForDeployment(): Promise<this>;

  interface: InvoiceCreationScriptInterface;

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

  IS_SCRIPT: TypedContractMethod<[], [boolean], "view">;

  "IS_SCRIPT()": TypedContractMethod<[], [boolean], "view">;

  run: TypedContractMethod<[], [void], "nonpayable">;

  "run()": TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "IS_SCRIPT"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "IS_SCRIPT()"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "run"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "run()"
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
