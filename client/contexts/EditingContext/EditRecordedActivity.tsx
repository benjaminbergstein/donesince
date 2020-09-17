import React, { useContext, useState, useEffect } from 'react'
import FlashContext from '../FlashContext'
import EditingContext from '.'
import { useQuery, useMutation } from '@apollo/react-hooks';

import { UPDATE_RECORDED_ACTIVITY } from '../../apollo/queries'
import { FETCH_RECORDED_ACTIVITY } from '../../apollo/queries'
import {
  FetchRecordedActivity,
  FetchRecordedActivity_fetchRecordedActivity as RecordedActivity,
} from '../../apollo/types/FetchRecordedActivity'

import Card from '../../system/Card'
import Button from '../../system/Button'
import Takeover from '../../system/Takeover'
import TimeInput from '../../system/TimeInput'
import DateInput from '../../system/DateInput'

const EditRecordedActivity: React.FC<{}> = () => {
  const { addFlash } = useContext(FlashContext)
  const { setEditingRecordedActivityId, editingRecordedActivityId } = useContext(EditingContext)
  const { data }: { data: FetchRecordedActivity | undefined } = useQuery(FETCH_RECORDED_ACTIVITY, {
    variables: { id: editingRecordedActivityId },
  })
  const [updateRecordedActivity] = useMutation(UPDATE_RECORDED_ACTIVITY, {
    onCompleted() {
      addFlash("Successfully updated recorded activity.")
    },
  })

  const recordedActivity: RecordedActivity | undefined = data?.fetchRecordedActivity
  const name = recordedActivity?.activityType?.name
  const recordedAtDate = recordedActivity ? new Date(parseInt(recordedActivity.recordedAt)) : new Date()
  const [newRecordedAt, setNewRecordedAt] = useState<Date>(new Date())

  useEffect(() => {
    if (editingRecordedActivityId && recordedActivity) {
      setNewRecordedAt(recordedAtDate)
    }
  }, [editingRecordedActivityId, recordedActivity])

  const humanReadableDate = newRecordedAt?.toLocaleTimeString('en-us', {
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: 'America/Los_Angeles'
  })

  const handleRecordedAtChanged: (updatedRecordedAt: Date) => void = (updatedRecordedAt) => {
    setNewRecordedAt(updatedRecordedAt)
  }

  const handleSubmit = () => {
    updateRecordedActivity({
      variables: {
        id: editingRecordedActivityId,
        recordedAt: ''+newRecordedAt,
      },
    })
  }

  return (
    <Takeover
      isVisible={editingRecordedActivityId !== null}
      onClose={() => { setEditingRecordedActivityId(null) }}
    >
      <Card
        position="relative"
        boxShadow="box.2"
        margin="0 3px 0"
        flex="1"
        bg="white"
      >
        "{name}", {humanReadableDate}
        <TimeInput
          onChange={handleRecordedAtChanged}
          value={newRecordedAt}
        />
        <DateInput
          onChange={handleRecordedAtChanged}
          value={newRecordedAt}
        />
        <Button onClick={handleSubmit}>Update</Button>
      </Card>
    </Takeover>
  )
}

export default EditRecordedActivity
