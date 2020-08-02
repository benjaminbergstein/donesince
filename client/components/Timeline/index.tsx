import React, { useContext } from 'react'

import { formatInterval } from '../../utils/time'

import SyncActivityContext, { SyncActivityState } from '../../contexts/SyncActivityContext'

import { TimelineStat } from '../../apollo/types'

import Box from '../../system/Box'
import Text from '../../system/Text'
import ActivityLine from './ActivityLine'

const Timeline: React.FC<{}> = () => {
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
          recordedAt,
          humanReadableDate,
          ofDay
        }: TimelineStat) => (
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            position="relative"
          >
            {ofDay === 1 && <Box
              paddingTop="1em"
              paddingBottom="1em"
            >
              <Text
                color="grays.text.light"
                fontSize={1}
                fontWeight={3}
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >{humanReadableDate}</Text>
            </Box>}
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

export default Timeline
