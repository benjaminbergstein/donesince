import React, { useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2';

import { useQuery } from '@apollo/react-hooks';

import { WEEKLY_DIMENSION_STATS_BAR_CHART } from '../../apollo/queries'

import Box from '../../system/Box'
import Text from '../../system/Text'

import {
  WeeklyDimensionStatsBarChart,
  WeeklyDimensionStatsBarChart_weeklyDimensionStatsBarChart as BarChartData,
} from '../../apollo/types/WeeklyDimensionStatsBarChart'

interface Props {
  dimensionName: string,
}

const Statistic: React.FC<Props> = ({
  dimensionName,
}) => {
  const { data }: { data: WeeklyDimensionStatsBarChart | undefined | null } = useQuery(WEEKLY_DIMENSION_STATS_BAR_CHART, {
    variables: {
      dimensionName,
    }
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current === null) return
    scrollRef.current.scroll({ left: 1000 })
  }, [data])

  if (!data) return null

  const { weeklyDimensionStatsBarChart }: { weeklyDimensionStatsBarChart: BarChartData | null } = data

  return <Box flex="1">
    <Box display="flex" justifyContent="center" alignItems="center">
      <Text fontSize={2}>
        {dimensionName}
      </Text>
    </Box>
    <Box width="100%" overflowX="scroll" ref={scrollRef}>
      <Box minWidth="1000px">
        <Bar
          options={{
            maintainAspectRatio: false,
            legend: { display: false },
            scales: { xAxes: [{
              ticks: {
                callback: (value: string) => value.split('-')[1]
              },
            }] },
          }}
          height={200}
          // @ts-ignore
          width="100%"
          data={weeklyDimensionStatsBarChart}
         />
      </Box>
    </Box>
  </Box>
}

export default Statistic
