import React, { useState, useEffect, useContext } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import FlashContext from '../contexts/FlashContext'

import {
  SET_ACTIVITY_TYPE_ATTRIBUTE,
  SEARCH_ACTIVITY_TYPE_ATTRIBUTES,
} from '../apollo/queries'

import Box from '../system/Box'
import TextInput from '../system/TextInput'
import NumberInput from '../system/NumberInput'

interface Props {
  activityTypeId: number
  id?: string
  name?: string
  value?: number
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

const getSuggestionsFromSearchResults: (results: SearchResult[]) => Suggestion[] = (results) => {
  type Index = { [key: string]: Suggestion }
  const initial: Index = {}
  return Object.values(
    results.reduce((acc: Index, { name, value }) => {
      acc[`${name}---${value}`] = { name, value, label: `${name} (${value})` }
      return acc
    }, initial)
  );
}

const ActivityTypeAttributeForm: React.FC<Props> = ({
  activityTypeId,
  id,
  name: initialName = "",
  value: initialValue = 0,
  onSubmit,
}) => {
  const { addFlash } = useContext(FlashContext)
  const [name, setName] = useState<string>(initialName)
  const [value, setValue] = useState<number>(initialValue)
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
        setValue(0)
        addFlash("Activity type dimension added!")
      } else {
        addFlash("Activity type dimension updated!")
      }
      onSubmit()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setActivityTypeAttribute({
      variables: {
        activityTypeId,
        name,
        value,
      },
    })
  }

  const acceptSuggestion = (suggestedName: string, suggestedValue: number) => {
    setName(suggestedName)
    setAcceptedSuggestion(suggestedName)
    if (value === 0) setValue(suggestedValue)
  }

  const showSearchResults = name.length >= 3 && searchResults && acceptedSuggestion !== name

  return <form onSubmit={handleSubmit}>
    <Box display="flex" flexDirection="row">
      <Box position="relative" flexBasis="50%" marginRight={3}>
        {id !== undefined && name}
        {id === undefined && (
          <>
            <TextInput value={name} onChange={(value: string) => setName((value || "").toString())} />
            <Box
              position="absolute"
              width="100%"
              top="100%"
              left="0"
            >
              {showSearchResults && getSuggestionsFromSearchResults(searchResults.searchActivityTypeAttributes).map(({ name, value, label }) => (
                <div onClick={() => { acceptSuggestion(name, parseInt(value)) }}>{label}</div>
              ))}
            </Box>
          </>
        )}
      </Box>
      <Box flexBasis="50%" marginRight={3}>
        <NumberInput value={value} onChange={setValue} />
      </Box>
      <Box flexShrink={1} flexGrow={0}>
        <button>Submit</button>
      </Box>
    </Box>
  </form>
}

export default ActivityTypeAttributeForm
