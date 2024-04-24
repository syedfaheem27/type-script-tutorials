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

class ITDept extends Department {
  private admins: string[];

  constructor(id: number, admins: string[]) {
    super("IT", id);
    this.admins = admins;
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

const it = new ITDept(1, ["faheem"]);
// let fn = it.describe();
// fn();

// it.addEmployees("ilham");

// console.log(it.mostRecentAdmin);

// it.mostRecentAdmin = "farhan";
console.log(it);
it.describe();

/*-----------------------------------*/

//Practice writing an abstract class and then inheriting from it

abstract class CV {
  protected readonly profile: string;
  protected name: string;

  constructor(name: string, profile: string) {
    this.name = name;
    this.profile = profile;
  }

  abstract defineSkills<T>(skills: T[]): void;
  abstract defineYourself(): void;
}

class Developer extends CV {
  constructor(name: string) {
    super(name, "developer");
  }

  defineSkills<T>(skills: T[]): void {
    console.log(`The skills that i have are :`);
    skills.forEach((skill) => {
      console.log(skill);
    });
  }

  defineYourself(): void {
    console.log(
      `Hi my name is ${this.name} and i am a professional ${this.profile} with a wide spectrum of skills.`
    );
  }
}

const faheem = new Developer("Faheem");
faheem.defineSkills(["HTML", "CSS", "JS"]);
faheem.defineYourself();
