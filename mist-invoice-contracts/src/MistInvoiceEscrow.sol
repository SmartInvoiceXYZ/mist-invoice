// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/ISmartInvoiceFactory.sol";
import "./interfaces/IMistPool.sol";

contract MistInvoiceEscrow {
    address public immutable INVOICE_FACTORY;
    IMISTPool public mistPool = IMISTPool(0x6bA81b91c72755459CfdF3c5ad25eFe636DCd493);

    mapping(address => MistSecret) mistSecrets;

    // TODO how many bytes?
    struct MistSecret {
        bytes merkleRoot;
        bytes encClientRandInt;
        bytes encProviderRandInt;
        bytes encClientKey;
        bytes encProviderKey;
    }

    constructor(address _invoiceFactory, address _mistPool) {
        INVOICE_FACTORY = _invoiceFactory;
        mistPool = IMISTPool(_mistPool);
    }

    function createInvoice(
        bytes calldata _merkleRoot,
        bytes calldata _clientRandom,
        bytes calldata _providerRandom,
        bytes calldata _clientKey,
        bytes calldata _providerKey,
        uint256[] calldata _amounts,
        bytes calldata _data
    ) external returns (address invoice) {
        require(_merkleRoot.length != 0, "merkle root required");
        // TODO check other inputs

        // TODO set tracking for client and provider
        MistSecret memory meta = MistSecret(_merkleRoot, _clientRandom, _providerRandom, _clientKey, _providerKey);
        // TODO call factory.createInvoice
        ISmartInvoiceFactory factory = ISmartInvoiceFactory(INVOICE_FACTORY);
        // TODO add meta to mapping for invoice address

        // TODO return invoice address
    }

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
