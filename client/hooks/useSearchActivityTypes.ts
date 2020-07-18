import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';

import { ActivityType } from '../apollo/types'
import { SEARCH_ACTIVITY_TYPES } from '../apollo/queries'

interface SearchArgs {
  minLength: number
}

type SearchResults = ActivityType[]
type SearchReturn = [
  SearchResults,
  string,
  boolean,
  (q: string) => void,
  () => void,
]

const useSearchActivityTypes: (args: SearchArgs) => SearchReturn = (args) => {
  const { minLength } = args
  const [q, setQ] = useState<string>("")
  const [performSearch, { data, loading }] = useLazyQuery(SEARCH_ACTIVITY_TYPES, {
    variables: { q },
    fetchPolicy: 'no-cache',
  })

  const doPerformSearch = q.length >= minLength

  useEffect(() => {
    if (doPerformSearch) performSearch()
  }, [q])

  const searchResults = doPerformSearch && data && data.searchActivityTypes ? data.searchActivityTypes : []
  return [searchResults, q, loading, setQ, performSearch]
}

export default useSearchActivityTypes
