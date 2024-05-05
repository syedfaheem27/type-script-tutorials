const num = <const>{
  x: 23,
  y: {
    z: 43,
  },
};

/*
const num = {
  x: 23,
  y: {
    z: 43,
  },
} as const
*/

console.log(num);

// const input = document.querySelector(".inp");

// if (input) {
//   (input as HTMLInputElement).value;
// }

//Discriminated unions

type Cat = {
  type: "cat";
  purrs: boolean;
};

type Dog = {
  type: "dog";
  barks: boolean;
};

type Animal = Dog | Cat;

let cat: Animal = {
  type: "cat",
  purrs: true,
};

let dog: Animal = {
  type: "dog",
  barks: true,
};

function describeAnimal(animal: Animal) {
  switch (animal.type) {
    case "cat":
      console.log("Cat");
      break;
    case "dog":
      console.log("Dog");
      break;
  }
}

describeAnimal(cat);
describeAnimal(dog);

/*------------------------------------------*/

//Key in or index-accessed type and key of operator

interface UserResponse {
  id: number;
  name: string;
  servicesList: {
    count: number;
    services: {
      id: number;
      name: string;
      price: number;
    }[];
  };
}

//key in or index accessed type
type Services = UserResponse["servicesList"];

function generateUserResponse(name: string): Promise<UserResponse> {
  return new Promise((res, rej) => {
    if (name) {
      return res({
        id: 1,
        name: "abc",
        servicesList: {
          count: 23,
          services: [
            {
              id: 2,
              name: "xxx",
              price: 43,
            },
            {
              id: 2,
              name: "xxx",
              price: 43,
            },
            {
              id: 2,
              name: "xxx",
              price: 43,
            },
          ],
        },
      });
    }

    return rej(new Error("Missing a name"));
  });
}

function printServices(services: Services) {
  console.log(services);
}

generateUserResponse("fam")
  .then((res): void => {
    console.log(res);
    printServices(res.servicesList);
  })
  .catch((err): void => {
    console.log(err);
  });

//Mapped Types

//Example 1
type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

type Day = WeekDay | "Sat" | "Sun";

type NextDay = {
  [w in WeekDay]: Day;
};

let nextDay: NextDay = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thu",
  Thu: "Fri",
  Fri: "Sat",
};

//Example 2
type Artist = {
  id: number;
  name: string;
  bio: string;
};

type editArtistInfo = {
  [key in keyof Artist]?: Artist[key];
} & { id: number };

const updateArtistInfo: editArtistInfo = {
  id: 1,
  bio: "new bio",
};

//Conditional types

type AnimalI = {
  walk: () => boolean;
  run: () => boolean;
};

type DogI = AnimalI & {
  woof: () => boolean;
};

//type of A will be a string
type A = DogI extends AnimalI ? string : number;

//Generic type

type isString<T> = T extends string ? string : number;

type C = isString<string>;
type D = isString<number>;
