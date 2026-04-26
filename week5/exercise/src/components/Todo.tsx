import React, { useActionState, startTransition, useCallback, useState, useRef, useEffect, use, useMemo, Suspense, useDeferredValue } from 'react';

import { delay } from "./helpers/delay"

type Todo = {
  id: string
  title: string
  completed: boolean
}

const addTodo = async (title: string): Promise<Todo> => {
  await delay(2000)

  const randomFailure = Math.random() < 0.2
  if (randomFailure) {
    throw new Error('Failed to add todo. Please try again.')
  }

  return {
    id: Math.random().toString(),
    title,
    completed: false
  }
}

const PAGE_SIZE = 3
const todos__store: Todo[] = [
  // page 1
  { id: '1', title: 'Learn React', completed: false },
  { id: '2', title: 'Build a ToDo App', completed: false },
  { id: '3', title: 'Master React Suspense', completed: false },
  // page 2
  { id: '4', title: 'Learn TypeScript', completed: false },
  { id: '5', title: 'Explore React Server Components', completed: false },
  { id: '6', title: 'Optimize React Performance', completed: false },
  // page 3
  { id: '7', title: 'Understand React Fiber', completed: false },
  { id: '8', title: 'Implement React Context API', completed: false },
  { id: '9', title: 'Build a React Portfolio', completed: false },
  // page 4
  { id: '10', title: 'Learn React Native', completed: false },
  { id: '11', title: 'Contribute to Open Source', completed: false },
  { id: '12', title: 'Stay Updated with React News', completed: false },
]

const fetchTodoPromiseCache = new Map<number, Promise<Todo[]>>()

const fetchTodos = (page: number): Promise<Todo[]> => {
  if (fetchTodoPromiseCache.has(page)) {
    console.log(`Returning cached todos for page ${page}...`)
    return fetchTodoPromiseCache.get(page)!
  }

  console.log(`Fetching todos for page ${page}...`)
  const fetchPromise = (async () => {
    await delay(1_000)
    // handle out-of-range page requests by starting from the first page
    const totalPages = Math.ceil(todos__store.length / PAGE_SIZE)
    const validPage = ((page - 1) % totalPages) + 1
    const startIndex = (validPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return todos__store.slice(startIndex, endIndex)
  })()
  fetchTodoPromiseCache.set(page, fetchPromise)
  return fetchPromise
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}


const ToDoContainerWrapper = () => {
  const [page, setPage] = useState(1)
  // useDeferredValue(page)
  const deferredPage = useDeferredValue(page)
  // const todosPromise = useMemo(async () => {
  //   const todos = await fetchTodos(1)
  //   console.log('Todos promise created:', todos)
  //   return todos
  // }, [])

  const handleNextPage = useCallback(() => {
    setPage(prevPage => prevPage + 1)
  }, [])
  const handlePreviousPage = useCallback(() => {
    setPage(prevPage => Math.max(prevPage - 1, 1))
  }, [])

  return <div>
    <div className="controls">
      <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
      <h2>Page: {page}</h2>
      <button onClick={handleNextPage}>Next</button>
    </div>
    <Suspense fallback={<Loading />}>
      <ToDoContainer page={deferredPage} />
      {/* <ToDoContainer todosPromise={todosPromise} /> */}
    </Suspense>
  </div>
}

// const ToDoContainer = ({ todosPromise }: { todosPromise: Promise<Todo[]> }) => {
//   const todos = use(todosPromise)
const ToDoContainer = ({ page }: { page: number }) => {
  const todos = use(fetchTodos(page))
  console.log('Todos loaded:', todos)
  return <div>
    {/* <h2>Page: {page}</h2> */}
    {todos.map(todo => (
      <div key={todo.id}>
        <h3>{todo.title}</h3>
        <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    ))}
  </div>
}


const ToDoContainerOld = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentTitle, setCurrentTitle] = useState<string>('')

  const [todos, dispatchAction, isPending] = useActionState<Todo[], string>(
    async (prevState, title) => {
      try {

        const newTodo = await addTodo(title)

        if (inputRef.current) {
          inputRef.current.value = ''
        }
        setCurrentTitle('') // Clear the input state as well

        return [...prevState, newTodo]
      } catch (error) {
        console.error('Error adding todo:', error)
        return prevState
      }
    },
    []
  )


  const handleAddTodo = useCallback(() => {
    startTransition(() => {
      dispatchAction(currentTitle)
    })
  }, [currentTitle])


  return <div>
    <button onClick={handleAddTodo} disabled={isPending || !currentTitle.trim()}>
      {isPending ? 'Adding...' : 'Add Todo'}
    </button>
    <input
      type="text"
      value={currentTitle}
      ref={inputRef}
      onChange={(e) => setCurrentTitle(e.target.value)}
      disabled={isPending}
    />
    {todos.map(todo => (
      <div key={todo.id}>
        <h3>{todo.title}</h3>
        <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    ))}
  </div>
}

export { ToDoContainerWrapper as ToDoContainer }