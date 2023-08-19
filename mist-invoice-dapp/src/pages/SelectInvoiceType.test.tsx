import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SelectInvoiceType from "./SelectInvoiceType";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));

jest.mock("../context/Web3Context", () => ({
  useWeb3: () => ({
    connectAccount: jest.fn(),
    account: "0x123456789",
  }),
}));

describe("SelectInvoiceType", () => {
  it("should render", () => {
    const view = render(
      <MemoryRouter>
        <SelectInvoiceType />
      </MemoryRouter>,
    );

    expect(view.asFragment()).toMatchSnapshot();
  });
});
