import { Component } from "./base-component";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { validate, Validatable } from "../utils/validation";

//ProjectApp Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
