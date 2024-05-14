//Type guards
const obj = {
  name: "faheem",
  age: 25,
};

let _obj: typeof obj;

_obj = {
  name: "farhan",
  age: 26,
};

//typeof Type guards

function fn(x: string | string[] | null): void {
  if (x && typeof x === "object") for (const s of x) console.log(s);
  else if (typeof x === "string") console.log(x);
  else console.log("Null");
}

//Truthiness narrowing, equality narrowing, in operator narrowing

//instance of

abstract class Product {
  constructor(public name: string, protected price: number) {}

  abstract getPrice(): number;
}

class Clothing extends Product {
  constructor(name: string, price: number, protected size: string) {
    super(name, price);
  }

  getPrice(): number {
    return this.price;
  }

  printClothingDetails() {
    console.log(`Name: ${this.name}`);
    console.log(`Price: ${this.price}`);
    console.log(`Size: ${this.size}`);
  }
}

class Electronics extends Product {
  constructor(name: string, price: number, protected warranty: number) {
    super(name, price);
  }

  getPrice(): number {
    return this.price;
  }
  printElectronicDetails() {
    console.log(`Name: ${this.name}`);
    console.log(`Price: ${this.price}`);
    console.log(`Warranty: ${this.warranty}`);
  }
}

function invokeMethods(product: Product): void {
  if (product instanceof Electronics) product.printElectronicDetails();
  else if (product instanceof Clothing) product.printClothingDetails();
}
