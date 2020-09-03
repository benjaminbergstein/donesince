import Link from 'next/link'
import React, { useContext } from 'react'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import { formatInterval } from '../utils/time'

import { Trend } from '../apollo/types'

import Box from '../system/Box'
import Card from '../system/Card'

import RecordSingleActivity from '../components/RecordSingleActivity'

const MyTrendsList: React.FC<{}> = () => {
  const syncActivityState: SyncActivityState = useContext(SyncActivityContext)
  const { activityTrends } = syncActivityState

  if (activityTrends.length === 0) return null

  return <>
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      maxWidth="500px"
      margin="0 auto"
      alignItems="center"
      justifyContent="center"
    >
      {activityTrends.map(({
        activityTypeId,
        name,
        averageInterval,
        lastRecordedAt,
        countRecords,
      }: Trend) => (
        <Box marginRight="20px" marginBottom="20px" flex="1" width="100%">
          <Card>
            <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="10px">
              <Box>
                <Link href={`/activity-type/${activityTypeId}`}>
                  <a>
                    {name} ({countRecords})
                  </a>
                </Link>
              </Box>
              <Box>
                {averageInterval > 0 && <div>Usually every {formatInterval(averageInterval)}</div>}
                {averageInterval < 0 && <div>Not enough information.</div>}
                <Box marginTop='5px'>Last {formatInterval((+new Date - (+new Date(lastRecordedAt))) / 1000 / 3600)} ago</Box>
              </Box>
            </Box>
            <div>
              <RecordSingleActivity
                activityType={{ id: activityTypeId, name }}
                label="Record"
              />
            </div>
          </Card>
        </Box>
      ))}
    </Box>
  </>
}

export default MyTrendsList
