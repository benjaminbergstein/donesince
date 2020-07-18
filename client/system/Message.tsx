import React, { useState } from 'react'
import styled from 'styled-components'

import Box from '../system/Box'
import Text from '../system/Text'

enum Theme {
  Success = 'success',
  Warning = 'warning',
}

const colors: { [theme: Theme]: string } = {
  success: '#AEF6C7',
  warning: '#FFA987',
}

const CloseBtn = styled.span`
  cursor: pointer;
`

interface Props {
  canHide?: boolean
  theme?: Theme
}

const Message: React.FC<Props> = ({
  children,
  theme = Theme.Success,
  canHide = true,
}) => {
  const [hidden, setHidden] = useState<boolean>(false)

  if (hidden) return null

  return <Box
    backgroundColor={colors[theme]}
    borderRadius="6px"
    padding="10px"
    marginBottom="10px"
    display="flex"
    justifyContent="space-between"
  >
    <Text color="#001514" fontWeight="bold">{children}</Text>
    {canHide && <CloseBtn onClick={() => setHidden(true)}>&times;</CloseBtn>}
  </Box>
}

export default Message
