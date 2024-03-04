// Advanced Types

//1. Intersection types

// interface A {
//   name: string;
//   greet(phrase: string): void;
// }

// interface B {
//   id: number;
//   generateID(): number;
// }

type A = {
  name: string;
  greet(phrase: string): void;
};

type B = {
  id: number;
  generateID(): number;
};

type C = A & B;
// interface C extends A, B {}

let obj1: C = {
  name: "faheem",
  id: 1,
  greet(p: string) {
    console.log(this.name + " " + p);
  },
  generateID() {
    return Math.random();
  },
};

type D = number | string;
type E = number | boolean;

type F = D & E;

// type G = A | B;
// type H = B | C;
// type I = G & H;

// let obj2: I = {
//   id: 1,
//   generateID() {
//     return 2;
//   },
// };
