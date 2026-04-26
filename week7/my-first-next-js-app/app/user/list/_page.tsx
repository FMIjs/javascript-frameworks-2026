import { Suspense } from "react";
import { TestClient } from "./components/test-client";
import { TestServer } from "./components/test-server";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function UserList() {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        User list
      </h1>
      <div>
        <TestClient />

        {/* <ErrorBoundary errorComponent={<div>Something went wrong</div>}> */}
        <Suspense fallback={<div>Loading server component...</div>}>
          <TestServer />
        </Suspense>
        {/* </ErrorBoundary> */}
      </div>
    </div>
  )
}