// console.log('test');

// let a = 'test';
// a = 5

// let b: string = 'test';
// let c: number = 5;
// let d: boolean = true;

// b = 'test2';
// c = 10;
// d = false;

// let unk: unknown

// unk = 'test';
// unk = 5;
// unk = true;

// const funcVoid = () => {} // funcVoid = () => void
// const funcNum = () => 1 // funcNum = () => number
// const funcAny = (a) => a // funcAny = () => any

// const func = (a: number, b: number): number => (a + b + 'test') as unknown as number;
// const func2 = (): never => {
//   throw new Error('This function never returns');
// }

// let a: string | number = 'test';
// a = 5;

// const b = 'test' // b is "test" type, not string
// let c: 'test' = 'test'; // c is "test" type, not string
// // c = 'test2' // Error: Type '"test2"' is not assignable to type '"test"'.
// let stat: 'in_progress' | 'done' | 'error' = 'done'

// const func3 = (status: 'in_progress' | 'done' | 'error'): string | never => {
//   if (status === 'error') throw new Error('Error status is not allowed');
//   return status
// }

// const arrNum = [1, 2, 3] // arrNum is number[] type
// const arrStr = ['a', 'b', 'c'] // arrStr is string[] type
// const arrMixed = [1, 'a', true] // arrMixed is (string | number | boolean)[] type
// // arrMixed.push(null)


// const arrTuple: [number, string, boolean] = [1, 'a', true]
// // arrTuple[2] = 2

// const arrTupleReadonlyConst = [1, 'a', true] as const // arrTupleReadonlyConst is readonly [1, 'a', true] type
// // arrTupleReadonlyConst[0] = 1 // Cannot assign to '0' because it is a read-only property.ts(2540)
// const arrTupleReadonlyConst2: readonly [1, 'a', true] = [1, 'a', true]

// const arrSet: [1, 'a', true] = [1, 'a', true]
// arrSet.push(1) // arrSet is [1, 'a', true] type, but push is allowed because of array mutability

// const objInferred = {
//   a: 1,
//   b: 'test',
//   c: true,
// }
// const obj: {
//   a: number,
//   b: string,
//   c: boolean,
//   d?: string, // optional property
//   e: string | undefined,
//   f: number[],
//   g: [number, string, boolean],
//   h: {
//     a: number,
//     b: string,
//   }
// } = {
//   a: 1,
//   b: 'test',
//   c: true,
//   e: undefined,
//   f: [1, 2, 3],
//   g: [1, 'a', true],
//   h: {
//     a: 1,
//     b: 'test',
//   }
// }

// const funcOptional = (a: number, b?: number): number => a + (b ?? 0)
// // const funcOptionalErr = (a: number, b?: number, c: number): number => a + (b ?? 0) + c // Error: A required parameter cannot follow an optional parameter
// // funcOptionalErr(1, 2) // a, b
// // funcOptionalErr(1, 2) // a, c

// const funcDefault = (a: number, b: number = 0): number => a + b
// // funcDefault(1, 2) // a, b
// // funcDefault(1) // a, b = 0

// const funcObjParam = (obj: { a: number, b?: string, c: boolean }): string => 'test'
// const funcObjParam2 = (date: Date, options: { a: number, b?: string, c: boolean }): string => 'test'


// interface User {
//   id: number;
//   name: string;
//   email: string;
//   isAdmin?: boolean;
// }

// const user: User = {
//   id: 1,
//   name: 'John Doe',
//   email: 'asd@asd',
// }

// // type Animal = {
// //   name: string;
// //   age: number;
// // }

// interface Admin extends User {
//   role: string;
// }

// interface AdminFunctions {
//   createUser(user: User): void;
// }

// class AdminImpl implements Admin, AdminFunctions {
//   id: number;
//   name: string;
//   email: string;
//   role: string;

//   constructor(id: number, name: string, email: string, role: string) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.role = role;
//   }

//   createUser(user: User): void {
//     console.log('User created:', user);
//   }
// }

type Animal = {
  name: string;
  age: number;
}

type Dog = Animal & {
  breed: string;
}

// type User = {
//   id? : number;
//   name: string;
// }
type User = {
  id: number;
  name: string;
}

// type UserDTO = {
//   name: string;
// }
// type UserDTO = User & {
//   id: string; // ??
// }
// {
//   id: never;
//   name: string;
// }

// const u: UserDTO = {
//   name: 'test',
//   id: '1',
// }

type UserWithName = Pick<User, 'name'> // { name: string }
type UserWithoutId = Omit<User, 'id'> // { name: string }

type UserDTO = Omit<User, 'id'>

type PartialUser = Partial<User> // { id?: number; name?: string }
type ReadonlyUser = Readonly<User> // { readonly id: number; readonly name: string }

// type TemplateUser<T> = User & {
// type TemplateUser<T = () => void> = User & {
type TemplateUser<T extends () => any> = User & {
  method: T;
}

const userWithMethod: TemplateUser<() => void> = {
  // method: 'string' // Error: Type 'string' is not assignable to type '() => void'.
  method: () => {},
  id: 1,
  name: 'test',
}

interface Test {
  test: string
  test2: void
}

type Test2 = Pick<Test, 'test'> // { test: string }

const test: Test = {
  test: 'test',
  test2: undefined,
}

// type Test3 = {
//   a: undefined;
//   b: void;
// }
// const test3: Test3 = {
//   a: undefined,
//   b: undefined, // void can only be assigned undefined
// }

// function parseDate (date: string, asString: boolean = false): Date | string {
//   return asString ? date : new Date(date);
// }

// const a = parseDate('2024-01-01'); // ==> Date
// const b = parseDate('2024-01-01', true); // ==> string



const record: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  // 1: 'string', // Error: Type 'string' is not assignable to type 'number'.
  // d: true, // Error: Type 'boolean' is not assignable to type 'number'.
}

const record2: Record<'1' | '2', number> = {
  1: 1,
  2: 2,
  // 3: 3, // Error: Type '"3"' is not assignable to type '"1" | "2"'.
  // 1: 'string', // Error: Type 'string' is not assignable to type 'number'.
  // d: true, // Error: Type 'boolean' is not assignable to type 'number'.
}
const recordUser : Record<'test', string> = {
  test: 'test',
}
