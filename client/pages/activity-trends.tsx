import React from 'react'

import { withApollo } from '../apollo/withApollo'

import { SyncProvider, ListUnsyncedActivities } from '../contexts/SyncActivityContext'

import MyTrendsList from '../components/MyTrendsList'
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
        <MyTrendsList />
      </Box>
      <RecordModal />
    </SyncProvider>
  </Layout>
}

export default withApollo({ ssr: true })(Home)
