import { render } from "@testing-library/react";
import React from "react";
import App from "./App";

jest.mock("./pages/Home", () => () => <div>Home</div>);
jest.mock("./pages/SelectInvoiceType", () => () => (
  <div test-id="div:select-invoice-type">SelectInvoiceType</div>
));
const mockLayout = jest.fn();
jest.mock("./shared/Layout", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Layout: (props: any) => {
    mockLayout(props);
    const { children } = props;
    return <div test-id="div:layout">{children}</div>;
  }
}));

it("App renders", () => {
  const view = render(<App />);

  expect(view.asFragment()).toMatchSnapshot();
});
