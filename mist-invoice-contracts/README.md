### Set-up:

1) create .env from the .env.example. You can just use the anvil first address and private key for these variables

2) `yarn fork` creates a sepolia fork

3) Open another terminal and `yarn deploy-local` to deploy MistEscrowInvoiceWrapper to the fork
 
4) **COPY THE MIST INVOICE ESCROW WRAPPER ADDRESS**, either from broadcast/ or also logged to the console, into `createMistInvoice.s.sol` line 25.

5) Run `yarn create-invoice` to call createInvoice on the wrapper. It's not connected to the sepolia factory atm so it will just return a zero address.

There is a new verified deployment of the SI factory on sepolia: 0xaE57F3689a23792649c597DD3B652b788f0414E4

It has the escrow type added, but not the instant type.