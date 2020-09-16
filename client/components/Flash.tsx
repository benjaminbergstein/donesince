import React, { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'

import FlashContext, { useFlashState, FlashState } from '../contexts/FlashContext'

import Message from '../system/Message'
import Box from '../system/Box'
import Button from '../system/Button'

const Flash: React.FC<{}> = () => {
  const flashState: FlashState = useContext(FlashContext)
  const { clear, messages } = flashState

  return <Box
    position="fixed"
    bottom="0"
    right="0"
    width="80%"
    zIndex={1000}
    padding="10px"
  >
    {messages.length > 0 && (
      <Box marginBottom="10px" flexDirection="row" display="flex" justifyContent="flex-end">
        <Box width="85px">
          <Button theme="warning" onClick={() => clear()}>
            <Box display="flex" justifyContent="space-between" flexDirection="row">
              <Box><FaTimes /></Box>
              <Box>Clear</Box>
            </Box>
          </Button>
        </Box>
      </Box>
    )}
    {messages.map((message) => (
      <Message>{message}</Message>
    ))}
  </Box>
}

export const FlashProvider: React.FC<{}> = ({ children }) => {
  const flashState: FlashState = useFlashState()

  return <FlashContext.Provider value={flashState}>
    {children}
  </FlashContext.Provider>
}

export default Flash
