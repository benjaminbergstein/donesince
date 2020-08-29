import { useQuery } from '@apollo/react-hooks';

import { Trend } from '../apollo/types'
import { MY_TRENDS } from '../apollo/queries'

interface TrendsQueryResponse {
  activityTrends: Trend[]
}

interface TrendReturn {
  data: TrendsQueryResponse
}

const pollInterval = 5000

const useTrends: () => TrendReturn = () => {
  const { data = { activityTrends: [] } } = useQuery(MY_TRENDS, { pollInterval })
  return { data }
}

export default useTrends