import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import Button from '../system/Button'
import Box from '../system/Box'

import {
  ActivityType,
//   RecordedActivity,
} from '../apollo/types'

import {
  LIST_ACTIVITY_TYPES,
  RECORD_ACTIVITY,
  MY_ACTIVITIES,
} from '../apollo/queries'

const RecordActivity: React.FC<{}> = () => {
  const { data } = useQuery(LIST_ACTIVITY_TYPES)
  const [recordActivity] = useMutation(RECORD_ACTIVITY, {
    update(cache, { data: { recordActivity } }) {
      const cachedData = cache.readQuery({ query: MY_ACTIVITIES })
      const { recordedActivities } = cachedData
      const { activityTypeId } = recordActivity
      const activityType = data.listActivityTypes.filter(
        ({ id }) => {
          console.log(id, activityTypeId, id === activityTypeId)
          return id === activityTypeId
        }
      )[0]
      cache.writeQuery({
        query: MY_ACTIVITIES,
        data: {
          recordedActivities: [
            ...recordedActivities,
            { ...recordActivity, activityType },
          ],
        },
      })
    },
  })

  if (!data) return null

  const { listActivityTypes } = data

  const recordActivityWithId= (activityTypeId) => () => {
    recordActivity({ variables: { activityTypeId } })
  }

  return <>
    <h1>Record an Activity</h1>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {listActivityTypes.map(({ id, name }: ActivityType) => (
        <Button
          marginRight="10px"
          marginBottom="10px"
          onClick={recordActivityWithId(id)}
        >{name}</Button>
      ))}
    </Box>
  </>
}

export default RecordActivity
