// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ISmartInvoice.sol";

interface ISmartInvoiceEscrow is ISmartInvoice {

    // automatic getters
    function client() external returns (address);
    function provider() external returns (address);
    function resolver() external returns (address);

    function token() external returns (address);
    function amounts() external returns (uint256[] memory);
    function locked() external returns (bool);

    function milestone() external returns (uint256);
    function released() external returns (uint256);

    // callable functions
    function release() external;

    function release(uint256 _milestone) external;

    function releaseTokens(address _token) external;

    function withdraw() external;

    function withdrawTokens(address _token) external;

    function lock(bytes32 _details) external payable;

    function resolve(uint256 _clientAward, uint256 _providerAward, bytes32 _details) external;
}
