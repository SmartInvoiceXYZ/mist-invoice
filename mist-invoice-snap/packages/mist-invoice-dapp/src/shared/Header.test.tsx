import { render } from "@testing-library/react";
import React from "react";
import { Header } from "./Header";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Header", () => {
  it("should render", () => {
    const view = render(<Header />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
