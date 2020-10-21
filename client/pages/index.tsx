import React from 'react'

import { withApollo } from '../apollo/withApollo'

import { SyncProvider, ListUnsyncedActivities } from '../contexts/SyncActivityContext'

import Timeline from '../components/Timeline'
import RecordModal from '../components/RecordModal'
import Layout from '../components/Layout'

import Box from '../system/Box'
import Takeover from '../system/Takeover'
import Card from '../system/Card'

const Home: React.FC<any> = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)


  return <Layout requireAuthentication={true}>
    <SyncProvider>
      <ListUnsyncedActivities />

      {<Takeover isVisible={isVisible} onClose={() => { setIsVisible(false) }}>
        <Card
          position="relative"
          boxShadow="box.2"
          margin="0 3px 0"
          flex="1"
          bg="white"
        >
          Foo
        </Card>
      </Takeover>}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Timeline />
      </Box>
      <RecordModal />
    </SyncProvider>
  </Layout>
}

export default withApollo({ ssr: true })(Home)
