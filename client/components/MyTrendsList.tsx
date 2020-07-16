import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { Trend } from '../apollo/types'
import { MY_TRENDS } from '../apollo/queries'

import Box from '../system/Box'
import Card from '../system/Card'

import RecordSingleActivity from '../components/RecordSingleActivity'

const formatInterval = (interval: float) => {
  const hours = Math.floor(interval)
  const minutes = Math.floor(interval * 60) % 60
  return `${hours > 0 ? `${hours} hours, ` : ""}${minutes} mins`
}

const pollInterval = 15000

const MyTrendsList: React.FC<{}> = () => {
  const { data } = useQuery(MY_TRENDS, { pollInterval })
  if (!data) return null

  const { activityTrends } = data

  return <>
    <h1>My trends</h1>

    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {activityTrends.map(({
        activityTypeId,
        name,
        averageInterval,
        lastRecordedAt,
        countRecords,
      }: Trend) => (
        <Box width="calc(50% - 10px)" marginRight="10px" marginBottom="10px">
          <Card>
            <div>{name} ({countRecords})</div>
            <div>Usually every {formatInterval(averageInterval)}</div>
            <div>Last {formatInterval((+new Date - new Date(lastRecordedAt)) / 1000 / 3600)} ago</div>
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
