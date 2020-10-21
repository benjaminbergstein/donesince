import Head from 'next/head'
import React from 'react'
import { Reset } from 'styled-reset'

import System from '../../system/System'
import Box from '../../system/Box'

import styled from 'styled-components'
import Flash, { FlashProvider } from '../../components/Flash'
import { DeviceProvider } from '../../contexts/DeviceContext'
import { EditingProvider } from '../../contexts/EditingContext'
import { UserProvider } from '../../contexts/UserContext'

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

const Provider: React.FC<{
  isStatic: boolean
  requireAuthentication: boolean
}> = ({
  children,
  isStatic,
  requireAuthentication
}) => {
  if (isStatic) return <>{children}</>

  return <UserProvider requireAuthentication={requireAuthentication}>
    <EditingProvider>
      {children}
    </EditingProvider>
  </UserProvider>
}

interface Props {
  isStatic?: boolean
  requireAuthentication?: boolean
}

const Layout: React.FC<Props> = ({
  isStatic = false,
  requireAuthentication = false,
  children,
}) => (
  <Page>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <style>{globalStyles}</style>
    </Head>

    <System>
      <Reset />
      <FlashProvider>
        <DeviceProvider>
          <Provider
            isStatic={isStatic}
            requireAuthentication={requireAuthentication}
          >
            <Navigation />
            <Flash />

            <Box
              flex="1"
              overflow="scroll"
            >
              {children}
            </Box>
          </Provider>
        </DeviceProvider>
      </FlashProvider>
    </System>
  </Page>
)

export default Layout
