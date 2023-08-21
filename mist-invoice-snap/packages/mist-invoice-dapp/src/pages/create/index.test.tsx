import { render } from "@testing-library/react";
import React from "react";
import SelectInvoiceType from ".";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../context/Web3Context", () => ({
  useWeb3: () => ({
    connectAccount: jest.fn(),
    account: "0x123456789",
  }),
}));

describe("create", () => {
  it("should render", () => {
    const view = render(<SelectInvoiceType />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
