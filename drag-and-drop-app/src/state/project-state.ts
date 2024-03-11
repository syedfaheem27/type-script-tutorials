///<reference path="./global-state.ts"/>
import { State } from "./global-state.js";
import { Project, ProjectStatus } from "../models/project.js";

//Singleton Class for managing the state of the project

export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();
