import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { Trend } from '../apollo/types'
import { MY_TRENDS } from '../apollo/queries'

import Box from '../system/Box'
import Card from '../system/Card'

const formatInterval = (interval: float) => {
  const hours = Math.floor(interval)
  const minutes = Math.floor(interval * 60) % 60
  return `${hours > 0 ? `${hours} hours, ` : ""}${minutes} mins`
}

const pollInterval = 15

const MyTrendsList: React.FC<{}> = () => {
  const { data } = useQuery(MY_TRENDS, { pollInterval })
  if (!data) return null

  const { activityTrends } = data
  return <>
    <h1>My trends</h1>

    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {activityTrends.map(({ name, averageInterval }: Trend) => (
        <Box width="calc(50% - 10px)" marginRight="10px" marginBottom="10px">
          <Card>
            <div>{name}</div>
            <div>{formatInterval(averageInterval)}</div>
          </Card>
        </Box>
      ))}
    </Box>
  </>
}

export default MyTrendsList
