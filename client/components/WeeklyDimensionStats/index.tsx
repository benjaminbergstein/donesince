import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';

import { WEEKLY_DIMENSION_STATS } from '../../apollo/queries'
import { getWeeks } from '../../utils/time'

import Box from '../../system/Box'
import Text from '../../system/Text'
import Card from '../../system/Card'

import Statistic from './Statistic'

const getThemeForDelta = (deltaVsPreviousWeek) => {
  if (deltaVsPreviousWeek === 0) return 'white'
  if (deltaVsPreviousWeek > 0) return 'success'
  return 'warning'
}

const formatDelta = (delta) => delta > 0 ? `+${delta}` : delta

const WeeklyDimensionStats: React.FC<{}> = () => {
  const [weekNumber, setWeekNumber] = useState<number>(getWeeks(new Date()))
  const { data } = useQuery(WEEKLY_DIMENSION_STATS, {
    variables: {
      weekNumber,
    },
  })

  if (!data) return null

  const { weeklyDimensionStats } = data

  return <>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <div onClick={() => setWeekNumber(weekNumber - 1)}>Prev</div>
      <div>{weekNumber}</div>
      <div onClick={() => setWeekNumber(weekNumber + 1)}>Next</div>
    </Box>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {weeklyDimensionStats.map(({
        value,
        dimensionName,
        deltaVsPreviousWeek,
        deltaVsBestWeek,
      }) => (
        <Box
          width="30%"
          flexDirection="column"
          padding="2"
        >
          <Card
            bg={`accent.${getThemeForDelta(deltaVsPreviousWeek)}`}
          >
            <Box flex="1">
              <Text as="div" textAlign="center">
                {dimensionName}
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Statistic
                label="This Week"
                value={value}
              />
              <Statistic
                label="Delta"
                value={formatDelta(deltaVsPreviousWeek)}
              />
              <Statistic
                label="Vs Best"
                value={formatDelta(deltaVsBestWeek)}
              />
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  </>
}

export default WeeklyDimensionStats

    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   flexWrap="wrap"
    //   maxWidth="500px"
    //   margin="0 auto"
    //   alignItems="center"
    //   justifyContent="center"
    // >
    //   {activityTrends.map(({
    //     activityTypeId,
    //     name,
    //     averageInterval,
    //     lastRecordedAt,
    //     countRecords,
    //   }: Trend) => (
    //     <Box marginRight="20px" marginBottom="20px" flex="1" width="100%">
    //       <Card>
    //         <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="10px">
    //           <Box>
    //             <Link href={`/activity-type/${activityTypeId}`}>
    //               <a>
    //                 {name} ({countRecords})
    //               </a>
    //             </Link>
    //           </Box>
    //           <Box>
    //             {averageInterval > 0 && <div>Usually every {formatInterval(averageInterval)}</div>}
    //             {averageInterval < 0 && <div>Not enough information.</div>}
    //             <Box marginTop='5px'>Last {formatInterval((+new Date - (+new Date(lastRecordedAt))) / 1000 / 3600)} ago</Box>
    //           </Box>
    //         </Box>
    //         <div>
    //           <RecordSingleActivity
    //             activityType={{ id: activityTypeId, name }}
    //             label="Record"
    //           />
    //         </div>
    //       </Card>
    //     </Box>
    //   ))}
    // </Box>
  // </>
