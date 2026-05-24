import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import './index.css'
import App from './App.tsx'
import { TodosMachineContext } from './machines/TodosMachineContext'
import { UiMachineContext } from './machines/UiMachineContext'
import { apolloClient } from './apolloClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <TodosMachineContext.Provider>
        <UiMachineContext.Provider>
          <App />
        </UiMachineContext.Provider>
      </TodosMachineContext.Provider>
    </ApolloProvider>
  </StrictMode>,
)
