const Department = function (name) {
  this.name = name;
  this.holidays = [];
};

Department.prototype.addHolidays = function (holiday) {
  this.holidays.push(holiday);
  return this;
};

Department.prototype.printHolidays = function () {
  this.holidays.forEach((holiday) => {
    console.log(holiday);
  });
};

const ItDepartment = function (description) {
  Department.call(this, "It");
  this.description = description;
};

ItDepartment.prototype = Object.create(Department.prototype);
ItDepartment.constructor = ItDepartment;

const obj = new ItDepartment("A relatively new addition");
obj.addHolidays("Eid");
