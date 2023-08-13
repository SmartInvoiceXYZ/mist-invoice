// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/ISmartInvoiceFactory.sol";
import "./interfaces/ISmartInvoiceEscrow.sol";
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

    // TODO is reentrency guard needed?
    function privateRelease(address _invoiceAddr, bytes calldata _proof, uint256 _milestone) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        // TODO verify proof
        // TODO call release on _invoiceAddr
        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        IERC20 token = IERC20(escrow.token());
        uint256 preBalance = token.balanceOf(address(this));
        escrow.release(_milestone);
        uint256 postBalance = token.balanceOf(address(this));
        // TODO save amount to provider data
        uint256 providerOwed = postBalance - preBalance;
        // TODO deposit to MIST pool
    }

    function privateDispute(address _invoiceAddr, bytes32 _details, bytes calldata _proof) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        // TODO verify proof
        // TODO call lock on _invoiceAddr
        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        escrow.lock(_details);
    }

    // TODO other resolve arguments needed
    function resolve(address _invoiceAddr, uint256 _clientAward, uint256 _providerAward, bytes32 _details) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        // TODO check arbitration address msg.sender
        // TODO calculate client, provider, arb splits; update mappings
        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        IERC20 token = IERC20(escrow.token());
        uint256 preBalance = token.balanceOf(address(this));
        // TODO call invoice resolve
        _invoiceAddr.delegatecall(
            abi.encodeWithSelector(ISmartInvoiceEscrow.resolve.selector, _clientAward, _providerAward, _details)
        );
        uint256 postBalance = token.balanceOf(address(this));
        // TODO save amount to provider data
        uint256 totalOwed = postBalance - preBalance;
        uint256 forClient = _clientAward / (_clientAward + _providerAward) * totalOwed;
        uint256 forProvider = _providerAward / (_clientAward + _providerAward) * totalOwed;
        // TODO deposit to MIST pool for client + provider
        // mistPool.deposit(forClient)
        // mistPool.deposit(forProvider)
    }

    // Only works for primary token, withdrawTokens is not implemented for hackathon
    function privateWithdraw(address _invoiceAddr, bytes calldata _proof) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        // TODO verify withdraw enabled
        // TODO verify proof of client
        // TODO call withdraw on invoice

        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        IERC20 token = IERC20(escrow.token());
        uint256 preBalance = token.balanceOf(address(this));
        escrow.withdraw();
        uint256 postBalance = token.balanceOf(address(this));
        uint256 owed = postBalance - preBalance;
        // TODO update mapping
        // TODO call deposit on MIST pool
        // mistPool.deposit(owed)
    }

}
