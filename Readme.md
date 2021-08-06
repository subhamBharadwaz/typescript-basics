# Typescript Basics

## 1. Functions

```tsx
const getFullName = (name: string, surname: string): string => {
  return name + " " + surname;
};

console.log(getFullName("Subham", "Bhradwaz"));
```

Here, parameters name and surname is of type "string" and the function getFullName will also must return of type "string".

## 2. Interface

One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

Without Interface :

```tsx
const user: { name: string; age: number } = {
  name: "Monster",
  age: 30,
};

const user2: { name: string; age: number } = {
  name: "Jack", // will throw an error for missing "age"
};
```

Without interface we gave to define the types of every objects like this.

With Interface :

```tsx
interface User {
  name: string;
  age?: number;
}

// Here ? describes that age is not mandatory

const user: User = {
  name: "Monster",
  age: 30,
};

const user2: User = {
  name: "Jack",
};
```

### Functions in interfaces

```tsx
interface User {
  name: string;
  age?: number;
  getMessage(): string;
}
// getMessage() will return string

const user: User = {
  name: "Monster",
  age: 30,
  getMessage() {
    return "Hello" + name;
  },
};

const user2: User = {
  name: "Jack",
  getMessage() {
    return "Hello" + name;
  },
};
```

Naming of interface: If we declare a class named User, it will throw an error because we already created an interface of the same name. So we should name interfaces like UserInterface. Use the prefix Interface.

## 3. Union Operator

To combine data types we use Union ( | )

```tsx
let pageNumber: string | number = "1"; //always use default values if ot is possible

pageNumber = 1;

pageNumber = "1";
```

> Most popular use case of union is checking for null. Because when normally we fetch some data or work with some data which we don't have at the beginning, this is why we setting them to null. And when we fetch data or we got them, we want to change them to a type that we want to work with.

```tsx
let errorMessage: string | null; //if we don't set anyting here, by default
//it will undefind

let errorMessage: string | null = null; //that's why we should
//always use default values if it is possible
```

Example :

```tsx
interface UserInterface {
  name: string;
  surname: string;
}

let user: UserInterface | null = null;

// we should not use below type of union
let someProp: string | number | boolean | string[] | object | null | //this is really
//not supportable and it doesnot bring any clarity and safety
```

## 3. Type Alias

Types and interfaces both are started with Capital letter.

```tsx
type ID = string;
type PopularTag = string;

interface UserInterface {
  id: ID; // ID = string
  name: string;
  surname: string;
}

const popularTags: PopularTag[] = ["dragon", "coffee"]; //PopularTag[] = string[]
```

Now our code is more human readable. We can declare our custom types like this and can use them anywhere.

## 4. Union + Type Alias

We can combine our custom type alias with others using Union.

```tsx
type ID = string;
type PopularTag = string;
type MaybePopularTag = PopularTag | null; //PopularTag = string

interface UserInterface {
  id: ID;
  name: string;
  surname: string;
}

const dragonTag: MaybePopularTag = "dragon"; //MaybePopularTag = string | null, here string
```

## 5. Any / Void / Never / Unknown

### Void

When we don't return anything, it's void.

```tsx
const doSomething = (): void => {
  console.log("doeSomething");
};
```

### Any

Any type turns off Typescript checks.

```tsx
let foo: any = "foo";
console.log(foo.bar());
```

Here we won't get any errors because foo is any, typescript doesn't know anything regarding it. It simply ignores it.

We should avoid using any at any cost. Because any is not a solution but start of bigger problems.

### Never

Function with never can't be executes to the end.

```tsx
const doSomething = (): never => {
  throw "never";
};
```

### Unknown

Unknown is an great alternative for type any. It was introduced in typescript 3

```tsx
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
let s2: string = vUnknown; // error -> Type 'unknown' is not assignable to type 'string'.

console.log(vAny.foo());
console.log(vUnknown.foo()); // error -> Property 'foo' does not exist on type 'unknown'
```

First of all we somehow have to convert the data type unknown to another type.

To covert types we used assertion(as).

```tsx
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
let s2: string = vUnknown as string;

let pageNumber: string = "1";
let numericPageNumber: number = pageNumber as number;
// error -> Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first

// To Fix the error we have to first convert PageNumber to type unknown and then covert it again to type number
let numericPageNumber: number = pageNumber as unknown as number;
```

## 6. Working with DOM

Typescript have lots of types for DOM out of the box.

Typescript doesn't know anything about markup. Typescript sees only our data types.

Element is the highest class in hierarchy

```tsx
const someElement = document.querySelector(".foo") as HTMLInputElement;
// here we declared that someElement is an html input element.

//So we can access it's value
console.log("someElement", someElement.value);
```

### Adding listeners

```tsx
const someElement = document.querySelector(".foo") as HTMLInputElement;

someElement.addEventListener("blur", (e) => {
  console.log("event", e.target.value);
  //error -> Property 'value' does not exist on type 'EventTarget'
});

//To solve this error we have to define our target correctly
someElement.addEventListener("blur", (e) => {
  const target = e.target as HTMLInputElement; // we know that we are working on HTMLInputElement that's why we set this type
  console.log("event", target.value);
});
```

## 7. Classes

Classes are sugar around prototype.

```tsx
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
```

### Access Modifiers (public, private, protected)

- Everything is public by default
- Private means we can use it only inside a class

```tsx
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
console.log(user.firstName); // error -> Property 'firstName' is private and only accessible within class 'User'.

// we cannot use firstName and lastName outside of the class because those are private.
```

- Protected is allowed in class and it's children

```tsx
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
```

### Readonly

By using readonly, we can't change it.

```tsx
class User {
  firstName: string;
  lastName: string;
  readonly unChangeableName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  changeUnchangeableName(): void {
    this.unChangeableName = "fod"; //error-> Cannot assign to 'unChangeableName' because it is a read-only property
  }
  getFulName(): string {
    return this.firstName + " " + this.lastName;
  }
}

const user = new User("Monster", "lessons");
console.log(user.firstName);
```

### Implements interface

```tsx
interface UserInterface {
  getFulName(): string;
}

class User implements UserInterface {
  firstName: string;
  lastName: string;
  readonly unChangeableName: string;

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

const user = new User("Monster", "lessons");
console.log(user.firstName);
```

### Static

Static properties are only accessible on the class itself not on instances.

```tsx
class User implements UserInterface {
  firstName: string;
  lastName: string;
  static readonly maxAge = 50;

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
console.log(user.maxAge); //error->Property 'maxAge' does not exist on type 'User'. Did you mean to access the static member 'User.maxAge' instead?
// cannot use static properties with instances.

// static properties can only be used with the class itself
console.log(User.maxAge);
```

### Inheritance

TypeScript supports the concept of Inheritance. Inheritance is the ability of a program to create new classes from an existing class.

```tsx
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
console.log(user.setEditor); //error-> Property 'setEditor' does not exist on type 'User'
```

## 8. Generics in Typescript

TypeScript Generics is a tool which provides a way to create reusable components. It creates a component that can work with a variety of data types rather than a single data type. It allows users to consume these components and use their own types.

```tsx
const addTo = (obj) => {
  // warning-> Parameter 'obj' implicitly has an 'any' type, but a better type may be inferred from usage
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

const user = {
  name: "Jack",
};
const result = addTo(user);
console.log("result", result);
```

To fix the warning, here we can use a generic.

```tsx
const addTo = <T>(obj: T) => {
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

const user = {
  name: "Jack",
};
const result = addTo(user);
console.log("result", result);
```

Big "T" is a default name for generic

All generic data types are written inside "<>"

```tsx
const addTo = <T extends object>(obj: T) => {
  // here we set a default generic type object using extends keyword
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

interface UserInterface {
  name: string;
}

const user: UserInterface = {
  name: "Jack",
};
// const result = addTo<string>(user); it will throw an error because Type 'string' does not satisfy the constraint 'object'
const result = addTo<UserInterface>(user); // user: Userinterface is an object so there will be no errors
//Explicit declarations are easier to read
console.log("result", result);
```
