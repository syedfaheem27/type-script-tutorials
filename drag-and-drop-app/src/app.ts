//Singleton Class for managing the state of the project

class ProjectState {
  private projects: any[] = [];
  private static instance: ProjectState;
  private listeners: Function[] = [];

  private constructor() {}

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new ProjectState();
    return this.instance;
  }

  addItem(title: string, description: string, people: number) {
    this.projects.push({
      id: Math.random().toString(),
      title,
      description,
      people,
    });

    //Calling all the listeners after adding an item
    this.execAllListeners();
  }

  private execAllListeners() {
    for (const listener of this.listeners) listener(this.projects.slice());
  }

  addListener(fn: Function) {
    this.listeners.push(fn);
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
//Project List class
class ProjectList {
  clientEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;
  private assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.clientEl = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.clientEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.injectContent();
    this.renderContent();
  }

  private injectContent() {
    this.hostEl.insertAdjacentElement("beforeend", this.element);
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
      const el = document.createElement("li");
      el.textContent = project.title;

      listEl.appendChild(el);
    }
  }
}

/*----------------------------*/

//Project Class
class Project {
  clientEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  formEl: HTMLFormElement;
  titleInpElement: HTMLInputElement;
  descriptionInpElement: HTMLInputElement;
  peopleInpElement: HTMLInputElement;

  constructor() {
    this.clientEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.clientEl.content, true);
    this.formEl = importedNode.firstElementChild as HTMLFormElement;
    this.formEl.id = "user-input";

    this.titleInpElement = this.formEl.querySelector(
      "#title"
    )! as HTMLInputElement;

    this.descriptionInpElement = this.formEl.querySelector(
      "#description"
    )! as HTMLInputElement;

    this.peopleInpElement = this.formEl.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.injectForm();
    this.addListener();
  }

  private injectForm() {
    this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
  }

  private addListener() {
    this.formEl.addEventListener("submit", this.handleSubmit);
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

const projectInstance = new Project();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
