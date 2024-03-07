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

const childOne: A<number> = {
  id: 1,
  name: 12,
  children: 3,
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
//TS will give out an error as it doesn't know that the property name exists or not

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

//The purpose here is that we know the input will have a length field
//it can be an array or an object with the specified field

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
/*
M{
 "name",
 "age"
 }
 */

//Here key in obj won't work because we need to provide an index
//signature so that it can be indexed with a string

//Solution
interface CustomObj {
  [key: string]: string;
}

//That's why it's giving an error
function extractAndGenerate(obj: CustomObj, key: string): string {
  if (key in obj) return obj[key];

  return "asasa";
}

//The keyof operator takes an object type and produces a string or numeric literal union of its keys.
function extractAndConvert<T, U extends keyof T>(obj: T, key: U) {
  return "value " + obj[key];
}

/*----------------------------*/

//Generic classes

//Here the problem with only having a generic type without extending a primitive data type
//is that with objects, removeItem method won't work as it is a referrence type
//So, we need to implicitly extend the generic type
class CustomStorage<T extends number | string | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getData() {
    return this.data;
  }
}

const storageObjOne = new CustomStorage<number>();
storageObjOne.addItem(2);
storageObjOne.addItem(3);
storageObjOne.addItem(4);
storageObjOne.addItem(5);

storageObjOne.removeItem(2);
console.log(storageObjOne.getData());

/*---------------------*/

//Generic utility classes

//Imagine a scenario where we want to build an object that needs to be sent as a payload
//to an API and thus we need to build it incrementally after each of the field is verified

interface CutsomObject {
  title: string;
  id: number;
  createdAt: Date;
}

function createAndSendData(title: string, id: number): CustomObj | undefined {
  let obj: Partial<CutsomObject> = {};

  if (title === "") return;
  obj.title = title;

  if (typeof id !== "number") return;
  obj.id = id;

  obj.createdAt = new Date();

  return obj as CustomObj;
}

const ids: Readonly<number[]> = [1, 2, 3];

//Unions vs Generics

//With Generics - you lock in the type when you call a function or a method and have to work with
//the exact same type afterwards.

//However, with unions you are free to choose any of the provided type
