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

const useTimeline: (offset?: number | undefined) => TimelineReturn = (offset = 0) => {
  const { data = { timeline: [] } } = useQuery(MY_ACTIVITIES, {
    variables: { offset },
    pollInterval,
  })
  return { data }
}

export default useTimeline
