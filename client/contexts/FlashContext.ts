import React, { useState } from 'react'

export interface FlashState {
  addFlash: (message: string) => void
  messages: string[]
}

export const useFlashState = () => {
  const [messages, setFlash] = useState<string[]>([])
  const flashState: FlashState = {
    addFlash(message) {
      setFlash([...messages, message])
    },
    messages,
  }
  return flashState
}

const FlashContext = React.createContext<FlashState>()

export default FlashContext
