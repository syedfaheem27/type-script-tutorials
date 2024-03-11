//Adding Draggable and DragTarget Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

/*----------------------------*/
//Individual Project
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
/*----------------------------*/
//Base class for general state
class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(fn: Listener<T>) {
    this.listeners.push(fn);
  }
}

/*-------------------------*/

//Singleton Class for managing the state of the project

type Listener<T> = (items: T[]) => void;

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new ProjectState();
    return this.instance;
  }

  addItem(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

    this.projects.push(newProject);

    //Calling all the listeners after adding an item
    this.execAllListeners();
  }

  moveProject(prjId: string, status: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === prjId);

    if (project && project.status !== status) {
      project.status = status;
      this.execAllListeners();
    }
  }

  private execAllListeners() {
    for (const listener of this.listeners) listener(this.projects.slice());
  }
}

const projectState = ProjectState.getInstance();

/*---------------------------------------------*/
//Validation

interface Validatable {
  value: number | string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}

function validate(validationObj: Validatable) {
  const value = validationObj.value;
  //Checking if the field is required
  if (validationObj.required && value.toString().trim().length === 0)
    return false;

  //Check max length of string
  if (
    validationObj.maxLength !== undefined &&
    typeof value === "string" &&
    value.trim().length > validationObj.maxLength
  )
    return false;

  //Check min length of a string
  if (
    validationObj.minLength !== undefined &&
    typeof value === "string" &&
    value.trim().length < validationObj.minLength
  )
    return false;

  //Check the max number
  if (
    validationObj.max !== undefined &&
    typeof value === "number" &&
    value > validationObj.max
  )
    return false;

  //Check the min number
  if (
    validationObj.min !== undefined &&
    typeof value === "number" &&
    value < validationObj.min
  )
    return false;

  return true;
}

/*---------------------------------*/

//Auto Bind Decorator
function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
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
/*------------------------------------*/
//Component class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  clientEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    clientId: string,
    hostId: string,
    insertAtStart: boolean,
    elementId?: string
  ) {
    this.clientEl = document.getElementById(clientId)! as HTMLTemplateElement;

    this.hostEl = document.getElementById(hostId)! as T;

    const importedNode = document.importNode(this.clientEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (elementId) this.element.id = elementId;

    this.injectContent(insertAtStart);
  }

  private injectContent(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(
      `${insertAtStart ? "afterbegin" : "beforeend"}`,
      this.element
    );
  }

  abstract configure(): void;
}

/*----------------------------------*/

//Project Item
class ProjectItem
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
    this.element.querySelector("h3")!.textContent = this.persons + " assigned.";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

/*------------------------------------*/

//Project List class
class ProjectList
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

/*------------------------------*/

//ProjectApp Class
class ProjectApp extends Component<HTMLDivElement, HTMLFormElement> {
  titleInpElement: HTMLInputElement;
  descriptionInpElement: HTMLInputElement;
  peopleInpElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInpElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;

    this.descriptionInpElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;

    this.peopleInpElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.addListener();
  }

  configure(): void {}

  private addListener() {
    this.element.addEventListener("submit", this.handleSubmit);
  }

  @AutoBind
  private handleSubmit(e: Event) {
    e.preventDefault();
    const userInput = this.gatherInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);

      projectState.addItem(title, description, people);

      this.clearInput();
    }
  }

  private gatherInput(): [string, string, number] | void {
    const title = this.titleInpElement.value;
    const description = this.descriptionInpElement.value;
    const people = +this.peopleInpElement.value;

    const titleValidationObj: Validatable = {
      value: title,
      required: true,
      maxLength: 15,
    };

    const descValidationObj: Validatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 20,
    };

    const peopleValidationObj: Validatable = {
      value: people,
      required: true,
      max: 8,
      min: 1,
    };

    if (
      !validate(titleValidationObj) ||
      !validate(descValidationObj) ||
      !validate(peopleValidationObj)
    ) {
      alert("Invalid title, description or people!");
      return;
    }

    return [title, description, +people];
  }

  private clearInput() {
    this.titleInpElement.value = "";
    this.descriptionInpElement.value = "";
    this.peopleInpElement.value = "";
  }
}

const projectInstance = new ProjectApp();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
