//Conditional Types

interface Writable {
  write: true;
}

interface Readable {
  write: false;
}

interface User {
  id: number;
  name: string;
  followers: number;
}

interface Admin extends User, Writable {}

interface Reader extends User, Readable {}

type isReadable<T> = T extends Readable ? true : false;
type isWritable<T> = T extends Writable ? true : false;

type A = isReadable<Admin>;
type B = isReadable<Reader>;

//Infer conditional types

//infer keyword can only be used while using conditional types

//If T extends an array type, then E would be the type of that Array as inferred by ts
type inferType<T> = T extends (infer E)[] ? E : T;

//Examples
type C = inferType<string[]>;

type D = inferType<number[]>;

type E = inferType<{ name: string }>;

type F = inferType<string>;

//Inferring function types

//Pretty useful while importing functions from 3rd party libraries

function returnObj(name: string, num: number) {
  return { mod: name + num };
}

type InferFunctionType<T> = T extends () => infer R ? R : T;

type G = InferFunctionType<typeof returnObj>;

//Inferring the type of function arguments

type InferFirstArg<T> = T extends (first: infer R, ...args: any[]) => any
  ? R
  : T;

type InferSecondArg<T> = T extends (
  first: any,
  second: infer R,
  ...args: any[]
) => any
  ? R
  : T;

type H = InferFirstArg<typeof returnObj>;
type I = InferSecondArg<typeof returnObj>;

//The Satisfies operator
//Pre checks object types and ensures that you use less
//of type guards

type RGB = "green" | "red" | "blue";

type Palette = [number, number, number];

/*
V1

const colors: Record<RGB, Palette | string> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [255, 255, 0],
};

//So we need this type guard to do this operation
//satisfies lets us get rid of this and warns us ahead
if (typeof colors.green === "string") console.log(colors.green.toUpperCase());
*/

const colors = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [255, 255, 0],
} satisfies Record<RGB, Palette | string>;

console.log(colors.green.toLowerCase());
