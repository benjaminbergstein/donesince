import React, { useContext } from 'react'

import { formatInterval } from '../../utils/time'
import useFocus from '../../hooks/useFocus'

import DeviceContext from '../../contexts/DeviceContext'

import Box from '../../system/Box'

import EditRecordedAt from './EditRecordedAt'

interface LineProps {
  height: number
  dashed?: boolean
}

interface Props {
  sinceLast: number
  recordedAt: string
  recordedActivityId: number
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
  recordedAt,
  recordedActivityId,
}) => {
  const { isPhone } = useContext(DeviceContext)
  const [isFocused, setIsFocused, wrapperRef] = useFocus()
  const sinceLastMinutes = sinceLast * 60
  const isLong = sinceLastMinutes > 200
  const segmentHeight = (isLong ? 100 : sinceLastMinutes / 2) - 30

  return <Box
    ref={wrapperRef}
    width="100%"
    margin="auto"
    onTouchStart={() => { isPhone && setIsFocused(true) }}
    onClick={() => { isPhone && setIsFocused(true) }}
    onMouseEnter={() => { !isPhone && setIsFocused(true) }}
    onMouseLeave={() => { !isPhone && setIsFocused(false) }}
  >
    {sinceLast > 0 && <Line height={segmentHeight} />}
    {sinceLast > 0 && <Line height={60} dashed={isLong}>
      <span style={{ whiteSpace: 'nowrap' }}>
        {formatInterval(sinceLast)}
        <EditRecordedAt
          isHovered={isFocused}
          recordedAt={recordedAt}
          recordedActivityId={recordedActivityId}
        />
      </span>
    </Line>}
    {sinceLast > 0 && <Line height={segmentHeight} />}
  </Box>
}

export default ActivityLine
