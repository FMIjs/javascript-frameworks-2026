// import { UserService } from './data/users.service';

import { getUsers } from "./data/users.service";

export async function GET() {
  console.log('Fetching users from API route');

  const users = getUsers()
  // const userService = UserService.getInstance()
  // const users = userService.getAll()

  return Response.json(users)
}
