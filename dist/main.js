//? Variables
// let hello: string = "world";
//? Functions
/**
const getFullName = (name: string, surname: string): string => {
  return name + " " + surname;
};

console.log(getFullName("Subham", "Bhradwaz"));
*/
/**
//? Interface
interface UserInterface {
  name: string;
  age?: number;
  getMessage(): string;
}

//? "?" is used to say that "age" is not mandatory

//? Objects
const user: UserInterface = {
  name: "Monster",
  age: 30,
  getMessage() {
    return "Hello" + name;
  },
};

const user2: UserInterface = {
  name: "Jack",
  getMessage() {
    return "Hello" + name;
  },
};
*/
/** //? Union
interface UserInterface {
  name: string;
  surname: string;
}

let pageNumber: string | number = "1";

pageNumber = 1;

pageNumber = "1";

let errorMessage: string | null;

let user: UserInterface | null = null;
*/
/** //? Type Alias
type ID = string;
type PopularTag = string;

interface UserInterface {
  id: ID;
  name: string;
  surname: string;
}

const popularTags: PopularTag[] = ["dragon", "coffee"];
*/
/** //? Type Alias + Union
type ID = string;
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

interface UserInterface {
  id: ID;
  name: string;
  surname: string;
}

const dragonTag: MaybePopularTag = "dragon";
*/
/** //? Any / Void / Never / Unknown
//? Void

const doSomething = (): void => {
  console.log("doeSomething");
};

//? Any
let foo: any = "foo";
console.log(foo.bar());

//? Never

const doSomething2 = (): never => {
  throw "never";
};

//? Unknown
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
let s2: string = vUnknown as string;

let pageNumber: string = "1";
let numericPageNumber: number = pageNumber as unknown as number;

// console.log(vAny.foo());
// console.log(vUnknown.foo());
*/
/** //? Working With DOM

const someElement = document.querySelector(".foo") as HTMLInputElement;

// console.log("someElement", someElement.value);

someElement.addEventListener("blur", (e) => {
  const target = e.target as HTMLInputElement;
  console.log("event", target.value);
});

*/
/** //? Classes */
//public
/**
class User {
   firstName: string;
   lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFulName(): string {
    return this.firstName + " " + this.lastName;
  }
}
const user = new User("Monster", "lessons");
console.log(user.firstName);
//private
*/
//private
/**
class User {
    private firstName: string;
    private lastName: string;
  
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    getFulName(): string {
      return this.firstName + " " + this.lastName;
    }
  }
  
  const user = new User("Monster", "lessons");
  console.log(user.firstName);
//!  error -> Property 'firstName' is private and only accessible within class 'User'.
*/
//protected
/**
class User {
    protected firstName: string;
    protected lastName: string;
  
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    getFulName(): string {
      return this.firstName + " " + this.lastName;
    }
  }
  
  const user = new User("Monster", "lessons");
  
*/
// Readonly
/**
class User {
     firstName: string;
     lastName: string;
     readonly unChangeableName: string;
  
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  changeUnchangeableName(): void{
      this.unChangeableName = "fod"
  }
    getFulName(): string {
      return this.firstName + " " + this.lastName;
    }
  }
  
  const user = new User("Monster", "lessons");
  console.log(user.firstName);
  
*/
//Interface / inheritance / readonly / static
/**
interface UserInterface {
  getFulName(): string;
}

class User implements UserInterface {
  firstName: string;
  lastName: string;
  readonly unChangeableName: string;
  static readonly maxAge = 50;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  changeUnchangeableName(): void {
    //  this.unChangeableName = "fod"
  }
  getFulName(): string {
    return this.firstName + " " + this.lastName;
  }
}

// Inheritance
class Admin extends User {
  private editor: string;

  setEditor(editor: string): void {
    this.editor = editor;
  }

  getEditor(): string {
    return this.editor;
  }
}

const user = new User("Monster", "lessons");
console.log(user.firstName);
// console.log(user.maxAge);
console.log(User.maxAge);

const admin = new Admin("Foo", "Bar");
console.log(admin.firstName);
console.log(admin.setEditor);
console.log(user.setEditor);
*/
/** //? Generics

const addTo = <T extends object>(obj: T) => {
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

interface UserInterface<T,V> {
  name: string;
  data: T,
  meta: V
}

const user: UserInterface<{meta: string}, string> = {
  name: "Jack",
  data: {
      meta: 'foo'
  },
  meta: 'bar'
};
const user2: UserInterface<string[]> = {
    name: 'John',
    data: ['foo','bar','baz']
}
const result = addTo<UserInterface>(user);
console.log("result", result);
*/
