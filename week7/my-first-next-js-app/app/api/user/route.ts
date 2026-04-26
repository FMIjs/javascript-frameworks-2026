import users from '@/app/api/user/data/users.json'

export async function GET() {
  console.log('Fetching users from API route');
  return Response.json(users)
}
