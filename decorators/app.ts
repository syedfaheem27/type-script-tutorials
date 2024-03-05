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

/*
function Logger(logString: string) {
  console.log(logString);
  return function (fn: Function) {
    console.log(fn);
  };
}

function InjectTemplate(template: string, hookId: string) {
  console.log(template);
  return function (fn: new (name: string, birthYear: number) => any) {
    console.log(fn, template);
    let obj = new fn("faheem", 1998);
    let el = document.getElementById(hookId);

    if (el)
      el.innerHTML = template.replace("%%TEMPLATE%%", obj.name.toUpperCase());
  };
}
*/

/*
The decorator functions defined are executed in the order they are defined in the code
but the functions returned are executed in down-top order
*/

/*
@Logger("Person Logger...")
@InjectTemplate("<h1>%%TEMPLATE%%</h1>", "app")
class Person {
  constructor(public name: string, public birthYear: number) {}

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
}
*/

/*--------------------------------------*/
//Property decorators, Accessor decorators,method decorators and parameter decorators

// Here the fn for a property decorator is the prototype object
//of the class and for static methods it will be the class itself
//or the constructor function

//property decorator
function log(fn: any, propertyName: string | symbol) {
  console.log("property decorator");
  console.log(fn);
  console.log(propertyName);
}

//Accessor decorator
function log1(fn: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(fn);
  console.log(name);
  console.log(descriptor);
}

//Method decorator
function log2(fn: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator");
  console.log(fn);
  console.log(name);
  console.log(descriptor);
}

//Parameter decorator
function log3(fn: any, name: string | symbol, position: number) {
  console.log("Parameter decorator");
  console.log(fn);
  console.log(name);
  console.log(position);
}

class Product {
  @log
  title: string;
  private _price: number;

  @log1
  set price(val: number) {
    if (val >= 0) this._price = val;
    else throw new Error("The price can't be non-positive");
  }

  get Price() {
    return this._price;
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @log2
  describe(@log3 descriptionString: string) {
    console.log(descriptionString);
  }

  // @log
  // static changeTitle() {
  //   console.log("change title");
  // }
}

const obj = new Product("football", 400);
obj.describe("Football");

//Order of execution of decorators : They run when the classes are registered with
//javascript and has got to do nothing with the instantiation of the class

/*--------------------------------*/

//Returning from a decorator and changing the class on which it is called

function InjectTemplate(template: string, hookId: string) {
  console.log(template);
  return function <T extends { new (...args: any[]): { name: string } }>(
    fn: T
  ) {
    return class extends fn {
      constructor(...args: any[]) {
        console.log(fn, template);
        super(...args);
        let el = document.getElementById(hookId);

        if (el)
          el.innerHTML = template.replace(
            "%%TEMPLATE%%",
            this.name.toUpperCase()
          );
      }
    };
  };
}

@InjectTemplate("<h1>%%TEMPLATE%%</h1>", "app")
class Person {
  name: string;
  birthYear: number;

  constructor(name: string, birthYear: number) {
    this.name = name;
    this.birthYear = birthYear;
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }
}

const pers = new Person("faheem", 26);

//The return values from property and paramter decorators are ignored by ts
//However, you can use the return values of accessor and method decorators in order
//to define them a new

/*----------------------------------------*/

//Example - Creating an Autobind decorator

//As we all know that, if we pass in a method of an object to an event listner,
//the this keyword if used will referrence the element calling the method and thus,
//we will get an error

//To solve this, we can directly make use of bind function or create an Autobind decorator

class Message {
  private message: string = "Enroute to greatness!";

  @AutoBind
  getMessage() {
    console.log(this.message);
  }
}

const new_obj = new Message();

const btn = document.getElementById("btn");

//Solution 1:
// if (btn) {
//   btn.addEventListener("click", new_obj.getMessage.bind(new_obj));
// }

//Solution 2
function AutoBind(
  fn: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  const modifiedDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return modifiedDescriptor;
}

if (btn) btn.addEventListener("click", new_obj.getMessage);

/*--------------------------------*/
