namespace App {
  //Component class
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
