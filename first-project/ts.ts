const button = document.querySelector("button")! as HTMLButtonElement; //type-casting
// const button_1 = <HTMLButtonElement>document.querySelector("button"); //type-casting - alternate way

const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number): number {
  return num1 + num2;
}

button.addEventListener("click", function (e) {
  console.log(add(+input1.value, +input2.value));
});
