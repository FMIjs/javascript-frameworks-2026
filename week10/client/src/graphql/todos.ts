import { gql, type TypedDocumentNode } from '@apollo/client'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

export const TODOS_QUERY: TypedDocumentNode<
  { todos: Todo[] },
  Record<string, never>
> = gql`
  query Todos {
    todos {
      id
      text
      completed
    }
  }
`

export const ADD_TODO: TypedDocumentNode<
  { addTodo: Todo },
  { text: string }
> = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`

export const TOGGLE_TODO: TypedDocumentNode<
  { toggleTodo: Todo | null },
  { id: string }
> = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`

export const REMOVE_TODO: TypedDocumentNode<
  { removeTodo: boolean },
  { id: string }
> = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id)
  }
`
