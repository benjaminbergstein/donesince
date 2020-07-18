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

const messages: string[] = []

const FlashContext = React.createContext<FlashState>({
  messages,
  addFlash: (message) => { messages.push(message) }
})

export default FlashContext
