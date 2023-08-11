// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MistInvoiceEscrowWrapper.sol";
import "forge-std/console.sol";

contract InvoiceCreationScript is Script {
    struct MistData {
        bytes merkleRoot;
        bytes clientRandom;
        bytes providerRandom;
        bytes clientKey;
        bytes providerKey;
    }

    function run() external {
        // Read environment variables and select EOA for transaction signing
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // COPY FORK DEPLOYMENT HERE
        MistInvoiceEscrowWrapper mistWrapper = MistInvoiceEscrowWrapper(0xda430a73106D31120Ec5128Bb1008bcd00d25A9C);

        // Dummy data
        MistData memory _mistData = MistData(
            bytes("dummyMerkleRoot"),
            bytes("dummyClientRandom"),
            bytes("dummyProviderRandom"),
            bytes("dummyClientKey"),
            bytes("dummyProviderKey")
        );
        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = 1000;
        bytes memory _data = bytes("dummyData");

        MistInvoiceEscrowWrapper.MistData memory mistDataForWrapper = MistInvoiceEscrowWrapper.MistData({
            merkleRoot: _mistData.merkleRoot,
            clientRandom: _mistData.clientRandom,
            providerRandom: _mistData.providerRandom,
            clientKey: _mistData.clientKey,
            providerKey: _mistData.providerKey
        });

        address invoiceAddress = mistWrapper.createInvoice(mistDataForWrapper, _amounts, _data);

        console.log("Mist Invoice Address: %s", invoiceAddress);

   
        vm.stopBroadcast();
    }
}
