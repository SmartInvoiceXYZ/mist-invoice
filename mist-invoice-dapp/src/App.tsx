import React from "react";
import "./App.css";
import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  Switch,
} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { Global } from "@emotion/react";
import { BrowserRouter, Route } from "react-router-dom";
import { Web3ContextProvider } from "./context";
import { Home } from "./pages/Home";
import { globalStyles } from "./theme";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandler } from "./components/ErrorHandler";
import { Layout } from "./shared/Layout";
import { SelectInvoiceType } from "./pages/SelectInvoiceType";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <Global styles={globalStyles} />
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Web3ContextProvider>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<SelectInvoiceType />} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </Web3ContextProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
