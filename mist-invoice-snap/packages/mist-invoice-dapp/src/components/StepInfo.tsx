import {
  Heading,
  Text,
  useBreakpointValue,
  VStack,
  Divider,
  HStack,
  IconButton,
  Center,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BackArrowIcon } from '../icons/ArrowIcons';

export type StepInfoProps = {
  stepNum: number;
  stepTitle: string;
  stepDetails: string[];
  goBack: () => void;
};

export const StepInfo: React.FC<StepInfoProps> = ({
  stepNum,
  stepTitle,
  stepDetails,
  goBack,
}) => {
  // const maxW = useBreakpointValue({ base: "100%" });
  const [maxW, setMaxW] = useState('100%');
  const [stepSize, setStepSize] = useState('md');

  // const stepSize = useBreakpointValue({
  //   base: "md",
  //   sm: "lg",
  //   md: "xl",
  //   lg: "xl",
  // });

  return (
    <VStack spacing="1rem" maxW={maxW} align="stretch">
      <HStack width="100%" align="center" paddingY={4}>
        {stepNum !== 1 && (
          <IconButton
            aria-label="Go back"
            icon={<BackArrowIcon width="33px" height="24px" />}
            position="absolute"
            onClick={() => goBack()}
            cursor="pointer"
            zIndex={5}
          />
        )}
        <Center>
          <Heading
            position="relative"
            color="#323C47"
            size={stepSize}
            textAlign="center"
            width="100%"
          >
            Step {stepNum}: {stepTitle}
          </Heading>
        </Center>
      </HStack>

      <Divider width="100%" background="lightgrey" />
      <br />

      {stepDetails.map((detail, index) => (
        <Text color="grey" fontSize="sm" key={index.toString()}>
          {detail}
        </Text>
      ))}
    </VStack>
  );
};
