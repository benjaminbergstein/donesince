import React from 'react'
import useTimeline from '../../hooks/useTimeline'
import { TimelineStat } from '../../apollo/types'

import Box from '../../system/Box'
import Text from '../../system/Text'
import ActivityLine from './ActivityLine'

interface Props {
  date: Date
}

const Timeline: React.FC<Props> = ({ date }) => {
  const [month, day, year] = date.toLocaleDateString('en-us', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'America/Los_Angeles' }).split("/")
  const datestamp = [year, month, day].join("-")
  const { data: { timeline } } = useTimeline(datestamp)

  const humanReadableDate = date.toLocaleDateString('en-us', { month: 'short', day: 'numeric', weekday: 'short', timeZone: 'America/Los_Angeles' })

  return <Box minHeight="100%" overflowY="auto" overflowX="hidden">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
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
    </Box>
    {timeline.length === 0 ? (
      <Box marginBottom="15px" marginTop="15px" display="flex" alignItems="center" justifyContent="center">
        <Text fontWeight="600">Nothing recorded this day.</Text>
      </Box>
    ) : timeline.map(({
      recordedActivityId,
      recordedAt,
      sinceLast,
      name: activityName,
    }: TimelineStat) => (
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Box marginBottom="15px" marginTop="15px" display="flex" alignItems="center">
          <Text style={{ whiteSpace: 'nowrap' }} fontWeight="600">{activityName}</Text>
        </Box>

        <Box>
          <ActivityLine
            recordedAt={recordedAt}
            recordedActivityId={recordedActivityId}
            sinceLast={sinceLast}
          />
        </Box>
      </Box>
    ))}
  </Box>
}

export default Timeline
