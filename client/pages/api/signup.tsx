import nextConnect from 'next-connect'
// import { encrypt } from '../../lib/crypto'
import { setTokenCookie } from '../../lib/auth-cookies'

import createApolloClient from '../../apollo/apolloClient'
import { SIGN_UP } from '../../apollo/queries'

export default nextConnect()
  .post(async (req, res) => {
    try {
      const { name } = (req as any).body
      const client = createApolloClient({}, {})
      const { data } = await client.mutate({
        mutation: SIGN_UP,
        variables: { name },
      })
      const { apiToken } = data.signUp
      setTokenCookie(res, apiToken)
      res.statusCode = 200
      res.end(JSON.stringify({ apiToken }))
    } catch (error) {
      res.statusCode = 401
      res.end(JSON.stringify(error))
    }
  })
