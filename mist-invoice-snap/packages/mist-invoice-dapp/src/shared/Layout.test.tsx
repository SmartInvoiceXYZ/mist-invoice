import { render } from "@testing-library/react";
import React from "react";
import { Web3ContextProvider } from "../context";
import { Layout } from "./Layout";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));
const mockPathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: mockPathname,
}));

describe("Layout", () => {
  it("should render", () => {
    // arrange
    mockPathname.mockReturnValue("/");

    // act
    const view = render(
      <Web3ContextProvider>
        <Layout />
      </Web3ContextProvider>
    );

    // assert
    expect(view.asFragment()).toMatchSnapshot();
  });
});
