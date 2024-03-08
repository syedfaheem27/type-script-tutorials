"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Project {
    constructor(id, title, description, people) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
    }
}
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
    addItem(title, description, people) {
        const newProject = new Project(Math.random.toString(), title, description, people);
        this.projects.push(newProject);
        this.execAllListeners();
    }
    execAllListeners() {
        for (const listener of this.listeners)
            listener(this.projects.slice());
    }
    addListener(fn) {
        this.listeners.push(fn);
    }
}
const projectState = ProjectState.getInstance();
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
class ProjectList {
    constructor(type) {
        this.type = type;
        this.clientEl = document.getElementById("project-list");
        this.hostEl = document.getElementById("app");
        this.assignedProjects = [];
        const importedNode = document.importNode(this.clientEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.injectContent();
        this.renderContent();
    }
    injectContent() {
        this.hostEl.insertAdjacentElement("beforeend", this.element);
    }
    renderContent() {
        const title = `${this.type.toUpperCase()} PROJECTS`;
        this.element.querySelector("h2").textContent = title;
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
    }
    renderProjects() {
        const listEl = this.element.querySelector("ul");
        listEl.innerHTML = "";
        for (const project of this.assignedProjects) {
            const el = document.createElement("li");
            el.textContent = project.title;
            listEl.appendChild(el);
        }
    }
}
class ProjectApp {
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
], ProjectApp.prototype, "handleSubmit", null);
const projectInstance = new ProjectApp();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map