//Generics in Typescript

//Allows us to make our code really reusable
type Wrapper<T> = {
  value: T;
};

const obj: Wrapper<number> = {
  value: 2,
};

const arr: Array<number> = [1, 2, 3];

interface Generic<T> {
  value: T;
  number: string;
  flag: boolean;
}

const new_obj: Generic<number> = {
  value: 2,
  number: "23",
  flag: false,
};

interface A<T> {
  [key: string]: T;
}

const child: A<string> = {
  name: "faheem",
  level: "top",
  profession: "software engineer",
};

//In built generics

/*
Array<number> => number[]
Promise<string> => a promise that resolves to a value which is a string
*/

const res: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("23");
  }, 1000);
});

res.then((data) => console.log(data.split("")));

/*-------------------------------*/

//Generic functions

//Non-reuable function
function merge(A: object, B: object): object {
  return { ...A, ...B };
}

const merged_obj1 = merge({ name: "faheem" }, { age: 23 });
// console.log(merged_obj1.name);

//type casting
// const merged_obj1 = merge({ name: "faheem" }, { age: 23 }) as {
//   name: string;
//   age: number;
// };
//Here TS doesn't know that the merged object would contain
// name or age property. We can use type casting but that would make
//it cumbersome

//Reusable function
function mergeReusable<T, U>(a: T, b: U) {
  return { ...a, ...b };
}

const merged_obj2 = mergeReusable({ name: "faheem" }, { age: 27 });
const merged_obj3 = mergeReusable(
  { name: "zubair", hobbies: ["football"], profession: "KAS officer" },
  { age: 32 }
);
const merged_obj4 = mergeReusable(
  {
    name: "farhan",
    profession: ["network engineer", "content creator", "designer"],
  },
  { age: 28 }
);
console.log(merged_obj2.name);
console.log(merged_obj3.profession);
console.log(merged_obj4.profession?.[2]);

//Now we can see how generics made this function so reusable

/*----------------------------*/

//Constraints
function mergeII<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}

const obj_one = mergeII({ name: "faheem" }, { age: 27 });

//Another merge function
interface lengthy {
  length: number;
}

function printAndDescribe<T extends lengthy>(text: T): string {
  if (!text) return "Pass a valid text.";

  return `${text} has ${text.length} elements`;
}

// console.log(printAndDescribe({ length: 20, name: "hsadkhdksajkash" }));

/*--------------------------*/

//Key of operator

type N = {
  name: string;
  age: number;
};

type M = keyof N;

//Here key in obj won't work because we need to provide an index
//signature so that it can be indexed with a string

//That's why it's giving an error
function extractAndGenerate(obj: object, key: string): string {
  if (key in obj) return obj[key];

  return "asasa";
}

//The keyof operator takes an object type and produces a string or numeric literal union of its keys.
function extractAndConvert<T, U extends keyof T>(obj: T, key: U) {
  return "value " + obj[key];
}
