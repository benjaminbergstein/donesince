import React from 'react'
import styled from 'styled-components'

const InputFace = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  height: 1.5rem;
  outline: none;

  &:focus {
    box-shadow: ${(props) => props.theme.shadows.box[0]};
  }
`

interface InputProps {
  placeholder?: string
  type?: string
  value: string
  onChange: (val: string) => void
  onFocus?: () => void
}

const Input: React.FC<InputProps> = ({
  placeholder = "",
  type = "text",
  onChange,
  value,
  onFocus = () => {},
}) => (
  <InputFace
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onFocus={onFocus}
  />
)

export default Input
