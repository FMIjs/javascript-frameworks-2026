import { Lawn } from './components/Lawn.tsx'
import { ToDoContainer } from './components/Todo.tsx'
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return <header>
    Header - Current theme: {theme}
    <button onClick={toggleTheme}>Toggle Theme</button>
  </header>
}

const Main = () => {
  return <main>
    {/* <Lawn /> */}
    <ToDoContainer />
  </main>
}

const Footer = () => {
  return <footer>
    Footer content
  </footer>
}

export default App
