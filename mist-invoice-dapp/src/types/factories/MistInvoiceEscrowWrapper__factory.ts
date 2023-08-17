/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  MistInvoiceEscrowWrapper,
  MistInvoiceEscrowWrapperInterface,
} from "../MistInvoiceEscrowWrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_invoiceFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mistPool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "INVOICE_FACTORY",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "merkleRoot",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "clientRandom",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "providerRandom",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "clientKey",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "providerKey",
            type: "bytes",
          },
        ],
        internalType: "struct MistInvoiceEscrowWrapper.MistData",
        name: "_mistData",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_type",
        type: "bytes32",
      },
    ],
    name: "createInvoice",
    outputs: [
      {
        internalType: "address",
        name: "invoice",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mistPool",
    outputs: [
      {
        internalType: "contract IMISTPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_invoiceAddr",
        type: "address",
      },
    ],
    name: "privateDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_invoiceAddr",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_details",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
    ],
    name: "privateDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_invoiceAddr",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_milestone",
        type: "uint256",
      },
    ],
    name: "privateRelease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_invoiceAddr",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_proof",
        type: "bytes",
      },
    ],
    name: "privateWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_invoiceAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_clientAward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_providerAward",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_details",
        type: "bytes32",
      },
    ],
    name: "resolve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516111c73803806111c783398101604081905261002f91610073565b6001600160a01b03918216608052600080546001600160a01b031916919092161790556100a6565b80516001600160a01b038116811461006e57600080fd5b919050565b6000806040838503121561008657600080fd5b61008f83610057565b915061009d60208401610057565b90509250929050565b6080516111006100c76000396000818160a701526109d701526111006000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638b1c49d91161005b5780638b1c49d914610109578063c05f0d871461011c578063c201b1241461012f578063f5afd7791461014257600080fd5b8063222002be1461008d5780633154b0de146100a2578063322dd8c5146100e557806338daa829146100f8575b600080fd5b6100a061009b366004610b09565b610155565b005b6100c97f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b6100a06100f3366004610b8d565b6103cc565b6100a0610106366004610be9565b50565b6100a0610117366004610c0d565b6105ad565b6100a061012a366004610c62565b610785565b6100c961013d366004610cbe565b610803565b6000546100c9906001600160a01b031681565b6001600160a01b0384166101845760405162461bcd60e51b815260040161017b90610d94565b60405180910390fd5b60008490506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156101cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ef9190610dc4565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610239573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025d9190610de1565b604080516024810189905260448101889052606480820188905282518083039091018152608490910182526020810180516001600160e01b03166353e83e4160e11b17905290519192506001600160a01b038916916102bc9190610dfa565b600060405180830381855af49150503d80600081146102f7576040519150601f19603f3d011682016040523d82523d6000602084013e6102fc565b606091505b50506040516370a0823160e01b8152306004820152600091506001600160a01b038416906370a0823190602401602060405180830381865afa158015610346573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036a9190610de1565b905060006103788383610e3f565b9050600081610387898b610e58565b610391908b610e6b565b61039b9190610e8d565b90506000826103aa8a8c610e58565b6103b4908b610e6b565b6103be9190610e8d565b505050505050505050505050565b6001600160a01b0384166103f25760405162461bcd60e51b815260040161017b90610d94565b60008490506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610439573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045d9190610dc4565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa1580156104a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cb9190610de1565b6040516337bdc99b60e01b8152600481018690529091506001600160a01b038416906337bdc99b90602401600060405180830381600087803b15801561051057600080fd5b505af1158015610524573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092506001600160a01b03851691506370a0823190602401602060405180830381865afa15801561056f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105939190610de1565b905060006105a18383610e3f565b50505050505050505050565b6001600160a01b0383166105d35760405162461bcd60e51b815260040161017b90610d94565b60008390506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b81526004016020604051808303816000875af115801561061a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063e9190610dc4565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610688573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ac9190610de1565b9050826001600160a01b0316633ccfd60b6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156106e957600080fd5b505af11580156106fd573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092506001600160a01b03851691506370a0823190602401602060405180830381865afa158015610748573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076c9190610de1565b9050600061077a8383610e3f565b505050505050505050565b6001600160a01b0384166107ab5760405162461bcd60e51b815260040161017b90610d94565b6040516301670ba960e01b81526004810184905284906001600160a01b038216906301670ba990602401600060405180830381600087803b1580156107ef57600080fd5b505af115801561077a573d6000803e3d6000fd5b600061080f8780610ea4565b90506000036108575760405162461bcd60e51b81526020600482015260146024820152731b595c9adb19481c9bdbdd081c995c5d5a5c995960621b604482015260640161017b565b6040805160a08101909152600090806108708a80610ea4565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020908101906108b9908b018b610ea4565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525060200161090060408b018b610ea4565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525060200161094760608b018b610ea4565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525060200161098e60808b018b610ea4565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509390945250505460405163fc2b2c5b60e01b81529293507f0000000000000000000000000000000000000000000000000000000000000000926001600160a01b03808516935063fc2b2c5b92610a23929116908c908c908c908c908c90600401610eeb565b6020604051808303816000875af1158015610a42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a669190610dc4565b6001600160a01b0381166000908152600160205260409020835191945083918190610a91908261100a565b5060208201516001820190610aa6908261100a565b5060408201516002820190610abb908261100a565b5060608201516003820190610ad0908261100a565b5060808201516004820190610ae5908261100a565b50505050509695505050505050565b6001600160a01b038116811461010657600080fd5b60008060008060808587031215610b1f57600080fd5b8435610b2a81610af4565b966020860135965060408601359560600135945092505050565b60008083601f840112610b5657600080fd5b50813567ffffffffffffffff811115610b6e57600080fd5b602083019150836020828501011115610b8657600080fd5b9250929050565b60008060008060608587031215610ba357600080fd5b8435610bae81610af4565b9350602085013567ffffffffffffffff811115610bca57600080fd5b610bd687828801610b44565b9598909750949560400135949350505050565b600060208284031215610bfb57600080fd5b8135610c0681610af4565b9392505050565b600080600060408486031215610c2257600080fd5b8335610c2d81610af4565b9250602084013567ffffffffffffffff811115610c4957600080fd5b610c5586828701610b44565b9497909650939450505050565b60008060008060608587031215610c7857600080fd5b8435610c8381610af4565b935060208501359250604085013567ffffffffffffffff811115610ca657600080fd5b610cb287828801610b44565b95989497509550505050565b60008060008060008060808789031215610cd757600080fd5b863567ffffffffffffffff80821115610cef57600080fd5b9088019060a0828b031215610d0357600080fd5b90965060208801359080821115610d1957600080fd5b818901915089601f830112610d2d57600080fd5b813581811115610d3c57600080fd5b8a60208260051b8501011115610d5157600080fd5b602083019750809650506040890135915080821115610d6f57600080fd5b50610d7c89828a01610b44565b979a9699509497949695606090950135949350505050565b6020808252601690820152751d985b1a59081a5b9d9bda58d9481c995c5d5a5c995960521b604082015260600190565b600060208284031215610dd657600080fd5b8151610c0681610af4565b600060208284031215610df357600080fd5b5051919050565b6000825160005b81811015610e1b5760208186018101518583015201610e01565b506000920191825250919050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610e5257610e52610e29565b92915050565b80820180821115610e5257610e52610e29565b600082610e8857634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417610e5257610e52610e29565b6000808335601e19843603018112610ebb57600080fd5b83018035915067ffffffffffffffff821115610ed657600080fd5b602001915036819003821315610b8657600080fd5b6001600160a01b0387168152608060208201819052810185905260006001600160fb1b03861115610f1b57600080fd5b8560051b808860a0850137820182810360a090810160408501528101859052848660c0830137600060c0868301015260c0601f19601f870116820101915050826060830152979650505050505050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610f9557607f821691505b602082108103610fb557634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561100557600081815260208120601f850160051c81016020861015610fe25750805b601f850160051c820191505b8181101561100157828155600101610fee565b5050505b505050565b815167ffffffffffffffff81111561102457611024610f6b565b611038816110328454610f81565b84610fbb565b602080601f83116001811461106d57600084156110555750858301515b600019600386901b1c1916600185901b178555611001565b600085815260208120601f198616915b8281101561109c5788860151825594840194600190910190840161107d565b50858210156110ba5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220713416d276982b0d54153db209f5c894c2d4e0a91239a2b5797550116b81e4fb64736f6c63430008150033";

type MistInvoiceEscrowWrapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MistInvoiceEscrowWrapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MistInvoiceEscrowWrapper__factory extends ContractFactory {
  constructor(...args: MistInvoiceEscrowWrapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _invoiceFactory: AddressLike,
    _mistPool: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _invoiceFactory,
      _mistPool,
      overrides || {}
    );
  }
  override deploy(
    _invoiceFactory: AddressLike,
    _mistPool: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_invoiceFactory, _mistPool, overrides || {}) as Promise<
      MistInvoiceEscrowWrapper & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): MistInvoiceEscrowWrapper__factory {
    return super.connect(runner) as MistInvoiceEscrowWrapper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MistInvoiceEscrowWrapperInterface {
    return new Interface(_abi) as MistInvoiceEscrowWrapperInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MistInvoiceEscrowWrapper {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MistInvoiceEscrowWrapper;
  }
}