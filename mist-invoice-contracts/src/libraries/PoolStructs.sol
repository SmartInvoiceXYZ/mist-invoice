// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

enum TransferType {
    Deposit,
    Withdrawal,
    Transfer
}

enum TokenStandard {
    ERC20,
    ERC721,
    ERC1155
}

struct TokenData {
    TokenStandard standard;
    address token;
    uint256 identifier;
    uint256 amount;
}

struct DepositData {
    uint256 nonce;
    address sender;
    PreCommitment[] preCommitments;
}

struct PreCommitment {
    uint256 receiverHash;
    bytes encryptedNote;
    TokenData tokenData;
}

struct ExtData {
    uint256 chainId;
    uint256 treeIndex;
    address account;
    TransferType transferType;
    TokenData tokenData;
}
