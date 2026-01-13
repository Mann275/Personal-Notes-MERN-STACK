# JavaScript Interview Guide

## 1. var vs let vs const

**Theory:**
- `var`: Function-scoped, can be re-declared and updated, gets hoisted
- `let`: Block-scoped, cannot be re-declared but can be updated, hoisted but in TDZ
- `const`: Block-scoped, cannot be re-declared or updated, hoisted but in TDZ

```javascript
// var - function scoped
function varExample() {
  var x = 1;
  if (true) {
    var x = 2; // same variable
    console.log(x); // 2
  }
  console.log(x); // 2
}

// let - block scoped
function letExample() {
  let x = 1;
  if (true) {
    let x = 2; // different variable
    console.log(x); // 2
  }
  console.log(x); // 1
}

// const - cannot be reassigned
const PI = 3.14;
// PI = 3.15; // Error!

// But objects can be modified
const obj = { name: "John" };
obj.name = "Jane"; // This works
```

---

## 2. Data Types

**Theory:**
JavaScript has 7 primitive types and 1 reference type:

**Primitives:**
1. String
2. Number
3. Boolean
4. Undefined
5. Null
6. Symbol
7. BigInt

**Reference:** Object (includes Array, Function, Date, etc.)

```javascript
// Primitives
let str = "Hello";
let num = 42;
let bool = true;
let undef = undefined;
let n = null;
let sym = Symbol("id");
let bigInt = 9007199254740991n;

// Reference types
let obj = { name: "John" };
let arr = [1, 2, 3];
let func = function() {};

// Check types
console.log(typeof str);    // "string"
console.log(typeof num);    // "number"
console.log(typeof bool);   // "boolean"
console.log(typeof undef);  // "undefined"
console.log(typeof n);      // "object" (bug in JS)
console.log(typeof sym);    // "symbol"
console.log(typeof obj);    // "object"
console.log(typeof arr);    // "object"
console.log(typeof func);   // "function"
```

---

## 3. Type Coercion

**Theory:**
Type coercion is automatic conversion of values from one type to another.

```javascript
// Implicit coercion
console.log("5" + 3);      // "53" (number to string)
console.log("5" - 3);      // 2 (string to number)
console.log("5" * "2");    // 10 (both to numbers)
console.log(true + 1);     // 2 (true becomes 1)
console.log(false + 1);    // 1 (false becomes 0)

// Explicit coercion
let num = Number("123");   // 123
let str = String(123);     // "123"
let bool = Boolean(1);     // true

// Falsy values (coerce to false)
console.log(Boolean(0));           // false
console.log(Boolean(""));          // false
console.log(Boolean(null));        // false
console.log(Boolean(undefined));   // false
console.log(Boolean(NaN));         // false
console.log(Boolean(false));       // false
```

---

## 4. == vs ===

**Theory:**
- `==` (loose equality): Compares values after type coercion
- `===` (strict equality): Compares values AND types without coercion

```javascript
// == (loose equality)
console.log(5 == "5");      // true (coerces string to number)
console.log(null == undefined); // true
console.log(0 == false);    // true
console.log("" == false);   // true

// === (strict equality)
console.log(5 === "5");     // false (different types)
console.log(null === undefined); // false
console.log(0 === false);   // false
console.log("" === false);  // false

// Always prefer === in interviews and production
```

---

## 5. Scope (global, function, block)

**Theory:**
Scope determines the accessibility of variables.

```javascript
// Global scope
var globalVar = "I'm global";
let globalLet = "Also global";

function testScope() {
  // Function scope
  var functionVar = "Function scoped";
  
  if (true) {
    // Block scope
    let blockLet = "Block scoped";
    const blockConst = "Also block scoped";
    var functionVar2 = "Function scoped (var)";
    
    console.log(blockLet); // Works
  }
  
  // console.log(blockLet); // Error! blockLet is not defined
  console.log(functionVar2); // Works (var is function-scoped)
}

console.log(globalVar); // Works
// console.log(functionVar); // Error! Not accessible
```

---

## 6. Hoisting

**Theory:**
Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution.

```javascript
// var hoisting
console.log(x); // undefined (not an error)
var x = 5;
console.log(x); // 5

// Above code is interpreted as:
// var x;
// console.log(x);
// x = 5;

// let/const hoisting (but in TDZ)
// console.log(y); // ReferenceError
let y = 10;

// Function hoisting
sayHello(); // Works! "Hello"
function sayHello() {
  console.log("Hello");
}

// Function expression not hoisted
// greet(); // TypeError: greet is not a function
var greet = function() {
  console.log("Hi");
};
```

---

## 7. Temporal Dead Zone (TDZ)

**Theory:**
TDZ is the time between entering scope and variable declaration where you cannot access the variable.

```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;

// TDZ example
function example() {
  // TDZ starts here for 'temp'
  
  console.log(temp); // ReferenceError
  
  let temp = 5; // TDZ ends here
  console.log(temp); // 5
}

// var has no TDZ
console.log(b); // undefined (not error)
var b = 20;
```

---

## 8. Execution Context

**Theory:**
Execution context is the environment where JavaScript code is executed. It contains:
- Variable Environment
- Lexical Environment
- This binding

**Types:**
1. Global Execution Context
2. Function Execution Context
3. Eval Execution Context

```javascript
// Global Execution Context created first
var globalVar = "Global";

function outer() {
  // Function Execution Context created when function is called
  var outerVar = "Outer";
  
  function inner() {
    // New Function Execution Context
    var innerVar = "Inner";
    console.log(globalVar); // Access from global
    console.log(outerVar);  // Access from parent
    console.log(innerVar);  // Access from own context
  }
  
  inner();
}

outer();
```

---

## 9. Call Stack

**Theory:**
Call stack is a mechanism to keep track of function calls. It follows LIFO (Last In First Out).

```javascript
function first() {
  console.log("First function");
  second();
  console.log("First function end");
}

function second() {
  console.log("Second function");
  third();
  console.log("Second function end");
}

function third() {
  console.log("Third function");
}

first();

// Call Stack visualization:
// 1. first() is pushed
// 2. second() is pushed
// 3. third() is pushed
// 4. third() is popped (finishes)
// 5. second() is popped
// 6. first() is popped

// Output:
// First function
// Second function
// Third function
// Second function end
// First function end
```

---

## 10. Closures

**Theory:**
A closure is a function that has access to variables in its outer (parent) function scope, even after the parent function has returned.

```javascript
// Basic closure
function outer() {
  let counter = 0;
  
  function inner() {
    counter++;
    console.log(counter);
  }
  
  return inner;
}

const increment = outer();
increment(); // 1
increment(); // 2
increment(); // 3

// Practical example: Private variables
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
// console.log(counter.count); // undefined (private)
```

---

## 11. this Keyword

**Theory:**
`this` refers to the object that is executing the current function.

```javascript
// Global context
console.log(this); // Window object (in browser)

// Object method
const person = {
  name: "John",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
person.greet(); // "Hello, John"

// Function context
function showThis() {
  console.log(this);
}
showThis(); // Window (in non-strict mode), undefined (in strict mode)

// Constructor function
function Person(name) {
  this.name = name;
}
const john = new Person("John");
console.log(john.name); // "John"

// Event handler
// <button onclick="console.log(this)">Click</button>
// this = button element

// Explicit binding
function greet() {
  console.log("Hello, " + this.name);
}
const user = { name: "Alice" };
greet.call(user);  // "Hello, Alice"
greet.apply(user); // "Hello, Alice"
const boundGreet = greet.bind(user);
boundGreet(); // "Hello, Alice"
```

---

## 12. Arrow Functions vs Normal Functions

**Theory:**
Key differences:
1. `this` binding
2. `arguments` object
3. Cannot be used as constructors
4. No `prototype` property

```javascript
// Normal function
function normalFunc() {
  console.log(this);
  console.log(arguments);
}

// Arrow function
const arrowFunc = () => {
  console.log(this); // Lexical this (from parent scope)
  // console.log(arguments); // Error: arguments is not defined
};

// this binding difference
const obj = {
  name: "Test",
  normalMethod: function() {
    console.log(this.name); // "Test"
  },
  arrowMethod: () => {
    console.log(this.name); // undefined (this is from global)
  }
};

obj.normalMethod(); // "Test"
obj.arrowMethod();  // undefined

// Constructor
function Person(name) {
  this.name = name;
}
const person1 = new Person("John"); // Works

const PersonArrow = (name) => {
  this.name = name;
};
// const person2 = new PersonArrow("Jane"); // Error!

// Arrow functions in callbacks
const numbers = [1, 2, 3];
// Arrow function - this from parent
numbers.forEach(() => {
  console.log(this); // Parent context
});
```

---

## 13. IIFE (Immediately Invoked Function Expression)

**Theory:**
IIFE is a function that runs as soon as it is defined. Used to create private scope.

```javascript
// Basic IIFE
(function() {
  console.log("IIFE executed!");
})();

// IIFE with parameters
(function(name) {
  console.log("Hello, " + name);
})("John");

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();

// Practical use: Private variables
const counter = (function() {
  let count = 0;
  
  return {
    increment: function() {
      return ++count;
    },
    decrement: function() {
      return --count;
    }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
// count is private and cannot be accessed directly

// Module pattern
const myModule = (function() {
  const privateVar = "I'm private";
  
  function privateMethod() {
    console.log(privateVar);
  }
  
  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();

myModule.publicMethod(); // "I'm private"
// myModule.privateMethod(); // Error
```

---

## 14. Arrays

**Theory:**
Arrays are ordered collections of values.

```javascript
// Creating arrays
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(1, 2, 3);
const arr3 = Array.of(1, 2, 3);

// Common methods
const fruits = ["apple", "banana", "orange"];

// Add/Remove
fruits.push("grape");        // Add to end
fruits.pop();                // Remove from end
fruits.unshift("mango");     // Add to start
fruits.shift();              // Remove from start

// Slice & Splice
const sliced = fruits.slice(1, 3);  // Returns ["banana", "orange"]
fruits.splice(1, 1, "kiwi");        // Remove 1 at index 1, add "kiwi"

// Find
const index = fruits.indexOf("banana");
const found = fruits.find(f => f === "apple");
const foundIndex = fruits.findIndex(f => f === "apple");

// Iteration
fruits.forEach(fruit => console.log(fruit));

// Check
console.log(fruits.includes("apple"));  // true
console.log(Array.isArray(fruits));     // true

// Join & Split
const str = fruits.join(", ");  // "apple, banana, orange"
const arr = "a-b-c".split("-"); // ["a", "b", "c"]

// Spread operator
const arr4 = [1, 2, 3];
const arr5 = [...arr4, 4, 5]; // [1, 2, 3, 4, 5]
```

---

## 15. map, filter, reduce

**Theory:**
Higher-order array methods for transforming and processing data.

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - Transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 }
];
const names = users.map(user => user.name);
console.log(names); // ["John", "Jane"]

// filter - Select elements that meet condition
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

const adults = users.filter(user => user.age >= 18);
console.log(adults); // Both users

// reduce - Reduce array to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const max = numbers.reduce((acc, num) => Math.max(acc, num));
console.log(max); // 5

// Chaining
const result = numbers
  .filter(num => num % 2 === 0)  // [2, 4]
  .map(num => num * 2)           // [4, 8]
  .reduce((acc, num) => acc + num, 0); // 12
console.log(result); // 12

// More reduce examples
const fruits = ["apple", "banana", "apple", "orange", "banana"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 2, banana: 2, orange: 1 }
```

---

## 16. Objects

**Theory:**
Objects are collections of key-value pairs.

```javascript
// Creating objects
const obj1 = { name: "John", age: 25 };
const obj2 = new Object();
const obj3 = Object.create(null);

// Accessing properties
console.log(obj1.name);      // Dot notation
console.log(obj1["name"]);   // Bracket notation

// Adding/Modifying
obj1.city = "New York";
obj1["country"] = "USA";

// Deleting
delete obj1.age;

// Methods
const person = {
  name: "John",
  greet: function() {
    console.log("Hello, " + this.name);
  },
  // ES6 shorthand
  sayHi() {
    console.log("Hi!");
  }
};

// Object methods
const keys = Object.keys(obj1);        // Array of keys
const values = Object.values(obj1);    // Array of values
const entries = Object.entries(obj1);  // Array of [key, value] pairs

// Check property
console.log("name" in obj1);           // true
console.log(obj1.hasOwnProperty("name")); // true

// Merge objects
const obj4 = { a: 1, b: 2 };
const obj5 = { b: 3, c: 4 };
const merged = Object.assign({}, obj4, obj5); // { a: 1, b: 3, c: 4 }
const merged2 = { ...obj4, ...obj5 };         // Same result

// Freeze & Seal
const frozen = Object.freeze({ x: 1 });
// frozen.x = 2; // Error in strict mode
const sealed = Object.seal({ y: 1 });
sealed.y = 2; // Works
// sealed.z = 3; // Error in strict mode

// Destructuring
const { name, age = 30 } = person;
console.log(name, age);
```

---

## 17. Shallow vs Deep Copy

**Theory:**
- Shallow copy: Copies only the first level, nested objects are still referenced
- Deep copy: Copies all levels, creating completely independent objects

```javascript
// Shallow copy examples
const original = {
  name: "John",
  address: {
    city: "New York"
  }
};

// Method 1: Spread operator (shallow)
const copy1 = { ...original };
copy1.name = "Jane";
copy1.address.city = "LA";
console.log(original.name);           // "John" (not affected)
console.log(original.address.city);   // "LA" (affected!)

// Method 2: Object.assign (shallow)
const copy2 = Object.assign({}, original);

// Array shallow copy
const arr = [1, 2, [3, 4]];
const arrCopy1 = [...arr];
const arrCopy2 = arr.slice();
arrCopy1[2][0] = 99;
console.log(arr[2][0]); // 99 (affected!)

// Deep copy examples

// Method 1: JSON (limitations: no functions, undefined, Date, etc.)
const original2 = {
  name: "John",
  address: {
    city: "New York"
  }
};
const deepCopy1 = JSON.parse(JSON.stringify(original2));
deepCopy1.address.city = "LA";
console.log(original2.address.city); // "New York" (not affected)

// Method 2: Recursive function
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const original3 = {
  name: "John",
  hobbies: ["reading", "coding"],
  address: {
    city: "New York"
  }
};
const deepCopy2 = deepClone(original3);
deepCopy2.address.city = "LA";
console.log(original3.address.city); // "New York" (not affected)

// Method 3: structuredClone (modern browsers)
const deepCopy3 = structuredClone(original3);
```

---

## 18. DOM (Document Object Model)

**Theory:**
DOM is a programming interface for HTML documents. It represents the page as a tree structure.

```javascript
// Selecting elements
const el1 = document.getElementById("myId");
const el2 = document.getElementsByClassName("myClass");
const el3 = document.getElementsByTagName("div");
const el4 = document.querySelector(".myClass");
const el5 = document.querySelectorAll("div.myClass");

// Creating elements
const newDiv = document.createElement("div");
newDiv.textContent = "Hello";
newDiv.innerHTML = "<span>Hello</span>";

// Modifying elements
el1.textContent = "New text";
el1.innerHTML = "<strong>Bold text</strong>";
el1.style.color = "red";
el1.style.backgroundColor = "yellow";

// Classes
el1.classList.add("active");
el1.classList.remove("inactive");
el1.classList.toggle("visible");
el1.classList.contains("active"); // true/false

// Attributes
el1.setAttribute("data-id", "123");
el1.getAttribute("data-id");
el1.removeAttribute("data-id");

// Adding to DOM
document.body.appendChild(newDiv);
el1.appendChild(newDiv);
el1.insertBefore(newDiv, el1.firstChild);

// Removing from DOM
el1.removeChild(newDiv);
newDiv.remove();

// Traversing DOM
const parent = el1.parentElement;
const children = el1.children;
const firstChild = el1.firstElementChild;
const lastChild = el1.lastElementChild;
const nextSibling = el1.nextElementSibling;
const prevSibling = el1.previousElementSibling;
```

---

## 19. Event Handling

**Theory:**
Events are actions that happen in the browser (clicks, key presses, etc.).

```javascript
// Method 1: HTML attribute (not recommended)
// <button onclick="handleClick()">Click</button>

// Method 2: DOM property
const btn = document.getElementById("myBtn");
btn.onclick = function() {
  console.log("Clicked!");
};

// Method 3: addEventListener (best practice)
btn.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event.target); // The element that was clicked
});

// With arrow function
btn.addEventListener("click", (e) => {
  console.log("Clicked!", e);
});

// Multiple listeners
btn.addEventListener("click", handler1);
btn.addEventListener("click", handler2);

// Remove listener
function handler1() {
  console.log("Handler 1");
}
btn.removeEventListener("click", handler1);

// Common events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);
element.addEventListener("keydown", handler);
element.addEventListener("keyup", handler);
element.addEventListener("submit", handler);
element.addEventListener("input", handler);
element.addEventListener("change", handler);
element.addEventListener("focus", handler);
element.addEventListener("blur", handler);

// Event object
btn.addEventListener("click", (e) => {
  console.log(e.type);        // "click"
  console.log(e.target);      // Element clicked
  console.log(e.currentTarget); // Element with listener
  console.log(e.clientX);     // Mouse X position
  console.log(e.clientY);     // Mouse Y position
  
  e.preventDefault();         // Prevent default action
  e.stopPropagation();        // Stop bubbling
});

// Form example
const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const formData = new FormData(form);
  console.log(formData.get("username"));
});
```

---

## 20. Event Bubbling

**Theory:**
Event bubbling is when an event starts from the target element and bubbles up to the root.

```javascript
// HTML structure:
// <div id="parent">
//   <div id="child">
//     <button id="btn">Click me</button>
//   </div>
// </div>

const parent = document.getElementById("parent");
const child = document.getElementById("child");
const btn = document.getElementById("btn");

// All three will fire when button is clicked (bubbling up)
btn.addEventListener("click", () => {
  console.log("Button clicked");
});

child.addEventListener("click", () => {
  console.log("Child div clicked");
});

parent.addEventListener("click", () => {
  console.log("Parent div clicked");
});

// Output when button clicked:
// "Button clicked"
// "Child div clicked"
// "Parent div clicked"

// Stop bubbling
btn.addEventListener("click", (e) => {
  console.log("Button clicked");
  e.stopPropagation(); // Stops event from bubbling up
});

// Now only "Button clicked" will be logged
```

---

## 21. Event Capturing

**Theory:**
Event capturing is the opposite of bubbling - event goes from root to target element.

```javascript
// Same HTML as above

// Use third parameter 'true' for capturing phase
parent.addEventListener("click", () => {
  console.log("Parent div clicked (capturing)");
}, true);

child.addEventListener("click", () => {
  console.log("Child div clicked (capturing)");
}, true);

btn.addEventListener("click", () => {
  console.log("Button clicked");
}, true);

// Output when button clicked (capturing phase):
// "Parent div clicked (capturing)"
// "Child div clicked (capturing)"
// "Button clicked"

// Event flow: Capturing -> Target -> Bubbling
parent.addEventListener("click", () => {
  console.log("Parent - capturing");
}, true);

parent.addEventListener("click", () => {
  console.log("Parent - bubbling");
}, false);

btn.addEventListener("click", () => {
  console.log("Button clicked");
});

// Output:
// "Parent - capturing"
// "Button clicked"
// "Parent - bubbling"
```

---

## 22. Event Delegation

**Theory:**
Event delegation uses bubbling to handle events at a higher level instead of adding listeners to each child element.

```javascript
// Without delegation (inefficient for many items)
const buttons = document.querySelectorAll(".item");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Button clicked");
  });
});

// With delegation (efficient)
const list = document.getElementById("list");
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    console.log("Item clicked:", e.target.textContent);
  }
});

// Dynamic elements example
const container = document.getElementById("container");

// Add listener to container (parent)
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});

// Add new items dynamically
function addItem(text) {
  const div = document.createElement("div");
  div.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">Delete</button>
  `;
  container.appendChild(div);
}

// Even dynamically added buttons will work!
addItem("New item 1");
addItem("New item 2");

// Practical example: Todo list
const todoList = document.getElementById("todoList");

todoList.addEventListener("click", (e) => {
  // Handle complete
  if (e.target.classList.contains("complete-btn")) {
    e.target.parentElement.classList.toggle("completed");
  }
  
  // Handle delete
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});
```

---

## 23. Callbacks

**Theory:**
A callback is a function passed as an argument to another function, to be executed later.

```javascript
// Simple callback
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

greet("John", function() {
  console.log("Callback executed");
});

// Asynchronous callback
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "John" };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log("Data received:", data);
});

// Callback hell (pyramid of doom)
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// Error-first callbacks (Node.js style)
function readFile(filename, callback) {
  // Simulating file read
  const error = null;
  const data = "File content";
  
  if (error) {
    callback(error, null);
  } else {
    callback(null, data);
  }
}

readFile("file.txt", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Data:", data);
  }
});

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
  console.log(num);
});

const doubled = numbers.map((num) => num * 2);
```

---

## 24. Promises

**Theory:**
Promises represent eventual completion (or failure) of an asynchronous operation.

**States:** Pending → Fulfilled or Rejected

```javascript
// Creating a promise
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});

// Consuming a promise
promise
  .then((result) => {
    console.log(result); // "Operation successful!"
    return "Next value";
  })
  .then((value) => {
    console.log(value); // "Next value"
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Promise completed");
  });

// Practical example: Fetch data
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John" });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

fetchUser(1)
  .then((user) => {
    console.log("User:", user);
    return fetchUser(2);
  })
  .then((user2) => {
    console.log("User 2:", user2);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Promise methods
const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve) => {
  setTimeout(resolve, 100, "foo");
});

// Promise.all - waits for all
Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 42, "foo"]
});

// Promise.race - first to complete
Promise.race([p1, p2, p3]).then((value) => {
  console.log(value); // 3 or 42 (whichever completes first)
});

// Promise.allSettled - waits for all (even if rejected)
Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results);
  // [
  //   { status: "fulfilled", value: 3 },
  //   { status: "fulfilled", value: 42 },
  //   { status: "fulfilled", value: "foo" }
  // ]
});

// Promise.any - first fulfilled promise
Promise.any([p1, p2, p3]).then((value) => {
  console.log(value);
});
```

---

## 25. async / await

**Theory:**
async/await is syntactic sugar over Promises, making asynchronous code look synchronous.

```javascript
// async function always returns a Promise
async function myFunction() {
  return "Hello";
}
myFunction().then((msg) => console.log(msg)); // "Hello"

// await pauses execution until Promise resolves
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}

// Error handling with try-catch
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Multiple awaits
async function getMultipleData() {
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  return { user, posts, comments };
}

// Parallel execution with Promise.all
async function getDataInParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  return { user, posts, comments };
}

// Practical example
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processData() {
  console.log("Starting...");
  
  await delay(1000);
  console.log("After 1 second");
  
  await delay(1000);
  console.log("After 2 seconds");
  
  return "Done!";
}

processData().then(result => console.log(result));

// Converting Promise chain to async/await
// Before (Promises)
function getUserPosts() {
  return fetchUser(1)
    .then((user) => fetchPosts(user.id))
    .then((posts) => posts)
    .catch((error) => console.error(error));
}

// After (async/await)
async function getUserPosts() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    return posts;
  } catch (error) {
    console.error(error);
  }
}
```

---

## 26. Event Loop

**Theory:**
The event loop is how JavaScript handles asynchronous operations in a single-threaded environment.

**Components:**
- Call Stack
- Web APIs
- Callback Queue (Task Queue)
- Microtask Queue
- Event Loop

```javascript
// Execution order example
console.log("1. Start");

setTimeout(() => {
  console.log("4. Timeout");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3. Promise");
  });

console.log("2. End");

// Output:
// 1. Start
// 2. End
// 3. Promise (microtask queue - higher priority)
// 4. Timeout (callback queue)

// More complex example
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve()
  .then(() => console.log("3"))
  .then(() => console.log("4"));

setTimeout(() => console.log("5"), 0);

console.log("6");

// Output: 1, 6, 3, 4, 2, 5

// How it works:
// 1. Synchronous code runs first (Call Stack)
// 2. Microtasks (Promises) run next
// 3. Macrotasks (setTimeout, setInterval) run last

// Priority order:
// Call Stack > Microtask Queue > Callback Queue

// Practical example
async function asyncFunction() {
  console.log("1");
  
  await Promise.resolve();
  console.log("2");
  
  setTimeout(() => console.log("3"), 0);
  
  console.log("4");
}

asyncFunction();
console.log("5");

// Output: 1, 5, 2, 4, 3
```

---

## 27. setTimeout / setInterval

**Theory:**
- `setTimeout`: Executes code once after a delay
- `setInterval`: Executes code repeatedly at intervals

```javascript
// setTimeout
console.log("Start");

setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);

console.log("End");

// setTimeout with parameters
function greet(name, message) {
  console.log(`${message}, ${name}!`);
}

setTimeout(greet, 1000, "John", "Hello");

// Clearing timeout
const timeoutId = setTimeout(() => {
  console.log("This won't execute");
}, 1000);

clearTimeout(timeoutId);

// setInterval
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log("Count:", count);
  
  if (count === 5) {
    clearInterval(intervalId);
  }
}, 1000);

// Practical: Countdown timer
function countdown(seconds) {
  let remaining = seconds;
  
  console.log(remaining);
  
  const intervalId = setInterval(() => {
    remaining--;
    console.log(remaining);
    
    if (remaining === 0) {
      clearInterval(intervalId);
      console.log("Done!");
    }
  }, 1000);
}

countdown(5);

// setInterval vs recursive setTimeout
// setInterval - fixed interval (may queue up if callback is slow)
setInterval(() => {
  console.log("Every 1 second");
}, 1000);

// Recursive setTimeout - waits for callback to complete
function recursiveTimeout() {
  console.log("Every 1 second");
  setTimeout(recursiveTimeout, 1000);
}
recursiveTimeout();

// Debounce example
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 500);

// Throttle example
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scroll event");
}, 1000);
```

---

## 28. localStorage / sessionStorage

**Theory:**
Web Storage API for storing data in the browser.
- `localStorage`: Persists even after browser closes
- `sessionStorage`: Cleared when tab/browser closes

```javascript
// localStorage

// Store data
localStorage.setItem("username", "John");
localStorage.setItem("age", "25");

// Get data
const username = localStorage.getItem("username");
console.log(username); // "John"

// Remove data
localStorage.removeItem("age");

// Clear all data
localStorage.clear();

// Store objects (must stringify)
const user = { name: "John", age: 25 };
localStorage.setItem("user", JSON.stringify(user));

// Get object (must parse)
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // "John"

// Check if key exists
if (localStorage.getItem("username")) {
  console.log("Username exists");
}

// Get number of items
console.log(localStorage.length);

// Get key by index
const key = localStorage.key(0);
console.log(key);

// Iterate over all items
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(key, value);
}

// sessionStorage (same API as localStorage)
sessionStorage.setItem("temp", "data");
sessionStorage.getItem("temp");
sessionStorage.removeItem("temp");
sessionStorage.clear();

// Practical example: Shopping cart
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  addItem(item) {
    this.items.push(item);
    this.save();
  }
  
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.save();
  }
  
  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  
  clear() {
    this.items = [];
    localStorage.removeItem("cart");
  }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: "Product 1", price: 10 });

// Practical: Remember user preference
const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

// Limitations
// - Only stores strings
// - Limited to ~5-10MB per origin
// - Synchronous (can block main thread)
// - Not secure (don't store sensitive data)
```

---

## 29. ES6 Features

**Theory:**
ES6 (ES2015) introduced many new features to JavaScript.

```javascript
// 1. let and const
let x = 10;
const PI = 3.14;

// 2. Arrow functions
const add = (a, b) => a + b;
const square = x => x * x;

// 3. Template literals
const name = "John";
const age = 25;
console.log(`My name is ${name} and I'm ${age} years old`);

// 4. Destructuring
const person = { name: "John", age: 25, city: "NY" };
const { name, age } = person;

const arr = [1, 2, 3, 4];
const [first, second, ...rest] = arr;

// 5. Default parameters
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

// 6. Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 7. Rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 8. Enhanced object literals
const name = "John";
const age = 25;
const user = {
  name,  // shorthand for name: name
  age,
  greet() {  // shorthand for greet: function()
    console.log("Hello");
  }
};

// 9. Classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  static species() {
    return "Homo sapiens";
  }
}

const john = new Person("John", 25);

// 10. Inheritance
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    console.log(`${this.name} is studying`);
  }
}

// 11. Promises
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000);
});

// 12. Modules (import/export)
// export const PI = 3.14;
// export function add(a, b) { return a + b; }
// export default class Calculator {}

// import { PI, add } from './math.js';
// import Calculator from './Calculator.js';

// 13. for...of loop
const numbers = [1, 2, 3, 4, 5];
for (const num of numbers) {
  console.log(num);
}

// 14. Map and Set
const map = new Map();
map.set("key", "value");
console.log(map.get("key"));

const set = new Set([1, 2, 3, 3, 4]);
console.log(set); // Set { 1, 2, 3, 4 }

// 15. Symbol
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false

// 16. String methods
"hello".startsWith("he");  // true
"hello".endsWith("lo");    // true
"hello".includes("ll");    // true
"hello".repeat(3);         // "hellohellohello"

// 17. Array methods
Array.from("hello");       // ["h", "e", "l", "l", "o"]
Array.of(1, 2, 3);         // [1, 2, 3]
[1, 2, 3].find(x => x > 1);     // 2
[1, 2, 3].findIndex(x => x > 1); // 1

// 18. Object methods
Object.assign({}, obj1, obj2);
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
```

---

## 30. Error Handling

**Theory:**
Error handling allows you to catch and handle errors gracefully.

```javascript
// try...catch
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error.message);
} finally {
  console.log("This always runs");
}

// Throwing errors
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // "Cannot divide by zero"
}

// Custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  if (user.age < 0) {
    throw new ValidationError("Age must be positive");
  }
  return true;
}

try {
  validateUser({ age: -5 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation failed:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}

// Error types
// 1. SyntaxError
// eval("{ invalid json }"); // SyntaxError

// 2. ReferenceError
// console.log(undefinedVariable); // ReferenceError

// 3. TypeError
// null.toString(); // TypeError

// 4. RangeError
// new Array(-1); // RangeError

// Async error handling
// With Promises
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Fetch error:", error));

// With async/await
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw if needed
  }
}

// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

// Unhandled promise rejection
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

// Practical example: Form validation
function validateForm(formData) {
  const errors = [];
  
  if (!formData.email) {
    errors.push("Email is required");
  } else if (!formData.email.includes("@")) {
    errors.push("Invalid email format");
  }
  
  if (!formData.password) {
    errors.push("Password is required");
  } else if (formData.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  
  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }
  
  return true;
}

try {
  validateForm({ email: "", password: "123" });
} catch (error) {
  console.error(error.message);
  // Display errors to user
}
```

---

## 31. JavaScript Quirks

**Theory:**
JavaScript has some unusual behaviors that can be surprising.

```javascript
// 1. typeof null
console.log(typeof null);  // "object" (historical bug)

// 2. NaN is not equal to itself
console.log(NaN === NaN);  // false
console.log(Number.isNaN(NaN));  // true (correct way)

// 3. Array comparison
console.log([] == []);   // false (different references)
console.log([] === []);  // false

// 4. Type coercion weirdness
console.log([] + []);    // "" (empty string)
console.log([] + {});    // "[object Object]"
console.log({} + []);    // "[object Object]"
console.log(true + true);  // 2
console.log(true + false); // 1

// 5. Automatic semicolon insertion
function test() {
  return
  {
    value: 42
  }
}
console.log(test());  // undefined (not { value: 42 })

// 6. parseInt quirks
console.log(parseInt("08"));     // 8
console.log(parseInt("10", 2));  // 2 (binary)
console.log(["1", "2", "3"].map(parseInt));  // [1, NaN, NaN]
// Fix: ["1", "2", "3"].map(Number)

// 7. Floating point precision
console.log(0.1 + 0.2);  // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false
// Fix: Use toFixed() or libraries for precise math

// 8. Comparisons with null and undefined
console.log(null == undefined);   // true
console.log(null === undefined);  // false
console.log(null > 0);   // false
console.log(null == 0);  // false
console.log(null >= 0);  // true (weird!)

// 9. Math.max() and Math.min()
console.log(Math.max());  // -Infinity
console.log(Math.min());  // Infinity

// 10. Array holes
const arr = [1, 2, , 4];  // sparse array
console.log(arr.length);  // 4
console.log(arr[2]);      // undefined
console.log(2 in arr);    // false (hole exists)

// 11. void operator
console.log(void 0);  // undefined
console.log(void "hello");  // undefined

// 12. Comma operator
let x = (1, 2, 3);
console.log(x);  // 3 (returns last value)

// 13. with statement (deprecated, don't use)
// Creates ambiguous scope

// 14. Function declarations in blocks
if (true) {
  function foo() { return 1; }
}
// Behavior varies across browsers

// 15. Labeled statements
loop1: for (let i = 0; i < 3; i++) {
  loop2: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break loop1;  // breaks outer loop
    }
  }
}

// 16. Numbers
console.log(999999999999999999);  // 1000000000000000000 (precision loss)
console.log(0.1 + 0.1 + 0.1 - 0.3);  // 5.551115123125783e-17

// 17. String comparison
console.log("2" > "12");  // true (lexicographic comparison)
console.log("B" > "a");   // false ("B" = 66, "a" = 97 in ASCII)

// 18. Length property
function foo() {}
console.log(foo.length);  // 0 (number of parameters)

function bar(a, b, c) {}
console.log(bar.length);  // 3

// 19. Array.sort()
const nums = [1, 2, 10, 21];
nums.sort();
console.log(nums);  // [1, 10, 2, 21] (sorts as strings!)
// Fix: nums.sort((a, b) => a - b)

// 20. Delete operator
const obj = { a: 1, b: 2 };
delete obj.a;
console.log(obj);  // { b: 2 }

const arr2 = [1, 2, 3];
delete arr2[1];
console.log(arr2);  // [1, empty, 3]
console.log(arr2.length);  // 3 (length unchanged!)
```

---

## Interview Tips

1. **Explain before coding**: Always explain your approach before writing code
2. **Think aloud**: Share your thought process
3. **Ask clarifying questions**: Don't assume requirements
4. **Consider edge cases**: Think about null, undefined, empty arrays, etc.
5. **Write clean code**: Use meaningful variable names, proper indentation
6. **Test your code**: Mentally run through examples
7. **Know time/space complexity**: Especially for algorithms
8. **Be honest**: If you don't know something, say so and explain how you'd find out
9. **Practice common patterns**: Closures, promises, async/await, array methods
10. **Understand the 'why'**: Don't just memorize, understand the concepts

## Common Interview Questions

1. What's the difference between `==` and `===`?
2. Explain event delegation
3. What is a closure? Provide an example
4. Explain `this` keyword in different contexts
5. What's the difference between `let`, `const`, and `var`?
6. How does the event loop work?
7. What are Promises? How do you handle errors in Promises?
8. Explain async/await
9. What's the difference between `map()`, `filter()`, and `reduce()`?
10. How do you deep clone an object?
11. What is event bubbling and capturing?
12. Explain hoisting with examples
13. What's the difference between arrow functions and regular functions?
14. What is the Temporal Dead Zone?
15. How do you handle errors in JavaScript?

---

**Good luck with your interviews! 🚀**
