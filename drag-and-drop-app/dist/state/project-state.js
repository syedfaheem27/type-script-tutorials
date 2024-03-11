import { State } from "./global-state.js";
import { Project, ProjectStatus } from "../models/project.js";
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
    addItem(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.execAllListeners();
    }
    moveProject(prjId, status) {
        const project = this.projects.find((prj) => prj.id === prjId);
        if (project && project.status !== status) {
            project.status = status;
            this.execAllListeners();
        }
    }
    execAllListeners() {
        for (const listener of this.listeners)
            listener(this.projects.slice());
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map