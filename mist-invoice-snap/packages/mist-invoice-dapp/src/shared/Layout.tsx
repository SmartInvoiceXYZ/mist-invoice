import { Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { usePathname } from 'next/navigation';

import { Web3Context } from '../context';
import { ChainId, SUPPORTED_NETWORKS } from '../utils';
import { ConnectWeb3 } from './ConnectWeb3';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { chainId } = useContext(Web3Context);
  const pathname = usePathname();
  const isOpenPath = pathname === '/' || pathname === '/contracts';
  const isValid =
    (chainId && SUPPORTED_NETWORKS.indexOf(chainId as ChainId) !== -1) ||
    isOpenPath;

  console.log(isValid, chainId);

  return (
    <>
      <Flex
        position="relative"
        w="100%"
        direction="column"
        justify="center"
        align="center"
        bg="#F5F6F8"
        h="100%"
        minH="100vh"
        overflowX="hidden"
        bgSize="cover"
        color="#323C47"
      >
        {/* <NavBar /> {isValid ? children : <ConnectWeb3 />} <Footer /> */}
        <Header />
        <Flex
          flexGrow={1}
          position="relative"
          w="100%"
          direction="column"
          justify="center"
          align="center"
          h="100%"
        >
          {isValid ? children : <ConnectWeb3 />}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};