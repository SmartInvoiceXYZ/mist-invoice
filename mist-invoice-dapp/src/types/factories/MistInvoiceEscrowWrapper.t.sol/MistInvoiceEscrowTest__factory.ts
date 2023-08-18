/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  MistInvoiceEscrowTest,
  MistInvoiceEscrowTestInterface,
} from "../../MistInvoiceEscrowWrapper.t.sol/MistInvoiceEscrowTest";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "log",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "log_address",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "val",
        type: "uint256[]",
      },
    ],
    name: "log_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256[]",
        name: "val",
        type: "int256[]",
      },
    ],
    name: "log_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "val",
        type: "address[]",
      },
    ],
    name: "log_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "log_bytes",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "log_bytes32",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    name: "log_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "val",
        type: "address",
      },
    ],
    name: "log_named_address",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "val",
        type: "uint256[]",
      },
    ],
    name: "log_named_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256[]",
        name: "val",
        type: "int256[]",
      },
    ],
    name: "log_named_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "val",
        type: "address[]",
      },
    ],
    name: "log_named_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "val",
        type: "bytes",
      },
    ],
    name: "log_named_bytes",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "val",
        type: "bytes32",
      },
    ],
    name: "log_named_bytes32",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "val",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "log_named_decimal_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "val",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "log_named_decimal_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "val",
        type: "int256",
      },
    ],
    name: "log_named_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "val",
        type: "string",
      },
    ],
    name: "log_named_string",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "val",
        type: "uint256",
      },
    ],
    name: "log_named_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "log_string",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "log_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "logs",
    type: "event",
  },
  {
    inputs: [],
    name: "IS_TEST",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "excludeArtifacts",
    outputs: [
      {
        internalType: "string[]",
        name: "excludedArtifacts_",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "excludeContracts",
    outputs: [
      {
        internalType: "address[]",
        name: "excludedContracts_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "excludeSenders",
    outputs: [
      {
        internalType: "address[]",
        name: "excludedSenders_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "failed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "targetArtifactSelectors",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct StdInvariant.FuzzSelector[]",
        name: "targetedArtifactSelectors_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetArtifacts",
    outputs: [
      {
        internalType: "string[]",
        name: "targetedArtifacts_",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetContracts",
    outputs: [
      {
        internalType: "address[]",
        name: "targetedContracts_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetSelectors",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct StdInvariant.FuzzSelector[]",
        name: "targetedSelectors_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetSenders",
    outputs: [
      {
        internalType: "address[]",
        name: "targetedSenders_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "testCreate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wrapper",
    outputs: [
      {
        internalType: "contract MistInvoiceEscrowWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260008054600160ff19918216811790925560048054909116909117905534801561002d57600080fd5b50610a3c8061003d6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063916a17c61161008c578063ba414fa611610066578063ba414fa614610169578063d62d3115146100d4578063e20c9f7114610181578063fa7626d41461018957600080fd5b8063916a17c61461012e578063ac210cc714610136578063b5508aa91461016157600080fd5b80630a9254e4146100d45780631ed7831c146100d65780633e5e3c23146100f45780633f7286f4146100fc57806366d9a9a01461010457806385226c8114610119575b600080fd5b005b6100de610196565b6040516100eb91906107b8565b60405180910390f35b6100de6101f8565b6100de610258565b61010c6102b8565b6040516100eb9190610805565b6101216103a7565b6040516100eb91906108dc565b61010c610477565b601b54610149906001600160a01b031681565b6040516001600160a01b0390911681526020016100eb565b61012161055d565b61017161062d565b60405190151581526020016100eb565b6100de610758565b6000546101719060ff1681565b6060600d8054806020026020016040519081016040528092919081815260200182805480156101ee57602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116101d0575b5050505050905090565b6060600f8054806020026020016040519081016040528092919081815260200182805480156101ee576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116101d0575050505050905090565b6060600e8054806020026020016040519081016040528092919081815260200182805480156101ee576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116101d0575050505050905090565b60606012805480602002602001604051908101604052809291908181526020016000905b8282101561039e5760008481526020908190206040805180820182526002860290920180546001600160a01b0316835260018101805483518187028101870190945280845293949193858301939283018282801561038657602002820191906000526020600020906000905b82829054906101000a900460e01b6001600160e01b031916815260200190600401906020826003010492830192600103820291508084116103485790505b505050505081525050815260200190600101906102dc565b50505050905090565b60606011805480602002602001604051908101604052809291908181526020016000905b8282101561039e5783829060005260206000200180546103ea90610956565b80601f016020809104026020016040519081016040528092919081815260200182805461041690610956565b80156104635780601f1061043857610100808354040283529160200191610463565b820191906000526020600020905b81548152906001019060200180831161044657829003601f168201915b5050505050815260200190600101906103cb565b60606013805480602002602001604051908101604052809291908181526020016000905b8282101561039e5760008481526020908190206040805180820182526002860290920180546001600160a01b0316835260018101805483518187028101870190945280845293949193858301939283018282801561054557602002820191906000526020600020906000905b82829054906101000a900460e01b6001600160e01b031916815260200190600401906020826003010492830192600103820291508084116105075790505b5050505050815250508152602001906001019061049b565b60606010805480602002602001604051908101604052809291908181526020016000905b8282101561039e5783829060005260206000200180546105a090610956565b80601f01602080910402602001604051908101604052809291908181526020018280546105cc90610956565b80156106195780601f106105ee57610100808354040283529160200191610619565b820191906000526020600020905b8154815290600101906020018083116105fc57829003601f168201915b505050505081526020019060010190610581565b60008054610100900460ff161561064d5750600054610100900460ff1690565b6000737109709ecfa91a80626ff3989d68f67f5b1dd12d3b156107535760408051737109709ecfa91a80626ff3989d68f67f5b1dd12d602082018190526519985a5b195960d21b828401528251808303840181526060830190935260009290916106db917f667f9d70ca411d70ead50d8d5c22070dafc36ad75f3dcf5e7237b22ade9aecc491608001610990565b60408051601f19818403018152908290526106f5916109c1565b6000604051808303816000865af19150503d8060008114610732576040519150601f19603f3d011682016040523d82523d6000602084013e610737565b606091505b509150508080602001905181019061074f91906109dd565b9150505b919050565b6060600c8054806020026020016040519081016040528092919081815260200182805480156101ee576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116101d0575050505050905090565b6020808252825182820181905260009190848201906040850190845b818110156107f95783516001600160a01b0316835292840192918401916001016107d4565b50909695505050505050565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b848110156108a957898403603f19018652825180516001600160a01b03168552880151888501889052805188860181905290890190839060608701905b808310156108945783516001600160e01b0319168252928b019260019290920191908b019061086a565b50978a0197955050509187019160010161082d565b50919998505050505050505050565b60005b838110156108d35781810151838201526020016108bb565b50506000910152565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561094957878503603f190184528151805180875261092a818989018a85016108b8565b601f01601f191695909501860194509285019290850190600101610903565b5092979650505050505050565b600181811c9082168061096a57607f821691505b60208210810361098a57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160e01b03198316815281516000906109b38160048501602087016108b8565b919091016004019392505050565b600082516109d38184602087016108b8565b9190910192915050565b6000602082840312156109ef57600080fd5b815180151581146109ff57600080fd5b939250505056fea26469706673582212207d00e9881111b2feb7b2524741fef381c23bb039ca6834a6a0440e4f9f8ef96864736f6c63430008150033";

type MistInvoiceEscrowTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MistInvoiceEscrowTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MistInvoiceEscrowTest__factory extends ContractFactory {
  constructor(...args: MistInvoiceEscrowTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MistInvoiceEscrowTest & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): MistInvoiceEscrowTest__factory {
    return super.connect(runner) as MistInvoiceEscrowTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MistInvoiceEscrowTestInterface {
    return new Interface(_abi) as MistInvoiceEscrowTestInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MistInvoiceEscrowTest {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MistInvoiceEscrowTest;
  }
}
