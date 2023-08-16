import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { useContext } from "react";

import { SafeAppWeb3Modal } from "@gnosis.pm/safe-apps-web3modal";
import { Web3Context, Web3ContextProvider } from "./Web3Context";

jest.mock("@gnosis.pm/safe-apps-web3modal");
jest.mock("@walletconnect/web3-provider");
jest.mock("web3");

const TestingComponent = () => {
  const { account, chainId, connectAccount, disconnect, loading, provider } =
    useContext(Web3Context);

  return (
    <div>
      {loading ? (
        <div data-testid="div:loader">Loading...</div>
      ) : !provider ? (
        <button
          type="button"
          onClick={connectAccount}
          data-testid="button:connect"
        >
          Connect
        </button>
      ) : (
        <>
          <p data-testid="p:account">Account: {account}</p>
          <p data-testid="p:chain-id">ChainId: {chainId}</p>
          <button
            type="button"
            onClick={disconnect}
            data-testid="button:disconnect"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

describe("Web3Context", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render", () => {
    const view = render(
      <Web3ContextProvider>
        <TestingComponent />
      </Web3ContextProvider>,
    );
    expect(view.asFragment()).toMatchSnapshot();
  });

  it.skip("should connect to web3", async () => {
    // arrange
    let handlers: Record<string, any> = {};

    (SafeAppWeb3Modal as jest.Mock).mockImplementation(() => ({
      requestProvider: () =>
        new Promise(() => ({
          safe: false,
        })),
      on: (event: string, handler: any) => {
        handlers[event] = handler;
      },
    }));

    const view = render(
      <Web3ContextProvider>
        <TestingComponent />
      </Web3ContextProvider>,
    );

    // act
    const connectButton = screen.getByTestId("button:connect");
    await act(async () => {
      connectButton.click();
    });
    await waitForElementToBeRemoved(screen.queryByTestId("div:loader"));
    await act(async () => {
      handlers.accountsChanged(["0x123"]);
    }); // handlers.chainChanged();

    // assert
    expect(view.asFragment()).toMatchSnapshot();
  });
});
