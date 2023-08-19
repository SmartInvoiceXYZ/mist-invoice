import { render } from "@testing-library/react";
import React from "react";
import { Container } from "./Container";

describe("Container", () => {
  it("should render", () => {
    const view = render(<Container />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
