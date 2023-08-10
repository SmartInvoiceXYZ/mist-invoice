// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MistInvoiceEscrow.sol";

contract DeployScript is Script {
    function run() external {
        //read env variables and choose EOA for transaction signing
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // deploy diamond
        MistInvoiceEscrow diamond = new MistInvoiceEscrow(0x976EA74026E726554dB657fA54763abd0C3a0aa9, 0x976EA74026E726554dB657fA54763abd0C3a0aa9);

        vm.stopBroadcast();
    }
}
