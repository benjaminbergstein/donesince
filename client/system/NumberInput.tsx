import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  value?: number
  onChange: (value: number) => void
}

const InputFace = styled.input`
  width: 100%;
`

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
    const newValueInt = parseInt(newValue)
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
