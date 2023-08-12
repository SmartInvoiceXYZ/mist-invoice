// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/ISmartInvoiceFactory.sol";
import "./interfaces/IMistPool.sol";

contract MistInvoiceEscrowWrapper {
    address public immutable INVOICE_FACTORY;
    IMISTPool public mistPool;

    mapping(address => MistSecret) mistSecrets;

    // TODO how many bytes?
    struct MistSecret {
        bytes merkleRoot;
        bytes encClientRandInt;
        bytes encProviderRandInt;
        bytes encClientKey;
        bytes encProviderKey;
    }

    struct MistData {
        bytes merkleRoot;
        bytes clientRandom;
        bytes providerRandom;
        bytes clientKey;
        bytes providerKey;
    }

    constructor(address _invoiceFactory, address _mistPool) {
        INVOICE_FACTORY = _invoiceFactory;
        mistPool = IMISTPool(_mistPool);
    }

    function createInvoice(MistData calldata _mistData, uint256[] calldata _amounts, bytes calldata _data, bytes32 _type)
        external
        returns (address invoice)
    {
        require(_mistData.merkleRoot.length != 0, "merkle root required");
        // TODO check other inputs

        // TODO set tracking for client and provider
        MistSecret memory meta = MistSecret(
            _mistData.merkleRoot,
            _mistData.clientRandom,
            _mistData.providerRandom,
            _mistData.clientKey,
            _mistData.providerKey
        );
        
        // create new invoice
        ISmartInvoiceFactory factory = ISmartInvoiceFactory(INVOICE_FACTORY);
        invoice = factory.create(address(mistPool), _amounts, _data, _type);
        // add meta to mapping for invoice address
        mistSecrets[invoice] = meta;

        // return invoice address
        return invoice;
    }

    // maybe don't need wrapper
    function privateDeposit(address _invoiceAddr) external {
        // TODO call MIST withdraw()
        // TODO call transfer to _invoiceAddr
    }

    function privateRelease(address _invoiceAddr, bytes calldata _proof, uint256 _milestone) external {
        // TODO verify proof
        // TODO call release on _invoiceAddr
        // TODO save amount to provider data
        // TODO deposit to MIST pool
    }

    function privateDispute(address _invoiceAddr, bytes calldata _proof) external {
        // TODO verify proof
        // TODO call lock on _invoiceAddr
    }

    // TODO other resolve arguments needed
    function resolve(address _invoiceAddr) external {
        // TODO check arbitration address msg.sender
        // TODO calculate client, provider, arb splits; update mappings
        // TODO call invoice resolve
        // TODO transfer arb fee directly to arb
        // TODO deposit to MIST pool for client + provider
    }

    function privateWithdraw(address _invoiceAddr, bytes calldata _proof) external {
        // TODO verify withdraw enabled
        // TODO verify proof of client
        // TODO call withdraw on invoice
        // TODO update mapping
        // TODO call deposit on MIST pool
    }
}
