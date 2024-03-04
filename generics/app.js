"use strict";
//Generics in Typescript
var _a;
const obj = {
    value: 2,
};
const arr = [1, 2, 3];
const new_obj = {
    value: 2,
    number: "23",
    flag: false,
};
const child = {
    name: "faheem",
    level: "top",
    profession: "software engineer",
};
//In built generics
/*
Array<number> => number[]
Promise<string> => a promise that resolves to a value which is a string
*/
const res = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("23");
    }, 1000);
});
res.then((data) => console.log(data.split("")));
/*-------------------------------*/
//Generic functions
//Non-reuable function
function merge(A, B) {
    return Object.assign(Object.assign({}, A), B);
}
const merged_obj1 = merge({ name: "faheem" }, { age: 23 });
// console.log(merged_obj1.name);
//type casting
// const merged_obj1 = merge({ name: "faheem" }, { age: 23 }) as {
//   name: string;
//   age: number;
// };
//Here TS doesn't know that the merged object would contain
// name or age property. We can use type casting but that would make
//it cumbersome
//Reusable function
function mergeReusable(a, b) {
    return Object.assign(Object.assign({}, a), b);
}
const merged_obj2 = mergeReusable({ name: "faheem" }, { age: 27 });
const merged_obj3 = mergeReusable({ name: "zubair", hobbies: ["football"], profession: "KAS officer" }, { age: 32 });
const merged_obj4 = mergeReusable({
    name: "farhan",
    profession: ["network engineer", "content creator", "designer"],
}, { age: 28 });
console.log(merged_obj2.name);
console.log(merged_obj3.profession);
console.log((_a = merged_obj4.profession) === null || _a === void 0 ? void 0 : _a[2]);
//Now we can see how generics made this function so reusable
/*----------------------------*/
//Constraints
function mergeII(a, b) {
    return Object.assign(Object.assign({}, a), b);
}
const obj_one = mergeII({ name: "faheem" }, { age: 27 });
function printAndDescribe(text) {
    if (!text)
        return "Pass a valid text.";
    return `${text} has ${text.length} elements`;
}
//Here key in obj won't work because we need to provide an index
//signature so that it can be indexed with a string
//That's why it's giving an error
function extractAndGenerate(obj, key) {
    if (key in obj)
        return obj[key];
    return "asasa";
}
//The keyof operator takes an object type and produces a string or numeric literal union of its keys.
function extractAndConvert(obj, key) {
    return "value " + obj[key];
}
