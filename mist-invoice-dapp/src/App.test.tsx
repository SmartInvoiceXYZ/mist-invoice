import { render } from "@testing-library/react";
import React from "react";
import App from "./App";

jest.mock("./pages/Home", () => () => <div>Home</div>);
jest.mock("./pages/SelectInvoiceType", () => () => (
  <div>SelectInvoiceType</div>
));
jest.mock("./shared/Layout", () => (children: React.ReactElement) => <div test-id="div:layout">{children}</div>);

it("App renders", () => {
  const view = render(<App />);

  expect(view.asFragment()).toMatchSnapshot();
});
