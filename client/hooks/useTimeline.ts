import { useQuery } from '@apollo/react-hooks';
import { MY_ACTIVITIES } from '../apollo/queries'

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
  const { loading, data = { timeline: [] } } = useQuery(MY_ACTIVITIES, {
    variables: { date },
  })

  return { data }
}

export default useTimeline
