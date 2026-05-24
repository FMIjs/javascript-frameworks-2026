import { TodoModel } from './models/Todo.js'

export type Models = {
  Todo: typeof TodoModel
}

export type GraphQLContext = {
  models: Models
}

export const createContext = async (): Promise<GraphQLContext> => ({
  models: {
    Todo: TodoModel,
  },
})
