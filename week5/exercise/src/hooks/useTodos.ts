// React Concepts: custom hook, useState with lazy initializer, useCallback
import { useState, useCallback } from 'react'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export function useTodos() {
  // useState with a lazy initializer: runs only once on the first render
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem('todos')
      return stored ? (JSON.parse(stored) as Todo[]) : []
    } catch {
      return []
    }
  })

  // Helper: update state AND persist to localStorage atomically
  function updateTodos(updater: (prev: Todo[]) => Todo[]) {
    setTodos((prev) => {
      const next = updater(prev)
      localStorage.setItem('todos', JSON.stringify(next))
      return next
    })
  }

  // useCallback: memoises the function reference so child components that
  // receive it as a prop don't re-render unnecessarily (when combined with React.memo)
  const addTodo = useCallback((text: string) => {
    updateTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
    ])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    updateTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    updateTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const clearCompleted = useCallback(() => {
    updateTodos((prev) => prev.filter((todo) => !todo.completed))
  }, [])

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted }
}
