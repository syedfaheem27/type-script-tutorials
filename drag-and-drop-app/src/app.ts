// Code goes here!

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
/*----------------------------*/

//Project Class
class Project {
  clientEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  formEl: HTMLFormElement;
  titleInpEl: HTMLInputElement;
  descriptionInpEl: HTMLInputElement;
  peopleInpEl: HTMLInputElement;

  constructor() {
    this.clientEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.clientEl.content, true);
    this.formEl = importedNode.firstElementChild as HTMLFormElement;
    this.formEl.id = "user-input";

    this.titleInpEl = this.formEl.querySelector("#title")! as HTMLInputElement;

    this.descriptionInpEl = this.formEl.querySelector(
      "#description"
    )! as HTMLInputElement;

    this.peopleInpEl = this.formEl.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.injectForm();
    this.addListener();
  }

  private injectForm() {
    this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
  }

  @AutoBind
  private handleSubmit(e: Event) {
    e.preventDefault();
    console.log(this.titleInpEl.value);
  }

  private addListener() {
    this.formEl.addEventListener("submit", this.handleSubmit);
  }
}

const projectInstance = new Project();
