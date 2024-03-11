var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { validate } from "../utils/validation.js";
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInpElement = this.element.querySelector("#title");
        this.descriptionInpElement = this.element.querySelector("#description");
        this.peopleInpElement = this.element.querySelector("#people");
        this.addListener();
    }
    configure() { }
    addListener() {
        this.element.addEventListener("submit", this.handleSubmit);
    }
    handleSubmit(e) {
        e.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addItem(title, description, people);
            this.clearInput();
        }
    }
    gatherInput() {
        const title = this.titleInpElement.value;
        const description = this.descriptionInpElement.value;
        const people = +this.peopleInpElement.value;
        const titleValidationObj = {
            value: title,
            required: true,
            maxLength: 15,
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
            max: 8,
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
    clearInput() {
        this.titleInpElement.value = "";
        this.descriptionInpElement.value = "";
        this.peopleInpElement.value = "";
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "handleSubmit", null);
//# sourceMappingURL=project-input.js.map