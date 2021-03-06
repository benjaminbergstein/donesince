import React, { useContext, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';

import { pluralize } from '../utils/time'

import useTimeline from '../hooks/useTimeline'
import useTrends from '../hooks/useTrends'
import useModalControl, { ModalControl } from '../hooks/useModalControl'

import FlashContext from '../contexts/FlashContext'

import { RECORD_ACTIVITY } from '../apollo/queries'

import {
  RecordActivityInput,
  TimelineStat,
  Trend,
  ActivityType,
} from '../apollo/types'

import Message, { Theme } from '../system/Message'

interface UnsyncedActivitiesRepo {
  [clientId: string]: RecordActivityInput
}

export enum SyncStatus {
  None = 0,
  Pending,
}

export interface SyncActivityState {
  captureUnsyncedActivity: (unsyncedActivity: RecordActivityInput) => void
  unsyncedActivities: UnsyncedActivitiesRepo
  status: SyncStatus
  timeline: TimelineStat[]
  activityTrends: Trend[]
  modalControl: ModalControl
  recordingActivity: ActivityType | undefined
  setDateForRecording: (date: Date) => void
  dateForRecording: Date
}

export const useSyncActivity = () => {
  const [recordingActivity, setRecordingActivity] = useState<ActivityType | undefined>(undefined)
  const [dateForRecording, setDateForRecording] = useState<Date>(new Date())
  const modalControl = useModalControl({
    onShow: (recordingActivity: ActivityType) => {
      setRecordingActivity(recordingActivity)
    },
    onHide: () => {
      setRecordingActivity(undefined)
    },
  })
  const { addFlash } = useContext(FlashContext)

  const { data: timelineData } = useTimeline()
  const { timeline } = timelineData

  const { data: trendsData } = useTrends()
  const { activityTrends } = trendsData

  const [status, setStatus] = useState<SyncStatus>(SyncStatus.None)
  const [unsyncedActivities, setUnsyncedActivities] = useState<UnsyncedActivitiesRepo>({})

  const [recordActivity] = useMutation(RECORD_ACTIVITY, {
    refetchQueries: ['MyActivities', 'MyTrends']
  })

  const captureUnsyncedActivity = (unsyncedActivity: RecordActivityInput) => {
    setUnsyncedActivities({
      ...unsyncedActivities,
      [unsyncedActivity.clientId]: unsyncedActivity,
    })
    modalControl.hide()
  }

  const syncActivityState: SyncActivityState = {
    status,
    captureUnsyncedActivity,
    unsyncedActivities,
    timeline,
    activityTrends,
    modalControl,
    recordingActivity,
    setDateForRecording,
    dateForRecording,
  }

  const recordActivityWithClientId: (clientId: string) => Promise<any> = (
    clientId,
  ) => {
    const unsyncedActivity = unsyncedActivities[clientId]
    const { activityTypeId, recordedAt } = unsyncedActivity

    return recordActivity({
      variables: {
        activityTypeId,
        recordedAt,
      }
    })
  }

  const clear = () => {
    const unsyncedIds = Object.keys(unsyncedActivities)
    if (unsyncedIds.length === 0) return
    const promises = unsyncedIds.map((clientId) => {
      return recordActivityWithClientId(clientId)
    })

    Promise.all(promises).then(() => {
      Object.keys(unsyncedActivities).forEach((clientId) => {
        delete unsyncedActivities[clientId]
      })
      setUnsyncedActivities(unsyncedActivities)
      const allGood = Object.values(unsyncedActivities).length === 0
      setStatus(allGood ? SyncStatus.None : SyncStatus.Pending)
      addFlash("Activities synced!")
    })
    .catch(() => {
      setStatus(SyncStatus.Pending)
    })
  }

  useEffect(() => {
    clear()
  }, [unsyncedActivities])

  useEffect(() => {
    const interval = setInterval(clear, 3000)
    return () => { clearInterval(interval) }
  })
  return syncActivityState
}

const unsyncedActivities: UnsyncedActivitiesRepo = {}

const SyncActivityContext = React.createContext<SyncActivityState>({
  unsyncedActivities,
  status: SyncStatus.None,
  captureUnsyncedActivity(unsyncedActivity) {
    unsyncedActivities[unsyncedActivity.clientId] = unsyncedActivity
  },
  timeline: [],
  activityTrends: [],
  recordingActivity: undefined,
  modalControl: {
    isShowing: false,
    show: () => {},
    hide: () => {},
  },
  dateForRecording: new Date(),
  setDateForRecording: (date) => { date }
})

export const SyncProvider: React.FC<{}> = ({ children }) => {
  const syncActivityState: SyncActivityState = useSyncActivity()

  return (
    <SyncActivityContext.Provider value={syncActivityState}>
      {children}
    </SyncActivityContext.Provider>
  )
}

export const ListUnsyncedActivities: React.FC<{}> = () => {
  const syncActivityState: SyncActivityState = useContext(SyncActivityContext)
  const { unsyncedActivities, status: syncStatus } = syncActivityState
  const unsyncedActivityCount = Object.entries(unsyncedActivities).length

  return <>
    {syncStatus === SyncStatus.Pending && <Message canHide={false} theme={Theme.Warning}>
      {pluralize(unsyncedActivityCount, 'unsynced activity', 'unsynced activities')}
    </Message>}
  </>
}

export default SyncActivityContext
