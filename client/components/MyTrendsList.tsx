import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { formatInterval } from '../utils/time'

import { Trend } from '../apollo/types'
import { MY_TRENDS } from '../apollo/queries'

import Box from '../system/Box'
import Card from '../system/Card'

import RecordSingleActivity from '../components/RecordSingleActivity'

const pollInterval = 5000

const MyTrendsList: React.FC<{}> = () => {
  const { data } = useQuery(MY_TRENDS, { pollInterval })
  if (!data) return null

  const { activityTrends } = data

  return <>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      maxWidth="500px"
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
        <Box marginRight="10px" marginBottom="10px" flex="1">
          <Card>
            <div>{name} ({countRecords})</div>
            <div>Usually every {formatInterval(averageInterval)}</div>
            <div>Last {formatInterval((+new Date - (+new Date(lastRecordedAt))) / 1000 / 3600)} ago</div>
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
