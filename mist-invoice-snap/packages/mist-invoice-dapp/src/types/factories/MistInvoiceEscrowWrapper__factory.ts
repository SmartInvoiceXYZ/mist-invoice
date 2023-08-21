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
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "clientRandom",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "providerRandom",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "clientKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "providerKey",
            type: "bytes32",
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
  "0x60a060405234801561001057600080fd5b5060405161107638038061107683398101604081905261002f91610073565b6001600160a01b03918216608052600080546001600160a01b031916919092161790556100a6565b80516001600160a01b038116811461006e57600080fd5b919050565b6000806040838503121561008657600080fd5b61008f83610057565b915061009d60208401610057565b90509250929050565b608051610faf6100c76000396000818160a701526106bc0152610faf6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806358072b0b1161005b57806358072b0b146101095780638b1c49d91461011c578063c05f0d871461012f578063f5afd7791461014257600080fd5b8063222002be1461008d5780633154b0de146100a2578063322dd8c5146100e557806338daa829146100f8575b600080fd5b6100a061009b366004610a12565b610155565b005b6100c97f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b6100a06100f3366004610a96565b6103cc565b6100a0610106366004610af2565b50565b6100c9610117366004610b16565b6105ad565b6100a061012a366004610bd9565b6107a7565b6100a061013d366004610c2e565b61097f565b6000546100c9906001600160a01b031681565b6001600160a01b0384166101845760405162461bcd60e51b815260040161017b90610c8a565b60405180910390fd5b60008490506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156101cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ef9190610cba565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610239573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025d9190610cd7565b604080516024810189905260448101889052606480820188905282518083039091018152608490910182526020810180516001600160e01b03166353e83e4160e11b17905290519192506001600160a01b038916916102bc9190610cf0565b600060405180830381855af49150503d80600081146102f7576040519150601f19603f3d011682016040523d82523d6000602084013e6102fc565b606091505b50506040516370a0823160e01b8152306004820152600091506001600160a01b038416906370a0823190602401602060405180830381865afa158015610346573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036a9190610cd7565b905060006103788383610d35565b9050600081610387898b610d4e565b610391908b610d61565b61039b9190610d83565b90506000826103aa8a8c610d4e565b6103b4908b610d61565b6103be9190610d83565b505050505050505050505050565b6001600160a01b0384166103f25760405162461bcd60e51b815260040161017b90610c8a565b60008490506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610439573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045d9190610cba565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa1580156104a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cb9190610cd7565b6040516337bdc99b60e01b8152600481018690529091506001600160a01b038416906337bdc99b90602401600060405180830381600087803b15801561051057600080fd5b505af1158015610524573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092506001600160a01b03851691506370a0823190602401602060405180830381865afa15801561056f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105939190610cd7565b905060006105a18383610d35565b50505050505050505050565b6000604080518189013560208201526bffffffffffffffffffffffff193060601b16918101919091526080880135605482015260009060740160405160208183030381529060405280519060200120905060008860200135308a606001356040516020016106409392919092835260609190911b6bffffffffffffffffffffffff19166020830152603482015260540190565b60408051601f1981840301815282825280516020918201209083018590529082018190526060808c0135908301526080808c013590830152915060009060a00160408051601f198184030181526080830182528c3583526020830186905282820185905260608301819052905163fc2b2c5b60e01b81529092507f0000000000000000000000000000000000000000000000000000000000000000906001600160a01b0382169063fc2b2c5b906107059030908f908f908f908f908f90600401610d9a565b6020604051808303816000875af1158015610724573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107489190610cba565b6001600160a01b0381166000908152600160208181526040928390208651815590860151918101919091559084015160028201556060840151919750839160038201906107959082610eb9565b50505050505050509695505050505050565b6001600160a01b0383166107cd5760405162461bcd60e51b815260040161017b90610c8a565b60008390506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b81526004016020604051808303816000875af1158015610814573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108389190610cba565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610882573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a69190610cd7565b9050826001600160a01b0316633ccfd60b6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156108e357600080fd5b505af11580156108f7573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092506001600160a01b03851691506370a0823190602401602060405180830381865afa158015610942573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109669190610cd7565b905060006109748383610d35565b505050505050505050565b6001600160a01b0384166109a55760405162461bcd60e51b815260040161017b90610c8a565b6040516301670ba960e01b81526004810184905284906001600160a01b038216906301670ba990602401600060405180830381600087803b1580156109e957600080fd5b505af1158015610974573d6000803e3d6000fd5b6001600160a01b038116811461010657600080fd5b60008060008060808587031215610a2857600080fd5b8435610a33816109fd565b966020860135965060408601359560600135945092505050565b60008083601f840112610a5f57600080fd5b50813567ffffffffffffffff811115610a7757600080fd5b602083019150836020828501011115610a8f57600080fd5b9250929050565b60008060008060608587031215610aac57600080fd5b8435610ab7816109fd565b9350602085013567ffffffffffffffff811115610ad357600080fd5b610adf87828801610a4d565b9598909750949560400135949350505050565b600060208284031215610b0457600080fd5b8135610b0f816109fd565b9392505050565b600080600080600080868803610100811215610b3157600080fd5b60a0811215610b3f57600080fd5b5086955060a087013567ffffffffffffffff80821115610b5e57600080fd5b818901915089601f830112610b7257600080fd5b813581811115610b8157600080fd5b8a60208260051b8501011115610b9657600080fd5b6020830197508096505060c0890135915080821115610bb457600080fd5b50610bc189828a01610a4d565b979a969950949794969560e090950135949350505050565b600080600060408486031215610bee57600080fd5b8335610bf9816109fd565b9250602084013567ffffffffffffffff811115610c1557600080fd5b610c2186828701610a4d565b9497909650939450505050565b60008060008060608587031215610c4457600080fd5b8435610c4f816109fd565b935060208501359250604085013567ffffffffffffffff811115610c7257600080fd5b610c7e87828801610a4d565b95989497509550505050565b6020808252601690820152751d985b1a59081a5b9d9bda58d9481c995c5d5a5c995960521b604082015260600190565b600060208284031215610ccc57600080fd5b8151610b0f816109fd565b600060208284031215610ce957600080fd5b5051919050565b6000825160005b81811015610d115760208186018101518583015201610cf7565b506000920191825250919050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610d4857610d48610d1f565b92915050565b80820180821115610d4857610d48610d1f565b600082610d7e57634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417610d4857610d48610d1f565b6001600160a01b0387168152608060208201819052810185905260006001600160fb1b03861115610dca57600080fd5b8560051b808860a0850137820182810360a090810160408501528101859052848660c0830137600060c0868301015260c0601f19601f870116820101915050826060830152979650505050505050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610e4457607f821691505b602082108103610e6457634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610eb457600081815260208120601f850160051c81016020861015610e915750805b601f850160051c820191505b81811015610eb057828155600101610e9d565b5050505b505050565b815167ffffffffffffffff811115610ed357610ed3610e1a565b610ee781610ee18454610e30565b84610e6a565b602080601f831160018114610f1c5760008415610f045750858301515b600019600386901b1c1916600185901b178555610eb0565b600085815260208120601f198616915b82811015610f4b57888601518255948401946001909101908401610f2c565b5085821015610f695787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220b7e29ffedfc1135c38355f227b50778ebb0df7068c2f036a0008886484b01bfa64736f6c63430008150033";

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