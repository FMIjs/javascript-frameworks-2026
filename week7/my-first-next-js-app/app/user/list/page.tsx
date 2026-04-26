import { Suspense } from "react";
import { UserList, UserListLoading } from "./components/user-list";

export default function Page() {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        User list
      </h1>
      <div>
        <Suspense fallback={<UserListLoading />}>
          <UserList />
        </Suspense>
      </div>
    </div>
  )
}