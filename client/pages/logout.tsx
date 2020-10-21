import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import fetch from 'isomorphic-fetch'
import Layout from '../components/Layout'

import Box from '../system/Box'
import Button from '../system/Button'
import Text from '../system/Text'
import TextInput from '../system/TextInput'

// import Takeover from '../system/Takeover'
import Card from '../system/Card'

import UserContext from '../contexts/UserContext'

const logout: (name: string) => Promise<LoginResponse> = async (name) => fetch('/api/logout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
})

const Login: React.FC<any> = () => {
  const router = useRouter()

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
