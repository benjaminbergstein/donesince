import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import Button from '../system/Button'

import { ActivityType } from '../apollo/types'

interface Props {
  activityType: ActivityType
  label?: string
}

const RecordSingleActivity: React.FC<Props> = ({ activityType, label }) => {
  const { modalControl }: SyncActivityState = useContext(SyncActivityContext)
  const { id: activityTypeId, name } = activityType

  const recordActivity: () => void = () => {
    modalControl.show(activityType)
    // captureUnsyncedActivity({
    //   recordedAt: ''+Date.now(),
    //   activityTypeId,
    //   clientId: uuidv4(),
    // })
  }

  return <Button onClick={() => recordActivity()}>{label || name}</Button>
}

export default RecordSingleActivity
