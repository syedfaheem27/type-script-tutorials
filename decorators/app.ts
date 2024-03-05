//Decorators - A beautiful design pattern

//1. Class Decorators - run when a class is deined and not when it is instantiated

/*
function Logger(fn: Function) {
  console.log("Class Decorator logging...");
  console.log(fn);
}

@Logger
class Person {
  constructor(public name: string, public birthYear: number) {}

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
}

const person = new Person("faheem", 1998);
*/
/*----------------------*/

//2. Creating factories - returning the decorator function
//   allows for passing more data into the decorator

function Logger(logString: string) {
  return function (fn: Function) {
    console.log(logString);
    console.log(fn);
  };
}

@Logger("Person Logger...")
class Person {
  constructor(public name: string, public birthYear: number) {}

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
}
