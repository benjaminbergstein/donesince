import React, { useContext } from 'react'

import { formatInterval } from '../../utils/time'

import SyncActivityContext, { SyncActivityState } from '../../contexts/SyncActivityContext'

import { TimelineStat } from '../../apollo/types'

import Box from '../../system/Box'
import Text from '../../system/Text'
import ActivityLine from './ActivityLine'

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
