import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';

import {
  ActivityType,
//   RecordedActivity,
} from '../apollo/types'

import {
  CREATE_ACTIVITY_TYPE,
  LIST_ACTIVITY_TYPES,
} from '../apollo/queries'

const CreateActivityType: React.FC<{}> = () => {
  const [name, setName] = useState<string>("")
  const [createActivityType] = useMutation(CREATE_ACTIVITY_TYPE, {
    variables: { name },
    update(cache, { data: { createActivityType } }) {
      const data = cache.readQuery({ query: LIST_ACTIVITY_TYPES })
      cache.writeQuery({
        query: LIST_ACTIVITY_TYPES,
        data: {
          listActivityTypes: [
            ...data.listActivityTypes,
            createActivityType,
          ],
        },
      })
      setName("")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createActivityType()
  }

  return <>
    <h1>Add an Activity Type</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Create</button>
    </form>
  </>
}

export default CreateActivityType
