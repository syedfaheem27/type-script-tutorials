class Department {
  //   private employees: string[] = [];
  // employees only accessible inside the Department class

  protected employees: string[] = [];
  //makes it inaccessible from outside
  //but available to all the children

  constructor(public name: string, private readonly id: number) {}

  describe(this: Department) {
    console.log(`Department  ${this.id}: ${this.name}`);

    const printName = () => console.log(this.name);

    printName();
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  printEmployee() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDept extends Department {
  private admins: string[];

  get mostRecentAdmin() {
    if (!this.admins[0]) throw new Error("No admin found!");

    return this.admins[this.admins.length - 1];
  }

  set mostRecentAdmin(admin: string) {
    if (!admin) throw new Error("Pass in a valid admin value!");

    this.admins.push(admin);
    this.printEmployee();
  }

  constructor(id: number, admins: string[]) {
    super("IT", id);
    this.admins = admins;
  }

  printEmployee(): void {
    console.log(this.admins.length);
    console.log(this.admins);
  }

  addEmployees(employee: string): void {
    if (employee === "faheem") return;

    super.addEmployees(employee);
  }
}

const it = new ITDept(1, ["faheem"]);
it.describe();

it.printEmployee();
it.addEmployees("ilham");
console.log(it);

console.log(it.mostRecentAdmin);

it.mostRecentAdmin = "farhan";
