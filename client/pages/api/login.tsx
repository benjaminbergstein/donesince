import nextConnect from 'next-connect'
import { encrypt } from '../../lib/crypto'
import { setTokenCookie } from '../../lib/auth-cookies'

import createApolloClient from '../../apollo/apolloClient'
import { LOG_IN } from '../../apollo/queries'

export default nextConnect()
  .post(async (req, res) => {
    try {
      const { name } = req.body
      const client = createApolloClient({}, {})
      const { data } = await client.mutate({
        mutation: LOG_IN,
        variables: { name },
      })
      const { apiToken } = data.authenticate
      setTokenCookie(res, apiToken)
      res.statusCode = 200
      res.end(JSON.stringify({ apiToken }))
    } catch (error) {
      console.log(error)
      res.statusCode = 401
      res.end(JSON.stringify(error))
    }
  })
