import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { formatUnits, parseUnits } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import { CreateContext } from '../context/CreateContext';
import { Web3Context } from '../context/Web3Context';
import { getTokenInfo } from '../utils/helpers';
import { QuestionIcon } from '../icons/QuestionIcon';
import { MistContext } from '@/context/MistContext';

export type PaymentChunksFormProps = {
  display: string;
  tokenData: any;
};

export const PaymentChunksForm: React.FC<PaymentChunksFormProps> = ({
  display,
  tokenData,
}) => {
  const { chainId } = useContext(Web3Context);
  const { setAmounts } = useContext(MistContext);
  const { paymentToken, milestones, payments, setPayments, paymentDue } =
    useContext(CreateContext);
  const unknownToken = { decimals: 0, symbol: '' };
  const [tokenInfo, setTokenInfo] = useState(unknownToken);

  useEffect(() => {
    if (chainId && paymentToken) {
      if (tokenData) {
        setTokenInfo(
          getTokenInfo(chainId, paymentToken, tokenData) ?? unknownToken,
        );
      }
    }
  }, [chainId, paymentToken, tokenData]);

  return (
    <VStack w="100%" spacing="1rem" display={display}>
      {Array.from(Array(Number(milestones))).map((_val, index) => {
        return (
          <VStack w="100%" spacing="0.5rem" key={index.toString()}>
            <Flex w="100%">
              <Text fontWeight="700">Payment #{index + 1}</Text>
              <Flex>
                <Tooltip
                  label="This is the amount of tokens you’ll receive for completion of this milestone."
                  placement="auto-start"
                >
                  <QuestionIcon ml=".25rem" boxSize="0.75rem" />
                </Tooltip>
              </Flex>
            </Flex>
            <InputGroup>
              <Input
                _hover={{ borderColor: 'lightgray' }}
                bg="white"
                type="text"
                color="#323C47"
                border="1px"
                borderColor="lightgray"
                pr="3.5rem"
                onChange={(e) => {
                  if (
                    payments === undefined ||
                    !e.target.value ||
                    isNaN(Number(e.target.value))
                  )
                    return;
                  const amount = parseUnits(e.target.value, tokenInfo.decimals);
                  const newPayments = payments.slice();
                  newPayments[index] = amount;
                  setPayments(newPayments);
                  setAmounts(newPayments);
                }}
              />
              <InputRightElement color="white" w="3.5rem">
                {tokenInfo.symbol}
              </InputRightElement>
            </InputGroup>
          </VStack>
        );
      })}
      {paymentDue !== undefined && (
        <Text w="100%" textAlign="right" color="grey" fontWeight="bold">
          Total Amount Must Add Up to{' '}
          {formatUnits(paymentDue, tokenInfo.decimals)} {tokenInfo.symbol}
        </Text>
      )}
    </VStack>
  );
};
