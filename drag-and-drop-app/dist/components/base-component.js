export class Component {
    constructor(clientId, hostId, insertAtStart, elementId) {
        this.clientEl = document.getElementById(clientId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.clientEl.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId)
            this.element.id = elementId;
        this.injectContent(insertAtStart);
    }
    injectContent(insertAtStart) {
        this.hostEl.insertAdjacentElement(`${insertAtStart ? "afterbegin" : "beforeend"}`, this.element);
    }
}
//# sourceMappingURL=base-component.js.map