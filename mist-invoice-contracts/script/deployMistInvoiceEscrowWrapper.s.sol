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
        // THIS IS THE SEPOLIA MIST POOL, NEEDS TO BE UPDATED TO LINEA-GOERLI
        address MIST_POOL = 0x6bA81b91c72755459CfdF3c5ad25eFe636DCd493;

        // verified
        address LINEA_GOERLI_SMART_INVOICE_FACTORY = 0xa9c2372FdFA2ef145A0d13784C74DE96f0e3eaff;

        // deploy mist invoice escrow
        MistInvoiceEscrowWrapper mistWrapper = new MistInvoiceEscrowWrapper(LINEA_GOERLI_SMART_INVOICE_FACTORY, MIST_POOL);

        console.log("MistInvoiceEscrowWrapper Address: %s", address(mistWrapper));

        vm.stopBroadcast();
    }
}
