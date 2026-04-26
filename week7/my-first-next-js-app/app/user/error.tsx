'use client';

export default function UserError(props: { error: Error, reset: () => void }) {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Something went wrong with the user component!
      </h1>
      {props.error?.message && (
        <h2 className="max-w-xs text-xl leading-10 tracking-tight text-black dark:text-zinc-50">{props.error.message}</h2>
      )}
      <button
        className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => props.reset()}
      >
        Try again
      </button>
    </div>
  );
}