// Advanced Types
function combinable(a, b) {
    if (typeof a === "string" || typeof b === "string")
        return a.toString() + b.toString();
    return a + b;
}
var Cars = /** @class */ (function () {
    function Cars() {
    }
    Cars.prototype.drive = function () {
        console.log("Driving Vehicle 1 ...");
    };
    return Cars;
}());
var Trucks = /** @class */ (function () {
    function Trucks() {
    }
    Trucks.prototype.drive = function () {
        console.log("Driving Vehcile 2 ....");
    };
    Trucks.prototype.loadCargo = function (amount) {
        console.log("Loading Cargo ..." + " " + amount);
    };
    return Trucks;
}());
function useVehicle(vehicle) {
    vehicle.drive();
    //in operator narrowing
    if ("loadCargo" in vehicle)
        vehicle.loadCargo(1000);
    //instanceof narrowing
    if (vehicle instanceof Trucks)
        vehicle.loadCargo(1000);
}
// const f: newemp = {
//   name: "faheem",
//   privileges: ["*"],
//   post: "CTO",
// };
// const e: seniorEmployee = {
//   name: "faheem",
//   privileges: ["*"],
//   post: "CTO",
// };
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
    walk: function () {
        console.log("walking...");
    },
    type: "human",
});
/*------------------------*/
//Type Casting
var stack = [1, 2, 3];
var stack_2 = [];
//Approach 1
stack_2.push(stack.pop());
//Approach 2
var el = stack.pop();
if (el)
    stack_2.push(el);
var obj = {
    error: "An error occurred",
    "erro-2": "asdsda",
    2: "false",
};
function concat(a, b) {
    if (typeof a === "number" && typeof b === "number")
        return a + b;
    return a.toString() + b.toString();
}
console.log(concat(2, "2"));
