import Head from 'next/head'
import React from 'react'

import System from '../system/System'
import styled from 'styled-components'
import Flash, { FlashProvider } from '../components/Flash'

const Page = styled.div`
  font-family: "Helvetica Neue", sans-serif
`

const Layout: React.FC<{}> = ({ children }) => (
  <Page>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>

    <System>
      <FlashProvider>
        <Flash />

        {children}
      </FlashProvider>
    </System>
  </Page>
)

export default Layout
