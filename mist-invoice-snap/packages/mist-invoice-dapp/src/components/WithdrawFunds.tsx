import {
  Button,
  Heading,
  Link,
  Text,
  // useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { formatUnits, Transaction } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import { Web3Context } from '../context/Web3Context';
import {
  Chain,
  ChainId,
  getHexChainId,
  getTokenInfo,
  getTxLink,
  logError,
  TokenData,
  withdraw,
} from '../utils';
import { InvoiceResult } from '@/graphql/subgraph';

export type WithdrawFundsProps = {
  invoice: InvoiceResult;
  balance: bigint;
  close: () => void;
  tokenData: Record<ChainId, Record<string, TokenData>>;
};

export const WithdrawFunds: React.FC<WithdrawFundsProps> = ({
  invoice,
  balance,
  close,
  tokenData,
}) => {
  const [loading, setLoading] = useState(false);
  const { chainId, provider } = useContext(Web3Context);
  const { network, address, token } = invoice;

  const [transaction, setTransaction] = useState<Transaction>();

  const [tokenInfo, setTokenInfo] = useState({ decimals: 0, symbol: '' });

  useEffect(() => {
    if (chainId && token) {
      if (tokenData) {
        setTokenInfo(getTokenInfo(chainId, token, tokenData));
      }
    }
  }, [chainId, token, tokenData]);

  const [buttonSize, setButtonSize] = useState<'md' | 'lg'>('md');
  // const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  useEffect(() => {
    const send = async () => {
      if (!loading && provider && balance >= 0) {
        try {
          setLoading(true);
          const tx = await withdraw(provider, address);
          setTransaction(tx);
          await tx.wait();
          window.location.href = `/invoice/${getHexChainId(
            network as Chain,
          )}/${address}`;
          setLoading(false);
        } catch (withdrawError) {
          close();
          logError({ withdrawError });
        }
      }
    };
    send();
  }, [network, balance, address, provider, loading, close]);

  return (
    <VStack w="100%" spacing="1rem">
      <Heading
        fontWeight="normal"
        mb="1rem"
        textTransform="uppercase"
        textAlign="center"
      >
        Withdraw Funds
      </Heading>
      <Text textAlign="center" fontSize="sm" mb="1rem">
        Follow the instructions in your wallet to withdraw remaining funds from
        the escrow.
      </Text>
      <VStack my="2rem" px="5rem" py="1rem" bg="black" borderRadius="0.5rem">
        <Text color="red.500" fontSize="0.875rem" textAlign="center">
          Amount To Be Withdrawn
        </Text>
        <Text
          color="white"
          fontSize="1rem"
          fontWeight="bold"
          textAlign="center"
        >{`${formatUnits(balance, tokenInfo.decimals)} ${
          tokenInfo.symbol
        }`}</Text>
      </VStack>
      {chainId && transaction?.hash && (
        <Text color="white" textAlign="center" fontSize="sm">
          Follow your transaction{' '}
          <Link
            href={getTxLink(chainId, transaction.hash)}
            isExternal
            color="red.500"
            textDecoration="underline"
          >
            here
          </Link>
        </Text>
      )}
      <Button
        onClick={close}
        variant="outline"
        colorScheme="red"
        textTransform="uppercase"
        size={buttonSize}
        fontFamily="mono"
        fontWeight="normal"
        w="100%"
      >
        Close
      </Button>
    </VStack>
  );
};
