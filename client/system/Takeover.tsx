import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa'

import Box from './Box'
import Text from './Text'

const Wrapper = styled(Box)<{ isVisible: boolean }>`
  transition: transform 600ms;
  transform: translateY(${(props) => props.isVisible ? '0px' : '100vh'});
`

interface Props {
  isVisible: boolean
  onClose: () => void
}

const Takeover: React.FC<Props> = ({
  children,
  isVisible,
  onClose,
}) => {
  const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined)

  const height = windowHeight === undefined ? '100%' : windowHeight - 30 + 'px'

  useLayoutEffect(() => {
    const captureHeight = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', captureHeight)
    captureHeight()

    return () => {
      window.removeEventListener('resize', captureHeight)
    }
  }, [])

  return <Wrapper
    position="fixed"
    left="0"
    width="100%"
    height={height}
    display="flex"
    zIndex={1000}
    flexDirection="column"
    isVisible={isVisible}
  >
    <Box
      onClick={() => { onClose() }}
      position="absolute"
      right="10px"
      top="10px"
      zIndex={1000}
    >
      <Text color="grays.text.medium">
        <FaTimes />
      </Text>
    </Box>
    {children}
  </Wrapper>
}

export default Takeover
