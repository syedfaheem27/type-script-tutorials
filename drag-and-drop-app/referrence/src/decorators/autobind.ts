namespace App {
  //Auto Bind Decorator
  export function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
    const original_method = descriptor.value;
    const mod_descriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = original_method.bind(this);
        return boundFn;
      },
    };

    return mod_descriptor;
  }
}
