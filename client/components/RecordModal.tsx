import React, { useEffect, useContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { v4 as uuidv4 } from 'uuid'

import Button from '../system/Button'
import Text from '../system/Text'
import Box from '../system/Box'
import Card from '../system/Card'
import Takeover from '../system/Takeover'
import DateInput from '../system/DateInput'
import TimeInput from '../system/TimeInput'

import {
  RECORDED_ACTIVITY_RECOMMENDATIONS,
} from '../apollo/queries'

import {
  applyRecommendation,
  getRecommendations,
} from '../utils/recordedActivityTimeRecommendations'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import {
  RecordedActivityRecommendations_recordedActivityTimeRecommendations as RecordedActivityRecommendation,
  RecordedActivityRecommendations,
} from '../types/RecordedActivityRecommendations'

const RecordModal: React.FC<{}> = () => {
  const { data }: { data: RecordedActivityRecommendations } = useQuery(RECORDED_ACTIVITY_RECOMMENDATIONS)
  const [recordedAt, setRecordedAt] = useState<Date>(new Date)
  const {
    modalControl,
    captureUnsyncedActivity,
    recordingActivity,
    dateForRecording,
  }: SyncActivityState = useContext(SyncActivityContext)
  const { isShowing } = modalControl

  const activityTypeId = recordingActivity?.id

  const { recordedActivityTimeRecommendations: recommendations } = data || { recordedActivityTimeRecommendations: [] }
  const activityTypeRecommendations = getRecommendations(recommendations, activityTypeId).map(
    ({ secondsOffset }: { secondsOffset: number }) => applyRecommendation(
      dateForRecording,
      secondsOffset
    )
  )

  useEffect(() => {
    if (!activityTypeRecommendations) return
    const recommendation = activityTypeRecommendations[0]

    if (recommendation) {
      setRecordedAt(recommendation)
    } else {
      setRecordedAt(dateForRecording)
    }
  }, [activityTypeId])

  const recordActivity: () => void = () => {
    if (!activityTypeId) return
    const clientId = uuidv4()

    captureUnsyncedActivity({
      recordedAt: ''+recordedAt.getTime(),
      activityTypeId,
      clientId,
    })
  }

  const handleRecordedAtChanged: (updatedRecordedAt: Date) => void = (updatedRecordedAt) => {
    setRecordedAt(updatedRecordedAt)
  }

  return <Takeover
    isVisible={isShowing && recordingActivity !== undefined}
    onClose={() => modalControl.hide()}
  >
    <Card
      boxShadow="box.2"
      margin="0 3px 0"
      flex="1"
      bg="white"
    >
      <Box marginBottom={3}>
        <Text fontWeight="bold" fontSize={4}>
          Record Activity{" "}
          <span style={{ whiteSpace: 'nowrap' }}>"{recordingActivity?.name}"</span>
        </Text>
      </Box>

      <Box marginBottom={3}>
        <Text fontSize={4}>When?</Text>
      </Box>

      <Box>
        <DateInput value={recordedAt} onChange={handleRecordedAtChanged} />
        <TimeInput value={recordedAt} onChange={handleRecordedAtChanged} />
      </Box>

      <Box padding={2}>
        Recommended times:
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
      >
        {activityTypeRecommendations.map((recommendationDate: Date) => (
          <Box width="18%" padding={2}>
            <a
              href="javascript:void(0)"
              onClick={() => setRecordedAt(recommendationDate)}
            >
              {recommendationDate.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' })}
            </a>
          </Box>
        ))}
      </Box>

      <Box display="flex">
        <Box flex="1" marginRight={3}>
          <Button onClick={() => recordActivity()}>Record</Button>
        </Box>
        <Box>
          <Button onClick={() => modalControl.hide()}>cancel</Button>
        </Box>
      </Box>
    </Card>
  </Takeover>
}

export default RecordModal
