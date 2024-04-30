//Classes

class person {
  private name: string;
  private _age: number | undefined;

  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }

  set age(age: number) {
    if (age > 200 || age < 0) throw new Error("Age out of bounds!");

    this._age = age;
  }

  get age() {
    if (!this._age) throw new Error("Age not found!");
    return this._age;
  }
}

interface Holidays {
  name: string;
  date: Date;
}

abstract class Department {
  protected holidays: Holidays[] = [];

  protected constructor(protected name: string) {}

  public addHolidays(holiday: Holidays | Holidays[]) {
    if (Array.isArray(holiday)) {
      for (const h of holiday) this.holidays.push(h);
    } else this.holidays.push(holiday);
  }

  public abstract printHolidays(): void;
}

class CivilDepartment extends Department {
  constructor(name: string) {
    super(name);
  }

  public printHolidays(): void {
    for (const h of this.holidays) console.log(h);
  }
}

class ItDepartment extends Department {
  constructor(name: string) {
    super(name);
  }

  public printHolidays(): void {
    for (const h of this.holidays) console.log(h);
  }
}

const itDept: ItDepartment = new ItDepartment("IT");
const civilDept: CivilDepartment = new CivilDepartment("Civil");

itDept.addHolidays({
  name: "Eid",
  date: new Date("2023-01-01"),
});

civilDept.addHolidays([
  {
    name: "Eid",
    date: new Date("2023-01-01"),
  },
  {
    name: "Civil",
    date: new Date("2023-02-01"),
  },
]);

//Never pass a value by referrence as a property to a class or an object
//Build it from inside the class or object

//Example

class Random {
  constructor(private arr: string[]) {}

  public get printContent() {
    for (let item of this.arr) console.log(item);
    return;
  }
}

const arr = ["black", "red"];

const obj = new Random(arr);

arr.push("orange");

console.log(obj.printContent);

//Interfaces and types

type A = {
  x: string;
  y: string;
};

type B = {
  x: string;
  z: number;
};

interface C {
  x: string;
  y: string;
}

interface D {
  x: string;
  z: number;
}

//Intersection
type Int1 = A & B;

const obj1: Int1 = {
  x: "hello",
  y: "gggg",
  z: 2,
};

//Allowed
type Int2 = D & C;
type Int3 = A & D;

const obj2: Int2 = {
  x: "hello",
  y: "gggg",
  z: 2,
};

//Unions
type uni1 = A | B;
type uni2 = A | D;
type uni3 = C | D;

const obj3: uni1 = {
  x: "hello",
  z: 1233,
};

const obj4: uni3 = {
  x: "hello",
  z: 1233,
};

//Classes can't implement interfaces or types which are union types
//Because they are static blueprints
