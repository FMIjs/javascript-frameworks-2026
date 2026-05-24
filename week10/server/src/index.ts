import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { expressMiddleware } from '@as-integrations/express5'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers/index.js'
import { connectDb, describeConnection, disconnectDb } from './db.js'
import { createContext, type GraphQLContext } from './context.js'

const PORT = Number(process.env.PORT ?? 4000)

async function start() {
  await connectDb()

  const app = express()
  const apollo = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  })
  await apollo.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: true, credentials: true }),
    express.json(),
    expressMiddleware(apollo, { context: createContext }),
  )

  app.get('/health', (_request, response) => {
    response.json({ ok: true })
  })

  const shutdown = async () => {
    await disconnectDb()
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  app.listen(PORT, () => {
    console.log(`GraphQL ready at http://localhost:${PORT}/graphql`)
    console.log(`MongoDB at ${describeConnection()}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
