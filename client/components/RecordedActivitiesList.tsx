import React, { useContext } from 'react'

import { formatInterval } from '../utils/time'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import {
  TimelineStat,
} from '../apollo/types'

import Box from '../system/Box'

interface Props {
  timeline?: TimelineStat[]
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
              <div>{activityName}</div>
            </Box>

            {sinceLast > 0 && <Box
              display="flex"
              borderLeft='3px solid green'
              height={sinceLast * 60 + 'px'}
              width="25%"
              minHeight="1em"
              padding='10px 10px 10px 20px'
              marginLeft="25%"
              flexDirection="row"
              alignItems="center"
            >
              <span style={{ whiteSpace: 'nowrap' }}>
                {formatInterval(sinceLast)}
              </span>
            </Box>}
          </Box>
        ))}
      </Box>
    </Box>
  </>
}

export default RecordedActivitiesList
