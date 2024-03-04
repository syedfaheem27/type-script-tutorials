// Advanced Types

//1. Type Guards and Narrowing

//typeof type guards

type A = number | string;

function combinable(a: A, b: A) {
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + b.toString();

  return a + b;
}

/*--------------------------*/

//Working with functions,arrays,objects - typeof
//narrowing won't be useful as everything in js is an object

//in operator narrowing and instanceOf narrowing

//example 1
interface Car {
  drive(): void;
}

interface Truck {
  drive(): void;
  loadCargo(amount: number): void;
}

class Cars implements Car {
  drive() {
    console.log("Driving Vehicle 1 ...");
  }
}

class Trucks implements Truck {
  drive() {
    console.log("Driving Vehcile 2 ....");
  }

  loadCargo(amount: number): void {
    console.log("Loading Cargo ..." + " " + amount);
  }
}

function useVehicle(vehicle: Car | Truck): void {
  vehicle.drive();

  //   if ("loadCargo" in vehicle) vehicle.loadCargo(1000);
  if (vehicle instanceof Trucks) vehicle.loadCargo(1000);
}

//example 2

type admin = {
  name: string;
  privileges: string[];
};

type employee = {
  name: string;
  post: string;
};

type seniorEmployee = admin & employee;
type newemp = admin | employee;

function printEmployeeInfo(emp: newemp) {
  console.log(emp.name);

  if ("privileges" in emp) console.log(emp.privileges);

  if ("post" in emp) console.log(emp.post);
}

/*------------------------*/

//Discriminated unions

interface Humans {
  type: "human";
  name: string;
  walk(): void;
}

interface Birds {
  type: "bird";
  name: string;
  fly(): void;
}

function useCreature(creature: Humans | Birds): void {
  console.log(creature.name);

  switch (creature.type) {
    case "bird":
      creature.fly();
      break;

    case "human":
      creature.walk();
      break;
  }
}

useCreature({
  name: "faheem",
  walk() {
    console.log("walking...");
  },
  type: "human",
});

/*------------------------*/

//Type Casting

let stack: number[] = [1, 2, 3];

let stack_2: number[] = [];

stack_2.push(stack.pop()!);

//example

//one way
// const mesgEl = document.getElementById("msg")! as HTMLParagraphElement;

//other way
const mesgEl = <HTMLParagraphElement>document.getElementById("msg");

//Real use case
const inpEl = document.querySelector(".user-input");

if (inpEl) {
  (inpEl as HTMLInputElement).value = "Enter some text...";
}

/*-------------------------*/

//Index properties
interface ErrorContainer {
  [key: string]: string;
}

const obj: ErrorContainer = {
  error: "An error occurred",
  "erro-2": "asdsda",
};

/*------------------------------------*/

//Function overloading

function concat(a: number, b: string): string;
function concat(a: number, b: number): number;
function concat(a: A, b: A) {
  if (typeof a === "number" && typeof b === "number") return a + b;
  return a.toString() + b.toString();
}
