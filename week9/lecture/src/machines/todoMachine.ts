import { setup, assign, fromPromise } from 'xstate'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type FilterMode = 'all' | 'active' | 'completed'

let counter = 0
const generateId = () =>
  `todo-${Date.now().toString(36)}-${(counter++).toString(36)}`

type RemoteTodo = {
  id: number
  title: string
  completed: boolean
}

const fetchTodos = fromPromise<Todo[]>(async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10',
  )
  if (!response.ok) {
    throw new Error(`Failed to load todos: HTTP ${response.status}`)
  }
  const data: RemoteTodo[] = await response.json()
  return data.map((item) => ({
    id: String(item.id),
    text: item.title,
    completed: item.completed,
  }))
})

export const todoMachine = setup({
  types: {
    context: {} as { todos: Todo[]; error: string | null },
    events: {} as
      | { type: 'todo.add'; text: string }
      | { type: 'todo.toggle'; id: string }
      | { type: 'todo.remove'; id: string }
      | { type: 'form.show' }
      | { type: 'form.hide' }
      | { type: 'filter.all' }
      | { type: 'filter.active' }
      | { type: 'filter.completed' }
      | { type: 'retry' },
  },
  actors: {
    fetchTodos,
  },
  actions: {
    addTodo: assign({
      todos: ({ context, event }) => {
        if (event.type !== 'todo.add') return context.todos
        return [
          ...context.todos,
          { id: generateId(), text: event.text, completed: false },
        ]
      },
    }),
    toggleTodo: assign({
      todos: ({ context, event }) => {
        if (event.type !== 'todo.toggle') return context.todos
        return context.todos.map((todo) =>
          todo.id === event.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        )
      },
    }),
    removeTodo: assign({
      todos: ({ context, event }) => {
        if (event.type !== 'todo.remove') return context.todos
        return context.todos.filter((todo) => todo.id !== event.id)
      },
    }),
    logEnterFilterAll: () => {
      console.log('[todoMachine] entered filter.all')
    },
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
            error: ({ event }) =>
              event.error instanceof Error
                ? event.error.message
                : 'Unknown error',
          }),
        },
      },
    },
    error: {
      on: {
        retry: 'loading',
      },
    },
    ready: {
      type: 'parallel',
      on: {
        'todo.toggle': { actions: 'toggleTodo' },
        'todo.remove': { actions: 'removeTodo' },
      },
      states: {
        form: {
          initial: 'idle',
          states: {
            idle: {
              on: { 'form.show': 'editing' },
            },
            editing: {
              on: {
                'form.hide': 'idle',
                'todo.add': { actions: 'addTodo' },
              },
            },
          },
        },
        filter: {
          initial: 'all',
          on: {
            'filter.all': '.all',
            'filter.active': '.active',
            'filter.completed': '.completed',
          },
          states: {
            all: {
              entry: 'logEnterFilterAll',
            },
            active: {},
            completed: {},
          },
        },
      },
    },
  },
})
