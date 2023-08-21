"use client";
import {
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useWeb3 } from "../context";
import { logError } from "../utils";

const Home = () => {
  const { connectAccount, account } = useWeb3();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [buttonSize, setButtonSize] = useState("lg");

  // const _buttonSize = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  // setButtonSize(_buttonSize);

  useEffect(() => {
    if (window) {
      toggleMobileMode();
      window.addEventListener("resize", toggleMobileMode);
    }
  });

  const toggleMobileMode = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const createInvoice = async () => {
    if (account) {
      router.push("/create");
    } else {
      try {
        await connectAccount();
        router.push("/create");
      } catch {
        logError("Couldn't connect web3 wallet");
      }
    }
  };

  const viewInvoices = async () => {
    if (account) {
      router.push("/invoices");
    } else {
      try {
        await connectAccount();
        router.push("/invoices");
      } catch {
        logError("Couldn't connect web3 wallet");
      }
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" gap={6}>
      <Heading
        fontWeight={700}
        fontSize={50}
        textAlign="center"
        color="rgba(50, 60, 71, 1)"
      >
        Welcome to Smart Invoice
      </Heading>
      <Text fontStyle="italic" color="grey">
        How do you want to get started?
      </Text>
      <Flex
        direction={isMobile ? "column" : "-moz-initial"}
        columnGap={10}
        rowGap={4}
        width="100%"
        align="stretch"
        justify="center"
        paddingX={10}
      >
        <Button
          _hover={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
          _active={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
          color="white"
          backgroundColor="blue.1"
          onClick={createInvoice}
          size={buttonSize}
          minW="250px"
          paddingY={6}
        >
          Create Invoice
        </Button>
        <Button
          _hover={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
          _active={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
          color="white"
          backgroundColor="blue.1"
          onClick={viewInvoices}
          size={buttonSize}
          minW="250px"
          paddingY={6}
        >
          View Existing Invoices
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
