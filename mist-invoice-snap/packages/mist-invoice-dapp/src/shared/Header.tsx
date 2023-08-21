import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tag,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import RouterLink from "next/link";

import { ProfileButton, StyledButton } from "../components";
import { Web3Context } from "../context";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { theme } from "../theme";
import {
  Profile,
  getAccountString,
  getNetworkLabel,
  getProfile,
} from "../utils";

export const Header = () => {
  const { account, disconnect, chainId } = useContext(Web3Context);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    if (window) {
      toggleMobileMode();
      window.addEventListener("resize", toggleMobileMode);
    }
  });

  useEffect(() => {
    if (account) {
      getProfile(account).then((p) => setProfile(p));
    }
  }, [account]);

  const toggleMobileMode = () => {
    if (window.innerWidth < 850) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  const buttonVariant = useBreakpointValue({
    base: open ? "ghost" : "link",
    md: "ghost",
  });

  return (
    <Flex
      w="100%"
      h={75}
      paddingX={8}
      paddingY={4}
      color="#707683"
      fontFamily="mono"
      top={0}
      left={0}
      justify="space-between"
      align="center"
      background="white"
      zIndex={5}
    >
      <Box width={250}>
        <RouterLink href="/invoices">
          <Flex cursor="pointer">
            <Image
              src="/assets/smart-invoice/normal.svg"
              alt="Smart Invoice"
              width={220}
              height={34.84}
            />
          </Flex>
        </RouterLink>
      </Box>

      {/* Navigation Links */}
      {!mobile && (
        <Flex gap={8} justify="center" align="center">
          <ChakraLink href="/invoices">Dashboard</ChakraLink>
          <ChakraLink
            href="https://docs.smartinvoice.xyz"
            target="_blank"
            isExternal
          >
            Documentation
          </ChakraLink>
          <ChakraLink
            href="https://docs.smartinvoice.xyz/misc/get-support"
            target="_blank"
            isExternal
          >
            Support
          </ChakraLink>
        </Flex>
      )}

      <Flex
        align="center"
        height="8rem"
        transition="width 1s ease-out"
        width={250}
        justify="end"
      >
        {account && (
          <Flex justify="center" align="center" zIndex={5}>
            <Popover>
              <PopoverTrigger>
                <Button
                  h="auto"
                  fontWeight="normal"
                  borderRadius="full"
                  variant={buttonVariant}
                  colorScheme="red"
                  fontFamily="mono"
                  p={{ base: 0, md: 2 }}
                >
                  <Flex
                    borderRadius="50%"
                    w="2.5rem"
                    h="2.5rem"
                    overflow="hidden"
                    justify="center"
                    align="center"
                    bgColor="black"
                    bgImage={profile && `url(${profile.imageUrl})`}
                    border={`1px solid ${theme.colors.white20}`}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center center"
                  />
                  <Flex direction="column" gap={1} align="left">
                    <Text
                      px={2}
                      display={{ base: "none", md: "flex" }}
                      fontFamily="'Roboto Mono', monospace;"
                      color="#192A3E"
                      fontWeight={500}
                      fontSize={14}
                    >
                      {profile && profile.name ? profile.name : "Anonymous"}
                    </Text>
                    <Text
                      px={2}
                      display={{ base: "none", md: "flex" }}
                      fontFamily="'Roboto Mono', monospace;"
                      color="grey"
                      fontSize={12}
                    >
                      {getAccountString(account)}
                    </Text>
                  </Flex>
                  <Tag
                    background="#90A0B7"
                    display={{ base: "none", md: "flex" }}
                    size="sm"
                    color="white"
                  >
                    {getNetworkLabel(chainId)}
                  </Tag>
                </Button>
              </PopoverTrigger>
              <PopoverContent bg="none" w="auto" mx="4rem">
                <Button
                  onClick={() => {
                    disconnect();
                  }}
                  backgroundColor="blue.1"
                  _hover={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
                  _active={{ backgroundColor: "rgba(61, 136, 248, 0.7)" }}
                  color="white"
                  fontWeight="normal"
                  fontFamily="mono"
                  textTransform="uppercase"
                >
                  Disconnect
                </Button>
              </PopoverContent>
            </Popover>
          </Flex>
        )}
        {mobile && (
          <Button
            onClick={() => setOpen(!open)}
            variant="link"
            ml={{ base: "0.5rem", sm: "1rem" }}
            zIndex={7}
          >
            <HamburgerIcon
              boxSize={{ base: "2rem", sm: "2.75rem" }}
              transition="all 1s ease-out"
              _hover={{
                transition: "all 1s ease-out",
                transform: "rotateZ(90deg)",
              }}
              color="blue.1"
            />
          </Button>
        )}
      </Flex>
      <Flex
        zIndex={6}
        position="fixed"
        left="0"
        top="0"
        bg="white"
        h="100%"
        w="100%"
        direction="column"
        justify="center"
        align="center"
        transition="all 2s ease-out"
        pointerEvents={open ? "all" : "none"}
        css={{
          clipPath: open
            ? "circle(calc(100vw + 100vh) at 90% -10%)"
            : "circle(100px at 90% -20%)",
        }}
      >
        {account && profile && chainId && (
          <ProfileButton
            account={account}
            chainId={chainId}
            profile={profile}
            disconnect={disconnect}
          />
        )}
        <StyledButton
          onClick={() => {
            router.push("/invoices");
            setOpen(false);
          }}
          transition="all 0.5s ease 0.4s"
          my="1rem"
          variant="link"
          color="gray"
          fontWeight="normal"
          fontSize="1.5rem"
        >
          Dashboard
        </StyledButton>
        <ChakraLink href="https://docs.smartinvoice.xyz" isExternal _hover={{}}>
          <StyledButton
            as="span"
            transition="all 0.5s ease 0.4s"
            my="1rem"
            variant="link"
            color="gray"
            fontWeight="normal"
            fontSize="1.5rem"
          >
            Documentation
          </StyledButton>
        </ChakraLink>
        <ChakraLink
          href="https://docs.smartinvoice.xyz/misc/get-support"
          isExternal
          _hover={{}}
        >
          <StyledButton
            as="span"
            transition="all 0.5s ease 0.4s"
            my="1rem"
            variant="link"
            color="gray"
            fontWeight="normal"
            fontSize="1.5rem"
          >
            Support
          </StyledButton>
        </ChakraLink>
      </Flex>
    </Flex>
  );
};
