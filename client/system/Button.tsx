import React from 'react'
import styled from "styled-components";
import SpaceProps from "styled-system"
import Box from "./Box";

const ButtonFace = styled(Box)`
  cursor: pointer;
`;

ButtonFace.defaultProps = {
  padding: "10px 15px",
  borderRadius: "3px",
  boxShadow: "0px 1px 2px 0px rgba(90, 90, 90, 0.4)",
  background: "#ccc",
};

interface Props {
  onClick: (e?: Event) => void,
}

const Button: React.FC<Props & SpaceProps> = ({
  onClick,
  children,
  ...spaceProps
}) => {
  return <ButtonFace
    onClick={onClick}
    {...spaceProps}
  >{children}</ButtonFace>
}

export default Button;
