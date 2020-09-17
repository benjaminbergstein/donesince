import React, { useEffect, useRef, useState } from 'react'

interface Props {
  value?: Date
  onChange: (value: Date) => void
  onFocus?: () => void
}

import { default as InputFace } from './Input'

const TextInput: React.FC<Props> = ({
  value: initialValue = new Date(),
  onChange = () => {},
  onFocus = () => {},
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<Date>(initialValue)

  const time = value.toLocaleTimeString('en-us', {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: 'America/Los_Angeles'
  })

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = () => {
    if (ref.current === null) return
    const { value: newValue } = ref.current
    const [hours, minutes] = newValue.split(":")
    value.setHours(parseInt(hours))
    value.setMinutes(parseInt(minutes))
    const newTime = new Date(+value)
    setValue(newTime)
    onChange(newTime)
  }

  return <InputFace
    type="time"
    value={time}
    ref={ref}
    onFocus={onFocus}
    onChange={handleChange}
  />
}

export default TextInput
