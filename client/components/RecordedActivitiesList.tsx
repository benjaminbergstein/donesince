import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import {
  RecordedActivity,
} from '../apollo/types'

import { MY_ACTIVITIES } from '../apollo/queries'

const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp))
  return date.toString()
}

const RecordedActivitiesList: React.FC<{}> = () => {
  const { data } = useQuery(MY_ACTIVITIES)
  if (!data) return null

  const { recordedActivities } = data
  return <>
    <h1>Recorded activities</h1>

    {recordedActivities.map(({ recordedAt, activityType: { name: activityName } }: RecordedActivity) => (
      <>
        <div>{formatDate(recordedAt)}</div>
        <div>{activityName}</div>
      </>
    ))}
  </>
}

export default RecordedActivitiesList
