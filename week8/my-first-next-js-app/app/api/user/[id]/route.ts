import type { NextRequest } from 'next/server'
import { getUserById } from '../data/users.service';
// import { UserService } from '../data/users.service';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log(`Fetching user with ID: ${id} from API route`);

  const user = getUserById(Number(id))
  // const userService = UserService.getInstance()
  // const user = userService.getById(Number(id))

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }

  return Response.json(user)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log(`Updating user with ID: ${id} from API route`);
  const userIndex = getUserById(Number(id))
  // const userService = UserService.getInstance()
  // const userIndex = userService.getById(Number(id))

  if (!userIndex) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }


  const requestBody = await req.json()

  // Update user logic here

  return Response.json({ message: 'User updated successfully' })
}
