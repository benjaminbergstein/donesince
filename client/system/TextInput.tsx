import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type InputType = string | number | null

interface Props {
  type?: 'text' | 'number'
  value?: InputType
  onChange: (value: InputType) => void
}

const InputFace = styled.input`
  width: 100%;
`

const TextInput: React.FC<Props> = ({
  type = 'text',
  value: initialValue = null,
  onChange = () => {}
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<InputType>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = () => {
    const { value: newValue } = ref.current
    setValue(newValue)
    onChange(newValue)
  }

  return <InputFace
    type={type}
    value={value}
    ref={ref}
    onChange={handleChange}
  />
}

export default TextInput
