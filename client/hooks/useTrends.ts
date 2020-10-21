import { useQuery } from '@apollo/react-hooks';

import { Trend } from '../apollo/types'
import { MY_TRENDS } from '../apollo/queries'

interface TrendsQueryResponse {
  activityTrends: Trend[]
}

interface TrendReturn {
  data: TrendsQueryResponse
}

const useTrends: () => TrendReturn = () => {
  const { data = { activityTrends: [] } } = useQuery(MY_TRENDS)
  return { data }
}

export default useTrends
