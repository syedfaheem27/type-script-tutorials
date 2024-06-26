function add(n1: number, n2: number, show: boolean, result: string) {
  const res = n1 + n2;

  if (show) console.log(result + res);
  else return n1 + n2;
}

const num1 = 3;
const num2 = 4;
let showResult = true;
const resultStr = "Result is : ";

add(num1, num2, showResult, resultStr);

enum Role {
  ADMIN,
  USER,
  GUIDE,
}

type tu = [string, string];

const person: {
  name: string;
  age: number;
  hobbies: tu;
  role: Role;
} = {
  name: "faheem",
  age: 25,
  hobbies: ["football", "reading"],
  role: Role.ADMIN,
};

//push is an exception with tuples
// person.role.push("aadad");
// console.log(person.role);

// person.hobbies.push("hhh")
// person.hobbies.length=6

//However, changing the length directly will throw an error
// person.role=[1,'user','admin']

if (person.role === Role.ADMIN) console.log("isAdmin");
