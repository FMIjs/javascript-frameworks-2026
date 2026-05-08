'use server'

import { updateUser as updateUserApi } from "@/app/api/user/data/users.service";
// import { UserService } from "@/app/api/user/data/users.service";
import { revalidateTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateUser = async (formData: FormData) => {
  const id = formData.get('id') as string
  const name = formData.get('name') as string

  // const userService = UserService.getInstance()
  // userService.updateUser(Number(id), { name })
  updateUserApi(Number(id), { name })

  // updateTag('user')
  // revalidateTag(`user-${id}`, 'seconds')

  redirect(`/user/list`)
}