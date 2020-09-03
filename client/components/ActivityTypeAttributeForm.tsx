import React, { useState, useEffect, useContext } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import FlashContext from '../contexts/FlashContext'

import {
  SET_ACTIVITY_TYPE_ATTRIBUTE,
  SEARCH_ACTIVITY_TYPE_ATTRIBUTES,
} from '../apollo/queries'

import Box from '../system/Box'
import TextInput from '../system/TextInput'

interface Props {
  activityTypeId: number
  id?: number
  name?: string
  value?: string
  onSubmit: () => void
}

interface SearchResult {
  name: string
  value: string
}

interface Suggestion {
  name: string
  value: string
  label: string
}

const getSuggestionsFromSearchResults: (results: SearchResult[]) => Suggestion[] = (results) => Object.values(
  results.reduce((acc, { name, value }) => {
    acc[[name, value]] = { name, value, label: `${name} (${value})` }
    return acc
  }, {})
)

const ActivityTypeAttributeForm: React.FC<Props> = ({
  activityTypeId,
  id,
  name: initialName = "",
  value: initialValue = "",
  onSubmit,
}) => {
  const { addFlash } = useContext(FlashContext)
  const [name, setName] = useState<string>(initialName)
  const [value, setValue] = useState<string>(initialValue)
  const [acceptedSuggestion, setAcceptedSuggestion] = useState<string>("")
  const [searchActivityTypeAttributes, { data: searchResults }] = useLazyQuery(SEARCH_ACTIVITY_TYPE_ATTRIBUTES)

  useEffect(() => {
    if (name.length < 3) return
    if (name == acceptedSuggestion) return
    setAcceptedSuggestion("")
    searchActivityTypeAttributes({
      variables: { q: name },
    })
  }, [name])

  const [setActivityTypeAttribute] = useMutation(SET_ACTIVITY_TYPE_ATTRIBUTE, {
    onCompleted: () => {
      if (!id) {
        setName("")
        setValue("")
        addFlash("Activity type dimension added!")
      } else {
        addFlash("Activity type dimension updated!")
      }
      onSubmit()
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setActivityTypeAttribute({
      variables: {
        activityTypeId,
        name: name,
        value: parseInt(value),
      },
    })
  }

  const acceptSuggestion = (suggestedName: string, suggestedValue: number) => {
    setName(suggestedName)
    setAcceptedSuggestion(suggestedName)
    if (value === "") setValue(suggestedValue)
  }

  const showSearchResults = name.length >= 3 && searchResults && acceptedSuggestion !== name

  return <form onSubmit={handleSubmit}>
    <Box display="flex" flexDirection="row">
      <Box position="relative" flexBasis="50%" marginRight={3}>
        {id !== undefined && name}
        {id === undefined && (
          <>
            <TextInput value={name} onChange={setName} />
            <Box
              position="absolute"
              width="100%"
              top="100%"
              left="0"
            >
              {showSearchResults && getSuggestionsFromSearchResults(searchResults.searchActivityTypeAttributes).map(({ name, value, label }) => (
                <div onClick={() => { acceptSuggestion(name, value) }}>{label}</div>
              ))}
            </Box>
          </>
        )}
      </Box>
      <Box flexBasis="50%" marginRight={3}>
        <TextInput type="number" value={value} onChange={setValue} />
      </Box>
      <Box flexShrink="1" flexGrow="0">
        <button>Submit</button>
      </Box>
    </Box>
  </form>
}

export default ActivityTypeAttributeForm
