// import { decrypt } from '../lib/crypto'
import { getTokenCookie } from '../lib/auth-cookies'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from "apollo-link-context";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from 'apollo-boost';

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const isServer = !process.browser
const serverUri = process.env.SERVER_URL
const clientUri = publicRuntimeConfig.CLIENT_URL

const getTokenFromReq: (ctx: any) => string | undefined = (ctx) => {
  const { req } = ctx

  try {
    const apiToken = getTokenCookie(req)
    return apiToken
  } catch (e) {
    return undefined
  }
}

const authContext = setContext(() => {
  if (isServer) return {}

  const apiToken = window.localStorage.getItem('donesince__apiToken')
  if (!apiToken) return {}

  return { headers: { authorization: `Bearer ${apiToken}` } }
})

const createApolloClient = (initialState: NormalizedCacheObject, ctx: any) => {
  const apiToken = isServer ? getTokenFromReq(ctx) : undefined
  const headers = apiToken ? { authorization: `Bearer ${apiToken}` } : {}

  const link = authContext.concat(createHttpLink({
    uri: (isServer ? serverUri : clientUri) + '/graphql',
    headers: headers
  }))

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    ssrMode: isServer,
    link,
    cache: new InMemoryCache().restore(initialState),
    ssrForceFetchDelay: 100,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })

  return client
}

export default createApolloClient
