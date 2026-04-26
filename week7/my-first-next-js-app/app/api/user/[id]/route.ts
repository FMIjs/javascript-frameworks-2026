import type { NextRequest } from 'next/server'
import users from '@/app/api/user/data/users.json'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = users.find((u) => u.id === Number(id))

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }

  return Response.json(user)
}
