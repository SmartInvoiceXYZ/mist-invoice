import { render } from "@testing-library/react";
import { useContext } from "react";

import React from "react";
import { MistContext, MistContextProvider } from "./MistContext";

jest.mock("@gnosis.pm/safe-apps-web3modal");
jest.mock("@walletconnect/web3-provider");
jest.mock("web3");

jest.mock("react-indexed-db-hook", () => ({
  useIndexedDB: jest.fn().mockImplementation(() => ({
    getByID: jest.fn(),
    add: jest.fn()
  }))
}));

const TestingComponent = () => {
  const { data, loading } = useContext(MistContext);

  return (
    <div>
      {loading ? (
        <div data-testid="div:loader">Loading...</div>
      ) : data ? (
        <div data-testid="div:data">
          <p data-testid="p:merkle-root">Merkle Root: {data.merkleRoot}</p>
          <p data-testid="p:client-random">
            Client Random: {data.clientRandom}
          </p>
          <p data-testid="p:client-key">Client Key: {data.clientKey}</p>
          <p data-testid="p:provider-random">
            Provider Random: {data.providerRandom}
          </p>
          <p data-testid="p:provider-key">
            Provider Random: {data.providerKey}
          </p>
        </div>
      ) : (
        <div data-testid="div:data">No data</div>
      )}
    </div>
  );
};

describe("MistContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render", () => {
    const view = render(
      <MistContextProvider>
        <TestingComponent />
      </MistContextProvider>
    );
    expect(view.asFragment()).toMatchSnapshot();
  });
});
