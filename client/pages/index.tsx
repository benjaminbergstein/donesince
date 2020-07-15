import React from 'react'
import styled from 'styled-components'

import withData from '../apollo/withData'

import MyTrendsList from '../components/MyTrendsList'
import RecordedActivitiesList from '../components/RecordedActivitiesList'
import RecordActivity from '../components/RecordActivity'
import CreateActivityType from '../components/CreateActivityType'

import System from '../system/System'

const Page = styled.div`
  font-family: "Helvetica Neue", sans-serif
`

const Home: React.FC<any> = () => {
  return <Page>
    <System>
      <MyTrendsList />
      <RecordActivity />
      <CreateActivityType />
      <RecordedActivitiesList />
    </System>
  </Page>
}

export default withData(Home)
