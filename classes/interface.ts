interface Human {
  name: string;
  age: number;
}

interface Greetable {
  greet(phrase: string): void;
}

class Person implements Human, Greetable {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}
// let user1: Person & Greetable;

// user1 = {
//   name: "Faheem",
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };
// console.log(user1);

// user1.greet("Hello");

interface people {
  name: string;
}

interface alien {
  id: number;
}

interface C extends people, alien {
  year: number;
}

class A implements people, alien {
  name: string;
  id: number;

  constructor(a: string, b: number) {
    this.name = a;
    this.id = b;
  }
}

const instance_1 = new A("jj", 21);
console.log(instance_1);

class B implements C {
  name: string;
  id: number;
  year: number;

  constructor(a: string, b: number, c: number) {
    this.name = a;
    this.id = b;
    this.year = c;
  }
}

const instance_2 = new B("jjj", 32, 2023);
console.log(instance_2);

interface D {
  x: number;
}
interface D {
  y: number;

  getLocation?(): void;
}

class F implements D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  //   getLocation(): void {
  //     console.log(this.x, this.y);
  //   }
}

class G implements D {
  x: number;
  y: number;
  name: string;

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  getLocation() {
    console.log(this.x, this.y);
  }

  getName() {
    console.log(this.name);
  }
}

interface calc {
  x: number;
  y: number;

  addFn: add;
  subFn: sub;
  multFn: mult;
  divFn: div;

  factFn?(a: number): number;
}

interface add {
  (a: number, b: number): number;
}
interface sub {
  (a: number, b: number): number;
}
interface mult {
  (a: number, b: number): number;
}
interface div {
  (a: number, b: number): number;
}
