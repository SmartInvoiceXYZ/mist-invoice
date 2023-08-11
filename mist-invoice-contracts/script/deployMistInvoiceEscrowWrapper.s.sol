// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MistInvoiceEscrowWrapper.sol";
import "forge-std/console.sol";

contract DeployScript is Script {
    function run() external {
        //read env variables and choose EOA for transaction signing
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        address MIST_POOL = 0x6bA81b91c72755459CfdF3c5ad25eFe636DCd493;

        // verified
        address SEPOLIA_SMART_INVOICE_FACTORY = 0xaE57F3689a23792649c597DD3B652b788f0414E4;

        // deploy mist invoice escrow
        MistInvoiceEscrowWrapper mistWrapper = new MistInvoiceEscrowWrapper(SEPOLIA_SMART_INVOICE_FACTORY, MIST_POOL);

        console.log("MistInvoiceEscrowWrapper Address: %s", address(mistWrapper));

        vm.stopBroadcast();
    }
}
