// import "./App.css";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { Global } from "@emotion/react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { initDB } from "react-indexed-db-hook";

import { ErrorHandler } from "../components/ErrorHandler";
import { Web3ContextProvider } from "../context";
import { MistContextProvider } from "../context/MistContext";
import { DBConfig } from "../dbconfig";
import { Layout } from "../shared/Layout";
import { globalStyles } from "../theme";
import { MetaMaskProvider } from "@/context/MetamaskContext";

initDB(DBConfig);

const MistApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <CSSReset />
    <Global styles={globalStyles} />
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Web3ContextProvider>
        <MetaMaskProvider>
          <MistContextProvider>
            {/* <Layout> */}
            <Component {...pageProps} />
            {/* </Layout> */}
          </MistContextProvider>
        </MetaMaskProvider>
      </Web3ContextProvider>
    </ErrorBoundary>
  </ChakraProvider>
);

export default MistApp;
