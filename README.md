# 🕵 Private invoices by Smart Invoice and MIST

<p align="center">
// TODO 🔗 link to website
</p>

<p align="center">
<a href="https://github.com/geovgy">georgeh</a> · <a href="https://github.com/psparacino">Tufnel_Enterprises</a> · <a href="https://github.com/moconnell">mr_bluesky</a> · <a href="https://github.com/plor">plor</a>
</p>

## 📚 About

This project uses an alpha privacy tool called [MIST](https://github.com/ModularIncognitoSTack) to add privacy to crypto invoices created in [Smart Invoice](https://github.com/SmartInvoiceXYZ). The integration allows for both the client and the provider of a service to remain private but still receive payment for services. Smart Invoice is still used as normal for the escrow service, and the parties only need to provide proof to the arbitrator of proof of completion or failure to deliver without revealing their identities.

### 📼 Demo
// TODO youtube demo video

### 🎯 Bounties submitted for

- IYKYK Linea Edition
  - // TODO link to deployed smart contract on blockscout
- OH SNAP!
- Make a Dapp That Slaps, No Cap

## 🧰 Components

- Smart contract integrates MIST and Smart Invoice
- UI focused on the simple creation and payment of private invoices
- Metamask Snap manages alternate elliptic curve key for private signatures
- Deployed to the Linea Goerli testnet
  - Required deployment of MIST and Smart Invoice on this network

## 🔧 Set-up

1) create .env from the .env.example. You can just use the anvil first address and private key for these variables

2) `yarn fork` creates a sepolia fork

3) Open another terminal and `yarn deploy-local` to deploy MistEscrowInvoiceWrapper to the fork
 
4) **COPY THE MIST INVOICE ESCROW WRAPPER ADDRESS**, either from broadcast/ or also logged to the console, into `createMistInvoice.s.sol` line 25.

5) Run `yarn create-invoice` to call createInvoice on the wrapper. It's not connected to the sepolia factory atm so it will just return a zero address.

There is a new verified deployment of the SI factory on sepolia: 0xaE57F3689a23792649c597DD3B652b788f0414E4

It has the escrow type added, but not the instant type.

## 🚀 Future work

For the purposes of this hackathon we leave out the communication between the parties needed to coordinate payment and release of work. We also don't tackle the communication with the arbitrator and the necessity for that to be done in a private manner to avoid connecting the invoice to any identifying information. The team working on this contributes to the Smart Invoice project, so this might be worked into a privacy feature in the future. Lastly, much of the privacy technology is difficult to understand, so a great deal of education is needed to inform the user of how their privacy is protected and what steps they need to remain private.
