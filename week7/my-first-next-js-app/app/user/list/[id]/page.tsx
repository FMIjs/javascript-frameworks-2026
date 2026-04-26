import { SERVER_URL } from "@/app/constants";
import { redirect } from "next/navigation";
import { User } from "../types/user";
import { cacheLife } from "next/cache";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  'use cache'
  cacheLife('seconds')

  const { id } = await params;
  const user: User = await fetch(`${SERVER_URL}/api/user/${id}`).then(res => res.json());

  if (!user) {
    return void redirect('/user/list');
  }

  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        User details page
      </h1>
      <div>
        <h2 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {user.name}
        </h2>
      </div>
    </div>
  );
}