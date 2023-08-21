import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
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

import { Web3Context } from '../../context/Web3Context';
import { QuestionIcon } from '../../icons/QuestionIcon';
import {
  balanceOf,
  getHexChainId,
  getNativeTokenSymbol,
  getTokenInfo,
  getTxLink,
  getWrappedNativeToken,
  logError,
  // calculateResolutionFeePercentage,
  depositTokens,
  tipTokens,
  Chain,
  ChainId,
  TokenData,
} from '../../utils';
import { InvoiceResult } from '@/graphql/subgraph';

const getCheckedStatus = (
  deposited: BigNumberish,
  amounts: bigint[] | BigNumberish[],
) => {
  let sum = BigInt(0);
  return amounts.map((a) => {
    sum = sum + BigInt(a);
    return BigInt(deposited) >= sum;
  });
};

// const checkedAtIndex = (index, checked) => {
//   return checked.map((_c, i) => i <= index);
// };

export type DepositFundsProps = {
  invoice: InvoiceResult;
  deposited: BigNumberish;
  due: BigNumberish;
  total: BigNumberish;
  tokenData: Record<ChainId, Record<string, TokenData>>;
  fulfilled: boolean;
};

export const DepositFunds: React.FC<DepositFundsProps> = ({
  invoice,
  deposited,
  due,
  total,
  tokenData,
  fulfilled,
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
  const [openTipPanel, setOpenTipPanel] = useState(false);
  const [tipPerc, setTipPerc] = useState<number | string>(0);
  const [customTip, setCustomTip] = useState('');
  const [tipAmount, setTipAmount] = useState(BigInt(0));
  const [totalPayment, setTotalPayment] = useState(BigInt(0));
  const [allowance, setAllowance] = useState(BigInt(0));
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

  const defaultTipPercs = [10, 15, 18];

  const deposit = async () => {
    setTransaction(undefined);
    if (!totalPayment || !provider || !balance) return;
    if (
      formatUnits(totalPayment, tokenInfo.decimals) >
      formatUnits(balance, tokenInfo.decimals)
    )
      return setDepositError(true);

    try {
      setLoading(true);
      let tx;
      if (paymentType === 1) {
        const signer = await provider.getSigner();
        tx = await signer.sendTransaction({ to: address, value: totalPayment });
      } else {
        if (fulfilled) {
          tx = await tipTokens(provider, address, token, totalPayment);
        } else {
          tx = await depositTokens(provider, address, token, totalPayment);
        }
      }
      setTransaction(tx);
      // await tx.wait();
      window.location.href = `/invoice/${getHexChainId(
        network as Chain,
      )}/${address}/instant`;
    } catch (depositError) {
      setLoading(false);
      logError({ depositError });
    }
  };

  const approve = async () => {
    setTransaction(undefined);
    if (!totalPayment || !provider) return;
    try {
      setLoading(true);
      let tx;
      const approvalAmount = BigInt(2) ** BigInt(256);
      const abi = [
        'function approve(address spender, uint256 amount) public virtual override returns (bool)',
        'function allowance(address owner, address spender) external view returns (uint256)',
      ];
      const signer = await provider.getSigner();
      const tokenContract = new Contract(token, abi, signer);
      tx = await tokenContract.approve(invoice.address, approvalAmount);
      setTransaction(tx);
      await tx.wait();
      setAllowance(await tokenContract.allowance(account, invoice.address));
    } catch (approvalError) {
      logError({ approvalError });
    }
    setLoading(false);
  };

  const isWRAPPED = token.toLowerCase() === wrappedNativeToken.toLowerCase();
  const initialStatus = getCheckedStatus(
    deposited,
    amounts.map((wei) => wei.toBig()),
  );
  const [checked, setChecked] = useState(initialStatus);

  const [balance, setBalance] = useState<bigint>();

  useEffect(() => {
    if (tipAmount > 0) {
      const v = BigInt(amount) + tipAmount;
      setTotalPayment(v);
    } else {
      setTotalPayment(amount);
    }
  }, [amount, tipAmount]);

  useEffect(() => {
    async function getAllowance() {
      try {
        if (!provider || !account) return;
        if (paymentType === 0) {
          balanceOf(provider, token, account).then(setBalance);
          const abi = [
            'function allowance(address owner, address spender) external view returns (uint256)',
          ];
          const newLocal = await provider.getSigner();
          const tokenContract = new Contract(token, abi, newLocal);
          tokenContract.allowance(account, invoice.address).then(setAllowance);
        } else {
          provider.getBalance(account).then(setBalance);
        }
      } catch (balanceError) {
        logError({ balanceError });
      }
    }
    getAllowance();
  }, [paymentType, token, provider, account, invoice.address]);

  useEffect(() => {
    if (
      depositError &&
      balance &&
      formatUnits(balance, tokenInfo.decimals) >
        formatUnits(totalPayment, tokenInfo.decimals)
    ) {
      setDepositError(false);
    }
  }, [depositError, amount, balance, totalPayment]);

  return (
    <VStack w="100%" spacing="1rem">
      <Heading
        fontWeight="bold"
        mb="1rem"
        textTransform="uppercase"
        textAlign="center"
        color="black"
      >
        {fulfilled ? 'Add Tip' : 'Pay Invoice'}
      </Heading>
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
        How much will you be {fulfilled ? 'tipping' : 'depositing'} today?
      </Text>
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
          {!fulfilled && (
            <InputLeftElement>
              <Text
                color="blue.1"
                mb={0}
                _hover={{ textDecoration: 'underline' }}
                cursor="pointer"
                textAlign="right"
                onClick={() => {
                  const newAmount = due;
                  if (newAmount) {
                    setAmount(BigInt(newAmount));
                    const newAmountInput = formatUnits(
                      newAmount,
                      tokenInfo.decimals,
                    ).toString();
                    setAmountInput(newAmountInput);
                  } else {
                    setAmount(BigInt(0));
                  }
                }}
              >
                Max
              </Text>
            </InputLeftElement>
          )}
          <Input
            bg="white"
            color="black"
            border="1px"
            borderColor="lightgrey"
            type="number"
            textAlign="right"
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
                setChecked(
                  getCheckedStatus(
                    BigInt(deposited) + newAmount,
                    amounts.map((wei) => wei.toBig()),
                  ),
                );
              } else {
                setAmount(BigInt(0));
                setChecked(initialStatus);
              }
            }}
            placeholder="Amount to Deposit"
            pr={isWRAPPED ? '6.5rem' : '4rem'}
          />
          <InputRightElement w={isWRAPPED ? '6.5rem' : '4rem'}>
            {isWRAPPED ? (
              <Select
                onChange={(e) => setPaymentType(Number(e.target.value))}
                value={paymentType}
                bg="white"
                color="black"
                border="1px"
                paddingLeft={2}
                borderColor="lightgrey"
                borderLeftRadius={0}
              >
                <option value="0">{tokenInfo.symbol}</option>
                <option value="1">{nativeTokenSymbol}</option>
              </Select>
            ) : (
              tokenInfo.symbol
            )}
          </InputRightElement>
        </InputGroup>
        {due !== undefined && !fulfilled && (
          <Text fontSize={12} mt={0}>
            Total Due:{' '}
            {`${formatUnits(due, tokenInfo.decimals)} ${tokenInfo.symbol}`}
          </Text>
        )}
        {amount > BigInt(due) && !fulfilled && (
          <Alert bg="none">
            <AlertIcon color="red.500" />
            <AlertTitle fontSize="sm">
              Your deposit is greater than the due amount!
            </AlertTitle>
          </Alert>
        )}
        {!openTipPanel && amount === BigInt(due) && !fulfilled && (
          <Text
            textAlign="center"
            color="blue.1"
            onClick={() => setOpenTipPanel(true)}
            cursor="pointer"
          >
            Add a tip
          </Text>
        )}
      </VStack>
      {amount === due && (
        <VStack>
          {openTipPanel && (
            <>
              <Text color="grey">Select a tip amount</Text>
              <ButtonGroup color="blue.1">
                <Button
                  color="blue.1"
                  borderColor="blue.1"
                  cursor="pointer"
                  fontWeight="normal"
                  borderWidth={1}
                  width={100}
                  minHeight={50}
                  onClick={() => {
                    setCustomTip('');
                    setTipAmount(BigInt(0));
                    setOpenTipPanel(false);
                  }}
                >
                  None
                </Button>
                {defaultTipPercs.map((t) => (
                  <Button
                    value={t}
                    borderColor="blue.1"
                    backgroundColor={tipPerc === t ? 'blue.1' : undefined}
                    color={tipPerc === t ? 'white' : undefined}
                    _hover={{
                      backgroundColor:
                        tipPerc === t && 'rgba(61, 136, 248, 0.7)',
                    }}
                    _active={{
                      backgroundColor:
                        tipPerc === t && 'rgba(61, 136, 248, 0.7)',
                    }}
                    borderWidth={1}
                    flexDir="column"
                    width={100}
                    gap={1}
                    minHeight={50}
                    onClick={(e) => {
                      setTipPerc(t);
                      if (t && !isNaN(Number(t))) {
                        const p = (BigInt(total) * BigInt(t)) / BigInt(100);
                        setTipAmount(p);
                      } else {
                        setTipAmount(BigInt(0));
                      }
                    }}
                  >
                    <Heading fontSize={12}>{`${t}%`}</Heading>
                    <Text>
                      {formatUnits(
                        (BigInt(total) * BigInt(t)) / BigInt(100),
                        tokenInfo.decimals,
                      )}
                    </Text>
                    {/* <Text fontSize={10}>{symbol}</Text> */}
                  </Button>
                ))}
                <Button
                  value="custom"
                  borderColor="blue.1"
                  backgroundColor={tipPerc === 'custom' ? 'blue.1' : undefined}
                  color={tipPerc === 'custom' ? 'white' : undefined}
                  _hover={{
                    backgroundColor:
                      tipPerc === 'custom'
                        ? 'rgba(61, 136, 248, 0.7)'
                        : undefined,
                  }}
                  _active={{
                    backgroundColor:
                      tipPerc === 'custom' && 'rgba(61, 136, 248, 0.7)',
                  }}
                  borderWidth={1}
                  width={100}
                  minHeight={50}
                  onClick={(e) => {
                    const v = e.currentTarget.value;
                    setTipPerc(v);
                    if (customTip && !isNaN(Number(customTip))) {
                      const p = parseUnits(customTip, tokenInfo.decimals);
                      setTipAmount(p);
                    } else {
                      setTipAmount(BigInt(0));
                    }
                  }}
                >
                  Custom
                </Button>
              </ButtonGroup>
              {tipPerc === 'custom' && (
                <InputGroup maxWidth={300}>
                  <Input
                    type="number"
                    value={customTip}
                    onChange={(e) => {
                      const v = e.currentTarget.value;
                      setCustomTip(v);
                      if (v && !isNaN(Number(v))) {
                        const p = parseUnits(v, tokenInfo.decimals);
                        setTipAmount(p);
                      } else {
                        setTipAmount(BigInt(0));
                      }
                    }}
                    placeholder={'Enter tip amount'}
                    color="#323C47"
                    borderColor="lightgrey"
                    textAlign="right"
                  />
                  <InputRightAddon
                    bg="white"
                    color="black"
                    border="1px"
                    borderColor="lightgrey"
                    borderLeftRadius={0}
                  >
                    <Text>
                      {paymentType === 1 ? nativeTokenSymbol : tokenInfo.symbol}
                    </Text>
                  </InputRightAddon>
                </InputGroup>
              )}
            </>
          )}
        </VStack>
      )}
      <Flex color="black" justify="space-between" w="100%" fontSize="sm">
        {deposited !== undefined && (
          <VStack align="flex-start">
            <Text fontWeight="bold">Total Paid</Text>
            <Text>{`${formatUnits(deposited, tokenInfo.decimals)} ${
              tokenInfo.symbol
            }`}</Text>
          </VStack>
        )}
        {totalPayment !== undefined && (
          <VStack color="black">
            <Text fontWeight="bold">Total Payment</Text>
            <Heading size="lg">
              {formatUnits(totalPayment, tokenInfo.decimals)}{' '}
              {paymentType === 1 ? nativeTokenSymbol : tokenInfo.symbol}
            </Heading>
          </VStack>
        )}
        {balance !== undefined && (
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
      {paymentType === 0 && allowance < totalPayment && (
        <Button
          onClick={approve}
          isLoading={loading}
          _hover={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
          _active={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
          color="white"
          backgroundColor="blue.4"
          isDisabled={amount <= 0}
          textTransform="uppercase"
          size={buttonSize}
          fontFamily="mono"
          fontWeight="normal"
          w="100%"
        >
          Approve
        </Button>
      )}
      <Button
        onClick={deposit}
        isLoading={loading}
        _hover={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        _active={{ backgroundColor: 'rgba(61, 136, 248, 0.7)' }}
        color="white"
        backgroundColor="blue.1"
        isDisabled={
          amount <= 0 || (allowance < totalPayment && paymentType === 0)
        }
        textTransform="uppercase"
        size={buttonSize}
        fontFamily="mono"
        fontWeight="normal"
        w="100%"
      >
        Pay
      </Button>
      {transaction && (
        <Text color="black" textAlign="center" fontSize="sm">
          Follow your transaction{' '}
          <Link
            href={
              chainId && transaction?.hash
                ? getTxLink(chainId, transaction.hash)
                : undefined
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
