"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validationObj) {
    const value = validationObj.value;
    if (validationObj.required && value.toString().trim().length === 0)
        return false;
    if (validationObj.maxLength !== undefined &&
        typeof value === "string" &&
        value.trim().length > validationObj.maxLength)
        return false;
    if (validationObj.minLength !== undefined &&
        typeof value === "string" &&
        value.trim().length < validationObj.minLength)
        return false;
    if (validationObj.max !== undefined &&
        typeof value === "number" &&
        value > validationObj.max)
        return false;
    if (validationObj.min !== undefined &&
        typeof value === "number" &&
        value < validationObj.min)
        return false;
    return true;
}
function AutoBind(_, __, descriptor) {
    const original_method = descriptor.value;
    const mod_descriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = original_method.bind(this);
            return boundFn;
        },
    };
    return mod_descriptor;
}
class Project {
    constructor() {
        this.clientEl = document.getElementById("project-input");
        this.hostEl = document.getElementById("app");
        const importedNode = document.importNode(this.clientEl.content, true);
        this.formEl = importedNode.firstElementChild;
        this.formEl.id = "user-input";
        this.titleInpElement = this.formEl.querySelector("#title");
        this.descriptionInpElement = this.formEl.querySelector("#description");
        this.peopleInpElement = this.formEl.querySelector("#people");
        this.injectForm();
        this.addListener();
    }
    injectForm() {
        this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
    }
    addListener() {
        this.formEl.addEventListener("submit", this.handleSubmit);
    }
    handleSubmit(e) {
        e.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
        }
    }
    gatherInput() {
        const title = this.titleInpElement.value;
        const description = this.descriptionInpElement.value;
        const people = +this.peopleInpElement.value;
        const titleValidationObj = {
            value: title,
            required: true,
            minLength: 3,
            maxLength: 10,
        };
        const descValidationObj = {
            value: description,
            required: true,
            minLength: 5,
            maxLength: 20,
        };
        const peopleValidationObj = {
            value: people,
            required: true,
            max: 5,
            min: 1,
        };
        if (!validate(titleValidationObj) ||
            !validate(descValidationObj) ||
            !validate(peopleValidationObj)) {
            alert("Invalid title, description or people!");
            return;
        }
        return [title, description, +people];
    }
}
__decorate([
    AutoBind
], Project.prototype, "handleSubmit", null);
const projectInstance = new Project();
//# sourceMappingURL=app.js.map