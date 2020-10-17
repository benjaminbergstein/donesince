import { useQuery } from '@apollo/react-hooks';
import { MY_ACTIVITIES } from '../apollo/queries'

const pollInterval = 10000

import { formatDatestamp } from '../utils/time'

import {
  TimelineStat,
} from '../apollo/types'

interface TimelineQueryResponse {
  timeline: TimelineStat[]
}

interface TimelineReturn {
  data: TimelineQueryResponse
}

const TodayDatestamp = formatDatestamp(new Date())

const useTimeline: (date?: string) => TimelineReturn = (date = TodayDatestamp) => {
  const { data = { timeline: [] } } = useQuery(MY_ACTIVITIES, {
    variables: { date },
    pollInterval,
  })
  return { data }
}

export default useTimeline
