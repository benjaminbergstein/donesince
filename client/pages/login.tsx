import React from 'react'
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

interface LoginResponse {
  apiToken: string
}

const login: (name: string) => Promise<LoginResponse> = async (name) => fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name }),
}).then((res) => res.json())

const Login: React.FC<any> = () => {
  const router = useRouter()
  const [name, setName] = React.useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { apiToken } = await login(name)
    window.localStorage.setItem('donesince__apiToken', apiToken)
    router.push('/')
  }

  return <Layout isStatic={true}>
    <Card maxWidth="600px" margin="auto">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row">
          <Box flex="1">
            Name
          </Box>
          <Box flex="1">
            <TextInput
              type='password'
              value={name}
              onChange={(newName) => { setName(newName) }}
            />
          </Box>
        </Box>
        <Box marginTop={2}>
          <Button>Log in</Button>
        </Box>
        <Box marginTop={2}>
          <Link href="/signup">
            <a>Sign up instead</a>
          </Link>
        </Box>
      </form>
    </Card>
  </Layout>
}

export default Login
