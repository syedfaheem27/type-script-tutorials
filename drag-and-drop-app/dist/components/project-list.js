var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { ProjectStatus } from "../models/project.js";
export class ProjectList extends Component {
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
            projectState.moveProject(id, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
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
        projectState.addListener((projects) => {
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
            new ProjectItem(listEl.id, project);
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map