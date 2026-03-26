import { Suspense, useContext, useReducer } from "react";
import { ThemeContext } from "./context/theme";
import { Title } from "./Title";
import { asyncOp, Form } from "./Form";


type AppState = {
  count: number;
}
type AppAction = "increment" | "decrement" | "reset";

type AppProps = {
  toggleTheme: () => void;
};
export const App = ({ toggleTheme }: AppProps) => {
  const theme = useContext(ThemeContext);

  const [state, dispatch] = useReducer<AppState, [AppAction]>((state, action) => {
    console.log({ action })
    switch (action) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      case 'reset':
        return { count: 0 };
      default:
        return state;
    }
  }, { count: 0 });

  return <div>
    <div style={{
      backgroundColor: theme === 'light' ? 'white' : 'black',
      color: theme === 'light' ? 'black' : 'white',
      padding: 20,
    }}>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch('increment')}>Increment</button>
      <button onClick={() => dispatch('decrement')}>Decrement</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
    </div>

    <Title title="Test" />
    <Title title={`Count: ${state.count}`} />

    <br />
    <br />
    <br />

    <Suspense fallback={<div>Loading...</div>}>
      <Form action={asyncOp()} />
    </Suspense>

    <button onClick={toggleTheme}>Toggle Theme</button>
  </div>;
}