import React from 'react'

import Box from '../system/Box'
import Text from '../system/Text'

const Message: React.FC<{}> = ({ children }) => (
  <Box
    background="green"
    borderRadius="6px"
    padding="10px"
    marginBottom="10px"
  >
    <Text color="white" fontWeight="bold">{children}</Text>
  </Box>
)

export default Message
