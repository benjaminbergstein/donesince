import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './schema'
import resolvers from './resolvers'
import createContext from './createContext'
// import { applyAuthenticationMiddleware } from './authentication'

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});
// applyAuthenticationMiddleware(app)
server.applyMiddleware({ app })

const callback: () => void = () => {
  console.log(`Server ready at localhost:${process.env.PORT}`);
}

app.listen({ port: process.env.PORT }, callback)
