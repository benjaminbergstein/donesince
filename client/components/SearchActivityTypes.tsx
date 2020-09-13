import React, { useContext } from 'react'

import { ActivityType } from '../apollo/types'

import useIsFocus from '../hooks/useFocus'
import Box from '../system/Box'
import Button from '../system/Button'
import Card from '../system/Card'
import Input from '../system/Input'
import Text from '../system/Text'

import SyncActivityContext, { SyncActivityState } from '../contexts/SyncActivityContext'

import CreateActivityType from '../components/CreateActivityType'

import useSearchActivityTypes from '../hooks/useSearchActivityTypes'

const ActivityItem: React.FC<{
  activityType: ActivityType,
  onClick: () => void,
}> = ({ activityType, onClick }) => (
  <Box
    display="flex"
    flex="1"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
  >
    <Button
      theme="borderless"
      align="left"
      onClick={() => { onClick() }}
    >
      <Text fontSize={1}>
        {activityType.name}
      </Text>
    </Button>
  </Box>
)

const RecordActivity: React.FC<{}> = () => {
  const [isFocused, setIsFocused, wrapperRef] = useIsFocus()
  const [searchResults, q, searchResultsLoading, setQ, performSearch, trimmedQ] = useSearchActivityTypes({ minLength: 3 })
  const syncActivityState: SyncActivityState = useContext(SyncActivityContext)
  const { modalControl, activityTrends } = syncActivityState

  const handleFocus = () => {
    modalControl.hide()
    setIsFocused(true)
  }

  const launchModalWithActivityType = (activityType: ActivityType) => {
    setQ("")
    setIsFocused(false)
    modalControl.show(activityType)
  }

  return <Box
    position="relative"
    display="flex"
    flexDirection="column"
    ref={wrapperRef}
  >
    <Box
      display="flex"
      flexDirection="row"
      position="relative"
      zIndex={501}
    >
      <Box flex="1" marginTop={3} marginBottom={3} marginLeft={4} marginRight={4}>
        <Input
          placeholder="Walk, Drink water, Do laundry, Practice mindfulness..."
          type="search"
          value={q}
          onChange={setQ}
          onFocus={() => { handleFocus() }}
        />
      </Box>
    </Box>

    {isFocused && (
      <Box
        position="absolute"
        top="-5px"
        width="100%"
        zIndex={500}
      >
        <Card bg="white" boxShadow="box.1" margin="0 10px">
          <Box marginTop="45px">
            {searchResults && searchResults.length !== 0 && (
              <Box
                marginBottom={3}
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
              >
                <Text fontSize={3}>Results for "{trimmedQ}"</Text>
                <Box
                  maxHeight="20vh"
                  overflowY="auto"
                  marginTop={3}
                  marginBottom={3}
                  borderStyle="solid"
                  borderColor="grays.bg.middlest"
                  borderWidth="1px 0"
                >
                  {searchResults.map((activityType: ActivityType) => (
                    <ActivityItem
                      activityType={activityType}
                      onClick={() => { launchModalWithActivityType(activityType) }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            {searchResults.length === 0 && q.length > 3 && !searchResultsLoading && (
              <CreateActivityType
                onActivityTypeAdded={performSearch}
                name={q}
              />
            )}

            <Box>
              <Text fontSize={3}>Your activities</Text>

              <Box
                maxHeight="20vh"
                overflowY="auto"
                marginTop={3}
                marginBottom={3}
                borderStyle="solid"
                borderColor="grays.bg.middlest"
                borderWidth="1px 0"
              >
                {activityTrends.map(({ name, activityTypeId }) => (
                  <ActivityItem
                    activityType={{ id: activityTypeId, name }}
                    onClick={() => { launchModalWithActivityType({ id: activityTypeId, name }) }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    )}
  </Box>
}

export default RecordActivity
