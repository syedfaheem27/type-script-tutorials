///<reference path="./base-component.ts"/>
///<reference path="../decorators/autobind.ts"/>
///<reference path="../state/project-state.ts"/>
///<reference path="../models/drag-drop.ts"/>

namespace App {
  //Project List class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    private assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] !== "text/plain")
        return;

      if (event.dataTransfer) {
        let id = event.dataTransfer.getData("text/plain");

        projectState.moveProject(
          id,
          this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
        );

        //Remove Droppable class
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable");
      }
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("drop", this.dropHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        const identifier = this.type === "active" ? 0 : 1;
        const desiredProjects = projects.filter(
          (proj) => proj.status === identifier
        );
        this.assignedProjects = desiredProjects;
        this.renderProjects();
      });
    }

    private renderContent() {
      const title = `${this.type.toUpperCase()} PROJECTS`;
      this.element.querySelector("h2")!.textContent = title;

      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
    }

    private renderProjects() {
      const listEl = this.element.querySelector("ul")! as HTMLUListElement;
      listEl.innerHTML = "";

      for (const project of this.assignedProjects) {
        new ProjectItem(listEl.id, project);
      }
    }
  }
}
