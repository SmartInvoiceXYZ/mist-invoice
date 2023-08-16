import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/Home", () => () => <div>Home</div>);
jest.mock("./pages/SelectInvoiceType", () => () => (
  <div>SelectInvoiceType</div>
));

it("App renders", () => {
  const view = render(<App />);

  expect(view.asFragment()).toMatchSnapshot();
});