'use server';

import { longOp } from "@/utils/longOp";
import { readFileSync } from "fs";

export const TestServer = async () => {
  console.log("Rendering test server component...");
  const numbers = JSON.parse(readFileSync("./app/user/list/components/numbers.json", "utf-8"));

  console.log("Finished reading numbers, now waiting for long operation...");
  await longOp();

  return (
    <div>
      <h2 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Test server component
      </h2>
      <div>
        {numbers.map((number: number) => (
          <div key={number}>{number}</div>
        ))}
      </div>
    </div>
  );
}