import React, { useEffect, useRef, useState } from 'react'

interface Props {
  value?: number
  onChange: (value: number) => void
}

import { default as InputFace } from './Input'

const TextInput: React.FC<Props> = ({
  value: initialValue = 0,
  onChange = () => {}
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = () => {
    if (ref.current === null) return
    const { value: newValue } = ref.current
    const newValueInt = newValue === "" ? 0 : parseInt(newValue)
    setValue(newValueInt)
    onChange(newValueInt)
  }

  return <InputFace
    type="text"
    value={value}
    ref={ref}
    onChange={handleChange}
  />
}

export default TextInput
