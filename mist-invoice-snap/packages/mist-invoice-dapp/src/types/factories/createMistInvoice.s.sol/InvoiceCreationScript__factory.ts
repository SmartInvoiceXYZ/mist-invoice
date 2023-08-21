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
  InvoiceCreationScript,
  InvoiceCreationScriptInterface,
} from "../../createMistInvoice.s.sol/InvoiceCreationScript";

const _abi = [
  {
    inputs: [],
    name: "IS_SCRIPT",
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
    name: "getLineaDummyData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSepoliaDummyData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "run",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260048054600160ff199182168117909255600c8054909116909117905534801561002d57600080fd5b50610cbf8061003d6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80634398af2d1461005157806398bb23081461006f578063c040622614610077578063f8ccbf4714610081575b600080fd5b61005961009e565b6040516100669190610a1b565b60405180910390f35b6100596101a5565b61007f61028f565b005b600c5461008e9060ff1681565b6040519015158152602001610066565b6060731111111111111111111111111111111111111111600173222222222222222222222222222222222222222273333333333333333333333333333333333333333360006100f04262278d00610a35565b90506000604051602001610122907744657461696c7320666f72206d69737420696e766f69636560401b815260180190565b60408051601f198184030181529082905280516020918201209250732c1b868d6596a18e32e61b901e4060c872647b6c9160019173a9c2372fdfa2ef145a0d13784c74de96f0e3eaff91610188918b918b918b918b918b918b918b918b918b9101610a5c565b604051602081830303815290604052995050505050505050505090565b6060731111111111111111111111111111111111111111600173222222222222222222222222222222222222222273333333333333333333333333333333333333333360006101f74262278d00610a35565b90506000604051602001610229907744657461696c7320666f72206d69737420696e766f69636560401b815260180190565b60408051601f19818403018152908290528051602091820120925073b16f35c0ae2912430dac15764477e179d9b9ebea9160019173ae57f3689a23792649c597dd3b652b788f0414e491610188918b918b918b918b918b918b918b918b918b9101610a5c565b60405163c1978d1f60e01b815260206004820152600b60248201526a505249564154455f4b455960a81b6044820152600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063c1978d1f90606401602060405180830381865afa1580156102fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103219190610aaf565b60405163350d56bf60e01b815260206004820152600a6024820152695055424c49435f4b455960b01b6044820152909150600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063350d56bf90606401602060405180830381865afa158015610391573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b59190610ac8565b60405163f877cb1960e01b81526020600482015260076024820152664e4554574f524b60c81b6044820152909150600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063f877cb1990606401600060405180830381865afa158015610422573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261044a9190810190610b07565b6040805180820190915260078152667365706f6c696160c81b6020918201528151908201209091506060907f1e0a720f4ae0cb0b7ca5456760f55d0d199de7354acdf84502c240c8d8f42c66016104aa576104a36101a5565b9050610547565b6040805180820190915260058152646c696e656160d81b6020918201528251908301207fd1c2299591365c99174d6c0c5a6fb980fbc5892fb6a9d8ade89124b75cf9d2ef016104fb576104a361009e565b60405162461bcd60e51b815260206004820152601960248201527f496e76616c6964206e6574776f726b2073656c656374696f6e00000000000000604482015260640160405180910390fd5b60405163ce817d4760e01b815260048101859052737109709ecfa91a80626ff3989d68f67f5b1dd12d9063ce817d4790602401600060405180830381600087803b15801561059457600080fd5b505af11580156105a8573d6000803e3d6000fd5b505060405163350d56bf60e01b815260206004820152601b60248201527f4d4953545f494e564f4943455f455343524f575f575241505045520000000000604482015260009250737109709ecfa91a80626ff3989d68f67f5b1dd12d915063350d56bf90606401602060405180830381865afa15801561062c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106509190610ac8565b6040805160a0810182526e191d5b5b5e53595c9adb19549bdbdd608a1b60c0820152815160af81830301815260cf820183528051602091820120825291517064756d6d79436c69656e7452616e646f6d60781b8184015292935083926000928201906031016040516020818303038152906040528051906020012081526020016040516020016106f9907264756d6d7950726f766964657252616e646f6d60681b815260130190565b604051602081830303815290604052805190602001208152602001604051602001610738906d64756d6d79436c69656e744b657960901b8152600e0190565b604051602081830303815290604052805190602001208152602001604051602001610779906f64756d6d7950726f76696465724b657960801b815260100190565b60408051601f19818403018152918152815160209283012090925281516001808252818401909352929350600092919082810190803683370190505090506103e8816000815181106107cd576107cd610bb4565b602002602001018181525050600065657363726f7760d01b905060006040518060a0016040528085600001518152602001856020015181526020018560400151815260200185606001518152602001856080015181525090506000856001600160a01b03166358072b0b83868b876040518563ffffffff1660e01b815260040161085a9493929190610bca565b6020604051808303816000875af1158015610879573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089d9190610ac8565b90506108de6040518060400160405280601881526020017f4d69737420496e766f69636520416464726573733a202573000000000000000081525082610961565b7f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b03166376eadd366040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561093c57600080fd5b505af1158015610950573d6000803e3d6000fd5b505050505050505050505050505050565b6109a68282604051602401610977929190610c5f565b60408051601f198184030181529190526020810180516001600160e01b031663319af33360e01b1790526109aa565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60005b838110156109e65781810151838201526020016109ce565b50506000910152565b60008151808452610a078160208601602086016109cb565b601f01601f19169290920160200192915050565b602081526000610a2e60208301846109ef565b9392505050565b80820180821115610a5657634e487b7160e01b600052601160045260246000fd5b92915050565b6001600160a01b03998a16815260ff98909816602089015295881660408801529387166060870152608086019290925260a0850152841660c0840152151560e08301529091166101008201526101200190565b600060208284031215610ac157600080fd5b5051919050565b600060208284031215610ada57600080fd5b81516001600160a01b0381168114610a2e57600080fd5b634e487b7160e01b600052604160045260246000fd5b600060208284031215610b1957600080fd5b815167ffffffffffffffff80821115610b3157600080fd5b818401915084601f830112610b4557600080fd5b815181811115610b5757610b57610af1565b604051601f8201601f19908116603f01168101908382118183101715610b7f57610b7f610af1565b81604052828152876020848701011115610b9857600080fd5b610ba98360208301602088016109cb565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b600061010080830187518452602080890151818601526040890151604086015260608901516060860152608089015160808601528260a0860152819250875180835261012086019350818901925060005b81811015610c3757835185529382019392820192600101610c1b565b5050505082810360c0840152610c4d81866109ef565b9150508260e083015295945050505050565b604081526000610c7260408301856109ef565b905060018060a01b0383166020830152939250505056fea26469706673582212208bd0d8c098a4b96ce35ac723181f56a84dcefd40debbb0ace9277c064c80a90864736f6c63430008150033";

type InvoiceCreationScriptConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InvoiceCreationScriptConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InvoiceCreationScript__factory extends ContractFactory {
  constructor(...args: InvoiceCreationScriptConstructorParams) {
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
      InvoiceCreationScript & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): InvoiceCreationScript__factory {
    return super.connect(runner) as InvoiceCreationScript__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InvoiceCreationScriptInterface {
    return new Interface(_abi) as InvoiceCreationScriptInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): InvoiceCreationScript {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as InvoiceCreationScript;
  }
}