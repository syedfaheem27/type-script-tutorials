//Let's say we have a class that creates objects ith a name and a weight property

//Now after some days, we decide to add the id and the createdAT fields.
//We can do it in two says
//1. Revamp the whole class definition and add those fields
//2. Use a class decorator

function modifyObj<T extends { new (...args: any[]): {} }>(target: T) {
  return class A extends target {
    readonly id = Math.floor(Math.random()) * 100;
    readonly createdAt = new Date().toLocaleString("en-IN");

    constructor(...args: any[]) {
      super(...args);
    }
  };
}

@modifyObj
class ImportObj {
  readonly name: string;
  readonly weight: number;

  constructor(name: string, weight: number) {
    this.name = name;
    this.weight = weight;
  }

  describe() {
    console.log(`An object ${this.name} with a weight of ${this.weight} kgs.`);
  }
}

const objI = new ImportObj("TV", 23);
console.log(objI);
console.log(objI.describe());

//If we return a class from the class decorator, the original class will be replaced by it.

//Should you choose to return a new constructor function, you must take care to maintain
//the original prototype. The logic that applies decorators at runtime will not do this for you.

//In our case, we're extending from the target, so it will be preserved
