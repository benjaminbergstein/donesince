import React, { useEffect, useRef, useState } from 'react'

interface Props {
  placeholder?: string
  type?: string
  value?: string
  onChange: (value: string) => void
  onFocus?: () => void
}

import { default as InputFace } from './Input'

const TextInput: React.FC<Props> = ({
  value: initialValue = "",
  type: inputType = 'text',
  onChange = () => {},
  onFocus = () => {},
  placeholder = '',
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<string>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = () => {
    if (ref.current === null) return
    const { value: newValue } = ref.current
    setValue(newValue)
    onChange(newValue)
  }

  return <InputFace
    placeholder={placeholder}
    type={inputType}
    value={value}
    ref={ref}
    onFocus={onFocus}
    onChange={handleChange}
  />
}

export default TextInput
