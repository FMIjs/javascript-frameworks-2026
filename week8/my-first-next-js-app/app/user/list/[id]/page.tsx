import { SERVER_URL } from "@/app/constants";
import { redirect } from "next/navigation";
import type { User } from "../types/user";
import { cacheLife, cacheTag } from "next/cache";
import Form from 'next/form'
import { updateUser } from "../../actions/updateUser";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  'use cache'
  cacheLife('hours')

  const { id } = await params;
  // cacheTag(`user-${id}`);

  const user: User = await fetch(`${SERVER_URL}/api/user/${id}`).then(res => res.json());

  if (!user) {
    return void redirect('/user/list');
  }

  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        User details page for {user.name}
      </h1>
      <div>
        <Form key={user.name} action={updateUser}>
          <input type="hidden" name="id" value={user.id} />
          <input type="text" name="name" defaultValue={user.name} className="border p-2 rounded mb-4 w-full" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edit user
          </button>
        </Form>
      </div>
    </div>
  );
}