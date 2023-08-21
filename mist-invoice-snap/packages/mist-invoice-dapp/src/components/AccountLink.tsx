import { Flex, Link, Text } from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Web3Context } from '../context/Web3Context';
import { theme } from '../theme';
import {
  getProfile,
  getAddressLink,
  getResolverInfo,
  getResolverString,
  isKnownResolver,
  Chain,
  ChainId,
} from '../utils';

export type Profile = {
  address: string;
  name: string;
  emoji: string;
  imageHash: string;
  imageUrl: string;
};

export type AccountLinkProps = {
  address?: string;
  chainId?: number;
};

export const AccountLink: React.FC<AccountLinkProps> = ({
  address: inputAddress,
  chainId: inputChainId,
}) => {
  const { chainId: walletChainId } = useContext(Web3Context);
  const address = useMemo(
    () => (inputAddress ? inputAddress.toLowerCase() : undefined),
    [inputAddress],
  );
  const [profile, setProfile] = useState<Profile>();
  const chainId = (inputChainId || walletChainId) as ChainId;
  const isResolver = useMemo(
    () => (chainId && address ? isKnownResolver(chainId, address) : false),
    [chainId, address],
  );

  useEffect(() => {
    let isSubscribed = true;
    if (!isResolver && address && isAddress(address)) {
      getProfile(address).then((p) =>
        isSubscribed ? setProfile(p) : undefined,
      );
    }
    return () => {
      isSubscribed = false;
    };
  }, [address, isResolver]);

  let displayString = useMemo(
    () => (chainId && address ? getResolverString(chainId, address) : ''),
    [chainId, address],
  );

  let imageUrl = useMemo(
    () =>
      chainId && address && isResolver
        ? getResolverInfo(chainId, address).logoUrl
        : undefined,
    [chainId, address, isResolver],
  );

  if (!isResolver && profile) {
    if (profile.name) {
      displayString = profile.name;
    }
    if (profile.imageUrl) {
      imageUrl = profile.imageUrl;
    }
  }

  return (
    <Link
      href={chainId && address ? getAddressLink(chainId, address) : undefined}
      isExternal
      display="inline-flex"
      textAlign="right"
      bgColor="white"
      px="0.25rem"
      _hover={{
        textDecor: 'none',
        bgColor: '#ECECF3',
      }}
      borderRadius="5px"
      alignItems="center"
      fontWeight="bold"
    >
      <Flex
        as="span"
        borderRadius="50%"
        w="1.1rem"
        h="1.1rem"
        overflow="hidden"
        justify="center"
        align="center"
        bgColor="black"
        bgImage={imageUrl && `url(${imageUrl})`}
        border={`1px solid ${theme.colors.white20}`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center center"
      />
      <Text as="span" pl="0.25rem" fontSize="sm">
        {displayString}
      </Text>
    </Link>
  );
};
