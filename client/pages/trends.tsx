import React, { useState } from 'react'
import withData from '../apollo/withData'

import Layout from '../components/Layout'
import WeeklyDimensionStats from '../components/WeeklyDimensionStats'

enum View {
  Timeline = 0,
  Add,
  Trends,
}

const Trends: React.FC<any> = () => {
  return <Layout>
    <WeeklyDimensionStats />
  </Layout>
}

export default withData(Trends)
