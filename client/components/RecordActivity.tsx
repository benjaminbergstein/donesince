import React, { useContext } from 'react'

import { ActivityType } from '../apollo/types'

import Box from '../system/Box'
import Input from '../system/Input'
import Text from '../system/Text'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import RecordSingleActivity from '../components/RecordSingleActivity'
import CreateActivityType from '../components/CreateActivityType'

import useSearchActivityTypes from '../hooks/useSearchActivityTypes'

const RecordActivity: React.FC<{}> = () => {
  const [searchResults, q, searchResultsLoading, setQ, performSearch] = useSearchActivityTypes({ minLength: 3 })
  const syncActivityState: SyncActivityState = useContext(SyncActivityContext)
  const { activityTrends } = syncActivityState

  return <>
    <Box display="flex" flexDirection="row">
      <Box flex="1">
        <Input
          placeholder="Walk, Drink water, Do laundry, Practice mindfulness..."
          type="search"
          value={q}
          onChange={setQ}
        />
      </Box>
    </Box>

    {searchResults && <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {searchResults.map((activityType: ActivityType) => (
        <Box
          marginTop="10px"
          padding="10px"
          borderBottom="1px solid #aaa"
          display="flex"
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flex="1">{activityType.name}</Box>
          <RecordSingleActivity activityType={activityType} label="Record" />
        </Box>
      ))}
      {searchResults.length === 0 && q.length > 3 && !searchResultsLoading &&
        <CreateActivityType
          onActivityTypeAdded={performSearch}
          name={q}
        />}
    </Box>}

    <Box>
      <Text as="h4">Your activites</Text>

      {activityTrends.map(({ name, activityTypeId }) => (
        <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="10px">
          <Box>{name}</Box>
          <RecordSingleActivity
            activityType={{ id: activityTypeId, name }}
            label="Record"
          />
        </Box>
      ))}
    </Box>
  </>
}

export default RecordActivity
