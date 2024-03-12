abstract class Department {
  protected employees: string[] = [];

  constructor(public name: string, private readonly id: number) {}

  describe(this: Department): () => void {
    console.log(`Department  ${this.id}: ${this.name}`);

    const printName = () => console.log(this.name);

    return printName;
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  abstract printEmployee(): void;
}

//Singleton class
class ITDept extends Department {
  private admins: string[];
  private static instance: ITDept;

  private constructor(id: number, admins: string[]) {
    super("IT", id);
    this.admins = admins;
  }

  static getInstanceOf() {
    if (!this.instance) {
      this.instance = new ITDept(1, ["faheem"]);
      return this.instance;
    }

    return this.instance;
  }

  addEmployees(employee: string): void {
    if (employee === "faheem") return;

    super.addEmployees(employee);
  }

  printEmployee(): void {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  get mostRecentAdmin() {
    if (!this.admins[0]) throw new Error("No admin found!");

    return this.admins[this.admins.length - 1];
  }

  set mostRecentAdmin(admin: string) {
    if (!admin) throw new Error("Pass in a valid admin value!");

    this.admins.push(admin);
    this.printEmployee();
  }
}

const it = ITDept.getInstanceOf();
console.log(it);
