import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import Button from '../system/Button'
import Box from '../system/Box'
import Message from '../system/Message'

import RecordSingleActivity from '../components/RecordSingleActivity'
import useSearchActivityTypes from '../hooks/useSearchActivityTypes'
import { ActivityType } from '../apollo/types'

import {
  LIST_ACTIVITY_TYPES,
  RECORD_ACTIVITY,
  MY_ACTIVITIES,
} from '../apollo/queries'

interface Props {
  searchResults: ActivityType[]
}

const RecordActivity: React.FC<Props> = ({ children, searchResults: activityTypes }) => {
  const [searchResults, q, setQ] = useSearchActivityTypes({ minLength: 3 })
  const [recordActivity, { called, error }] = useMutation(RECORD_ACTIVITY, {
    update(cache, { data: { recordActivity } }) {
      const cachedData = cache.readQuery({ query: MY_ACTIVITIES })
      const { recordedActivities } = cachedData
      const { activityTypeId } = recordActivity
      const activityType = data.listActivityTypes.filter(
        ({ id }) => id === activityTypeId
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

  const showSuccessMessage = called && !error

  const recordActivityWithId = (activityTypeId) => () => {
    recordActivity({ variables: { activityTypeId } })
  }

  return <>
    <h1>Record an Activity</h1>

    <Box display="flex" flexDirection="row" width="50%">
      <Box flex="1">Search Activities</Box>
      <Box flex="1"><input type="search" value={q} onChange={(e) => setQ(e.target.value)} /></Box>
    </Box>

    {showSuccessMessage && (
      <Message>
        Activity recorded!
      </Message>
    )}

    {searchResults && <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {searchResults.map((activityType: ActivityType) => (
        <Box
          marginRight="10px"
          marginBottom="10px"
        >
          <RecordSingleActivity activityType={activityType} />
        </Box>
      ))}
    </Box>}
  </>
}

export default RecordActivity
