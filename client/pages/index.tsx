import React, { useState } from 'react'
import styled from 'styled-components'

import withData from '../apollo/withData'
import { ActivityType } from '../apollo/types'

import FlashContext, { useFlashState, FlashState } from '../contexts/FlashContext'

import Message from '../system/Message'

import MyTrendsList from '../components/MyTrendsList'
import SearchActivityTypes from '../components/SearchActivityTypes'
import RecordedActivitiesList from '../components/RecordedActivitiesList'
import RecordActivity from '../components/RecordActivity'
import CreateActivityType from '../components/CreateActivityType'

import System from '../system/System'

const Page = styled.div`
  font-family: "Helvetica Neue", sans-serif
`

const Home: React.FC<any> = () => {
  const flashState: FlashState = useFlashState()
  const { messages } = flashState

  return <Page>
    <System>
      <FlashContext.Provider value={flashState}>
        {messages.map((message) => (
          <Message>{message}</Message>
        ))}
        <MyTrendsList />
        <RecordActivity />
        <CreateActivityType />
        <RecordedActivitiesList />
      </FlashContext.Provider>
    </System>
  </Page>
}

export default withData(Home)
