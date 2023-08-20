import { render, waitFor } from "@testing-library/react";
import React, { useContext } from "react";

import { MistContext, MistContextProvider } from "./MistContext";
import { Web3Context } from "./Web3Context";

const mockGetByID = jest.fn();
const mockAdd = jest.fn();
jest.mock("react-indexed-db-hook", () => ({
  useIndexedDB: jest.fn().mockImplementation(() => ({
    getByID: mockGetByID,
    add: mockAdd
  }))
}));

const TestingComponent = () => {
  const { account } = useContext(Web3Context);
  const { data, loading } = useContext(MistContext);

  return (
    <div>
      {loading ? (
        <div data-testid="div:loader">Loading...</div>
      ) : data ? (
        <div data-testid="div:data">
          <p data-testid="p:account">Account: {account}</p>
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

  it("should render saved data", async () => {
    // arrange
    mockGetByID.mockResolvedValueOnce({
      merkleRoot: "0xmerkleroot",
      clientRandom: [
        0x55, 0x1c, 0x2d, 0x18, 0x53, 0x98, 0x0c, 0x03, 0xf7, 0x13, 0xbd, 0x6c,
        0x75, 0xa4, 0xbc, 0x9f, 0x07, 0x3b, 0xa4, 0xc3, 0x7c, 0xb0, 0x5f, 0x87,
        0xbe, 0x3c, 0xd3, 0x02, 0x3a, 0x17, 0x5b, 0x12
      ],
      providerRandom: [
        0xf3, 0xda, 0xc3, 0x24, 0x52, 0xa2, 0x7b, 0x1d, 0xad, 0xd5, 0x51, 0x5c,
        0x89, 0xd5, 0x8a, 0x5d, 0x19, 0x1e, 0xe7, 0x25, 0xd6, 0xef, 0xa2, 0x8d,
        0xae, 0x42, 0x5d, 0x02, 0x72, 0x15, 0xf9, 0x34
      ],
      clientKey: "0xclientkey",
      providerKey: "0xproviderkey"
    });

    // act
    const view = render(
      <Web3Context.Provider
        value={{
          account: "0xC552C45a61dc22DB0014CFEf092d30B5A8E6327B",
          loading: false,
          connectAccount: jest.fn(),
          disconnect: jest.fn()
        }}
      >
        <MistContextProvider>
          <TestingComponent />
        </MistContextProvider>
      </Web3Context.Provider>
    );

    // assert
    await waitFor(async () => {
      expect(view.getByTestId("div:data")).toBeDefined();
    });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render generated data", async () => {
    // arrange
    mockAdd.mockResolvedValueOnce(1);

    // act
    const view = render(
      <Web3Context.Provider
        value={{
          account: "0xC552C45a61dc22DB0014CFEf092d30B5A8E6327B",
          loading: false,
          connectAccount: jest.fn(),
          disconnect: jest.fn()
        }}
      >
        <MistContextProvider>
          <TestingComponent />
        </MistContextProvider>
      </Web3Context.Provider>
    );

    // assert
    await waitFor(async () => {
      expect(view.getByTestId("div:data")).toBeDefined();
    });
    expect(view.asFragment()).toMatchSnapshot();
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        //merkleRoot: expect.anything(),
        clientRandom: expect.anything(),
        providerRandom: expect.anything(),
        clientKey: expect.anything(),
        providerKey: expect.anything()
      }),
      "0xC552C45a61dc22DB0014CFEf092d30B5A8E6327B"
    );
  });
});
