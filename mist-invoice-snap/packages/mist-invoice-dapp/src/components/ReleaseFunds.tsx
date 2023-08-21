import {
  Button,
  Heading,
  Link,
  Text,
  Tooltip,
  Flex,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { Transaction, formatUnits } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import { Web3Context } from '../context/Web3Context';
import { QuestionIcon } from '../icons/QuestionIcon';
import {
  getHexChainId,
  getTokenInfo,
  getTxLink,
  logError,
} from '../utils/helpers';
import { release } from '../utils/invoice';

const getReleaseAmount = (
  currentMilestone: number,
  amounts: bigint[],
  balance: bigint,
) => {
  if (
    currentMilestone >= amounts.length ||
    (currentMilestone === amounts.length - 1 &&
      balance >= amounts[currentMilestone])
  ) {
    return balance;
  }
  return amounts[currentMilestone];
};

export type ReleaseFundsProps = {
  invoice: any;
  balance: bigint;
  close: () => void;
  tokenData: any;
};

export const ReleaseFunds: React.FC<ReleaseFundsProps> = ({
  invoice,
  balance,
  close,
  tokenData,
}) => {
  const [loading, setLoading] = useState(false);
  const { chainId, provider } = useContext(Web3Context);
  const {
    network,
    currentMilestone,
    amounts,
    address,
    token,
    provider: recipient,
  } = invoice;

  let amount = getReleaseAmount(currentMilestone, amounts, balance);

  const [tokenInfo, setTokenInfo] = useState({ decimals: 0, symbol: '' });

  useEffect(() => {
    if (chainId && token) {
      if (tokenData) {
        setTokenInfo(getTokenInfo(chainId, token, tokenData));
      }
    }
  }, [chainId, token, tokenData]);

  const [transaction, setTransaction] = useState<Transaction>();
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  useEffect(() => {
    const send = async () => {
      if (!loading && provider && balance && balance > amount) {
        try {
          setLoading(true);
          const tx = await release(provider, address);
          setTransaction(tx);
          await tx.wait();
          window.location.href = `/invoice/${getHexChainId(
            network,
          )}/${address}`;
        } catch (releaseError) {
          logError({ releaseError });
          close();
        }
      }
    };
    send();
  }, [network, amount, address, provider, balance, loading, close]);

  return (
    <VStack w="100%" spacing="1rem">
      <Heading
        fontWeight="bold"
        mb="1rem"
        textTransform="uppercase"
        textAlign="center"
        color="black"
      >
        Release Funds
      </Heading>
      <Text textAlign="center" fontSize="sm" mb="1rem" color="black">
        Follow the instructions in your wallet to release funds from escrow to
        the project team.
      </Text>
      <VStack my="2rem" px="5rem" py="1rem" bg="white" borderRadius="0.5rem">
        <Flex>
          <Text color="black" fontSize="0.875rem" textAlign="center">
            Amount To Be Released
          </Text>
          <Tooltip
            label={`On release, the amount will be sent to ${recipient}`}
            placement="auto-start"
          >
            <QuestionIcon ml=".25rem" boxSize="0.75rem" />
          </Tooltip>
        </Flex>
        <Text
          color="black"
          fontSize="1rem"
          fontWeight="bold"
          textAlign="center"
        >{`${formatUnits(amount, tokenInfo.decimals)} ${
          tokenInfo.symbol
        }`}</Text>
      </VStack>
      {chainId && transaction?.hash && (
        <Text color="black" textAlign="center" fontSize="sm">
          Follow your transaction{' '}
          <Link
            href={getTxLink(chainId, transaction.hash)}
            isExternal
            color="blue"
            textDecoration="underline"
          >
            here
          </Link>
        </Text>
      )}
      <Button
        onClick={close}
        _hover={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        _active={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        color="white"
        backgroundColor="blue.1"
        textTransform="uppercase"
        size={buttonSize}
        fontFamily="mono"
        fontWeight="bold"
        w="100%"
      >
        Close
      </Button>
    </VStack>
  );
};
