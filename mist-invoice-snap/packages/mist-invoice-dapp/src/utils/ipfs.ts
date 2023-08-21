import { create } from 'ipfs-http-client';

import { INVOICE_VERSION, INFURA_AUTH } from './constants';

const ipfsTheGraph = create({
  protocol: 'https',
  host: 'api.thegraph.com',
  port: 443,
  apiPath: '/ipfs/api/v0/',
});

const ipfsInfura = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: INFURA_AUTH,
  },
});

// type Metadata = {
//   projectName: string;
//   projectDescription: string;
//   projectAgreement: string;
//   startDate: number; // seconds since epoch
//   endDate: number; // seconds since epoch
//   version: string; // to differentiating versions of smart-invoice contract/json structure
// }

export const uploadMetadata = async <T>(meta: T) => {
  const metadata = { ...meta, version: INVOICE_VERSION };
  const objectString = JSON.stringify(metadata);
  const bufferedString = Buffer.from(objectString);
  const [node] = await Promise.all([
    ipfsTheGraph.add(bufferedString),
    ipfsInfura.add(bufferedString), // automatically pinned
  ]);
  const { cid } = node;
  await ipfsTheGraph.pin.add(cid);
  return cid.toString();
};

export const uploadDisputeDetails = async <T>(meta: T) => {
  const metadata = { ...meta, version: INVOICE_VERSION };
  const objectString = JSON.stringify(metadata);
  const bufferedString = Buffer.from(objectString);
  const [node] = await Promise.all([
    ipfsTheGraph.add(bufferedString),
    ipfsInfura.add(bufferedString), // automatically pinned
  ]);
  const { cid } = node;
  await ipfsTheGraph.pin.add(cid);
  return cid.toString();
};
