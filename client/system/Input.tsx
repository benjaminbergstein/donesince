import React from 'react'
import styled from 'styled-components'

const InputFace = styled.input`
  width: 100%;
  font-size: 16px;
`

interface InputProps {
  placeholder?: string
  type?: string
  value: string
  onChange: (val: string) => void
}

const Input: React.FC<InputProps> = ({
  placeholder = "",
  type = "text",
  onChange,
  value,
}) => (
  <InputFace
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)

export default Input
