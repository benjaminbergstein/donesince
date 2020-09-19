import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Button from '../system/Button'
import Text from '../system/Text'
import Box from '../system/Box'
import Card from '../system/Card'

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

  if (!isShowing) return null
  if (!recordingActivity) return null

  const { id: activityTypeId } = recordingActivity

  const recordActivity: () => void = () => {
    const clientId = uuidv4()

    captureUnsyncedActivity({
      recordedAt: ''+(dateForRecording.getTime() - recordedAtModifier + timezoneOffset),
      activityTypeId,
      clientId,
    })
  }

  return <Box
    position="fixed"
    top="0"
    bg="rgba(255, 255, 255, 0.7)"
    height="100vh"
    width="100%"
  >
    <Box
      maxWidth="640px"
      margin="0 auto"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Card bg="white" margin="auto" marginLeft="10px" marginRight="10px">
        <Box marginBottom={3}>
          <Text fontWeight="bold" fontSize={4}>
            Record Activity{" "}
            <span style={{ whiteSpace: 'nowrap' }}>"{recordingActivity.name}"</span>
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
    </Box>
  </Box>
}

export default RecordModal
