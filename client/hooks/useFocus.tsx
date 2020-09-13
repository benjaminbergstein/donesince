import React, { useRef, useState, useEffect } from 'react'

type SetIsFocused = (isFocused: boolean) => void
type IsFocusHook = [boolean, SetIsFocused, React.RefObject<HTMLDivElement>]

const useIsFocus: () => IsFocusHook = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listener = (e: Event) => {
      if (wrapperRef.current === null) return
      const isContained = wrapperRef.current.contains(e.target as Node)
      if (!isContained) setIsFocused(false)
    }

    document.addEventListener('click', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [])

  return [isFocused, setIsFocused, wrapperRef]
}

export default useIsFocus
