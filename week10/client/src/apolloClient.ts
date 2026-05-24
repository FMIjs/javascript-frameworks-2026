import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpUri =
  import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql'

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: httpUri }),
  cache: new InMemoryCache(),
})
