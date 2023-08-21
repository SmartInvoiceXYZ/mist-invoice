import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import {
  BigNumberish,
  Contract,
  formatUnits,
  parseUnits,
  Transaction,
} from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import { Web3Context } from '../context/Web3Context';
import { QuestionIcon } from '../icons/QuestionIcon';
import {
  balanceOf,
  getHexChainId,
  getNativeTokenSymbol,
  getTokenInfo,
  getTxLink,
  getWrappedNativeToken,
  logError,
  calculateResolutionFeePercentage,
} from '../utils';

const getCheckedStatus = (deposited: bigint, amounts: bigint[]) => {
  let sum = BigInt(0);
  return amounts.map((a) => {
    sum = sum + a;
    return deposited > sum;
  });
};

const checkedAtIndex = (index: number, checked: boolean[]) => {
  return checked.map((_c, i) => i <= index);
};

export type DepositFundsProps = {
  invoice: any;
  deposited: any;
  due: any;
  tokenData: any;
};

export const DepositFunds: React.FC<DepositFundsProps> = ({
  invoice,
  deposited,
  due,
  tokenData,
}) => {
  const { chainId, provider, account } = useContext(Web3Context);
  const { address, token, network, amounts, currentMilestone } = invoice;
  const [paymentType, setPaymentType] = useState(0);
  const [amount, setAmount] = useState(BigInt(0));
  const [amountInput, setAmountInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const [depositError, setDepositError] = useState(false);
  const [nativeTokenSymbol, setNativeTokenSymbol] = useState('');
  const [wrappedNativeToken, setWrappedNativeToken] = useState('');
  const [tokenInfo, setTokenInfo] = useState({ decimals: 0, symbol: '' });

  useEffect(() => {
    if (chainId) {
      if (tokenData) {
        setTokenInfo(getTokenInfo(chainId, token, tokenData));
      }

      setNativeTokenSymbol(getNativeTokenSymbol(chainId));
      setWrappedNativeToken(getWrappedNativeToken(chainId));
    }
  }, [chainId, tokenData]);

  const deposit = async () => {
    if (!amount || !provider) return;
    if (
      formatUnits(amount, tokenInfo.decimals) >
      formatUnits(balance, tokenInfo.decimals)
    )
      return setDepositError(true);

    try {
      setLoading(true);
      let tx;
      if (paymentType === 1) {
        const signer = await provider.getSigner();
        tx = await signer.sendTransaction({ to: address, value: amount });
      } else {
        const abi = ['function transfer(address, uint256) public'];
        const tokenContract = new Contract(
          token,
          abi,
          await provider.getSigner(),
        );
        tx = await tokenContract.transfer(address, amount);
      }
      setTransaction(tx);
      await tx.wait();
      window.location.href = `/invoice/${getHexChainId(network)}/${address}`;
    } catch (depositError) {
      setLoading(false);
      logError({ depositError });
    }
  };

  const isWRAPPED = token.toLowerCase() === wrappedNativeToken.toLowerCase();
  const initialStatus = getCheckedStatus(deposited, amounts);
  const [checked, setChecked] = useState(initialStatus);

  const [balance, setBalance] = useState(BigInt(0));

  useEffect(() => {
    try {
      if (!provider || !account) return;
      if (paymentType === 0) {
        balanceOf(provider, token, account).then(setBalance);
      } else {
        provider.getBalance(account).then(setBalance);
      }
    } catch (balanceError) {
      logError({ balanceError });
    }
  }, [paymentType, token, provider, account]);

  useEffect(() => {
    if (
      depositError &&
      formatUnits(balance, tokenInfo.decimals) >
        formatUnits(amount, tokenInfo.decimals)
    ) {
      setDepositError(false);
    }
  }, [depositError, amount, balance]);

  return (
    <VStack w="100%" spacing="1rem">
      <Heading
        fontWeight="bold"
        mb="1rem"
        textTransform="uppercase"
        textAlign="center"
        color="black"
      >
        Pay Invoice
      </Heading>
      <Text textAlign="center" fontSize="sm" mb="1rem" color="black">
        At a minimum, you’ll need to deposit enough to cover the{' '}
        {currentMilestone === 0 ? 'first' : 'next'} project payment.
      </Text>
      {depositError ? (
        <Flex>
          <Alert bg="none" margin="0 auto" textAlign="center" padding="0">
            <AlertIcon color="red.500" />
            <AlertTitle fontSize="sm" color="red.500">
              Not enough available {tokenInfo.symbol} for this deposit
            </AlertTitle>
          </Alert>
        </Flex>
      ) : null}

      <Text textAlign="center" color="black">
        How much will you be depositing today?
      </Text>
      <VStack spacing="0.5rem">
        {amounts.map((a, i) => {
          return (
            <Checkbox
              key={i.toString()}
              isChecked={checked[i]}
              isDisabled={initialStatus[i]}
              onChange={(e) => {
                const newChecked = e.target.checked
                  ? checkedAtIndex(i, checked)
                  : checkedAtIndex(i - 1, checked);
                const totAmount = amounts.reduce(
                  (tot, cur, ind) => (newChecked[ind] ? tot.add(cur) : tot),
                  BigInt(0),
                );
                const newAmount = totAmount.gte(deposited)
                  ? totAmount.sub(deposited)
                  : BigInt(0);

                setChecked(newChecked);
                setAmount(newAmount);
                setAmountInput(formatUnits(newAmount, tokenInfo.decimals));
              }}
              colorScheme="blue"
              borderColor="lightgrey"
              size="lg"
              fontSize="1rem"
              color="#323C47"
            >
              Payment #{i + 1} &nbsp; &nbsp;
              {formatUnits(a, tokenInfo.decimals)} {tokenInfo.symbol}
            </Checkbox>
          );
        })}
      </VStack>

      <VStack spacing="0.5rem" align="stretch" color="black" mb="1rem">
        <Flex justify="space-between" w="100%">
          <Text fontWeight="700">Amount</Text>
          <Flex>
            {paymentType === 1 && (
              <Tooltip
                label={`Your ${nativeTokenSymbol} will be automagically wrapped to ${tokenInfo.symbol} tokens`}
                placement="auto-start"
              >
                <QuestionIcon ml="1rem" boxSize="0.75rem" />
              </Tooltip>
            )}
          </Flex>
        </Flex>
        <InputGroup>
          <Input
            bg="white"
            color="black"
            border="1px"
            type="number"
            value={amountInput}
            onChange={(e) => {
              const newAmountInput = e.target.value;
              setAmountInput(newAmountInput);
              if (newAmountInput) {
                const newAmount = parseUnits(
                  newAmountInput,
                  tokenInfo.decimals,
                );
                setAmount(newAmount);
                setChecked(getCheckedStatus(deposited.add(newAmount), amounts));
              } else {
                setAmount(BigInt(0));
                setChecked(initialStatus);
              }
            }}
            placeholder="Amount to Deposit"
            pr={isWRAPPED ? '6rem' : '3.5rem'}
          />
          <InputRightElement w={isWRAPPED ? '6rem' : '3.5rem'}>
            {isWRAPPED ? (
              <Select
                onChange={(e) => setPaymentType(Number(e.target.value))}
                value={paymentType}
                bg="white"
                color="black"
                border="1px"
              >
                <option value="0">{tokenInfo.symbol}</option>
                <option value="1">{nativeTokenSymbol}</option>
              </Select>
            ) : (
              tokenInfo.symbol
            )}
          </InputRightElement>
        </InputGroup>
        {amount > due && (
          <Alert bg="none">
            <AlertIcon color="red.500" />
            <AlertTitle fontSize="sm">
              Your deposit is greater than the due amount!
            </AlertTitle>
          </Alert>
        )}
      </VStack>
      <Flex color="black" justify="space-between" w="100%" fontSize="sm">
        {deposited && (
          <VStack align="flex-start">
            <Text fontWeight="bold">Total Deposited</Text>
            <Text>{`${formatUnits(deposited, tokenInfo.decimals)} ${
              tokenInfo.symbol
            }`}</Text>
          </VStack>
        )}
        {deposited && (
          <VStack align="flex-start">
            <Text fontWeight="bold">Potential Dispute Fee</Text>
            <Text>{`${(
              (Number(formatUnits(amount, tokenInfo.decimals)) -
                Number(formatUnits(deposited, tokenInfo.decimals))) *
              calculateResolutionFeePercentage(invoice.resolutionRate)
            ).toFixed(6)} ${tokenInfo.symbol}`}</Text>
          </VStack>
        )}
        {due && (
          <VStack>
            <Text fontWeight="bold">Total Due</Text>
            <Text>{`${formatUnits(due, tokenInfo.decimals)} ${
              tokenInfo.symbol
            }`}</Text>
          </VStack>
        )}
        {balance && (
          <VStack align="flex-end">
            <Text fontWeight="bold">Your Balance</Text>
            <Text>
              {`${formatUnits(balance, tokenInfo.decimals)} ${
                paymentType === 0 ? tokenInfo.symbol : nativeTokenSymbol
              }`}
            </Text>
          </VStack>
        )}
      </Flex>
      <Button
        onClick={deposit}
        isLoading={loading}
        _hover={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        _active={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        color="white"
        backgroundColor="blue.1"
        isDisabled={amount <= 0}
        textTransform="uppercase"
        size={buttonSize}
        fontFamily="mono"
        fontWeight="normal"
        w="100%"
      >
        Deposit
      </Button>
      {transaction && (
        <Text color="black" textAlign="center" fontSize="sm">
          Follow your transaction{' '}
          <Link
            href={
              chainId && transaction?.hash
                ? getTxLink(chainId, transaction.hash)
                : ''
            }
            isExternal
            color="blue.1"
            textDecoration="underline"
          >
            here
          </Link>
        </Text>
      )}
    </VStack>
  );
};
