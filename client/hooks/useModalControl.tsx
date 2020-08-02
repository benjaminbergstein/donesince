import { useState } from 'react'

import {
  ActivityType,
} from '../apollo/types'

export interface ModalControl {
  recordingActivity?: ActivityType
  show: (activityType: ActivityType) => void
  hide: () => void
}

let recordingActivity
export const dummyModalControl: ModalControl = {
  recordingActivity,
  show: (activityType) => { recordingActivity = activityType },
  hide: () => { recordingActivity = undefined },
}

const useModalControl: () => ModalControl = () => {
  const [recordingActivity, setRecordingActivity] = useState<ActivityType | undefined>(undefined)

  return {
    show: (activityType: ActivityType) => setRecordingActivity(activityType),
    hide: () => setRecordingActivity(undefined),
    recordingActivity,
  }
}

export default useModalControl
