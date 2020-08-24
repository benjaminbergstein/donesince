import React, { useContext } from 'react'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import Button from '../system/Button'

import { ActivityType } from '../apollo/types'

interface Props {
  activityType: ActivityType
  label?: string
}

const RecordSingleActivity: React.FC<Props> = ({ activityType, label }) => {
  const { modalControl }: SyncActivityState = useContext(SyncActivityContext)
  const { name } = activityType

  const recordActivity: () => void = () => {
    modalControl.show(activityType)
  }

  return <Button onClick={() => recordActivity()}>{label || name}</Button>
}

export default RecordSingleActivity
