"use strict";
// Advanced Types
function combinable(a, b) {
    if (typeof a === "string" || typeof b === "string")
        return a.toString() + b.toString();
    return a + b;
}
class Cars {
    drive() {
        console.log("Driving Vehicle 1 ...");
    }
}
class Trucks {
    drive() {
        console.log("Driving Vehcile 2 ....");
    }
    loadCargo(amount) {
        console.log("Loading Cargo ..." + " " + amount);
    }
}
function useVehicle(vehicle) {
    vehicle.drive();
    //   if ("loadCargo" in vehicle) vehicle.loadCargo(1000);
    if (vehicle instanceof Trucks)
        vehicle.loadCargo(1000);
}
function printEmployeeInfo(emp) {
    console.log(emp.name);
    if ("privileges" in emp)
        console.log(emp.privileges);
    if ("post" in emp)
        console.log(emp.post);
}
function useCreature(creature) {
    console.log(creature.name);
    switch (creature.type) {
        case "bird":
            creature.fly();
            break;
        case "human":
            creature.walk();
            break;
    }
}
useCreature({
    name: "faheem",
    walk() {
        console.log("walking...");
    },
    type: "human",
});
/*------------------------*/
//Type Casting
let stack = [1, 2, 3];
let stack_2 = [];
stack_2.push(stack.pop());
//example
//one way
// const mesgEl = document.getElementById("msg")! as HTMLParagraphElement;
//other way
const mesgEl = document.getElementById("msg");
//Real use case
const inpEl = document.querySelector(".user-input");
if (inpEl) {
    inpEl.value = "Enter some text...";
}
