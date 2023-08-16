// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../libraries/PoolStructs.sol";

interface IMISTPool {
    function getNonce(address account) external view returns (uint256);

    function getNullifyingKey() external pure returns (uint256);

    function deposit(DepositData calldata depositData, bytes calldata signature) external;

    function transfer(bytes calldata proof, bytes calldata inputs, ExtData calldata extData) external;

    function withdraw(bytes calldata proof, bytes calldata inputs, ExtData calldata extData) external;

    function verifyBalanceOf(
        address token,
        uint256 minAmount,
        uint256 root,
        uint256 registry,
        uint256[] memory nullifiers,
        bytes calldata proof
    ) external view returns (bool);
}
