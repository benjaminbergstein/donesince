import React from 'react'

import Box from '../../system/Box'
import Text from '../../system/Text'

interface Props {
  label: string,
  value: string,
  theme: string | undefined,
}

const Statistic: React.FC<Props> = ({
  label,
  value,
  theme = undefined,
}) => (
  <Box flex="1">
    <Box display="flex" justifyContent="center" alignItems="center">
      <Text fontSize={2}>
        {label}
      </Text>
    </Box>
    <Box
      flex="1"
      minHeight="3em"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Text color={`accent.${theme || 'text'}`}>
        {value}
      </Text>
    </Box>
  </Box>
)

export default Statistic
