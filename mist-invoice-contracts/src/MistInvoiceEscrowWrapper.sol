// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/ISmartInvoiceFactory.sol";
import "./interfaces/ISmartInvoiceEscrow.sol";
import "./interfaces/IMistPool.sol";
import "./interfaces/IERC20.sol";

contract MistInvoiceEscrowWrapper {
    uint256 constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 public constant CLIENT_SIGNAL = uint256(keccak256("client")) / SNARK_SCALAR_FIELD;
    uint256 public constant PROVIDER_SIGNAL = uint256(keccak256("provider")) / SNARK_SCALAR_FIELD;

    address public immutable INVOICE_FACTORY;
    IMISTPool public mistPool;

    mapping(address => MistSecret) mistSecrets;

    // TODO how many bytes?
    struct MistSecret {
        bytes32 merkleRoot; // contains client and provider addresses
        bytes32 providerHash;
        bytes32 clientHash;
        bytes encData; // symmetric key for encrypted invoice _details, client address and random, provider address and random
        bytes encClientKey;
        bytes encProviderKey;
    }

    constructor(address _invoiceFactory, address _mistPool) {
        INVOICE_FACTORY = _invoiceFactory;
        mistPool = IMISTPool(_mistPool);
    }

    function createInvoice(
        MistSecret calldata _mistData,
        uint256[] calldata _amounts,
        bytes calldata _data,
        bytes32 _type
    ) external returns (address invoice) {
        require(_mistData.merkleRoot.length != 0, "merkle root required");

        // create new invoice
        ISmartInvoiceFactory factory = ISmartInvoiceFactory(INVOICE_FACTORY);
        invoice = factory.create(address(this), _amounts, _data, _type);

        // add meta to mapping for invoice address
        mistSecrets[invoice] = _mistData;

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

    function _verify(bytes calldata _proof, bytes32 _root, bytes32 _signalHash, bytes32 _hash) internal pure {
        // TODO verify proof
    }
}
