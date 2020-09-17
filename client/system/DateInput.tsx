import React, { useEffect, useRef, useState } from 'react'

interface Props {
  value?: Date
  onChange: (value: Date) => void
  onFocus?: () => void
}

import { default as InputFace } from './Input'

const DateInput: React.FC<Props> = ({
  value: initialValue = new Date(),
  onChange = () => {},
  onFocus = () => {},
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<Date>(initialValue)

  const date = value.toLocaleDateString('en-us', {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: 'America/Los_Angeles'
  })
  const [month, day, year] = date.split('/')
  const datestamp = [year, month, day].join('-')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = () => {
    if (ref.current === null) return
    const { value: newValue } = ref.current
    const [newYear, newMonth, newDay] = newValue.split("-")
    value.setFullYear(parseInt(newYear))
    value.setMonth(parseInt(newMonth) - 1)
    value.setDate(parseInt(newDay))
    const newDate = new Date(+value)
    setValue(newDate)
    onChange(newDate)
  }

  return <InputFace
    type="date"
    value={datestamp}
    ref={ref}
    onFocus={onFocus}
    onChange={handleChange}
  />
}

export default DateInput
