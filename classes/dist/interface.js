"use strict";
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase + " " + this.name);
    };
    return Person;
}());
var A = /** @class */ (function () {
    function A(a, b) {
        this.name = a;
        this.id = b;
    }
    return A;
}());
var instance_1 = new A("jj", 21);
console.log(instance_1);
var B = /** @class */ (function () {
    function B(a, b, c) {
        this.name = a;
        this.id = b;
        this.year = c;
    }
    return B;
}());
var instance_2 = new B("jjj", 32, 2023);
console.log(instance_2);
var F = /** @class */ (function () {
    function F(x, y) {
        this.x = x;
        this.y = y;
    }
    return F;
}());
var G = /** @class */ (function () {
    function G(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    G.prototype.getLocation = function () {
        console.log(this.x, this.y);
    };
    G.prototype.getName = function () {
        console.log(this.name);
    };
    return G;
}());
//# sourceMappingURL=interface.js.map