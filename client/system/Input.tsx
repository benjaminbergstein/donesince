import styled from 'styled-components'

const Input = styled.input`
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

export default Input
