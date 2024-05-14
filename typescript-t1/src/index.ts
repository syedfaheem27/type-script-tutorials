//Utility types

// 1.Partial<type>

type OwnPartial<T> = {
  [P in keyof T]?: T[P];
};

//Example

interface todo {
  title: string;
  description: string;
}

function updateTodo(todo1: todo, todo2: OwnPartial<todo>): todo {
  return { ...todo1, ...todo2 };
}

const todo1: todo = {
  title: "Finish TS",
  description: "It must be done by today.",
};

const editTodo: OwnPartial<todo> = {
  description: "It must be done by today positively",
};

//The built in Partial<type> works like this only

/*-------------------------------------------------*/

// 2.Awaited<type>
//Useful - when u don't know what the promise might resolve to

const promise: Promise<number | string | boolean> = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      let num = Math.floor(Math.random() * 10);

      if (num === 0 || num === 1) return resolve(num);
      else if (num > 1 && num <= 7) return resolve("Yayy");
      else resolve(true);
    }, 1000);
  }
);

let resolved: Awaited<typeof promise>;

/*------------------------------*/

//3. Required type

interface props {
  a?: number;
  b?: string;
}

const obj: props = { a: 1 };

const obj2: Required<props> = { a: 2, b: "s" };

/*----------------------------------*/

//4. Record<key,type>

// type Roles = "author" | "researcher" | "editor";

enum Roles {
  author = "author",
  researcher = "researcher",
  editor = "editor",
}

interface User {
  name: string;
  age: number;
  email: string;
}

interface Article {
  title: string;
  content: string;

  contributors: Record<Roles, User>;
}

const article: Article = {
  title: "lorem ipsem dolor sit amet",
  content: "djkashdkjashbdjkashdjkahd",
  contributors: {
    author: { name: "abc", age: 32, email: "abc@gmail.com" },
    researcher: { name: "abc", age: 32, email: "abc@gmail.com" },
    editor: { name: "abc", age: 32, email: "abc@gmail.com" },
  },
};

/*-------------------------*/

// 5. Pick<type,keys>

interface _User {
  name: string;
  email: string;
  age: number;
  password: string;
}

const Limited_: Pick<_User, "name" | "email"> = {
  name: "abc",
  email: "abc@abc.com",
};

//Readonly
let copyLimitedUser: Readonly<Pick<_User, "name" | "email">> = {
  name: "xxx",
  email: "xxx@xxx.xom",
};

/*-----------------------*/

//6. Omit<type,keys>

const LimitedUser2: Omit<_User, "password" | "age"> = {
  name: "abc",
  email: "abc@abc.com",
};

/*--------------------*/

// 6. String Manipulation utility types

type district = "srinagar" | "Budgam" | "baramulla";

type UppercaseDistrict = Uppercase<district>;
type LowercaseDistrict = Lowercase<district>;
type CapitalDistrict = Capitalize<district>;
type UncapitalizeDistrict = Uncapitalize<district>;
