import React from 'react'
import { withApollo } from '../apollo/withApollo'

import Layout from '../components/Layout'
import WeeklyDimensionStats from '../components/WeeklyDimensionStats'

const Trends: React.FC<any> = () => {
  return <Layout>
    <WeeklyDimensionStats />
  </Layout>
}

export default withApollo({ ssr: true })(Trends)
