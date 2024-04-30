interface Holiday {
  title: string;
  date: Date;
}

class Department {
  private name: string;
  private holidays: Holiday[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addHolidays(holiday: Holiday) {
    this.addHolidays(holiday);
    return this;
  }

  get printHolidays() {
    this.holidays.forEach((holiday) => {
      console.log(holiday);
    });

    return;
  }
}

class ItDepartment extends Department {
  private description: string;

  constructor(description: string) {
    super("IT");
    this.description = description;
  }
}

const it1 = new ItDepartment("A fairly new Department with amazing teachers");
console.log(it1);

/*----------------------------------------*/
