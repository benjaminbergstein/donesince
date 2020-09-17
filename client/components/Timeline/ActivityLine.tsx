import React from 'react'

import { formatInterval } from '../../utils/time'

import Box from '../../system/Box'

interface LineProps {
  height: number
  dashed?: boolean
}

interface Props {
  sinceLast: number
}

const Line: React.FC<LineProps> = ({ height, dashed = false, children }) => {
  if (height < 0) return null
  return <Box
    position="relative"
    display="flex"
    borderLeftWidth='3px'
    borderLeftStyle={dashed ? 'dashed' : 'solid'}
    borderLeftColor='accent.success'
    height={(height < 0 ? 0 : height) + 'px'}
    width="25%"
    minHeight="1em"
    padding='10px 10px 10px 20px'
    marginLeft="50%"
    flexDirection="row"
    alignItems="center"
  >{children}</Box>
}

const ActivityLine: React.FC<Props> = ({
  sinceLast,
}) => {
  const sinceLastMinutes = sinceLast * 60
  const isLong = sinceLastMinutes > 200
  const segmentHeight = (isLong ? 100 : sinceLastMinutes / 2) - 30

  return <Box
    width="100%"
    margin="auto"
  >
    {sinceLast > 0 && <Line height={segmentHeight} />}
    {sinceLast > 0 && <Line height={60} dashed={isLong}>
      <span style={{ whiteSpace: 'nowrap' }}>
        {formatInterval(sinceLast)}
      </span>
    </Line>}
    {sinceLast > 0 && <Line height={segmentHeight} />}
  </Box>
}

export default ActivityLine
