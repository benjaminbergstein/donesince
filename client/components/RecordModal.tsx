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
  const { modalControl, captureUnsyncedActivity }: SyncActivityState = useContext(SyncActivityContext)
  const { recordingActivity } = modalControl

  if (recordingActivity === undefined) return null

  const { id: activityTypeId } = recordingActivity

  const recordActivity: () => void = () => {
    const clientId = uuidv4()

    captureUnsyncedActivity({
      recordedAt: ''+(Date.now() - recordedAtModifier + timezoneOffset),
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
      <Card bg="white" margin="auto">
        <Text as="h2">Record Activity</Text>

        <Box borderBottom="1px solid black" borderBottomColor="grays.text.light">
          <Text>
            What? "{recordingActivity.name}"
          </Text>
        </Box>

        <Text>When?</Text>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {recordedAtOptions.map(([n, interval, str]: RecordedAtOption) => (
            <Box flexBasis="32%" marginBottom="5px" marginTop="5px">
              <Button
                color={n * interval === recordedAtModifier ? 'accent.success' : undefined}
                onClick={() => setRecordedAtModifier(n * interval)}
              >
                {str === 'now' ? 'Now' : `${n} ${str}`}
              </Button>
            </Box>
          ))}
        </Box>

        <Button onClick={() => recordActivity()}>Record</Button>
      </Card>
    </Box>
  </Box>
}

export default RecordModal