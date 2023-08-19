import { render } from "@testing-library/react";
import React from "react";
import { ErrorHandler } from "./ErrorHandler";

describe("ErrorHandler", () => {
  const mockResetErrorBoundary = jest.fn();

  it("should render", () => {
    const error = new Error("Test error");
    const view = render(
      <ErrorHandler
        error={error}
        resetErrorBoundary={mockResetErrorBoundary}
      />,
    );

    expect(view.asFragment()).toMatchSnapshot();
  });
});
