import React from "react";

import { StyledButton } from "./StyledButton";

export type NavButtonProps = {
  onClick: () => void;
};

export const NavButton: React.FC<React.PropsWithChildren<NavButtonProps>> = ({
  onClick,
  children,
}) => (
  <StyledButton
    onClick={onClick}
    transition="all 0.5s ease 0.4s"
    my="1rem"
    variant="link"
    color="blue.1"
    fontWeight="normal"
    fontSize="1.5rem"
  >
    {children}
  </StyledButton>
);
