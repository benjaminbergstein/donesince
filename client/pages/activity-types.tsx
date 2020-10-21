import React from 'react'
import { useRouter } from 'next/router'

import { withApollo } from '../apollo/withApollo'

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

export default withApollo({ ssr: true })(Home)
