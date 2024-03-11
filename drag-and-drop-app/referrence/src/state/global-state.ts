//Base class for general state
namespace App {
  type Listener<T> = (items: T[]) => void;

  export class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(fn: Listener<T>) {
      this.listeners.push(fn);
    }
  }
}
