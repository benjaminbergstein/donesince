import React, { useContext, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';

import { pluralize } from '../utils/time'
import FlashContext from '../contexts/FlashContext'

import { RECORD_ACTIVITY } from '../apollo/queries'
import { RecordActivityInput } from '../apollo/types'

import Message from '../system/Message'

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
}

export const useSyncActivity = () => {
  const { addFlash } = useContext(FlashContext)
  const [status, setStatus] = useState<SyncStatus>(SyncStatus.None)
  const [unsyncedActivities, setUnsyncedActivities] = useState<UnsyncedActivitiesRepo>({})

  const [recordActivity] = useMutation(RECORD_ACTIVITY)

  const captureUnsyncedActivity = (unsyncedActivity: RecordActivityInput) => {
    setUnsyncedActivities({
      ...unsyncedActivities,
      [unsyncedActivity.clientId]: unsyncedActivity,
    })
  }

  const syncActivityState: SyncActivityState = {
    status,
    captureUnsyncedActivity,
    unsyncedActivities,
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
      addFlash("All activities synced!")
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
    {syncStatus === SyncStatus.Pending && <Message canHide={false} theme="warning">
      {pluralize(unsyncedActivityCount, 'unsynced activity', 'unsynced activities')}
    </Message>}
  </>
}

export default SyncActivityContext
