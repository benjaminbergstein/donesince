import React, { createContext } from 'react'

interface IScrollContext {
  scroll: number
  setScroll: (scroll: number) => void
}

const ScrollContext: React.Context<IScrollContext> = createContext({
  scroll: 0,
  setScroll: (n: number) => { n }
})

export default ScrollContext
