import React, { useContext, useEffect, useRef } from 'react'
import throttle from 'lodash/throttle'
import { Bar } from 'react-chartjs-2';

import { useQuery } from '@apollo/react-hooks';

import { WEEKLY_DIMENSION_STATS_BAR_CHART } from '../../apollo/queries'

import Box from '../../system/Box'
import Text from '../../system/Text'

import {
  WeeklyDimensionStatsBarChart,
  WeeklyDimensionStatsBarChart_weeklyDimensionStatsBarChart as BarChartData,
} from '../../apollo/types/WeeklyDimensionStatsBarChart'

import ScrollContext from './ScrollContext'

interface Props {
  dimensionName: string,
}

const chartOptions = {
  maintainAspectRatio: false,
  legend: { display: false },
  scales: {
    yAxes: [{ position: 'right', ticks: { maxTicksLimit: 4 } }],
    xAxes: [{
      ticks: {
        callback: (value: string) => value.split('-')[1]
      },
    }],
  },
}

const Statistic: React.FC<Props> = ({
  dimensionName,
}) => {
  const { scroll, setScroll } = useContext(ScrollContext)
  const { data }: { data: WeeklyDimensionStatsBarChart | undefined | null } = useQuery(WEEKLY_DIMENSION_STATS_BAR_CHART, {
    variables: {
      dimensionName,
    }
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { current } = scrollRef
    if (current === null) return
    current.scroll({ left: scroll })

    const listener = throttle((e: Event) => {
      const target = e.target as HTMLDivElement
      e.preventDefault()
      setScroll(target.scrollLeft)
    }, 20)

    current.addEventListener('scroll', listener)

    return () => {
      current.removeEventListener('scroll', listener)
    }
  }, [scroll])

  useEffect(() => { setScroll(1000) }, [data])

  if (!data) return null

  const { weeklyDimensionStatsBarChart }: { weeklyDimensionStatsBarChart: BarChartData | null } = data

  return <Box flex="1" marginTop={3} marginBottom={3}>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Text fontSize={2}>
        {dimensionName}
      </Text>
    </Box>
    <Box width="100%" overflowX="scroll" ref={scrollRef}>
      <Box minWidth="1000px">
        <Bar
          options={chartOptions}
          height={150}
          // @ts-ignore
          width="100%"
          data={weeklyDimensionStatsBarChart}
         />
      </Box>
    </Box>
  </Box>
}

export default Statistic
