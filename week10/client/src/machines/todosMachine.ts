import { setup, assign } from 'xstate'
import type { Todo } from '../graphql/todos'
import {
  addTodoActor,
  fetchTodos,
  removeTodoActor,
  toggleTodoActor,
} from './todoActors'

export type { Todo } from '../graphql/todos'

const toErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unknown error'

export const todosMachine = setup({
  types: {
    context: {} as { todos: Todo[]; error: string | null },
    events: {} as
      | { type: 'todo.add'; text: string }
      | { type: 'todo.toggle'; id: string }
      | { type: 'todo.remove'; id: string }
      | { type: 'retry' },
  },
  actors: {
    fetchTodos,
    addTodoActor,
    toggleTodoActor,
    removeTodoActor,
  },
}).createMachine({
  id: 'todos',
  context: { todos: [], error: null },
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        src: 'fetchTodos',
        onDone: {
          target: 'ready',
          actions: assign({
            todos: ({ event }) => event.output,
            error: null,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) => toErrorMessage(event.error),
          }),
        },
      },
    },
    error: {
      on: { retry: 'loading' },
    },
    ready: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            'todo.add': 'adding',
            'todo.toggle': 'toggling',
            'todo.remove': 'removing',
          },
        },
        adding: {
          invoke: {
            src: 'addTodoActor',
            input: ({ event }) => {
              if (event.type !== 'todo.add') {
                throw new Error('addTodoActor requires todo.add event')
              }
              return { text: event.text }
            },
            onDone: {
              target: 'idle',
              actions: assign({
                todos: ({ context, event }) => [
                  ...context.todos,
                  event.output,
                ],
                error: null,
              }),
            },
            onError: {
              target: 'idle',
              actions: assign({
                error: ({ event }) => toErrorMessage(event.error),
              }),
            },
          },
        },
        toggling: {
          invoke: {
            src: 'toggleTodoActor',
            input: ({ event }) => {
              if (event.type !== 'todo.toggle') {
                throw new Error('toggleTodoActor requires todo.toggle event')
              }
              return { id: event.id }
            },
            onDone: {
              target: 'idle',
              actions: assign({
                todos: ({ context, event }) =>
                  context.todos.map((todo) =>
                    todo.id === event.output.id ? event.output : todo,
                  ),
                error: null,
              }),
            },
            onError: {
              target: 'idle',
              actions: assign({
                error: ({ event }) => toErrorMessage(event.error),
              }),
            },
          },
        },
        removing: {
          invoke: {
            src: 'removeTodoActor',
            input: ({ event }) => {
              if (event.type !== 'todo.remove') {
                throw new Error('removeTodoActor requires todo.remove event')
              }
              return { id: event.id }
            },
            onDone: {
              target: 'idle',
              actions: assign({
                todos: ({ context, event }) =>
                  context.todos.filter(
                    (todo) => todo.id !== event.output.id,
                  ),
                error: null,
              }),
            },
            onError: {
              target: 'idle',
              actions: assign({
                error: ({ event }) => toErrorMessage(event.error),
              }),
            },
          },
        },
      },
    },
  },
})
