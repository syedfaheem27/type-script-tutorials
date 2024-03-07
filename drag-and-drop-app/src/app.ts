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
    }
  }

  private gatherInput(): [string, string, number] | void {
    const title = this.titleInpElement.value;
    const description = this.descriptionInpElement.value;
    const people = this.peopleInpElement.value;

    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      people.trim().length === 0
    ) {
      alert("Invalid title, description or people!");
      return;
    }

    return [title, description, +people];
  }
}

const projectInstance = new Project();
