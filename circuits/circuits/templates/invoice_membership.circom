pragma circom 2.1.2;

include "./eff_ecdsa_membership/eff_ecdsa.circom";
include "./eff_ecdsa_membership/tree.circom";
include "./eff_ecdsa_membership/to_address/zk-identity/eth.circom";
include "./poseidon/poseidon.circom";

/**
 *  InvoiceMembership
 *  ==============
 *  
 *  A modified version of AddrMembership from spartan-ecdsa that
 *  hashes the address and an external signal as the leaf.
 */
template InvoiceMembership(nLevels) {
    signal input s;
    signal input root;
    signal input Tx; 
    signal input Ty; 
    signal input Ux;
    signal input Uy;
    signal input pathIndices[nLevels];
    signal input siblings[nLevels];
    signal input signalHash;

    component effEcdsa = EfficientECDSA();
    effEcdsa.Tx <== Tx;
    effEcdsa.Ty <== Ty;
    effEcdsa.Ux <== Ux;
    effEcdsa.Uy <== Uy;
    effEcdsa.s <== s;

    component pubKeyXBits = Num2Bits(256);
    pubKeyXBits.in <== effEcdsa.pubKeyX;

    component pubKeyYBits = Num2Bits(256);
    pubKeyYBits.in <== effEcdsa.pubKeyY;

    component pubToAddr = PubkeyToAddress();

    for (var i = 0; i < 256; i++) {
        pubToAddr.pubkeyBits[i] <== pubKeyYBits.out[i];
        pubToAddr.pubkeyBits[i + 256] <== pubKeyXBits.out[i];
    }

    component merkleProof = MerkleTreeInclusionProof(nLevels);
    component leafHash = Poseidon();

    leafHash.inputs[0] <== pubToAddr.address;
    leafHash.inputs[1] <== signalHash;

    merkleProof.leaf <== leafHash.out;

    for (var i = 0; i < nLevels; i++) {
        merkleProof.pathIndices[i] <== pathIndices[i];
        merkleProof.siblings[i] <== siblings[i];
    }

    root === merkleProof.root;
}