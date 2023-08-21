// import "./App.css";
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import { Global } from '@emotion/react';
import React, { use, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { initDB } from '../indexeddb';

import { ErrorHandler } from '../components/ErrorHandler';
import { Web3ContextProvider } from '../context';
import { MistContextProvider } from '../context/MistContext';
import { DBConfig } from '../dbconfig';
import { Layout } from '../shared/Layout';
import { globalStyles } from '../theme';
import { MetaMaskProvider } from '@/context/MetamaskContext';

console.log('_app.tsx');

const MistApp = ({ Component, pageProps }: AppProps) => {
  const isClient = typeof window !== 'undefined';
  useEffect(() => {
    if (isClient) initDB(DBConfig);
  }, [isClient]);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <Global styles={globalStyles} />
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Web3ContextProvider>
          <MetaMaskProvider>
            <MistContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MistContextProvider>
          </MetaMaskProvider>
        </Web3ContextProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
};

export default MistApp;
