import Head from 'next/head'
import React, { useState } from 'react'
import styled from 'styled-components'

import withData from '../apollo/withData'

import { SyncProvider, ListUnsyncedActivities } from '../contexts/SyncActivityContext'

import Tab from '../system/Tab'

import Flash, { FlashProvider } from '../components/Flash'
import MyTrendsList from '../components/MyTrendsList'
import Timeline from '../components/Timeline'
import RecordActivity from '../components/RecordActivity'
import RecordModal from '../components/RecordModal'

import System from '../system/System'
import Box from '../system/Box'

const Page = styled.div`
  font-family: "Helvetica Neue", sans-serif
`

enum View {
  Timeline = 0,
  Add,
  Trends,
}

const Home: React.FC<any> = () => {
  const [view, setView] = useState<View>(View.Timeline)

  return <Page>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>

    <System>
      <FlashProvider>
        <SyncProvider>
          <ListUnsyncedActivities />
          <Flash />

          <Box
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <Box
              display="flex"
              flexDirection="row"
              marginBottom="1em"
            >
              <Tab
                label="Timeline"
                onClick={() => setView(View.Timeline) }
                active={view === View.Timeline}
              />
              <Tab
                label="Add"
                onClick={() => setView(View.Add) }
                active={view === View.Add}
              />
              <Tab
                label="Trends"
                onClick={() => setView(View.Trends) }
                active={view === View.Trends}
              />
            </Box>

            {view === View.Timeline && <Box>
              <Timeline />
            </Box>}

            {view === View.Add && <Box>
              <RecordActivity />
            </Box>}

            {view === View.Trends&& <Box>
              <MyTrendsList />
            </Box>}

          </Box>
          <RecordModal />
        </SyncProvider>
      </FlashProvider>
    </System>
  </Page>
}

export default withData(Home)
