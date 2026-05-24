import { todoResolvers } from './todoResolvers.js'

export const resolvers = {
  Query: {
    ...todoResolvers.Query,
  },
  Mutation: {
    ...todoResolvers.Mutation,
  },
}
