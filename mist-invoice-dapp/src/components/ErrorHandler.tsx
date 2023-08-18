import { FallbackProps } from "react-error-boundary";

export const ErrorHandler: React.FC<FallbackProps> = ({
  error,
}) => (
  <>
    <h1>Error</h1>
    <pre>{error.message}</pre>
  </>
);
