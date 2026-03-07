import { useCallback, useState } from "react";
import "./index.css";
import { Timer } from "./Timer";
import { List } from "./List";

export function App() {
  const [showTimer, setShowTimer] = useState(true);
  const [timerKey, setTimerKey] = useState(Math.random());
  const onClickHandler = useCallback(() => setShowTimer((curr) => !curr), []);

  return (
    <>
      <List />
      {/* {showTimer && <Timer key={timerKey} startValue={60} />}
      <button onClick={() => setShowTimer((curr) => !curr)}>
        {showTimer ? "Hide timer" : "Show timer"}
      </button>
      <button onClick={() => setTimerKey(Math.random())}>Reset</button> */}
    </>
  );
}

export default App;
