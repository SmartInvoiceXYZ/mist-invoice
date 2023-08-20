import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));

describe("Home", () => {
  it("should render", () => {
    const view = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(view.asFragment()).toMatchSnapshot();
  });
});
