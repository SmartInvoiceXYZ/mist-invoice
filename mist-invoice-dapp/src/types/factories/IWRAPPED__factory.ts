/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { IWRAPPED, IWRAPPEDInterface } from "../IWRAPPED";

const _abi = [
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IWRAPPED__factory {
  static readonly abi = _abi;
  static createInterface(): IWRAPPEDInterface {
    return new Interface(_abi) as IWRAPPEDInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IWRAPPED {
    return new Contract(address, _abi, runner) as unknown as IWRAPPED;
  }
}
