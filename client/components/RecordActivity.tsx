import Link from 'next/link'
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
          <Box flex="1">
            <Link href={`/activity-type/${activityType.id}`}>
              <a>
                {activityType.name}
              </a>
            </Link>
          </Box>
          <Box flexBasis="25%" flexGrow={0} flexShrink={1}>
            <RecordSingleActivity activityType={activityType} label="Record" />
          </Box>
        </Box>
      ))}
      {searchResults.length === 0 && q.length > 3 && !searchResultsLoading &&
        <CreateActivityType
          onActivityTypeAdded={performSearch}
          name={q}
        />}
    </Box>}

    <Box>
      <Text as="h4">Your activities</Text>

      {activityTrends.map(({ name, activityTypeId }) => (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="10px"
          paddingBottom="10px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="grays.text.light"
        >
          <Link href={`/activity-type/${activityTypeId}`}>
            <a>
              <Box>{name}</Box>
            </a>
          </Link>
          <Box flexBasis="25%" flexGrow={0} flexShrink={1}>
            <RecordSingleActivity
              activityType={{ id: activityTypeId, name }}
              label="Record"
            />
          </Box>
        </Box>
      ))}
    </Box>
  </>
}

export default RecordActivity
