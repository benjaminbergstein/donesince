import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks';

import {
  CREATE_ACTIVITY_TYPE,
} from '../apollo/queries'

import FlashContext, { FlashState } from '../contexts/FlashContext'

interface Props {
  name: string
  onActivityTypeAdded: () => void
}

const CreateActivityType: React.FC<Props> = ({
  name,
  onActivityTypeAdded,
}) => {
  const flashState: FlashState = useContext(FlashContext)
  const [createActivityType] = useMutation(CREATE_ACTIVITY_TYPE, {
    variables: { name },
    onCompleted() {
      flashState.addFlash(`Activity Type "${name}" added!`)
      onActivityTypeAdded()
    },
  })

  const handleSubmit: (e: React.FormEvent) => void = (e) => {
    e.preventDefault()
    createActivityType()
  }

  return <form onSubmit={handleSubmit}>
    <button>Add Activity Type "{name}"</button>
  </form>
}

export default CreateActivityType
