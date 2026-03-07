// Helper to create a tuple of a specific length
type BuildTuple<L extends number, T extends any[] = []> = T["length"] extends L
  ? T
  : BuildTuple<L, [...T, unknown]>;

// 3 ==> [unknown, unknown, unknown]

type FalsyTest = 3 extends 2 ? true : false; // false
type TruthyTest = 3 extends 3 ? true : false; // true

type TestTest2 = undefined extends void ? true : false; // true
type TestTest = 'string' extends string ? true : false; // true
type TestTest3 = 1 extends number ? true : false; // true

type Animal2 = {
  name: string;
}
type Dog2 = Animal2 & {
  breed: string;
}

type TestTest4 = Dog2 extends Animal2 ? true : false; // true

// string !== 'string'

//|-----
//| Dog
//| |-----
//| | Animal
//| |-----
//| breed: string
//|-----

/**
 * Addition: A + B
 * We spread two tuples of lengths A and B into one and get the length.
 */
type Add<A extends number, B extends number> = [
  ...BuildTuple<A>,
  ...BuildTuple<B>
]["length"];

/**
 * Subtraction: A - B
 * We check if Tuple A starts with Tuple B.
 * If it does, we extract the remaining elements (R) and get its length.
 */
type Subtract<A extends number, B extends number> = BuildTuple<A> extends [
  ...BuildTuple<B>,
  ...infer R,
]
  ? R["length"]
  : never;

// --- Examples ---

// Result1 is 7
type Result1 = Add<3, 4>;

// Result2 is 5
type Result2 = Subtract<10, 5>;

// Result3 is never (because 2 - 5 results in a negative index which we haven't handled)
type Result3 = Subtract<2, 5>;
type Result4 = Subtract<2, 2>;



type ExtractStringType<T> = T extends `${infer U}??` ? U : never;

type StringTest = ExtractStringType<'string??'>; // string

type ExtractNumberType<T> = T extends infer U ? U extends `${number}` ? U : never : never;
// type ExtractNumberType<T> = T extends `${infer U}` ? `${U}` extends `${number}` ? U : never : never;

type NumberTest1 = ExtractNumberType<'test'>; // never
type NumberTest2 = ExtractNumberType<'123'>; // 123
const num: NumberTest2 = '123';

type Test4 = '4s' extends `${number}s` ? true : false; // true

// https://blog.logrocket.com/understanding-infer-typescript/

type ExtractArrayElementType<T extends readonly any[]> =
  T extends readonly (infer U)[] ? U : never;

type ArrayTest = ExtractArrayElementType<string[]>; // string
type ArrayTest1 = ExtractArrayElementType<readonly string[]>; // string (readonly doesn't affect the element type)
type ArrayTest2 = ExtractArrayElementType<number[]>; // number
type ArrayTest3 = ExtractArrayElementType<['t1', 't2']>; // "t1" | "t2"
type ArrayTest4 = ExtractArrayElementType<[string, boolean]>; // string | boolean


type Test5 = any[] extends readonly any[] ? true : false; // true


type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = number[][][];
type Flat = Flatten<NestedArray>;  // This will be 'number'


type TupleToUnion<T extends any[]> =
  T extends [infer U, ...infer Rest]
  ? U | TupleToUnion<Rest>
  : never;

type TupleTest = TupleToUnion<['a', 'b', 'c']>; // "a" | "b" | "c"

type TupleToUnionInferTest<T extends any[]> =
  T extends [infer U, ...infer Rest]
  ? Rest
  : never;

type TupleToUnionInferTest1 = TupleToUnionInferTest<['a', 'b', 'c']>; // ["b" | "c"]
type TupleToUnionInferTest2 = TupleToUnionInferTest<['b', 'c']>; // ["c"]
type TupleToUnionInferTest3 = TupleToUnionInferTest<['c']>; // []
type TupleToUnionInferTest4 = TupleToUnionInferTest<[]>; // never


function makeArray<T extends unknown[]>(...args: T): T {
  return args;
}

const numberArray = makeArray(1, 2, 3); // numberArray is inferred as [number, number, number]
const stringArray = makeArray('a', 'b', 'c'); // stringArray is inferred as [string, string, string]
const mixedArray = makeArray('a', 2, 'c'); // stringArray is inferred as [string, number, string]


function getFirstBroken<T extends unknown[]>(arr: T): T extends [infer U, ...unknown[]] ? U : never {
  return arr[0] as T extends [infer U, ...unknown[]] ? U : never;
}
// We need to add `const` so that the array is inferred as a tuple, not widened to for example string[] or number[]
function getFirst<const T extends unknown[]>(arr: T): T extends [infer U, ...unknown[]] ? U : never {
  return arr[0] as T extends [infer U, ...unknown[]] ? U : never;
}

// We trick the compiler into treating the array as a tuple by using a conditional type that checks if T extends a tuple type. This way, we can get the correct inference for the first element of the array.
function getFirstTuplified<T extends [unknown, ...unknown[]] | []>(
  arr: T
): T extends [infer U, ...unknown[]] ? U : never {
  return arr[0] as any;
}

const firstNumber_Broken = getFirstBroken([1, 2, 3]); // never
const firstString_Broken = getFirstBroken(['a', 'b', 'c']); // never
const firstString_BrokenHack = getFirstBroken(['a', 'b', 'c'] as const); // 'a'

const firstNumber = getFirst([1, 2, 3]); // 1
const firstString = getFirst(['a', 'b', 'c']); // 'a'


const firstTuplified = getFirstTuplified([1, 2, 3]); // firstNumber is inferred as number

const a = [1, 2, 3]
const b = [1, 2, 3] as const

type MegaTest<T> = T extends [infer U, ...unknown[]] ? U : never;

type MegaTest1 = MegaTest<number[]>; // never
type MegaTest2 = MegaTest<[1, 2, 3]>; // 1