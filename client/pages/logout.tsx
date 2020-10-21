import React, { useEffect } from 'react'
import Link from 'next/link'

import fetch from 'isomorphic-fetch'
import Layout from '../components/Layout'

import Box from '../system/Box'
import Card from '../system/Card'

const logout: () => Promise<any> = async () => fetch('/api/logout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
})

const Login: React.FC<any> = () => {
  useEffect(() => {
    window.localStorage.removeItem('donesince__apiToken')
    logout()
  }, [])

  return <Layout isStatic={true}>
    <Card maxWidth="600px" margin="auto">
      <Box marginY={4}>You're logged out.</Box>
      <Box marginY={4}>
        <Link href="/login"><a>Click here</a></Link> to log in again.
      </Box>
    </Card>
  </Layout>
}

export default Login
