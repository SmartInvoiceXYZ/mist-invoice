// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MistInvoiceEscrowWrapper.sol";
import "forge-std/console.sol";

contract InvoiceCreationScript is Script {
    struct MistSecret {
        uint256 merkleRoot;
        uint256 providerHash;
        uint256 clientHash;
        bytes[] encData;
    }

    function getSepoliaDummyData() public view returns (bytes memory) {
        address _client = 0x1111111111111111111111111111111111111111;
        uint8 _resolverType = 1; // For simplicity
        address _resolver = 0x2222222222222222222222222222222222222222;
        address _token = 0x3333333333333333333333333333333333333333;
        uint256 _terminationTime = block.timestamp + 30 days;
        bytes32 _details = keccak256(
            abi.encodePacked("Details for mist invoice")
        );
        address _wrappedNativeToken = 0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa; // WETH on sepolia
        bool _requireVerification = true;

        address _factory = 0xaE57F3689a23792649c597DD3B652b788f0414E4; //sepolia factory

        return
            abi.encode(
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

    function getLineaDummyData() public view returns (bytes memory) {
        address _client = 0x1111111111111111111111111111111111111111;
        uint8 _resolverType = 1; // For simplicity
        address _resolver = 0x2222222222222222222222222222222222222222;
        address _token = 0x3333333333333333333333333333333333333333;
        uint256 _terminationTime = block.timestamp + 30 days;
        bytes32 _details = keccak256(
            abi.encodePacked("Details for mist invoice")
        );
        address _wrappedNativeToken = 0x2C1b868d6596a18e32E61B901E4060C872647b6C; // WETH on linea
        bool _requireVerification = true;

        address _factory = 0xa9c2372FdFA2ef145A0d13784C74DE96f0e3eaff; //linea factory

        return
            abi.encode(
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
        string memory network = vm.envString("NETWORK");

        bytes memory _data;

        if (keccak256(bytes(network)) == keccak256(bytes("sepolia"))) {
            _data = getSepoliaDummyData();
        } else if (keccak256(bytes(network)) == keccak256(bytes("linea"))) {
            _data = getLineaDummyData();
        } else {
            revert("Invalid network selection");
        }

        vm.startBroadcast(deployerPrivateKey);

        address mistWrapperDeployment = vm.envAddress(
            "MIST_INVOICE_ESCROW_WRAPPER"
        );
        MistInvoiceEscrowWrapper mistWrapper = MistInvoiceEscrowWrapper(
            mistWrapperDeployment
        );
        bytes[] memory encDataArray = new bytes[](1);
        encDataArray[0] = abi.encodePacked("dummyEncData");

        // Dummy data
        MistSecret memory _mistData = MistSecret({
            merkleRoot: uint256(keccak256(abi.encodePacked("dummyMerkleRoot"))),
            clientHash: uint256(
                keccak256(abi.encodePacked("dummyClientRandom"))
            ),
            providerHash: uint256(
                keccak256(abi.encodePacked("dummyProviderRandom"))
            ),
            encData: encDataArray
        });

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = 1000;

        bytes32 _type = bytes32("escrow");

        MistInvoiceEscrowWrapper.MistSecret
            memory mistDataForWrapper = MistInvoiceEscrowWrapper.MistSecret({
                merkleRoot: _mistData.merkleRoot,
                clientHash: _mistData.clientHash,
                providerHash: _mistData.providerHash,
                encData: _mistData.encData
            });

        address invoiceAddress = mistWrapper.createInvoice(
            mistDataForWrapper,
            _amounts,
            _data,
            _type
        );

        console.log("Mist Invoice Address: %s", invoiceAddress);

        vm.stopBroadcast();
    }
}
