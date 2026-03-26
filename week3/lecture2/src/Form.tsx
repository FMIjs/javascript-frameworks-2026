import { use, useEffect, useMemo } from "react";


export const asyncOp = (): Promise<string> => {
  console.log('asyncOp called');
  return new Promise((res) => {
    console.log('asyncOp started');
    setTimeout(() => {
      console.log('asyncOp finished');
      res('Hello from asyncOp!');
    }, 2000);
  })
};

export const Form = ({ action }: { action: Promise<string> }) => {
  // useEffect(() => {
  //   asyncOp()
  // }, [])

  // const data = useMemo(() => {
  //   return asyncOp()
  // }, [])

  // const data = use(asyncOp());
  // const data = "test"
  const data = use(action);

  return <div>{data}</div>;
}