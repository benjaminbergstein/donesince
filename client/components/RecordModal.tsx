import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Button from '../system/Button'
import Text from '../system/Text'
import Box from '../system/Box'
import Card from '../system/Card'
import Takeover from '../system/Takeover'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

const Second: number = 1000
const Minute: number = Second * 60
const Hour: number = Minute * 60
const Day: number = Hour * 24

type RecordedAtOption = [number, number, string]
const recordedAtOptions: RecordedAtOption[] = [
  [0, Second, 'now'],
  [5, Minute, 'mins'],
   [30, Minute, 'mins'],
  [1, Hour, 'hr'],
  [2, Hour, 'hr'],
  [6, Hour, 'hr'],
  [12, Hour, 'hr'],
  [18, Hour, 'hr'],
  [1, Day, 'day'],
  [2, Day, 'days'],
]

const timezoneOffset: number = 60 * 1000

const RecordModal: React.FC<{}> = () => {
  const [recordedAtModifier, setRecordedAtModifier] = useState<number>(0)
  const {
    modalControl,
    captureUnsyncedActivity,
    recordingActivity,
    dateForRecording,
  }: SyncActivityState = useContext(SyncActivityContext)
  const { isShowing } = modalControl

  const activityTypeId = recordingActivity?.id

  const recordActivity: () => void = () => {
    if (!activityTypeId) return
    const clientId = uuidv4()

    captureUnsyncedActivity({
      recordedAt: ''+(dateForRecording.getTime() - recordedAtModifier + timezoneOffset),
      activityTypeId,
      clientId,
    })
  }

  return <Takeover
    isVisible={isShowing && !!recordingActivity}
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
        <Text fontWeight="bold" fontSize={4} color="grays.text.light">
          {dateForRecording.toLocaleDateString('en-us', { month: 'short', day: 'numeric', weekday: 'short' })}
        </Text>
      </Box>

      <Box marginBottom={3}>
        <Text fontSize={4}>How long ago?</Text>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        {recordedAtOptions.map(([n, interval, str]: RecordedAtOption) => (
          <Box flexBasis="32%" marginBottom="5px" marginTop="5px">
            <Button
              theme={n * interval === recordedAtModifier ? 'success' : undefined}
              onClick={() => setRecordedAtModifier(n * interval)}
            >
              {str === 'now' ? 'Now' : `${n} ${str}`}
            </Button>
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
