import { render } from "@testing-library/react";
import React from "react";
import { ConnectWeb3 } from "./ConnectWeb3";

describe("ConnectWeb3", () => {
  it("should render", () => {
    const view = render(<ConnectWeb3 />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
