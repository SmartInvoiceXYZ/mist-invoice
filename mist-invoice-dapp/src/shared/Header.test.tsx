import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "md",
}));

describe("Header", () => {
  it("should render", () => {
    const view = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(view.asFragment()).toMatchSnapshot();
  });
});
