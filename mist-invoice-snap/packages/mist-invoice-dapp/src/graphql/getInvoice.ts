import { gql } from 'urql';
import { ChainId } from '../utils';
import { isAddress } from '../utils/helpers';
import { clients } from './client';
import { InvoiceDetails } from './fragments';
import { InvoiceResult } from './subgraph';

const invoiceQuery = gql`
  query GetInvoice($address: ID!) {
    invoice(id: $address) {
      ...InvoiceDetails
    }
  }
  ${InvoiceDetails}
`;

export const getInvoice = async (chainId: ChainId, queryAddress: string) => {
  const address = isAddress(queryAddress);
  if (!address) return null;
  const { data, error } = await clients[chainId]
    .query(invoiceQuery, { address })
    .toPromise();

  console.log({ data, error, address });

  if (!data) {
    if (error) {
      throw error;
    }
    return null;
  }

  return data.invoice as InvoiceResult;
};
