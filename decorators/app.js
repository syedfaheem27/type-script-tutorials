"use strict";
//Decorators - A beautiful design pattern
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
function Logger(logString) {
    return function (fn) {
        console.log(logString);
        console.log(fn);
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
    Logger("Person Logger...")
], Person);
