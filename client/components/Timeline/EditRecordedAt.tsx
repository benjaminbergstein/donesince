import React, { useRef, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_RECORDED_ACTIVITY } from '../../apollo/queries'

import useFocus from '../../hooks/useFocus'

import Box from '../../system/Box'
import Card from '../../system/Card'
import Button from '../../system/Button'
import Text from '../../system/Text'

interface Props {
  recordedAt: string
  recordedActivityId: number
  isHovered: boolean
}

const EditRecordedAt: React.FC<Props> = ({
  recordedAt,
  recordedActivityId,
  isHovered,
}) => {
  const timeRef = useRef<HTMLInputElement>(null)
  const [inputChanged, setInputChanged] = useState<boolean>(false)
  const [isFocused, setIsFocused, wrapperRef] = useFocus()
  const [updateRecordedActivity] = useMutation(UPDATE_RECORDED_ACTIVITY)

  const recordedAtDate = new Date(recordedAt)
  const hours = recordedAtDate.getHours().toString().padStart(2, '0')
  const minutes = recordedAtDate.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`
  const [selectedTime, setSelectedTime] = useState<string>(time)

  const handleSubmit = () => {
    const newRecordedAt = new Date(recordedAt)
    const [newHours, newMinutes] = selectedTime.split(":")
    newRecordedAt.setHours(parseInt(newHours))
    newRecordedAt.setMinutes(parseInt(newMinutes))

    hide()
    updateRecordedActivity({
      variables: {
        id: recordedActivityId,
        recordedAt: ''+newRecordedAt,
      },
    })
  }

  const handleChange = () => {
     setInputChanged(true)

     if (timeRef.current !== null) {
       setSelectedTime(timeRef.current.value)
     }
  }

  const hide = () => {
    setIsFocused(false)
    setInputChanged(false)
    setSelectedTime(time)
  }

  if (
    isHovered === false &&
    isFocused === false &&
    inputChanged === false
  ) return null

  return (
    <>
      <Box
        position="absolute"
        top="0"
        right="110%"
        height="100%"
        display="flex"
        alignItems="center"
        ref={wrapperRef}
      >
        <Box>
          <Button
            theme="borderless"
            onClick={() => { setIsFocused(true) }}
          >
            <Text fontSize={1}>
              <AiOutlineClockCircle />
            </Text>
          </Button>
        </Box>
        {(isFocused || inputChanged) && (
          <Box
            height="100%"
            position="absolute"
            top="0"
            left="100%"
            zIndex={500}
          >
            <Card bg="white">
              <Box>
                <Text fontSize={2}>Change Time</Text>
              </Box>
              <input
                ref={timeRef}
                type="time"
                value={selectedTime}
                onChange={() => { handleChange() }}
                style={{ fontSize: '16px' }}
              />
              <Button onClick={handleSubmit}>Update</Button>
              <Button onClick={hide} theme="borderless">Close</Button>
            </Card>
          </Box>
        )}
      </Box>
    </>
  )
}

export default EditRecordedAt
