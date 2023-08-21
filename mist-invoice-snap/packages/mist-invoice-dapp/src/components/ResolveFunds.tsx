import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBreakpointValue,
  VStack,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { Transaction, formatUnits, parseUnits } from 'ethers';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { QuestionIcon } from '../icons/QuestionIcon';

import { Web3Context } from '../context/Web3Context';
import { OrderedTextarea } from '../components/OrderedInput';
import {
  Chain,
  ChainId,
  TokenData,
  getHexChainId,
  getTokenInfo,
  getTxLink,
  logError,
  resolve,
  uploadDisputeDetails,
} from '../utils';
import { InvoiceResult } from '@/graphql/subgraph';
import { utils } from 'web3';

export type ResolveFundsProps = {
  invoice: InvoiceResult;
  balance: bigint;
  close: () => void;
  tokenData: Record<ChainId, Record<string, TokenData>>;
};

export const ResolveFunds: React.FC<ResolveFundsProps> = ({
  invoice,
  balance,
  close,
  tokenData,
}) => {
  const { network, address, resolutionRate, token, isLocked } = invoice;
  const { chainId, provider } = useContext(Web3Context);
  // const { decimals, symbol } = getTokenInfo(chainId, token, tokenData);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const [tokenInfo, setTokenInfo] = useState({ decimals: 0, symbol: '' });

  useEffect(() => {
    if (chainId && token) {
      if (tokenData) {
        setTokenInfo(getTokenInfo(chainId, token, tokenData));
      }
    }
  }, [chainId, token, tokenData]);

  const resolverAward =
    balance > 0 ? balance / resolutionRate.toBig() : BigInt(0);
  const availableFunds = balance - resolverAward;
  const [clientAward, setClientAward] = useState(availableFunds);
  const [providerAward, setProviderAward] = useState(BigInt(0));
  const [clientAwardInput, setClientAwardInput] = useState(
    formatUnits(availableFunds, tokenInfo.decimals),
  );
  const [providerAwardInput, setProviderAwardInput] = useState('0');
  const [comments, setComments] = useState('');
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  const resolveFunds = useCallback(async () => {
    if (
      provider &&
      isLocked &&
      comments &&
      balance === clientAward + providerAward + resolverAward &&
      balance > 0
    ) {
      try {
        setLoading(true);
        const detailsHash = await uploadDisputeDetails({
          comments,
          invoice: address,
          amount: balance.toString(),
        });
        const tx = await resolve(
          provider,
          address,
          clientAward,
          providerAward,
          detailsHash,
        );
        setTransaction(tx);
        await tx.wait();
        window.location.href = `/invoice/${getHexChainId(
          network as Chain,
        )}/${address}`;
      } catch (depositError) {
        setLoading(false);
        logError({ depositError });
      }
    }
  }, [
    provider,
    isLocked,
    balance,
    comments,
    clientAward,
    providerAward,
    resolverAward,
    address,
    network,
  ]);

  return (
    <VStack w="100%" spacing="1rem">
      <Heading
        fontWeight="bold"
        mb="1rem"
        textTransform="uppercase"
        textAlign="center"
        color="black"
      >
        Resolve Dispute
      </Heading>
      <Text textAlign="center" fontSize="sm" mb="1rem" color="black">
        {isLocked
          ? `Review the project agreement to decide how to distribute the disputed payment of ${formatUnits(
              balance,
              tokenInfo.decimals,
            )} ${
              tokenInfo.symbol
            } between the client & provider, excluding the ${
              100 / resolutionRate.toBig()
            }% arbitration fee you’ll receive.`
          : `Invoice is not locked`}
      </Text>
      {isLocked ? (
        <>
          <OrderedTextarea
            tooltip="Include a note explaining your decision."
            label="Resolution Comments"
            value={comments}
            setValue={setComments}
            infoText="Include a note explaining your decision."
          />

          <VStack spacing="0.5rem" align="stretch" color="black">
            <Flex w="100%">
              <Text fontWeight="700" color="black">
                Client Award
              </Text>
              <Tooltip
                color="white"
                label="How much of the disputed payment should the client receive?"
                placement="auto-start"
              >
                <QuestionIcon ml=".25rem" boxSize="0.75rem" />
              </Tooltip>
            </Flex>

            <InputGroup>
              <Input
                bg="white"
                color="black"
                border="1px"
                type="number"
                value={clientAwardInput}
                pr="3.5rem"
                alt="How much of the disputed payment should the client receive?"
                onChange={(e) => {
                  setClientAwardInput(e.target.value);
                  if (e.target.value) {
                    let award = parseUnits(e.target.value, tokenInfo.decimals);
                    if (award > availableFunds) {
                      award = availableFunds;
                      setClientAwardInput(
                        formatUnits(award, tokenInfo.decimals),
                      );
                    }
                    setClientAward(award);
                    award = availableFunds - award;
                    setProviderAward(award);
                    setProviderAwardInput(
                      formatUnits(award, tokenInfo.decimals),
                    );
                  }
                }}
                placeholder="Client Award"
              />
              <InputRightElement w="3.5rem">
                {tokenInfo.symbol}
              </InputRightElement>
            </InputGroup>
          </VStack>
          <VStack spacing="0.5rem" align="stretch" color="black">
            {/* <Text fontWeight="700">Provider Award</Text> */}
            <Flex w="100%">
              <Text fontWeight="700" color="black">
                Provider Award
              </Text>
              <Tooltip
                color="white"
                label="How much of the disputed payment should the provider receive?"
                placement="auto-start"
              >
                <QuestionIcon ml=".25rem" boxSize="0.75rem" />
              </Tooltip>
            </Flex>

            <InputGroup>
              <Input
                bg="white"
                color="black"
                border="1px"
                type="number"
                value={providerAwardInput}
                pr="3.5rem"
                alt="How much of the disputed payment should the provider receive?"
                onChange={(e) => {
                  setProviderAwardInput(e.target.value);
                  if (e.target.value) {
                    let award = parseUnits(e.target.value, tokenInfo.decimals);
                    if (award > availableFunds) {
                      award = availableFunds;
                      setProviderAwardInput(
                        formatUnits(award, tokenInfo.decimals),
                      );
                    }
                    setProviderAward(award);
                    award = availableFunds - award;
                    setClientAward(award);
                    setClientAwardInput(formatUnits(award, tokenInfo.decimals));
                  }
                }}
                placeholder="Provider Award"
              />
              <InputRightElement w="3.5rem">
                {tokenInfo.symbol}
              </InputRightElement>
            </InputGroup>
          </VStack>
          <VStack spacing="0.5rem" align="stretch" color="black" mb="1rem">
            <Flex w="100%">
              <Text fontWeight="700" color="black">
                Arbitrator Award
              </Text>
              <Tooltip
                color="white"
                label="This is how much you’ll receive as your fee for resolving this dispute."
                placement="auto-start"
              >
                <QuestionIcon ml=".25rem" boxSize="0.75rem" />
              </Tooltip>
            </Flex>
            <InputGroup>
              <Input
                bg="white"
                color="black"
                border="1px"
                type="number"
                value={formatUnits(resolverAward, tokenInfo.decimals)}
                pr="3.5rem"
                alt="This is how much you’ll receive as your fee for resolving this dispute."
                isDisabled
              />
              <InputRightElement w="3.5rem">
                {tokenInfo.symbol}
              </InputRightElement>
            </InputGroup>
          </VStack>
          <Button
            onClick={resolveFunds}
            isLoading={loading}
            colorScheme="red"
            isDisabled={resolverAward <= 0 || !comments}
            textTransform="uppercase"
            size={buttonSize}
            fontFamily="mono"
            fontWeight="bold"
            w="100%"
          >
            Resolve
          </Button>
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
        </>
      ) : (
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
      )}
    </VStack>
  );
};
