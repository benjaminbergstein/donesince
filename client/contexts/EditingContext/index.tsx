import React, { useState } from 'react'

import EditRecordedActivity from './EditRecordedActivity'

export interface EditRecordedActivityState {
  setEditingRecordedActivityId: (recordedActivityId: number | null) => void
  editingRecordedActivityId: number | null
}

const useEditing = () => {
  const [editingRecordedActivityId, setEditingRecordedActivityId] = useState<number | null>(null)
  const editingRecordedActivityState: EditRecordedActivityState = {
    setEditingRecordedActivityId,
    editingRecordedActivityId,
  }
  return editingRecordedActivityState
}


export const EditingProvider: React.FC<{}> = ({ children }) => {
  const editingContext = useEditing()
  const { editingRecordedActivityId } = editingContext

  return <EditingContext.Provider value={editingContext}>
    {children}

    {<EditRecordedActivity />}
  </EditingContext.Provider>
}

const EditingContext = React.createContext<EditRecordedActivityState>({
  editingRecordedActivityId: null,
  setEditingRecordedActivityId: (recordedActivityId: number | null) => { recordedActivityId },
})

export default EditingContext
