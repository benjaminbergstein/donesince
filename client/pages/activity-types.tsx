import React from 'react'

import withData from '../apollo/withData'

import { SyncProvider, ListUnsyncedActivities } from '../contexts/SyncActivityContext'

import RecordActivity from '../components/RecordActivity'
import RecordModal from '../components/RecordModal'
import Layout from '../components/Layout'

import Box from '../system/Box'

const Home: React.FC<any> = () => {
  return <Layout>
    <SyncProvider>
      <ListUnsyncedActivities />

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <RecordActivity />
      </Box>
      <RecordModal />
    </SyncProvider>
  </Layout>
}

export default withData(Home)
