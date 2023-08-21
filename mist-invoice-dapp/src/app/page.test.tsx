import { render } from "@testing-library/react";
import React from "react";
import Home from "../pages/Home";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Home", () => {
  it("should render", () => {
    const view = render(<Home />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
