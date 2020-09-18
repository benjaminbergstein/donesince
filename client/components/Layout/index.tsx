import Head from 'next/head'
import React from 'react'
import { Reset } from 'styled-reset'

import System from '../../system/System'
import Box from '../../system/Box'

import styled from 'styled-components'
import Flash, { FlashProvider } from '../../components/Flash'
import { DeviceProvider } from '../../contexts/DeviceContext'

import Navigation from './Navigation'

const Page = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const globalStyles = `
html, body {
  height: 100%;
  min-height: 100%;
}

#__next {
  height: 100%;
}
`

const Layout: React.FC<{}> = ({ children }) => (
  <Page>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <style>{globalStyles}</style>
    </Head>

    <System>
      <Reset />
      <FlashProvider>
        <DeviceProvider>
          <Navigation />
          <Flash />

          <Box
            flex="1"
            overflow="scroll"
          >
            {children}
          </Box>
        </DeviceProvider>
      </FlashProvider>
    </System>
  </Page>
)

export default Layout
