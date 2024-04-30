//Decorators

function loggerFactory(description: string) {
  console.log(description);
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    console.log(target);
    return class D extends target {
      modified: boolean = true;
      constructor(...args: any[]) {
        super(...args);
      }
    };
  };
}

@loggerFactory("Decorator factory invoked")
class Random {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  @autobind
  method() {
    console.log(this);
  }
}

const obj = new Random("faheem");
console.log(obj.constructor);

function autobind(
  fn: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  console.log(descriptor);
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
