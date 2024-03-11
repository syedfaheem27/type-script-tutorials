///<reference path="./base-component.ts"/>

namespace App {
  //Project Item
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      if (this.project.people === 1) return "1 Person";
      return `${this.project.people} Persons`;
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
      const el = event.target! as HTMLLIElement;
      el.classList.add("dragging");
      event.dataTransfer!.setData("text/plain", el.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    @AutoBind
    dragEndHandler(event: DragEvent) {
      const el = event.target! as HTMLLIElement;
      el.classList.remove("dragging");
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    private renderContent() {
      this.element.id = this.project.id;
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned.";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
