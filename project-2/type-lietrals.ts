//Literal types
type Identifier = "as-number" | "as-string";

//Type aliases
type User = { name: string; age: number; height: 5 | 6 | 7 };
type Hobby = [string, string, string];

//

function combine(n1: number | string, n2: number | string, str: Identifier) {
  let result: number | string;

  if (typeof n1 === "number" && typeof n2 === "number") {
    result = n1 + n2;
  } else result = n1.toString() + n2.toString();

  if (str === "as-number") return +result;

  if (str === "as-string") return result.toString();
}

const result_1 = combine("2", 2, "as-number");
const result_2 = combine("2", 2, "as-string");

console.log(result_1);
console.log(result_2);

let user: User = { name: "faheem", age: 25, height: 6 };
let hobbies: Hobby = ["football", "cooking", "reading"];

console.log(user);
console.log(hobbies);
