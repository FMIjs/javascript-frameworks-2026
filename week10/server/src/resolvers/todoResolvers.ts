import type { GraphQLContext } from '../context.js'
import type { TodoDoc } from '../models/Todo.js'

const toGraphQL = (doc: TodoDoc) => ({
  id: doc.id,
  text: doc.text,
  completed: doc.completed,
})

export const todoResolvers = {
  Query: {
    todos: async (
      _parent: unknown,
      _args: unknown,
      context: GraphQLContext,
    ) => {
      const docs = await context.models.Todo.find()
      return docs.map(toGraphQL)
    },
    todo: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const doc = await context.models.Todo.findById(args.id)
      return doc ? toGraphQL(doc) : null
    },
  },
  Mutation: {
    addTodo: async (
      _parent: unknown,
      args: { text: string },
      context: GraphQLContext,
    ) => {
      const doc = await context.models.Todo.create({ text: args.text })
      return toGraphQL(doc)
    },
    toggleTodo: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const updated = await context.models.Todo.findByIdAndUpdate(
        args.id,
        [{ $set: { completed: { $not: '$completed' } } }],
        { new: true, updatePipeline: true },
      )
      return updated ? toGraphQL(updated) : null
    },
    removeTodo: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      const result = await context.models.Todo.findByIdAndDelete(args.id)
      return result !== null
    },
  },
}
