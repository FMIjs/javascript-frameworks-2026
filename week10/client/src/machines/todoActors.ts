import { fromPromise } from 'xstate'
import { apolloClient } from '../apolloClient'
import {
  ADD_TODO,
  REMOVE_TODO,
  TODOS_QUERY,
  TOGGLE_TODO,
  type Todo,
} from '../graphql/todos'

export const fetchTodos = fromPromise<Todo[]>(async () => {
  const result = await apolloClient.query({
    query: TODOS_QUERY,
    fetchPolicy: 'network-only',
  })
  if (!result.data) throw new Error('todos query returned no data')
  return result.data.todos
})

export const addTodoActor = fromPromise<Todo, { text: string }>(
  async ({ input }) => {
    const result = await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: { text: input.text },
    })
    if (!result.data) throw new Error('addTodo returned no data')
    return result.data.addTodo
  },
)

export const toggleTodoActor = fromPromise<Todo, { id: string }>(
  async ({ input }) => {
    const result = await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: input.id },
    })
    if (!result.data?.toggleTodo) throw new Error('toggleTodo returned no data')
    return result.data.toggleTodo
  },
)

export const removeTodoActor = fromPromise<{ id: string }, { id: string }>(
  async ({ input }) => {
    const result = await apolloClient.mutate({
      mutation: REMOVE_TODO,
      variables: { id: input.id },
    })
    if (!result.data?.removeTodo) throw new Error('removeTodo failed')
    return { id: input.id }
  },
)
