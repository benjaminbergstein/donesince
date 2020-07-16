import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import FlashContext from '../contexts/FlashContext'

import Button from '../system/Button'
import Box from '../system/Box'
import Message from '../system/Message'

import { ActivityType } from '../apollo/types'

import {
  RECORD_ACTIVITY,
  MY_ACTIVITIES,
} from '../apollo/queries'

interface Props {
  activityType: ActivityType
  label?: string
}

const RecordSingleActivity: React.FC<Props> = ({ activityType, label }) => {
  const { addFlash } = useContext(FlashContext)

  const { id: activityTypeId, name } = activityType
  const [recordActivity, { called, error }] = useMutation(RECORD_ACTIVITY, {
    variables: { activityTypeId },
    onCompleted() {
      addFlash("Activity recorded!")
    },
    update(cache, { data: { recordActivity } }) {
      const cachedData = cache.readQuery({ query: MY_ACTIVITIES })
      const { recordedActivities } = cachedData
      const { activityTypeId } = recordActivity
      const activityType = data.listActivityTypes.filter(
        ({ id }) => {
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

  return <Button onClick={recordActivity}>{label || name}</Button>
}

export default RecordSingleActivity
