// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/ISmartInvoiceFactory.sol";
import "./interfaces/ISmartInvoiceEscrow.sol";
import "./interfaces/IMistPool.sol";
import "./interfaces/IERC20.sol";
import "./Verifier.sol";
import "./libraries/PoolStructs.sol";

contract MistInvoiceEscrowWrapper is Verifier {
    uint256 constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 public constant CLIENT_SIGNAL = uint256(keccak256("client")) % SNARK_SCALAR_FIELD;
    uint256 public constant PROVIDER_SIGNAL = uint256(keccak256("provider")) % SNARK_SCALAR_FIELD;

    address public immutable INVOICE_FACTORY;
    IMISTPool public mistPool;

    mapping(address => MistSecret) mistSecrets;

    enum ROLE {
        CLIENT,
        PROVIDER
    }

    // TODO how many bytes?
    struct MistSecret {
        uint256 merkleRoot; // contains client and provider addresses
        uint256 providerHash;
        uint256 clientHash;
        bytes[] encData; // abi.encode(tuple(string encryptedData, string encryptedSenderKey, string encryptedReceiverKey))
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
        require(_mistData.merkleRoot != 0, "merkle root required");

        // create new invoice
        ISmartInvoiceFactory factory = ISmartInvoiceFactory(INVOICE_FACTORY);
        invoice = factory.create(address(this), _amounts, _data, _type);

        // add meta to mapping for invoice address
        mistSecrets[invoice] = _mistData;

        // return invoice address
        return invoice;
    }

    // TODO is reentrency guard needed?
    function privateRelease(
        address _invoiceAddr,
        uint256 _milestone,
        uint256[4] calldata _digest,
        Proof calldata _proof
    ) external {
        require(_invoiceAddr != address(0), "invalid invoice required");
        // TODO verify proof
        require(
            verify(_proof, mistSecrets[_invoiceAddr].merkleRoot, _digest, CLIENT_SIGNAL),
            "invalid proof"
        );
        // TODO call release on _invoiceAddr
        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        IERC20 token = IERC20(escrow.token());
        // uint256 preBalance = token.balanceOf(address(this));
        uint256 currentMilestone = escrow.milestone();
        escrow.release(_milestone);
        // uint256 postBalance = token.balanceOf(address(this));
        // TODO save amount to provider data
        // uint256 providerOwed = postBalance - preBalance;
        // TODO deposit to MIST pool
        uint256 length = _milestone - currentMilestone + 1;
        PreCommitment[] memory preCommitments = new PreCommitment[](length);
        for (uint256 i = 0; i < length; i++) {
            preCommitments[i] = PreCommitment({
                receiverHash: mistSecrets[_invoiceAddr].providerHash,
                encryptedNote: mistSecrets[_invoiceAddr].encData[i + currentMilestone],
                tokenData: TokenData({
                    standard: TokenStandard.ERC20,
                    token: address(token),
                    identifier: 0,
                    amount: escrow.amounts()[i + currentMilestone]
                })
            });
        }
        DepositData memory depositData = DepositData({
            nonce: mistPool.getNonce(address(this)),
            sender: address(this),
            preCommitments: preCommitments
        });
        mistPool.deposit(depositData, bytes(""));
    }

    function privateDispute(
        address _invoiceAddr,
        bytes32 _details,
        uint256[4] calldata _digest,
        ROLE _role,
        Proof calldata _proof
    ) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        require(
            _role == ROLE.CLIENT || _role == ROLE.PROVIDER,
            "valid role required"
        );
        // TODO verify proof
        if (_role == ROLE.CLIENT) {
            require(
                verify(_proof, mistSecrets[_invoiceAddr].merkleRoot, _digest, CLIENT_SIGNAL),
                "invalid proof"
            );
        } else {
            require(
                verify(_proof, mistSecrets[_invoiceAddr].merkleRoot, _digest, PROVIDER_SIGNAL),
                "invalid proof"
            );
        }
        // TODO call lock on _invoiceAddr
        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        escrow.lock(_details);
    }

    // TODO other resolve arguments needed
    function resolve(
        address _invoiceAddr,
        uint256 _clientAward,
        uint256 _providerAward,
        bytes32 _details,
        bytes[2] calldata _encNotes
    ) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        require(
            _encNotes[0].length > 0 && _encNotes[1].length > 0,
            "encrypted notes required"
        );
        // TODO calculate client, provider, arb splits; update mappings
        ISmartInvoiceEscrow escrow = ISmartInvoiceEscrow(_invoiceAddr);
        IERC20 token = IERC20(escrow.token());
        uint256 preBalance = token.balanceOf(address(this));
        // TODO call invoice resolve
        _invoiceAddr.delegatecall(
            abi.encodeWithSelector(
                ISmartInvoiceEscrow.resolve.selector,
                _clientAward,
                _providerAward,
                _details
            )
        );
        uint256 postBalance = token.balanceOf(address(this));
        // TODO save amount to provider data
        // uint256 totalOwed = postBalance - preBalance;
        uint256 forClient = (_clientAward / (_clientAward + _providerAward)) * (postBalance - preBalance);
        uint256 forProvider = (_providerAward / (_clientAward + _providerAward)) * (postBalance - preBalance);
        // TODO deposit to MIST pool for client + provider
        PreCommitment[] memory preCommitments = new PreCommitment[](2);
        preCommitments[0] = PreCommitment({
            receiverHash: mistSecrets[_invoiceAddr].clientHash,
            encryptedNote: _encNotes[0],
            tokenData: TokenData({
                standard: TokenStandard.ERC20,
                token: address(token),
                identifier: 0,
                amount: forClient
            })
        });
        preCommitments[1] = PreCommitment({
            receiverHash: mistSecrets[_invoiceAddr].providerHash,
            encryptedNote: _encNotes[1],
            tokenData: TokenData({
                standard: TokenStandard.ERC20,
                token: address(token),
                identifier: 0,
                amount: forProvider
            })
        });
        DepositData memory depositData = DepositData({
            nonce: mistPool.getNonce(address(this)),
            sender: address(this),
            preCommitments: preCommitments
        });
        mistPool.deposit(depositData, bytes(""));
    }

    // Only works for primary token, withdrawTokens is not implemented for hackathon
    function privateWithdraw(
        address _invoiceAddr,
        uint256[4] calldata _digest,
        Proof calldata _proof,
        bytes calldata _encNote
    ) external {
        require(_invoiceAddr != address(0), "valid invoice required");
        require(_encNote.length > 0, "encrypted note required");
        // TODO verify withdraw enabled
        // TODO verify proof of client
        require(
            verify(_proof, mistSecrets[_invoiceAddr].merkleRoot, _digest, CLIENT_SIGNAL),
            "invalid proof"
        );
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
        PreCommitment[] memory preCommitments = new PreCommitment[](1);
        preCommitments[0] = PreCommitment({
            receiverHash: mistSecrets[_invoiceAddr].clientHash,
            encryptedNote: _encNote,
            tokenData: TokenData({
                standard: TokenStandard.ERC20,
                token: address(token),
                identifier: 0,
                amount: owed
            })
        });
        DepositData memory depositData = DepositData({
            nonce: mistPool.getNonce(address(this)),
            sender: address(this),
            preCommitments: preCommitments
        });
        mistPool.deposit(depositData, bytes(""));
    }
}