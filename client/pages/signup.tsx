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

interface SignupResponse {
  apiToken: string
}

const signup: (name: string) => Promise<SignupResponse> = async (name) => fetch('/api/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name }),
}).then((res) => res.json())

const Signup: React.FC<any> = () => {
  const router = useRouter()
  const [name, setName] = React.useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { apiToken } = await signup(name)
    console.log(apiToken)
    window.localStorage.setItem('donesince__apiToken', apiToken)
    console.log(window.localStorage.getItem('donesince__apiToken'))
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
          <Button>Sign up</Button>
        </Box>
        <Box marginTop={2}>
          <Link href="/login">
            <a>Log in instead</a>
          </Link>
        </Box>
      </form>
    </Card>
  </Layout>
}

export default Signup
