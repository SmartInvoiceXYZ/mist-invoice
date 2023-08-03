import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Web3ContextProvider } from "../context";
import { Layout } from "./Layout";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));

describe("Layout", () => {
  it("should render", () => {
    const view = render(
      <Web3ContextProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </Web3ContextProvider>,
    );

    expect(view.asFragment()).toMatchSnapshot();
  });
});
