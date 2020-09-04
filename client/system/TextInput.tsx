import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  value?: string
  onChange: (value: string) => void
}

const InputFace = styled.input`
  width: 100%;
`

const TextInput: React.FC<Props> = ({
  value: initialValue = "",
  onChange = () => {}
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
    type="text"
    value={value}
    ref={ref}
    onChange={handleChange}
  />
}

export default TextInput
