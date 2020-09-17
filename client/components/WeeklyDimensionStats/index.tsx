import React, { useState } from 'react'
// import React, { useState, useContext } from 'react'
// import { useQuery } from '@apollo/react-hooks';

// import DeviceContext from '../../contexts/DeviceContext'

// import { WEEKLY_DIMENSION_STATS } from '../../apollo/queries'

// import {
//   WeeklyDimensionStats as WeeklyDimensionStatsData,
//   WeeklyDimensionStats_weeklyDimensionStats as WeeklyDimensionStat,
// } from '../../apollo/types/WeeklyDimensionStats'

// import { getWeeks } from '../../utils/time'

import Box from '../../system/Box'
// import Button from '../../system/Button'
// import Text from '../../system/Text'
// import Card from '../../system/Card'

import DimensionChart from './DimensionChart'
import ScrollContext from './ScrollContext'
// import ActivityTypeList from './ActivityTypeList'

// const getThemeForDelta: (n: number) => string = (deltaVsPreviousWeek) => {
//   if (deltaVsPreviousWeek === 0) return 'white'
//   if (deltaVsPreviousWeek > 0) return 'success'
//   return 'warning'
// }

// const formatDelta: (delta: number) => string = (delta) => delta > 0 ? `+${delta}` : delta.toString()

const WeeklyDimensionStats: React.FC<{}> = () => {
  // const { isPhone } = useContext(DeviceContext)
  // const [weekNumber, setWeekNumber] = useState<number>(getWeeks(new Date()))
  // const lastTenWeeks: number[] = new Array().map((_, index) => weekNumber - index)
  // const { data }: { data: WeeklyDimensionStatsData | undefined } = useQuery(WEEKLY_DIMENSION_STATS, {
  //   variables: {
  //     weekNumber,
  //   },
  // })

  // if (!data) return null

  // const { weeklyDimensionStats } = data

  // if (weeklyDimensionStats === null) return <>Error!</>

  const [scroll, setScroll] = useState<number>(0)

  return <ScrollContext.Provider value={{ scroll, setScroll }}>
    <Box>
      <DimensionChart dimensionName="Self-Care" />
      <DimensionChart dimensionName="Sleep Cycle" />
      <DimensionChart dimensionName="Dental Hygiene" />
      <DimensionChart dimensionName="Daily Exercise" />
      <DimensionChart dimensionName="Mindfulness" />
      <DimensionChart dimensionName="Screen Use" />
      <DimensionChart dimensionName="Nature Time" />
      <DimensionChart dimensionName="Caffeine Consumption" />
    </Box>
  </ScrollContext.Provider>
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
