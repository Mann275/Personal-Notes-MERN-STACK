/*
╔═══════════════════════════════════════════════════════════════════════════╗
║            COMPLETE ADVANCED JAVASCRIPT MASTERY GUIDE                    ║
║                      All Advanced Concepts Covered                       ║
╚═══════════════════════════════════════════════════════════════════════════╝

TABLE OF CONTENTS:
1. SCOPE, EXECUTION CONTEXT & CLOSURES
2. THE 'this' KEYWORD - ALL SCENARIOS
3. CALL, APPLY & BIND METHODS
4. OBJECT ORIENTED PROGRAMMING (OOP) IN JAVASCRIPT
5. CALLBACKS, PROMISES & ASYNC/AWAIT
6. FETCH API & HTTP BASICS

Complete practical examples and theory for JavaScript mastery!
*/

// ═══════════════════════════════════════════════════════════════════════════
// 1. SCOPE, EXECUTION CONTEXT & CLOSURES
// ═══════════════════════════════════════════════════════════════════════════

console.log("=== 1. SCOPE, EXECUTION CONTEXT & CLOSURES ===");

// SCOPE - Where variables are accessible
// ========================================

// Global Scope
var globalVar = "I'm in global scope";
let globalLet = "Global let variable";
const globalConst = "Global const variable";

function demonstrateScope() {
  // Function Scope
  var functionVar = "I'm in function scope";

  if (true) {
    // Block Scope
    let blockLet = "I'm in block scope";
    const blockConst = "Also in block scope";
    var varInBlock = "Var doesn't care about block scope";

    console.log("Inside block:");
    console.log(blockLet); // ✅ Works
    console.log(blockConst); // ✅ Works
    console.log(functionVar); // ✅ Works (function scope)
    console.log(globalVar); // ✅ Works (global scope)
  }

  console.log("Outside block:");
  console.log(varInBlock); // ✅ Works (var ignores block)
  // console.log(blockLet);     // ❌ ReferenceError
  // console.log(blockConst);   // ❌ ReferenceError
}

// EXECUTION CONTEXT
// =================

/*
Execution Context is like a container that holds:
1. Variables Environment
2. Scope Chain  
3. this binding

Types:
- Global Execution Context
- Function Execution Context  
- Eval Execution Context (avoid)
*/

// Example of Execution Context Creation
function executionContextDemo() {
  // Creation Phase:
  // - Hoisting happens
  // - this is bound
  // - Scope chain is created

  console.log("Before declaration:", hoistedVar); // undefined (hoisted)
  // console.log("Before declaration:", hoistedLet); // ReferenceError (TDZ)

  var hoistedVar = "Now I have value";
  let hoistedLet = "Let variables are hoisted but in TDZ";

  // Execution Phase:
  // - Code runs line by line
  // - Variables get their values

  console.log("After declaration:", hoistedVar); // "Now I have value"
  console.log("After declaration:", hoistedLet); // "Let variables are hoisted but in TDZ"
}

// CLOSURES - The Magic of JavaScript
// ===================================

/*
Closure: A function that has access to outer function's variables even after 
the outer function has returned.

Key Points:
1. Inner function has access to outer function's variables
2. Outer function's variables remain in memory
3. Creates private variables
*/

// Basic Closure Example
function outerFunction(x) {
  // This variable will be "remembered" by inner function
  let outerVar = x;

  function innerFunction(y) {
    // Has access to both outerVar and y
    return outerVar + y;
  }

  return innerFunction; // Return the function, not calling it
}

const closureExample = outerFunction(10);
console.log("Closure result:", closureExample(5)); // 15

// Practical Closure: Counter
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => (count = 0),
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("Counter1 increment:", counter1.increment()); // 1
console.log("Counter1 increment:", counter1.increment()); // 2
console.log("Counter2 increment:", counter2.increment()); // 1 (separate closure)
console.log("Counter1 count:", counter1.getCount()); // 2

// Closure with Parameters
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log("Double 5:", double(5)); // 10
console.log("Triple 5:", triple(5)); // 15

// Advanced Closure: Function Factory
function createValidator(min, max) {
  return function (value) {
    if (value < min) return `Value ${value} is too small. Minimum: ${min}`;
    if (value > max) return `Value ${value} is too large. Maximum: ${max}`;
    return `Value ${value} is valid`;
  };
}

const ageValidator = createValidator(18, 100);
const scoreValidator = createValidator(0, 100);

console.log("Age validation:", ageValidator(25)); // Valid
console.log("Age validation:", ageValidator(15)); // Too small
console.log("Score validation:", scoreValidator(85)); // Valid

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE 'this' KEYWORD - ALL SCENARIOS
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. THE 'this' KEYWORD - ALL SCENARIOS ===");

/*
'this' refers to the object that is executing the current function.
Its value depends on HOW the function is called, not WHERE it's defined.

Rules (in order of precedence):
1. Arrow functions inherit 'this' from enclosing scope
2. new binding - when using 'new' keyword
3. Explicit binding - call, apply, bind
4. Implicit binding - object method call
5. Default binding - global object (window) or undefined (strict mode)
*/

// Rule 1: Arrow Functions (Lexical this)
const arrowThis = {
  name: "Arrow Object",
  regularMethod: function () {
    console.log("Regular method this:", this.name); // "Arrow Object"

    const arrowInside = () => {
      console.log("Arrow inside this:", this.name); // "Arrow Object" (inherits)
    };
    arrowInside();

    function regularInside() {
      console.log("Regular inside this:", this.name); // undefined or global
    }
    regularInside();
  },
};

// Rule 2: new Binding
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
  };
}

const person1 = new Person("Alice", 25);
person1.greet(); // this refers to person1 object

// Rule 3: Explicit Binding (call, apply, bind)
const thisObject1 = { name: "Object 1" };
const thisObject2 = { name: "Object 2" };

function sayName() {
  console.log(`My name is ${this.name}`);
}

sayName.call(thisObject1); // "My name is Object 1"
sayName.apply(thisObject2); // "My name is Object 2"

// Rule 4: Implicit Binding
const implicitThis = {
  name: "Implicit Object",
  sayHello: function () {
    console.log(`Hello from ${this.name}`); // this = implicitThis
  },
  nested: {
    name: "Nested Object",
    sayHello: function () {
      console.log(`Hello from ${this.name}`); // this = nested object
    },
  },
};

implicitThis.sayHello(); // "Hello from Implicit Object"
implicitThis.nested.sayHello(); // "Hello from Nested Object"

// Rule 5: Default Binding
function defaultThis() {
  console.log("Default this:", this); // Window object or undefined (strict mode)
}

// Common 'this' Pitfalls and Solutions
const thisProblems = {
  name: "Problem Object",
  methods: ["method1", "method2"],

  // Problem: Losing 'this' context
  showMethods: function () {
    console.log(`${this.name} has methods:`);

    // ❌ Problem: this becomes undefined/global in callback
    this.methods.forEach(function (method) {
      // console.log(`${this.name} has ${method}`); // this is undefined
    });

    // ✅ Solution 1: Arrow function
    this.methods.forEach((method) => {
      console.log(`${this.name} has ${method}`); // this is preserved
    });

    // ✅ Solution 2: bind
    this.methods.forEach(
      function (method) {
        console.log(`${this.name} has ${method}`);
      }.bind(this),
    );

    // ✅ Solution 3: Store reference
    const self = this;
    this.methods.forEach(function (method) {
      console.log(`${self.name} has ${method}`);
    });
  },
};

// Event Handlers and 'this'
// In DOM events, 'this' refers to the element that triggered the event
/*
HTML:
<button id="myButton">Click me</button>

JavaScript:
document.getElementById('myButton').addEventListener('click', function() {
    console.log(this); // refers to the button element
    this.style.backgroundColor = 'red';
});

// Arrow function loses 'this' context:
document.getElementById('myButton').addEventListener('click', () => {
    console.log(this); // refers to global/undefined, not button
});
*/

// ═══════════════════════════════════════════════════════════════════════════
// 3. CALL, APPLY & BIND METHODS
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. CALL, APPLY & BIND METHODS ===");

/*
These methods allow you to explicitly set what 'this' refers to:
- call(): Calls function with specific 'this' and individual arguments
- apply(): Calls function with specific 'this' and array of arguments  
- bind(): Returns new function with bound 'this' (doesn't call immediately)
*/

// CALL METHOD
// ===========
const callExample = {
  fullName: "John Doe",
  age: 30,
};

function introduce(job, hobby) {
  console.log(
    `Hi, I'm ${this.fullName}, age ${this.age}. I work as ${job} and love ${hobby}`,
  );
}

// Using call - passes arguments individually
introduce.call(callExample, "Developer", "coding");
// "Hi, I'm John Doe, age 30. I work as Developer and love coding"

// APPLY METHOD
// ============
// Same as call, but arguments passed as array
introduce.apply(callExample, ["Designer", "painting"]);
// "Hi, I'm John Doe, age 30. I work as Designer and love painting"

// BIND METHOD
// ===========
// Returns new function with bound 'this' - doesn't call immediately
const boundIntroduce = introduce.bind(callExample);
boundIntroduce("Teacher", "reading");
// "Hi, I'm John Doe, age 30. I work as Teacher and love reading"

// Partial Application with bind
const boundWithJob = introduce.bind(callExample, "Engineer");
boundWithJob("swimming");
// "Hi, I'm John Doe, age 30. I work as Engineer and love swimming"

// Practical Examples
// ==================

// 1. Borrowing Methods
const person = {
  firstName: "Alice",
  lastName: "Smith",
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

const anotherPerson = {
  firstName: "Bob",
  lastName: "Johnson",
};

// Borrowing getFullName method
console.log("Borrowed method:", person.getFullName.call(anotherPerson)); // "Bob Johnson"

// 2. Finding Min/Max in Array
const numbers = [5, 6, 2, 3, 7];

// apply with Math.max (Math.max doesn't take arrays directly)
console.log("Max number:", Math.max.apply(null, numbers)); // 7
console.log("Min number:", Math.min.apply(null, numbers)); // 2

// Modern alternative with spread operator
console.log("Max with spread:", Math.max(...numbers)); // 7

// 3. Converting Array-like Objects to Arrays
function arrayLikeExample() {
  // arguments is array-like but not real array
  console.log("Arguments object:", arguments);

  // Convert to real array using call
  const realArray = Array.prototype.slice.call(arguments);
  console.log("Real array:", realArray);

  // Modern way with Array.from
  const modernArray = Array.from(arguments);
  console.log("Modern array:", modernArray);
}

arrayLikeExample(1, 2, 3, 4, 5);

// 4. Function Composition with bind
function multiply(a, b) {
  return a * b;
}

// Create specialized functions
const doubleBind = multiply.bind(null, 2);
const tripleBind = multiply.bind(null, 3);

console.log("Double 5:", doubleBind(5)); // 10
console.log("Triple 4:", tripleBind(4)); // 12

// 5. Event Handler with bind
class Button {
  constructor(element) {
    this.element = element;
    this.clickCount = 0;

    // Bind method to preserve 'this'
    this.handleClick = this.handleClick.bind(this);
    // element.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.clickCount++;
    console.log(`Button clicked ${this.clickCount} times`);
  }
}

// 6. Currying with bind
function curriedAdd(a, b, c) {
  return a + b + c;
}

const addFive = curriedAdd.bind(null, 5);
const addFiveAndThree = addFive.bind(null, 3);

console.log("Curried result:", addFiveAndThree(2)); // 10 (5 + 3 + 2)

// ═══════════════════════════════════════════════════════════════════════════
// 4. OBJECT ORIENTED PROGRAMMING (OOP) IN JAVASCRIPT
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. OBJECT ORIENTED PROGRAMMING (OOP) ===");

/*
JavaScript OOP Approaches:
1. Constructor Functions (ES5)
2. Prototype-based inheritance
3. ES6 Classes (syntactic sugar over prototypes)
4. Factory Functions
5. Object.create()

OOP Principles:
- Encapsulation: Bundling data and methods
- Inheritance: Creating new classes based on existing ones
- Polymorphism: Same interface, different implementations  
- Abstraction: Hiding implementation details
*/

// 1. CONSTRUCTOR FUNCTIONS (ES5 Way)
// ==================================
function Animal(name, species) {
  // Properties
  this.name = name;
  this.species = species;
  this.isAlive = true;

  // Method (avoid this - creates method for each instance)
  // this.speak = function() { return `${this.name} makes a sound`; };
}

// Add methods to prototype (shared across all instances)
Animal.prototype.speak = function () {
  return `${this.name} the ${this.species} makes a sound`;
};

Animal.prototype.eat = function (food) {
  return `${this.name} is eating ${food}`;
};

Animal.prototype.sleep = function () {
  return `${this.name} is sleeping`;
};

// Create instances
const lion = new Animal("Simba", "Lion");
const elephant = new Animal("Dumbo", "Elephant");

console.log(lion.speak()); // "Simba the Lion makes a sound"
console.log(elephant.eat("grass")); // "Dumbo is eating grass"

// 2. INHERITANCE WITH PROTOTYPES
// ===============================
function Dog(name, breed) {
  // Call parent constructor
  Animal.call(this, name, "Dog");
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override parent method
Dog.prototype.speak = function () {
  return `${this.name} the ${this.breed} barks: Woof! Woof!`;
};

// Add new method
Dog.prototype.wagTail = function () {
  return `${this.name} is wagging tail happily!`;
};

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.speak()); // "Buddy the Golden Retriever barks: Woof! Woof!"
console.log(myDog.eat("bone")); // "Buddy is eating bone" (inherited)
console.log(myDog.wagTail()); // "Buddy is wagging tail happily!"

// 3. ES6 CLASSES (Modern Way)
// ============================
class Vehicle {
  // Constructor
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
  }

  // Instance methods
  start() {
    this.isRunning = true;
    return `${this.make} ${this.model} is now running`;
  }

  stop() {
    this.isRunning = false;
    return `${this.make} ${this.model} has stopped`;
  }

  getInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }

  // Static method (called on class, not instance)
  static compareYears(vehicle1, vehicle2) {
    return vehicle1.year - vehicle2.year;
  }
}

// Inheritance with extends
class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year); // Call parent constructor
    this.doors = doors;
  }

  // Override parent method
  start() {
    const result = super.start(); // Call parent method
    return `${result}. All ${this.doors} doors are locked.`;
  }

  // New method
  honk() {
    return `${this.make} ${this.model} goes: BEEP BEEP!`;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model, year, engineType) {
    super(make, model, year);
    this.engineType = engineType;
  }

  start() {
    const result = super.start();
    return `${result}. ${this.engineType} engine roaring!`;
  }

  wheelie() {
    return `${this.make} ${this.model} is doing a wheelie!`;
  }
}

// Using classes
const myCar = new Car("Toyota", "Camry", 2023, 4);
const myBike = new Motorcycle("Harley", "Davidson", 2022, "V-Twin");

console.log(myCar.start()); // "Toyota Camry is now running. All 4 doors are locked."
console.log(myCar.honk()); // "Toyota Camry goes: BEEP BEEP!"
console.log(myBike.start()); // "Harley Davidson is now running. V-Twin engine roaring!"
console.log(myBike.wheelie()); // "Harley Davidson is doing a wheelie!"

// Static method usage
console.log("Year difference:", Vehicle.compareYears(myCar, myBike)); // 1

// 4. PRIVATE FIELDS AND METHODS (ES2022)
// =======================================
class BankAccount {
  // Private fields (start with #)
  #balance = 0;
  #accountNumber;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
    this.#accountNumber = this.#generateAccountNumber();
  }

  // Private method
  #generateAccountNumber() {
    return Math.floor(Math.random() * 1000000);
  }

  // Public methods
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return `Deposited $${amount}. New balance: $${this.#balance}`;
    }
    return "Deposit amount must be positive";
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return `Withdrew $${amount}. New balance: $${this.#balance}`;
    }
    return "Invalid withdrawal amount";
  }

  getBalance() {
    return this.#balance;
  }

  getAccountInfo() {
    return {
      owner: this.owner,
      accountNumber: this.#accountNumber,
      balance: this.#balance,
    };
  }
}

const account = new BankAccount("John Doe", 1000);
console.log(account.deposit(500)); // "Deposited $500. New balance: $1500"
console.log(account.withdraw(200)); // "Withdrew $200. New balance: $1300"
console.log(account.getBalance()); // 1300

// console.log(account.#balance); // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class

// 5. GETTERS AND SETTERS
// =======================
class Temperature {
  constructor(celsius = 0) {
    this._celsius = celsius;
  }

  // Getter
  get celsius() {
    return this._celsius;
  }

  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  get kelvin() {
    return this._celsius + 273.15;
  }

  // Setter
  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this._celsius = value;
  }

  set fahrenheit(value) {
    this.celsius = ((value - 32) * 5) / 9;
  }
}

const temp = new Temperature(25);
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);
// "25°C = 77°F = 298.15K"

temp.fahrenheit = 100;
console.log(`New celsius: ${temp.celsius}°C`); // "New celsius: 37.77777777777778°C"

// 6. MIXIN PATTERN
// ================
const Flyable = {
  fly() {
    return `${this.name} is flying!`;
  },
  land() {
    return `${this.name} has landed`;
  },
};

const Swimmable = {
  swim() {
    return `${this.name} is swimming!`;
  },
  dive() {
    return `${this.name} is diving deep!`;
  },
};

class Bird {
  constructor(name) {
    this.name = name;
  }
}

class Duck extends Bird {
  constructor(name) {
    super(name);
    // Add mixins
    Object.assign(this, Flyable, Swimmable);
  }

  quack() {
    return `${this.name} says: Quack!`;
  }
}

const duck = new Duck("Donald");
console.log(duck.quack()); // "Donald says: Quack!"
console.log(duck.fly()); // "Donald is flying!"
console.log(duck.swim()); // "Donald is swimming!"

// ═══════════════════════════════════════════════════════════════════════════
// 5. CALLBACKS, PROMISES & ASYNC/AWAIT
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. CALLBACKS, PROMISES & ASYNC/AWAIT ===");

/*
Asynchronous JavaScript Evolution:
1. Callbacks (oldest)
2. Promises (ES6)
3. Async/Await (ES2017)

Problem: JavaScript is single-threaded but needs to handle:
- Network requests
- File operations  
- Timers
- User interactions

Solution: Asynchronous programming with callbacks, promises, async/await
*/

// 1. CALLBACKS
// ============

/*
Callback: A function passed as argument to another function,
executed after (or during) the execution of that function.
*/

// Simple Callback Example
function greetUser(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function afterGreeting() {
  console.log("Nice to meet you!");
}

greetUser("Alice", afterGreeting);
// Output: "Hello, Alice!" then "Nice to meet you!"

// Async Callback with setTimeout
function delayedCallback(message, delay, callback) {
  console.log("Starting delay...");
  setTimeout(() => {
    console.log(message);
    callback();
  }, delay);
}

delayedCallback("This message is delayed!", 2000, () => {
  console.log("Callback executed after delay!");
});

// Real-world example: Array methods with callbacks
const numbersArray = [1, 2, 3, 4, 5];

// map with callback
const doubled = numbersArray.map((num) => num * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

// filter with callback
const evenNumbers = numbersArray.filter((num) => num % 2 === 0);
console.log("Even numbers:", evenNumbers); // [2, 4]

// reduce with callback
const sum = numbersArray.reduce((total, num) => total + num, 0);
console.log("Sum:", sum); // 15

// CALLBACK HELL Problem
function step1(callback) {
  setTimeout(() => {
    console.log("Step 1 complete");
    callback();
  }, 1000);
}

function step2(callback) {
  setTimeout(() => {
    console.log("Step 2 complete");
    callback();
  }, 1000);
}

function step3(callback) {
  setTimeout(() => {
    console.log("Step 3 complete");
    callback();
  }, 1000);
}

// This creates "callback hell" - hard to read and maintain
step1(() => {
  step2(() => {
    step3(() => {
      console.log("All steps complete!");
    });
  });
});

// 2. PROMISES
// ===========

/*
Promise: An object representing eventual completion or failure of an async operation.

States:
- Pending: Initial state
- Fulfilled (Resolved): Operation completed successfully
- Rejected: Operation failed

Advantages over callbacks:
- Avoid callback hell
- Better error handling
- Chainable with .then()
- Can be combined with Promise.all(), Promise.race()
*/

// Creating Promises
function createPromise(shouldResolve, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve("Promise resolved successfully!");
      } else {
        reject(new Error("Promise was rejected!"));
      }
    }, delay);
  });
}

// Using Promises with .then() and .catch()
createPromise(true)
  .then((result) => {
    console.log("Success:", result);
    return "Data processed";
  })
  .then((processedData) => {
    console.log("Processed:", processedData);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Promise chain completed");
  });

// Promise-based step functions (solving callback hell)
function promiseStep1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Promise Step 1 complete");
      resolve("Step 1 data");
    }, 1000);
  });
}

function promiseStep2(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Promise Step 2 complete with:", data);
      resolve("Step 2 data");
    }, 1000);
  });
}

function promiseStep3(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Promise Step 3 complete with:", data);
      resolve("Final result");
    }, 1000);
  });
}

// Clean Promise chain
promiseStep1()
  .then((result1) => promiseStep2(result1))
  .then((result2) => promiseStep3(result2))
  .then((finalResult) => {
    console.log("All promise steps complete:", finalResult);
  })
  .catch((error) => {
    console.error("Error in promise chain:", error);
  });

// Promise Utility Methods
const promise1 = createPromise(true, 2000);
const promise2 = createPromise(true, 1000);
const promise3 = createPromise(true, 3000);

// Promise.all() - waits for all promises to resolve
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.log("One or more promises rejected:", error);
  });

// Promise.race() - resolves with first completed promise
Promise.race([promise1, promise2, promise3]).then((result) => {
  console.log("First promise resolved:", result);
});

// Promise.allSettled() - waits for all promises regardless of outcome
Promise.allSettled([
  createPromise(true, 1000),
  createPromise(false, 2000),
  createPromise(true, 1500),
]).then((results) => {
  console.log("All promises settled:", results);
});

// 3. ASYNC/AWAIT
// ==============

/*
Async/Await: Syntactic sugar over Promises that makes async code look synchronous.

Benefits:
- Cleaner syntax
- Better error handling with try/catch
- Easier debugging
- No callback hell or promise chains
*/

// Basic async function
async function basicAsyncFunction() {
  console.log("Async function started");

  // await pauses execution until promise resolves
  const result = await createPromise(true, 2000);
  console.log("Async result:", result);

  return "Async function completed";
}

// Using async function
basicAsyncFunction().then((result) => {
  console.log("Final result:", result);
});

// Error handling with try/catch
async function asyncWithErrorHandling() {
  try {
    const result1 = await createPromise(true, 1000);
    console.log("Result 1:", result1);

    const result2 = await createPromise(false, 1000); // This will reject
    console.log("Result 2:", result2); // Won't execute
  } catch (error) {
    console.log("Caught error:", error.message);
  } finally {
    console.log("Async operation finished");
  }
}

asyncWithErrorHandling();

// Sequential vs Parallel execution
async function sequentialExecution() {
  console.log("Sequential execution started");
  const start = Date.now();

  // These run one after another
  const result1 = await createPromise(true, 1000);
  const result2 = await createPromise(true, 1000);
  const result3 = await createPromise(true, 1000);

  const duration = Date.now() - start;
  console.log(`Sequential completed in ${duration}ms`);
  return [result1, result2, result3];
}

async function parallelExecution() {
  console.log("Parallel execution started");
  const start = Date.now();

  // These run simultaneously
  const [result1, result2, result3] = await Promise.all([
    createPromise(true, 1000),
    createPromise(true, 1000),
    createPromise(true, 1000),
  ]);

  const duration = Date.now() - start;
  console.log(`Parallel completed in ${duration}ms`);
  return [result1, result2, result3];
}

// Real-world example: API simulation
async function fetchUserData(userId) {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
        });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, Math.random() * 2000);
  });
}

async function fetchUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: `Post 1 by User ${userId}`, content: "Content 1" },
        { id: 2, title: `Post 2 by User ${userId}`, content: "Content 2" },
      ]);
    }, Math.random() * 2000);
  });
}

// Using async/await for complex operations
async function getUserProfile(userId) {
  try {
    console.log(`Fetching profile for user ${userId}...`);

    // Fetch user data and posts in parallel
    const [userData, userPosts] = await Promise.all([
      fetchUserData(userId),
      fetchUserPosts(userId),
    ]);

    return {
      user: userData,
      posts: userPosts,
      totalPosts: userPosts.length,
    };
  } catch (error) {
    throw new Error(`Failed to get user profile: ${error.message}`);
  }
}

// Using the async function
getUserProfile(123)
  .then((profile) => {
    console.log("User profile:", profile);
  })
  .catch((error) => {
    console.error("Profile error:", error.message);
  });

// Async/await with loops
async function processMultipleUsers(userIds) {
  const results = [];

  // Process users sequentially
  for (const userId of userIds) {
    try {
      const profile = await getUserProfile(userId);
      results.push(profile);
      console.log(`Processed user ${userId}`);
    } catch (error) {
      console.error(`Failed to process user ${userId}:`, error.message);
    }
  }

  return results;
}

// Process users in parallel (better performance)
async function processMultipleUsersParallel(userIds) {
  const promises = userIds.map((userId) => getUserProfile(userId));

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("One or more users failed to process:", error.message);
    // Use Promise.allSettled for partial results
    const settled = await Promise.allSettled(promises);
    return settled
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. FETCH API & HTTP BASICS
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. FETCH API & HTTP BASICS ===");

/*
HTTP (HyperText Transfer Protocol):
- Protocol for communication between client and server
- Request-Response cycle
- Methods: GET, POST, PUT, DELETE, PATCH, etc.
- Status codes: 200 (OK), 404 (Not Found), 500 (Server Error), etc.
- Headers: Metadata about request/response

Fetch API:
- Modern way to make HTTP requests
- Promise-based
- More powerful and flexible than XMLHttpRequest
- Supported in all modern browsers
*/

// HTTP METHODS AND STATUS CODES
/*
Common HTTP Methods:
- GET: Retrieve data (should not modify server state)
- POST: Create new resource
- PUT: Update entire resource (replace)
- PATCH: Partial update of resource
- DELETE: Remove resource
- HEAD: Get headers only (no body)
- OPTIONS: Get allowed methods

Common Status Codes:
- 2xx Success: 200 OK, 201 Created, 204 No Content
- 3xx Redirection: 301 Moved Permanently, 304 Not Modified
- 4xx Client Error: 400 Bad Request, 401 Unauthorized, 404 Not Found
- 5xx Server Error: 500 Internal Server Error, 503 Service Unavailable
*/

// BASIC FETCH USAGE
// =================

// Simple GET request
async function basicFetch() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Basic fetch data:", data);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// GET request with error handling
async function fetchWithErrorHandling(url) {
  try {
    console.log(`Fetching from: ${url}`);
    const response = await fetch(url);

    // Response object properties
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("OK:", response.ok);
    console.log("Headers:", response.headers);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }

    // Different ways to parse response
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else if (contentType && contentType.includes("text/")) {
      return await response.text();
    } else {
      return await response.blob(); // For binary data
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Request error:", error.message);
    }
    throw error;
  }
}

// POST request with JSON data
async function createPost(postData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`POST failed: ${response.status}`);
    }

    const result = await response.json();
    console.log("Post created:", result);
    return result;
  } catch (error) {
    console.error("Create post error:", error.message);
    throw error;
  }
}

// PUT request (full update)
async function updatePost(id, postData) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      },
    );

    if (!response.ok) {
      throw new Error(`PUT failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Update post error:", error.message);
    throw error;
  }
}

// PATCH request (partial update)
async function patchPost(id, updates) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      },
    );

    if (!response.ok) {
      throw new Error(`PATCH failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Patch post error:", error.message);
    throw error;
  }
}

// DELETE request
async function deletePost(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`DELETE failed: ${response.status}`);
    }

    console.log(`Post ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Delete post error:", error.message);
    throw error;
  }
}

// ADVANCED FETCH FEATURES
// ========================

// Request with timeout
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
}

// Request with custom headers and authentication
async function authenticatedRequest(url, token) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "User-Agent": "MyApp/1.0",
        "X-Custom-Header": "CustomValue",
      },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized - Invalid token");
    }

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Authenticated request error:", error.message);
    throw error;
  }
}

// File upload with FormData
async function uploadFile(file, additionalData = {}) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Add additional fields
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData, // Don't set Content-Type header for FormData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("File upload error:", error.message);
    throw error;
  }
}

// Retry mechanism
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return await response.json();
      }

      // Don't retry for client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status}`);
      }

      // Retry for server errors (5xx)
      if (attempt === maxRetries) {
        throw new Error(
          `Server error after ${maxRetries} attempts: ${response.status}`,
        );
      }

      console.log(`Attempt ${attempt} failed, retrying...`);
      await delay(1000 * attempt); // Exponential backoff
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`Attempt ${attempt} failed: ${error.message}, retrying...`);
      await delay(1000 * attempt);
    }
  }
}

// Utility function for delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// COMPREHENSIVE API CLIENT CLASS
// ===============================
class APIClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      console.log(`${config.method || "GET"} ${url}`);
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

// Usage example
const apiClient = new APIClient("https://jsonplaceholder.typicode.com");

// PRACTICAL EXAMPLES
// ==================

// Example 1: Blog API operations
async function blogOperations() {
  try {
    // Get all posts
    console.log("Fetching all posts...");
    const posts = await apiClient.get("/posts");
    console.log(`Found ${posts.length} posts`);

    // Get specific post
    console.log("Fetching post 1...");
    const post = await apiClient.get("/posts/1");
    console.log("Post:", post.title);

    // Create new post
    console.log("Creating new post...");
    const newPost = await apiClient.post("/posts", {
      title: "My New Post",
      body: "This is the content of my new post",
      userId: 1,
    });
    console.log("New post created:", newPost);

    // Update post
    console.log("Updating post...");
    const updatedPost = await apiClient.put("/posts/1", {
      id: 1,
      title: "Updated Post Title",
      body: "Updated content",
      userId: 1,
    });
    console.log("Post updated:", updatedPost);

    // Delete post
    console.log("Deleting post...");
    await apiClient.delete("/posts/1");
    console.log("Post deleted");
  } catch (error) {
    console.error("Blog operations error:", error.message);
  }
}

// Example 2: Weather API (if you had an API key)
async function weatherExample(apiKey, city) {
  const weatherAPI = new APIClient("https://api.openweathermap.org/data/2.5");

  try {
    const weather = await weatherAPI.get(
      `/weather?q=${city}&appid=${apiKey}&units=metric`,
    );

    return {
      city: weather.name,
      country: weather.sys.country,
      temperature: weather.main.temp,
      description: weather.weather[0].description,
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
    };
  } catch (error) {
    console.error("Weather fetch error:", error.message);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CONCLUSION AND SUMMARY
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n=== 🎉 ADVANCED JAVASCRIPT MASTERY COMPLETE! ===");

/*
🎯 WHAT YOU'VE LEARNED:

1. SCOPE, EXECUTION CONTEXT & CLOSURES
   ✅ Global, Function, and Block Scope
   ✅ Execution Context creation and execution phases
   ✅ Closures for private variables and data persistence
   ✅ Practical closure patterns and use cases

2. THE 'this' KEYWORD - ALL SCENARIOS
   ✅ Arrow functions (lexical this)
   ✅ new binding with constructors
   ✅ Explicit binding with call/apply/bind
   ✅ Implicit binding with object methods
   ✅ Default binding rules

3. CALL, APPLY & BIND METHODS
   ✅ Method borrowing between objects
   ✅ Setting explicit 'this' context
   ✅ Function currying and partial application
   ✅ Event handler binding

4. OBJECT ORIENTED PROGRAMMING
   ✅ Constructor functions and prototypes
   ✅ ES6 Classes with inheritance
   ✅ Private fields and methods
   ✅ Getters and setters
   ✅ Mixins and composition

5. CALLBACKS, PROMISES & ASYNC/AWAIT
   ✅ Callback functions and callback hell
   ✅ Promises for better async handling
   ✅ Promise chaining and utility methods
   ✅ Async/await for clean async code
   ✅ Error handling with try/catch

6. FETCH API & HTTP BASICS
   ✅ HTTP methods (GET, POST, PUT, DELETE, PATCH)
   ✅ Status codes and error handling
   ✅ Request headers and authentication
   ✅ File uploads with FormData
   ✅ Advanced features (timeout, retry, abort)

🚀 NEXT STEPS:
- Practice building real projects using these concepts
- Learn about Web APIs (DOM, Storage, Geolocation)
- Explore modern frameworks (React, Vue, Angular)
- Study Node.js for server-side JavaScript
- Learn about testing (Jest, Cypress)
- Explore TypeScript for type safety

💡 REMEMBER:
- JavaScript is constantly evolving - keep learning!
- Practice is key to mastering these concepts
- Build projects to reinforce your understanding
- Read other people's code to learn best practices

Happy Coding! 🎉
*/

// Test some concepts (uncomment to run)
// demonstrateScope();
// executionContextDemo();
// arrowThis.regularMethod();
// thisProblems.showMethods();
// arrayLikeExample(1, 2, 3, 4, 5);
// basicAsyncFunction();
// asyncWithErrorHandling();
// sequentialExecution();
// parallelExecution();
// basicFetch();
// blogOperations();
