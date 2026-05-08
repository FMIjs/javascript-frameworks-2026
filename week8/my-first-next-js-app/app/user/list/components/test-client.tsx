'use client';

import { useState } from "react";

export const TestClient = () => {

  const [numbers, setNumbers] = useState([1, 2, 3]);

  return (
    <div>
      <h2 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Test client component
      </h2>
      <div>
        {numbers.map((number) => (
          <div key={number}>{number}</div>
        ))}
      </div>
      <button
        onClick={() => setNumbers([...numbers, numbers.length + 1])}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add number
      </button>
    </div>
  );
}