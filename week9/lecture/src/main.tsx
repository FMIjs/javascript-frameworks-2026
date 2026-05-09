import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodoMachineContext } from './machines/TodoMachineContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoMachineContext.Provider>
      <App />
    </TodoMachineContext.Provider>
  </StrictMode>,
)
