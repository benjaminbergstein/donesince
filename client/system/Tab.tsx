import React from 'react'
import styled from 'styled-components'

import Box from './Box'
import Text from './Text'

interface Props {
  label: string,
  onClick: () => void,
  active: boolean
}

const Wrapper = styled(Box)`
  cursor: pointer;
`

Wrapper.defaultProps = {
  padding: "0.5em",
  display: "flex",
  flex: "1",
  justifyContent: "center",
}

const Tab: React.FC<Props> = ({
  label,
  onClick,
  active
}) => {
  return <Wrapper
    borderBottom={active ? "2px solid black" : "2px solid transparent"}
    onClick={() => onClick()}
  >
    <Text fontWeight="bold">{label}</Text>
  </Wrapper>
}

export default Tab
