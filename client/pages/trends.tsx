import React from 'react'
import withData from '../apollo/withData'

import Layout from '../components/Layout'
import WeeklyDimensionStats from '../components/WeeklyDimensionStats'

const Trends: React.FC<any> = () => {
  return <Layout>
    <WeeklyDimensionStats />
  </Layout>
}

export default withData(Trends)
