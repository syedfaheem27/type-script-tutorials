"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        this.titleInpEl = this.formEl.querySelector("#title");
        this.descriptionInpEl = this.formEl.querySelector("#description");
        this.peopleInpEl = this.formEl.querySelector("#people");
        this.injectForm();
        this.addListener();
    }
    injectForm() {
        this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.titleInpEl.value);
    }
    addListener() {
        this.formEl.addEventListener("submit", this.handleSubmit);
    }
}
__decorate([
    AutoBind
], Project.prototype, "handleSubmit", null);
const projectInstance = new Project();
//# sourceMappingURL=app.js.map