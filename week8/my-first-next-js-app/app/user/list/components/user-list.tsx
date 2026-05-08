import Link from 'next/link';
import type { User } from '../types/user';
import { SERVER_URL } from '@/app/constants';
import { cacheLife, cacheTag } from 'next/cache';

export const UserList = async () => {
  'use cache'
  cacheLife('hours')
  // cacheTag('user')

  const users: User[] = await fetch(`${SERVER_URL}/api/user`)
    .then(res => res.json());

  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>
          {user.name}
          <Link href={`/user/list/${user.id}`} className="ml-2 text-blue-500 hover:underline">View details</Link>
        </div>
      ))}
    </div>
  )
}


export const UserListLoading = () => {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Loading user list...
      </h1>
    </div>
  );
}