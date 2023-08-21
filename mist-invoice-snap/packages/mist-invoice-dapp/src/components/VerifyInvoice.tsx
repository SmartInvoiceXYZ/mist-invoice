import { Button, VStack } from '@chakra-ui/react';
import React, { useContext, useState, useEffect, useMemo } from 'react';

import { Web3Context } from '../context/Web3Context';
import { logError } from '../utils';
import { verify } from '../utils';

import { Spinner, Text } from '@chakra-ui/react';
import { InvoiceResult } from '@/graphql/subgraph';

export type VerifyInvoiceProps = {
  invoice: InvoiceResult;
  client: string;
  isClient: boolean;
  verifiedStatus: boolean;
  setVerifiedStatus: (status: boolean) => void;
};

export const VerifyInvoice: React.FC<VerifyInvoiceProps> = ({
  invoice,
  client,
  isClient,
  verifiedStatus,
  setVerifiedStatus,
}) => {
  const { provider } = useContext(Web3Context);
  const { address } = invoice;
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    let status = invoice.verified[0];
    if (status && status.client === client) {
      setVerifiedStatus(true);
    }
  }, [client, setVerifiedStatus, invoice.verified]);

  const verifyInvoice = async () => {
    try {
      if (!provider || !address) return;
      const tx = await verify(provider, address);
      setTransaction(tx);
      await tx.wait();
      provider.once(tx.hash, (transaction) => {
        if (transaction) setVerifiedStatus(true);
      });
    } catch (verifyError) {
      logError({ verifyError });
    }
  };

  return (
    <VStack w="100%" spacing="rem" alignItems="start">
      {verifiedStatus ? null : isClient ? (
        transaction ? (
          <Button
            size="xs"
            colorScheme="blue"
            variant="outline"
            fontWeight="bold"
            fontFamily="mono"
            textTransform="uppercase"
          >
            <Text>verifying...</Text>
            <Spinner ml="1" size="sm" />
          </Button>
        ) : (
          <Button
            size="xs"
            colorScheme="blue"
            fontWeight="normal"
            fontFamily="mono"
            textTransform="uppercase"
            onClick={() => verifyInvoice()}
          >
            <Text>Enable Non-Client Account Deposits</Text>
          </Button>
        )
      ) : null}
    </VStack>
  );
};
