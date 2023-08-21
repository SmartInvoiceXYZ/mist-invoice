import { SLIP10Node } from '@metamask/key-tree';
import { EdDSASigner } from '@usemist/sdk';
import { Json, OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    case 'eddsa_getScalarPubKey': {
      const edNode = await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "44'", "420'"],
          curve: 'ed25519',
        },
      })
      const eddsaSlip10Node = await SLIP10Node.fromJSON(edNode);
      const signer = new EdDSASigner(eddsaSlip10Node.privateKey as string);
      await signer.init();
      return signer.scalarPubKey;
    }
    case 'eddsa_signMessage': {
      const messageHash = (request.params as Record<string, Json>)['messageHash'];
      if (!messageHash) throw new Error('Message hash not found.');

      const edNode = await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "44'", "420'"],
          curve: 'ed25519',
        },
      })

      const eddsaSlip10Node = await SLIP10Node.fromJSON(edNode);
      const signer = new EdDSASigner(eddsaSlip10Node.privateKey as string);
      await signer.init();

      const result = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`${origin} is requesting you to sign the following message:`),
            text(`${messageHash}`),
          ]),
        },
      })

      if (!result) throw new Error('User rejected the request.');
      return await signer.signFormatted(messageHash as string);
    }
    default:
      throw new Error('Method not found.');
  }
};
