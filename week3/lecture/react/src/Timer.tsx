import { useEffect, useMemo, useRef, useState } from "react";

export function Timer(props: { startValue?: number }) {
  const { startValue } = props;
  const [counter, setCounter] = useState(startValue || 0);
  // const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    let timerId: number | null = setInterval(() => {
      setCounter((curr) => {
        if (curr === 1) {
          clearInterval(timerId!);
          timerId = null;
        }
        return curr - 1;
      });
    }, 1000) as unknown as number;

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  return <div>{counter}</div>;
}
