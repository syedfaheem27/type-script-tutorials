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
const childOne = {
    id: 1,
    name: 12,
    children: 3,
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
//TS will give out an error as it doesn't know that the property name exists or not
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
//The purpose here is that we know the input will have a length field
//it can be an array or an object with the specified field
function printAndDescribe(text) {
    if (!text)
        return "Pass a valid text.";
    return `${text} has ${text.length} elements`;
}
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
/*----------------------------*/
//Generic classes
//Here the problem with only having a generic type without extending a primitive data type
//is that with objects, removeItem method won't work as it is a referrence type
//So, we need to implicitly extend the generic type
class CustomStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getData() {
        return this.data;
    }
}
const storageObjOne = new CustomStorage();
storageObjOne.addItem(2);
storageObjOne.addItem(3);
storageObjOne.addItem(4);
storageObjOne.addItem(5);
storageObjOne.removeItem(2);
console.log(storageObjOne.getData());
function createAndSendData(title, id) {
    let obj = {};
    if (title === "")
        return;
    obj.title = title;
    if (typeof id !== "number")
        return;
    obj.id = id;
    obj.createdAt = new Date();
    return obj;
}
const ids = [1, 2, 3];
//Unions vs Generics
//With Generics - you lock in the type when you call a function or a method and have to work with
//the exact same type afterwards.
//However, with unions you are free to choose any of the provided type
