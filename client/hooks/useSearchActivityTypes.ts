import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';

import { ActivityType } from '../apollo/types'
import { SEARCH_ACTIVITY_TYPES } from '../apollo/queries'

import Box from '../system/Box'
import Card from '../system/Card'

const pollInterval = 15000

interface SearchArgs {
  minLength: number
}

type SearchResults = ActivityType[]
type SearchReturn = [SearchResults, string, (q: string) => void]

const useSearchActivityTypes: (args: SearchArgs) => SearchResult = (args) => {
  const { minLength } = args
  const [q, setQ] = useState<string>("")
  const [performSearch, { data }] = useLazyQuery(SEARCH_ACTIVITY_TYPES, {
    variables: { q },
  })

  const doPerformSearch = q.length >= minLength

  useEffect(() => {
    if (doPerformSearch) performSearch()
  }, [q])

  const searchResults = doPerformSearch && data && data.searchActivityTypes ? data.searchActivityTypes : []
  return [searchResults, q, setQ]
}

export default useSearchActivityTypes
