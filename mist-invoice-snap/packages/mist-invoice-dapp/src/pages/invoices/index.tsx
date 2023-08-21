"use client";
import {
  Center,
  Stack,
  Spinner,
  Heading,
  Box,
  Button,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";

import React, { useContext, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import {
  SearchContext,
  SearchContextProvider,
} from "../../context/SearchContext";
import { Web3Context } from "../../context/Web3Context";
import { useFetchTokensViaIPFS } from "../../hooks/useFetchTokensViaIPFS";
import { InvoiceDashboardTable } from "../../components/InvoiceDashboardTable";
import { networkNames } from "../../utils/constants";

const InvoicesInner = () => {
  const router = useRouter();
  const { setSearch, result, loading } = useContext(SearchContext);
  const [{ tokenData }] = useFetchTokensViaIPFS();
  const { account, chainId } = useContext(Web3Context);

  const buttonSize = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  useEffect(() => {
    if (account) {
      setSearch(account);
    }
  }, [account, setSearch]);

  return (
    <Box
      paddingY={16}
      flex={
        result && result.length > 0 && tokenData !== undefined
          ? "1 0 100%"
          : undefined
      }
    >
      {loading ? (
        <Stack align="center">
          <Heading color="gray" as="h1">
            Invoices Loading
          </Heading>
          <Spinner />
        </Stack>
      ) : result && result.length > 0 && tokenData !== undefined ? (
        <InvoiceDashboardTable
          result={result}
          tokenData={tokenData}
          chainId={chainId}
          router={router}
        />
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={4}
          width="100%"
        >
          <Center>
            <Heading color="gray" size="lg">
              {chainId ? (
                <>No invoices found.</>
              ) : (
                "Not connected to a network."
              )}
            </Heading>
          </Center>
          <Button
            color="white"
            backgroundColor="blue.1"
            size={buttonSize}
            minW="250px"
            paddingY={6}
            _hover={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
            _active={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
            onClick={() => router.push("/create")}
          >
            Create Invoice
          </Button>
        </Flex>
      )}
    </Box>
  );
};

const InvoicesWithProvider = () => (
  <SearchContextProvider>
    <InvoicesInner />
  </SearchContextProvider>
);

export default withRouter(InvoicesWithProvider);
