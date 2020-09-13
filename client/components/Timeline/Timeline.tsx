import React from 'react'
import useTimeline from '../../hooks/useTimeline'
import { TimelineStat } from '../../apollo/types'

import Box from '../../system/Box'
import Text from '../../system/Text'
import ActivityLine from './ActivityLine'

interface Props {
  offset: number
}

const Timeline: React.FC<Props> = ({ offset }) => {
  const { data: { timeline } } = useTimeline(offset)

  if (timeline.length === 0) return null

  return <>
    <Box
      width="100%"
      paddingRight="15px"
    >
      {timeline.map(({
        recordedActivityId,
        recordedAt,
        sinceLast,
        name: activityName,
        humanReadableDate,
        ofDay
      }: TimelineStat) => (
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          position="relative"
        >
          {ofDay === 1 && <Box
            paddingTop="1em"
            paddingBottom="1em"
          >
            <Text
              color="grays.text.light"
              fontSize={1}
              fontWeight={3}
              style={{
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >{humanReadableDate}</Text>
          </Box>}
          <Box marginBottom="15px" marginTop="15px" display="flex" alignItems="center">
            <Text fontWeight="600">{activityName}</Text>
          </Box>

          <ActivityLine
            recordedAt={recordedAt}
            recordedActivityId={recordedActivityId}
            sinceLast={sinceLast}
          />
        </Box>
      ))}
    </Box>
  </>
}

export default Timeline
