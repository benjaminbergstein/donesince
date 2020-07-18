import React from 'react'
import styled from "styled-components";
import Box from "./Box";

const ButtonFace = styled(Box)`
  cursor: pointer;
`;

ButtonFace.defaultProps = {
  padding: "10px 15px",
  borderRadius: "3px",
  boxShadow: "0px 1px 2px 0px rgba(90, 90, 90, 0.4)",
  backgroundColor: "#ccc",
};

interface Props {
  onClick: (e?: React.MouseEvent) => void,
}

const Button: React.FC<Props> = ({
  onClick,
  children,
}) => {
  return <ButtonFace
    onClick={onClick}
  >{children}</ButtonFace>
}

export default Button;
