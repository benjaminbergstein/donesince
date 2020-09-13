import React, { useState } from 'react'
import styled from "styled-components";
import Box from "./Box";

const ButtonFace = styled(Box)`
cursor: pointer;
`

ButtonFace.defaultProps = {
  borderRadius: "3px",
  // boxShadow: "0px 1px 2px 0px rgba(90, 90, 90, 0.4)",
  bg: "#ccc",
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  display: 'flex',
  flex: "1",
}

interface ThemeConfig {
  bg: string
  borderColor: string
  borderRadius?: number
}

interface Theme {
  normal: ThemeConfig
  hover: ThemeConfig
}

const Themes: { [name: string]: Theme } = {
  default: {
    normal: {
      bg: 'grays.bg.middlest',
      borderColor: 'grays.bg.lighter',
    },
    hover: {
      bg: 'grays.bg.middler',
      borderColor: 'grays.bg.lighter',
    },
  },
  borderless: {
    normal: {
      bg: 'grays.bg.lightest',
      borderColor: 'transparent',
      borderRadius: 0,
    },
    hover: {
      bg: 'grays.bg.lighter',
      borderColor: 'transparent',
      borderRadius: 0,
    },
  },
  white: {
    normal: {
      bg: '#fff',
      borderColor: '#ccc',
    },
    hover: {
      bg: '#eee',
      borderColor: '#ccc',
    },
  },
  success: {
    normal: {
      bg: 'accent.success',
      borderColor: 'transparent',
    },
    hover: {
      bg: 'accent.success',
      borderColor: 'transparent',
    },
  }
}

const ButtonElement = styled.button<{ align: string }>`
background: transparent;
padding: 10px 15px;
border: none;
flex: 1;
text-align: ${(props) => props.align};
`

interface Props {
  theme?: string
  onClick?: (e?: React.MouseEvent) => void,
  align?: string,
}

const Button: React.FC<Props> = ({
  onClick = () => {},
  theme = 'default',
  align = 'center',
  children,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const themeProps = Themes[theme][isHover ? 'hover' : 'normal']

  return <ButtonFace
    onClick={onClick}
    onMouseEnter={() => { setIsHover(true) }}
    onMouseLeave={() => { setIsHover(false) }}
    {...themeProps}
  ><ButtonElement align={align}>{children}</ButtonElement></ButtonFace>
}

export default Button;
