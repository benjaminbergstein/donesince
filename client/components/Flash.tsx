import React, { useContext } from 'react'

import FlashContext, { useFlashState, FlashState } from '../contexts/FlashContext'
import Message from '../system/Message'

const Flash: React.FC<{}> = () => {
  const flashState: FlashState = useContext(FlashContext)
  const { messages } = flashState

  return <>
    {messages.map((message) => (
      <Message>{message}</Message>
    ))}
  </>
}

export const FlashProvider: React.FC<{}> = ({ children }) => {
  const flashState: FlashState = useFlashState()

  return <FlashContext.Provider value={flashState}>
    {children}
  </FlashContext.Provider>
}

export default Flash
