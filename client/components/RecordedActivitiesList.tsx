import React, { useContext } from 'react'

import { formatInterval } from '../utils/time'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import {
  TimelineStat,
} from '../apollo/types'

import Box from '../system/Box'
import Text from '../system/Text'

const Line: React.FC<{ height: number, dashed?: boolean }> = ({ height, dashed = false, children }) => {
  if (height < 0) return null
  return <Box
    display="flex"
    borderLeftWidth='3px'
    borderLeftStyle={dashed ? 'dashed' : 'solid'}
    borderLeftColor='accent.success'
    height={(height < 0 ? 0 : height) + 'px'}
    width="25%"
    minHeight="1em"
    padding='10px 10px 10px 20px'
    marginLeft="25%"
    flexDirection="row"
    alignItems="center"
  >{children}</Box>
}

const ActivityLine: React.FC<{ sinceLast: number }> = ({ sinceLast }) => {
  const sinceLastMinutes = sinceLast * 60
  const isLong = sinceLastMinutes > 200
  const segmentHeight = (isLong ? 100 : sinceLastMinutes / 2) - 30

  return <>
    {sinceLast > 0 && <Line height={segmentHeight} />}
    {sinceLast > 0 && <Line height={60} dashed={isLong}>
      <span style={{ whiteSpace: 'nowrap' }}>
        {formatInterval(sinceLast)}
      </span>
    </Line>}
    {sinceLast > 0 && <Line height={segmentHeight} />}
  </>
}

const RecordedActivitiesList: React.FC<{}> = () => {
  const syncActivityState: SyncActivityState = useContext(SyncActivityContext)
  const { timeline } = syncActivityState

  if (timeline.length === 0) return null

  return <>
    <Box height="80vh" overflow="hidden">
      <Box
        width="100%"
        paddingRight="15px"
        height="80vh"
        overflowY="auto"
        overflowX="hidden"
      >
        {timeline.map(({
          sinceLast,
          name: activityName,
        }: TimelineStat) => (
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
          >
            <Box marginBottom="15px" marginTop="15px" display="flex" alignItems="center">
              <Text fontWeight="600">{activityName}</Text>
            </Box>

            <ActivityLine sinceLast={sinceLast} />
          </Box>
        ))}
      </Box>
    </Box>
  </>
}

export default RecordedActivitiesList
