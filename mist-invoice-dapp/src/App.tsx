// import "./App.css";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { Global } from "@emotion/react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { initDB } from "react-indexed-db-hook";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorHandler } from "./components/ErrorHandler";
import { Web3ContextProvider } from "./context";
import { MistContextProvider } from "./context/MistContext";
import { DBConfig } from "./dbconfig";
import Home from "./pages/Home";
import SelectInvoiceType from "./pages/SelectInvoiceType";
import { Layout } from "./shared/Layout";
import { globalStyles } from "./theme";

initDB(DBConfig);

const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <CSSReset />
    <Global styles={globalStyles} />
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Web3ContextProvider>
        <MistContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<SelectInvoiceType />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </MistContextProvider>
      </Web3ContextProvider>
    </ErrorBoundary>
  </ChakraProvider>
);

export default App;
