class Department {
  name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department : " + this.name);

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

const accounting = new Department("accounting");
accounting.describe();

accounting.addEmployees("farhan");
accounting.addEmployees("faheem");

// accounting.employees[2] = "zubair";

accounting.printEmployee();

// const newDeptt = { name: "Dummy", describe: accounting.describe };
// newDeptt.describe();
