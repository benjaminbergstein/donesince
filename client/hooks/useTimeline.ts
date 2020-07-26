import { useQuery } from '@apollo/react-hooks';
import { MY_ACTIVITIES } from '../apollo/queries'

const pollInterval = 5000

import {
  TimelineStat,
} from '../apollo/types'

interface TimelineQueryResponse {
  timeline: TimelineStat[]
}

interface TimelineReturn {
  data: TimelineQueryResponse
}

const useTimeline: () => TimelineReturn = () => {
  const { data = { timeline: [] } } = useQuery(MY_ACTIVITIES, { pollInterval })
  return { data }
}

export default useTimeline
