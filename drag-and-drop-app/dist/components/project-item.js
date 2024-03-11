var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { AutoBind } from "../decorators/autobind.js";
export class ProjectItem extends Component {
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
        this.element.querySelector("h3").textContent = this.persons + " assigned.";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
//# sourceMappingURL=project-item.js.map