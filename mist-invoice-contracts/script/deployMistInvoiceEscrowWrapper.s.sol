// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MistInvoiceEscrowWrapper.sol";
import "forge-std/console.sol";

contract DeployScript is Script {
    function run() external {
        //read env variables and choose EOA for transaction signing
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        string memory network = vm.envString("NETWORK");

        address MIST_POOL;
        address SMART_INVOICE_FACTORY;

        if (keccak256(bytes(network)) == keccak256(bytes("sepolia"))) {
            MIST_POOL = vm.envAddress("SEPOLIA_MIST_POOL");
            SMART_INVOICE_FACTORY = vm.envAddress("SEPOLIA_SMART_INVOICE_FACTORY");
        } else if (keccak256(bytes(network)) == keccak256(bytes("linea"))) {
            MIST_POOL = vm.envAddress("LINEA_GOERLI_MIST_POOL");
            SMART_INVOICE_FACTORY = vm.envAddress("LINEA_GOERLI_SMART_INVOICE_FACTORY");
        } else {
            revert("Invalid network selection");
        }

        vm.startBroadcast(deployerPrivateKey);

        // deploy mist invoice escrow
        MistInvoiceEscrowWrapper mistWrapper = new MistInvoiceEscrowWrapper(SMART_INVOICE_FACTORY, MIST_POOL);

        console.log("MistInvoiceEscrowWrapper Address: %s", address(mistWrapper));

        vm.stopBroadcast();
    }
}
