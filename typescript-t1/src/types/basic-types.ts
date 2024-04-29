type Airplane = {
  model: string;
  flightNumber: string;
  timeOfDeparture: Date;
  timeOfArrival: Date;
  caterer: {
    name: string;
    address: string;
    phone: number;
  };
};

const airplane: Airplane = {
  model: "Airbus A380",
  flightNumber: "A2201",
  timeOfDeparture: new Date(),
  timeOfArrival: new Date(),
  caterer: {
    name: "Special Food Ltd",
    address: "484, Some street, New York",
    phone: 123444,
  },
};

console.log(airplane);

type In = {
  [key: string]: string | number | {};
  seats: {
    name: string;
  };
};

const n: In = {
  hello: "faheem",
  a: "ksdkask",
  c: 3,
  seats: {
    name: "sadasd",
  },
};

// const num: Readonly<Array<number>> = [1, 2, 3, 4];
//const num: readonly number[]
const num: Readonly<number[]> = [1, 2, 4, 5, 7];

type Passing = [number, boolean, ...string[]];

const passingStudents: Array<string> = ["faheem", "rummana"];

const students: Passing = [2, true, ...passingStudents];

/*-----------------------------*/
type member = {
  name: string;
  phone: string;
  [kety: string]: string;
};

type book = {
  title: string;
  pages: number;
  isbn: string;
};

type Library = {
  name: string;
  address: string;
  numberOfBooks: number;
  type: string;
  books: book[];
  genres: string[];
  members: member[];
};
