"use strict";
//Decorators - A beautiful design pattern
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
function log(fn, propertyName) {
    console.log("property decorator");
    console.log(fn);
    console.log(propertyName);
}
//Accessor decorator
function log1(fn, name, descriptor) {
    console.log("Accessor decorator");
    console.log(fn);
    console.log(name);
    console.log(descriptor);
}
//Method decorator
function log2(fn, name, descriptor) {
    console.log("Method decorator");
    console.log(fn);
    console.log(name);
    console.log(descriptor);
}
//Parameter decorator
function log3(fn, name, position) {
    console.log("Parameter decorator");
    console.log(fn);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val >= 0)
            this._price = val;
        else
            throw new Error("The price can't be non-positive");
    }
    get Price() {
        return this._price;
    }
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    describe(descriptionString) {
        console.log(descriptionString);
    }
}
__decorate([
    log
], Product.prototype, "title", void 0);
__decorate([
    log1
], Product.prototype, "price", null);
__decorate([
    log2,
    __param(0, log3)
], Product.prototype, "describe", null);
const obj = new Product("football", 400);
obj.describe("Football");
//Order of execution of decorators : They run when the classes are registered with
//javascript and has got to do nothing with the instantiation of the class
/*--------------------------------*/
//Returning from a decorator and changing the class on which it is called
function InjectTemplate(template, hookId) {
    console.log(template);
    return function (fn) {
        return class extends fn {
            constructor(...args) {
                console.log(fn, template);
                super(...args);
                let el = document.getElementById(hookId);
                if (el)
                    el.innerHTML = template.replace("%%TEMPLATE%%", this.name.toUpperCase());
            }
        };
    };
}
let Person = class Person {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }
    get age() {
        return new Date().getFullYear() - this.birthYear;
    }
};
Person = __decorate([
    InjectTemplate("<h1>%%TEMPLATE%%</h1>", "app")
], Person);
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
    constructor() {
        this.message = "Enroute to greatness!";
    }
    getMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Message.prototype, "getMessage", null);
const new_obj = new Message();
const btn = document.getElementById("btn");
//Solution 1:
// if (btn) {
//   btn.addEventListener("click", new_obj.getMessage.bind(new_obj));
// }
//Solution 2
function AutoBind(fn, name, descriptor) {
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
if (btn)
    btn.addEventListener("click", new_obj.getMessage);
/*--------------------------------*/
