"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class Component {
        constructor(clientId, hostId, insertAtStart, elementId) {
            this.clientEl = document.getElementById(clientId);
            this.hostEl = document.getElementById(hostId);
            const importedNode = document.importNode(this.clientEl.content, true);
            this.element = importedNode.firstElementChild;
            if (elementId)
                this.element.id = elementId;
            this.injectContent(insertAtStart);
        }
        injectContent(insertAtStart) {
            this.hostEl.insertAdjacentElement(`${insertAtStart ? "afterbegin" : "beforeend"}`, this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
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
    App.AutoBind = AutoBind;
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(fn) {
            this.listeners.push(fn);
        }
    }
    App.State = State;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectState extends App.State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance)
                return this.instance;
            this.instance = new ProjectState();
            return this.instance;
        }
        addItem(title, description, people) {
            const newProject = new App.Project(Math.random().toString(), title, description, people, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.execAllListeners();
        }
        moveProject(prjId, status) {
            const project = this.projects.find((prj) => prj.id === prjId);
            if (project && project.status !== status) {
                project.status = status;
                this.execAllListeners();
            }
        }
        execAllListeners() {
            for (const listener of this.listeners)
                listener(this.projects.slice());
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    class ProjectInput extends App.Component {
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
                console.log(title, description, people);
                App.projectState.addItem(title, description, people);
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
            if (!App.validate(titleValidationObj) ||
                !App.validate(descValidationObj) ||
                !App.validate(peopleValidationObj)) {
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
        App.AutoBind
    ], ProjectInput.prototype, "handleSubmit", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
        dropHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] !== "text/plain")
                return;
            if (event.dataTransfer) {
                let id = event.dataTransfer.getData("text/plain");
                App.projectState.moveProject(id, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
                const listEl = this.element.querySelector("ul");
                listEl.classList.remove("droppable");
            }
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            App.projectState.addListener((projects) => {
                const identifier = this.type === "active" ? 0 : 1;
                const desiredProjects = projects.filter((proj) => proj.status === identifier);
                this.assignedProjects = desiredProjects;
                this.renderProjects();
            });
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
                new App.ProjectItem(listEl.id, project);
            }
        }
    }
    __decorate([
        App.AutoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.AutoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.AutoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList("active");
    new App.ProjectList("finished");
})(App || (App = {}));
var App;
(function (App) {
    class ProjectItem extends App.Component {
        get persons() {
            if (this.project.people === 1)
                return "1 Person";
            return `${this.project.people} Persons`;
        }
        constructor(hostId, project) {
            super("single-project", hostId, false);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            const el = event.target;
            el.classList.add("dragging");
            event.dataTransfer.setData("text/plain", el.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(event) {
            const el = event.target;
            el.classList.remove("dragging");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.id = this.project.id;
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent =
                this.persons + " assigned.";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        App.AutoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        App.AutoBind
    ], ProjectItem.prototype, "dragEndHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map