import nextConnect from 'next-connect'
import { setTokenCookie } from '../../lib/auth-cookies'

export default nextConnect()
  .post(async (_, res) => {
    try {
      setTokenCookie(res, undefined)
      res.statusCode = 200
      res.end()
    } catch (error) {
      console.log(error)
      res.statusCode = 401
      res.end(JSON.stringify(error))
    }
  })
