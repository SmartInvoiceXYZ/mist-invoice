import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));

describe("Layout", () => {
  it("should render", () => {
    const view = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    expect(view.asFragment()).toMatchSnapshot();
  });
});
