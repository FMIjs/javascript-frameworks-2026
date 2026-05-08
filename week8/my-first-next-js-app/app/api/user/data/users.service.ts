import type { User } from "@/app/user/list/types/user";
import users from '@/app/api/user/data/users.json'
import { writeFileSync } from "fs";


export const getUsers = (): User[] => {
  console.log('Fetching users from UserService');
  return users;
}

export const getUserById = (id: number): User | undefined => {
  const user = users.find(user => user.id === id);
  console.log(`Fetching user with ID: ${id} from UserService -- ${user?.name}`);
  return user;
}

export const updateUser = (id: number, updatedData: Partial<User>): User | undefined => {
  console.log(`Updating user with ID: ${id} in UserService with data:`, updatedData);

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    console.warn(`User with ID: ${id} not found in UserService`);
    return undefined;
  }

  const updatedUser = { ...users[userIndex], ...updatedData };
  users[userIndex] = updatedUser;

  writeFileSync('./app/api/user/data/users.json', JSON.stringify(users, null, 2));

  return updatedUser;
}


// export class UserService {
//   private static instance: UserService | null = null;
//   // users: User[] = [];

//   private constructor() {
//     console.log('Initializing UserService with users from JSON file');
//     // this.users = users;
//   }

//   static getInstance(): UserService {
//     // console.log(`UserService instance requested. Current instance: ${UserService.instance ? 'exists' : 'does not exist ⚠️'}`);
//     if (!UserService.instance) {
//       UserService.instance = new UserService();
//     }
//     return UserService.instance;
//   }

//   getAll(): User[] {
//     return users;
//     // return this.users;
//   }

//   getById(id: number): User | undefined {
//     return users.find(user => user.id === id);
//     // return this.users.find(user => user.id === id);
//   }

//   updateUser(id: number, updatedData: Partial<User>): User | undefined {
//     const userIndex = users.findIndex(user => user.id === id);
//     if (userIndex === -1) {
//       return undefined;
//     }

//     const updatedUser = { ...users[userIndex], ...updatedData };
//     users[userIndex] = updatedUser;

//     writeFileSync('./app/api/user/data/users.json', JSON.stringify(users, null, 2));

//     return updatedUser;
//   }
// }
