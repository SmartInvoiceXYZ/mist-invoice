import { Flex } from "@chakra-ui/react";
import React from "react";

import { isBackdropFilterSupported } from "../utils";

export type ContainerProps = {
  overlay?: boolean;
};

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  overlay,
  ...props
}) => {
  const overlayStyles = isBackdropFilterSupported()
    ? {
        backgroundColor: "black30",
        backdropFilter: "blur(8px)",
      }
    : {
        backgroundColor: "black80",
      };
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      w="calc(100% - 2rem)"
      h="100%"
      flex={1}
      m="1rem"
      css={overlay ? overlayStyles : {}}
      {...props}
    >
      {children}
    </Flex>
  );
};
