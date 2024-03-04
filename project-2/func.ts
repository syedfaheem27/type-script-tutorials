function add(n1: number, n2: number) {
  return n1 + n2;
}

const num = add(8, 9);

let func1: (a: number, b: number) => number;
func1 = add;

// func1 = (a: number, b: number) => a;

function greet() {
  console.log("hello");
}

function addAndHandle(a: number, b: number, cb: (a: number) => undefined) {
  const result = add(a, b);

  cb(result);
  return result;
}

addAndHandle(2, 3, (a) => {
  console.log(a);
});
