//Function Overloading

type Reserve = {
  (a: Date, b: Date, c: string, d: string): string | number;
  (a: Date, b: string, c: string): number | string;
};

const reserve: Reserve = (a: Date, b: Date | string, c: string, d?: string) => {
  if (b instanceof Date) return "helo";

  return 12231;
};

//Generics

//way 1 of declaring generics
//Less flexible
/*
type Filter<T> = {
  (items: T[], predicate: (item: T) => boolean): T[];
};
*/

//way 2 of declaring generic functions
//More flexible;

/*
type Filter = {
  <T>(items: T[], predicate: (item: T) => boolean): T[];
};
*/

//way 3
//more flexible
// type Filter = <T>(items: T[], predicate: (item: T) => boolean) => T[];

//way 4
// less flexible
type Filter<T> = (items: T[], predicate: (item: T) => boolean) => T[];

const filter: Filter<number> = (items, predicate) => {
  let arr = [];

  for (let item of items) {
    if (predicate(item)) arr.push(item);
  }

  return arr;
};

let nums = [1, 2, 3, 4, 5, 6];

let filteredArrays = filter(nums, (item: number) => {
  return item < 3;
});

type map = <T, U>(items: T[], predicate: (item: T) => U) => U[];

const nn: map = (items, predicate) => {
  let arr = [];

  for (let item of items) {
    arr.push(predicate(item));
  }

  return arr;
};

const transformedNums = nn(nums, (num: number) => {
  return num * 2;
});
