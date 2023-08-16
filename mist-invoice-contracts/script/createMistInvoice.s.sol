// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MistInvoiceEscrowWrapper.sol";
import "forge-std/console.sol";

contract InvoiceCreationScript is Script {
    struct MistData {
        bytes32 merkleRoot;
        bytes32 clientRandom;
        bytes32 providerRandom;
        bytes32 clientKey;
        bytes32 providerKey;
    }

    function getDummyData() public view returns (bytes memory) {
        address _client = 0x1111111111111111111111111111111111111111;
        uint8 _resolverType = 1; // For simplicity
        address _resolver = 0x2222222222222222222222222222222222222222;
        address _token = 0x3333333333333333333333333333333333333333;
        uint256 _terminationTime = block.timestamp + 30 days;
        bytes32 _details = keccak256(abi.encodePacked("Details for mist invoice"));
        address _wrappedNativeToken = 0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa; // WETH on sepolia
        bool _requireVerification = true;

        address _factory = 0xaE57F3689a23792649c597DD3B652b788f0414E4; //sepolia factory

        return abi.encode(
            _client,
            _resolverType,
            _resolver,
            _token,
            _terminationTime,
            _details,
            _wrappedNativeToken,
            _requireVerification,
            _factory
        );
    }

    function run() external {
        // Read environment variables and select EOA for transaction signing
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // THIS IS THE SEPOLIA MIST POOL, NEEDS TO BE UPDATED TO LINEA-GOERLI
        MistInvoiceEscrowWrapper mistWrapper = MistInvoiceEscrowWrapper(0xd26ffB5e404F5Dc3bF07d9c214957b2731E8EB9b);

        // Dummy data
        MistData memory _mistData = MistData({
            merkleRoot: keccak256(abi.encodePacked("dummyMerkleRoot")),
            clientRandom: keccak256(abi.encodePacked("dummyClientRandom")),
            providerRandom: keccak256(abi.encodePacked("dummyProviderRandom")),
            clientKey: keccak256(abi.encodePacked("dummyClientKey")),
            providerKey: keccak256(abi.encodePacked("dummyProviderKey"))
        });

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = 1000;

        bytes memory _data = getDummyData();

        bytes32 _type = bytes32("escrow");

        MistInvoiceEscrowWrapper.MistData memory mistDataForWrapper = MistInvoiceEscrowWrapper.MistData({
            merkleRoot: _mistData.merkleRoot,
            clientRandom: _mistData.clientRandom,
            providerRandom: _mistData.providerRandom,
            clientKey: _mistData.clientKey,
            providerKey: _mistData.providerKey
        });

        address invoiceAddress = mistWrapper.createInvoice(mistDataForWrapper, _amounts, _data, _type);

        console.log("Mist Invoice Address: %s", invoiceAddress);

        vm.stopBroadcast();
    }
}
