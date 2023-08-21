import { Button, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { CreateContext } from '../context/CreateContext';
import { Web3Context } from '../context/Web3Context';
import { getInvoice } from '../graphql/getInvoice';
import { CopyIcon } from '../icons/CopyIcon';
import {
  copyToClipboard,
  getHexChainId,
  getTxLink,
  awaitInvoiceAddress,
  ChainId,
  Chain,
} from '../utils';
import { Loader } from './Loader';
import { InvoiceResult } from '@/graphql/subgraph';

const POLL_INTERVAL = 5000;

export const RegisterSuccess = () => {
  const { chainId, provider } = useContext(Web3Context);
  const { tx } = useContext(CreateContext);
  const [invoiceId, setInvoiceID] = useState<string>();
  const [invoice, setInvoice] = useState<InvoiceResult>();
  const router = useRouter();

  useEffect(() => {
    if (tx && provider) {
      awaitInvoiceAddress(provider, tx).then((id) => {
        setInvoiceID(id.toLowerCase());
      });
    }
  }, [tx, provider]);

  useEffect(() => {
    if (!chainId || !invoiceId || !isAddress(invoiceId) || !!invoice)
      return () => undefined;

    let isSubscribed = true;

    const interval = setInterval(() => {
      getInvoice(chainId as ChainId, invoiceId).then((inv) => {
        if (isSubscribed && !!inv) {
          setInvoice(inv);
        }
      });
    }, POLL_INTERVAL);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [chainId, invoiceId, invoice]);

  return (
    <VStack
      w="100%"
      spacing="1rem"
      align="center"
      justify="center"
      my="8rem"
      maxW="30rem"
      px="1rem"
    >
      <Heading fontWeight="bold" textAlign="center">
        {invoice ? 'Invoice Registered' : 'Invoice Registration Received'}
      </Heading>
      <Text color="black" textAlign="center" fontSize="sm">
        {invoice
          ? 'You can view your transaction '
          : 'You can check the progress of your transaction '}
        <Link
          href={chainId && tx?.hash ? getTxLink(chainId, tx.hash) : undefined}
          isExternal
          color="blue"
          textDecoration="underline"
        >
          here
        </Link>
      </Text>
      {invoice ? (
        <>
          <VStack w="100%" align="stretch">
            <Text fontWeight="bold">Your Invoice ID</Text>
            <Flex
              p="0.5rem"
              justify="space-between"
              align="center"
              bg="background"
              borderRadius="0.25rem"
              w="100%"
            >
              <Link
                ml="0.5rem"
                href={`/invoice/${getHexChainId(invoice.network as Chain)}/${
                  invoice.id
                }/${
                  // invoice.invoiceType === 'escrow' ?
                  ''
                  // : invoice.invoiceType
                }`}
                color="charcoal"
                overflow="hidden"
              >
                {invoice.id}
              </Link>
              {document.queryCommandSupported('copy') && (
                <Button
                  ml={4}
                  onClick={() => copyToClipboard(invoice.id)}
                  variant="ghost"
                  colorScheme="blue"
                  h="auto"
                  w="auto"
                  minW="2"
                  p={2}
                >
                  <CopyIcon boxSize={4} />
                </Button>
              )}
            </Flex>
          </VStack>
          <VStack w="100%" align="stretch" mb="1.5rem">
            <Text fontWeight="bold">Link to Invoice</Text>
            <Flex
              p="0.5rem"
              justify="space-between"
              align="center"
              bg="background"
              borderRadius="0.25rem"
              w="100%"
            >
              <Link
                ml="0.5rem"
                href={`/invoice/${getHexChainId(invoice.network as Chain)}/${
                  invoice.id
                }/${
                  // invoice.invoiceType === 'escrow' ?
                  ''
                  // : invoice.invoiceType
                }`}
                color="charcoal"
                overflow="hidden"
              >{`${window.location.origin}/invoice/${getHexChainId(
                invoice.network as Chain,
              )}/${invoice.id}/${
                // invoice.invoiceType === 'escrow' ?
                ''
                // : invoice.invoiceType
              }`}</Link>
              {document.queryCommandSupported('copy') && (
                <Button
                  ml={4}
                  onClick={() =>
                    copyToClipboard(
                      `${window.location.origin}/invoice/${getHexChainId(
                        invoice.network as Chain,
                      )}/${invoice.id}/${
                        // invoice.invoiceType === 'escrow' ?
                        ''
                        // : invoice.invoiceType
                      }`,
                    )
                  }
                  variant="ghost"
                  colorScheme="blue"
                  h="auto"
                  w="auto"
                  minW="2"
                  p={2}
                >
                  <CopyIcon boxSize={4} />
                </Button>
              )}
            </Flex>
          </VStack>
        </>
      ) : (
        <Flex py="3rem">
          <Loader size="80" />
        </Flex>
      )}
      <Button
        w="100%"
        _hover={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        _active={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        color="white"
        backgroundColor="blue.1"
        textTransform="uppercase"
        fontFamily="mono"
        fontWeight="bold"
        size="lg"
        onClick={() => router.push('/invoices')}
      >
        Return Home
      </Button>
    </VStack>
  );
};