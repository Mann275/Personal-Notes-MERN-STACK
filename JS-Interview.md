# JavaScript Interview Guide

<a name="top"></a>

## 📑 Table of Contents

### **Fundamentals**

1. [var vs let vs const](#1-var-vs-let-vs-const)
2. [Data Types](#2-data-types)
3. [Type Coercion](#3-type-coercion)
4. [== vs ===](#4--vs-)
5. [Scope (global, function, block)](#5-scope-global-function-block)
6. [Hoisting](#6-hoisting)
7. [Temporal Dead Zone](#7-temporal-dead-zone-tdz)
8. [Execution Context](#8-execution-context)
9. [Call Stack](#9-call-stack)

### **Functions & Closures**

10. [Closures](#10-closures)
11. [this Keyword](#11-this-keyword)
12. [Arrow Functions vs Normal Functions](#12-arrow-functions-vs-normal-functions)
13. [IIFE](#13-iife-immediately-invoked-function-expression)
14. [Higher Order Functions](#14-higher-order-functions)

### **Arrays & Objects**

15. [Arrays](#15-arrays)
16. [map, filter, reduce](#16-map-filter-reduce)
17. [Objects](#17-objects)
18. [Shallow vs Deep Copy](#18-shallow-vs-deep-copy)

### **DOM & Events**

19. [DOM (Document Object Model)](#19-dom-document-object-model)
20. [Event Handling](#20-event-handling)
21. [Event Bubbling](#21-event-bubbling)
22. [Event Capturing](#22-event-capturing)
23. [Event Delegation](#23-event-delegation)

### **Asynchronous JavaScript**

24. [Callbacks](#24-callbacks)
25. [Promises](#25-promises)
26. [async / await](#26-async--await)
27. [Event Loop](#27-event-loop)
28. [setTimeout / setInterval](#28-settimeout--setinterval)

### **Storage & Modern Features**

29. [localStorage / sessionStorage](#29-localstorage--sessionstorage)
30. [ES6 Features](#30-es6-features)
31. [Error Handling](#31-error-handling)
32. [JavaScript Quirks](#32-javascript-quirks)

### **Advanced Concepts**

33. [Call, Apply & Bind](#33-call-apply--bind)
34. [Prototype & Inheritance](#34-prototype--inheritance)
35. [null vs undefined](#35-null-vs-undefined)
36. [Debounce vs Throttle](#36-debounce-vs-throttle)
37. [Memory Leaks in JavaScript](#37-memory-leaks-in-javascript)
38. [How async/await works internally](#38-how-asyncawait-works-internally)
39. [Event Loop Phases](#39-event-loop-phases)

### **Design Patterns & Architecture**

40. [Module Pattern (IIFE)](#40-module-pattern-iife)
41. [Revealing Module Pattern](#41-revealing-module-pattern)
42. [Factory Function Pattern](#42-factory-function-pattern)
43. [Observer Pattern (Pub-Sub)](#43-observer-pattern-pub-sub)

### **Performance Optimization**

44. [Advanced Debouncing & Throttling](#44-advanced-debouncing--throttling)
45. [Lazy Loading with IntersectionObserver](#45-lazy-loading-with-intersectionobserver)
46. [DOM Optimization Techniques](#46-dom-optimization-techniques)
47. [Memory Leak Prevention](#47-memory-leak-prevention)

### **Functional Programming & Architecture**

48. [Pure vs Impure Functions](#48-pure-vs-impure-functions)
49. [Function Composition & Pipelines](#49-function-composition--pipelines)
50. [Separation of Concerns (MVC Pattern)](#50-separation-of-concerns-mvc-pattern)
51. [Custom Utility Implementations](#51-custom-utility-implementations)

### **Browser Architecture**

52. [JavaScript Engine & Event Loop Deep Dive](#52-javascript-engine--event-loop-deep-dive)
53. [Web APIs & Browser Threading](#53-web-apis--browser-threading)

### **Resources**

- [Interview Tips](#interview-tips)
- [Common Interview Questions](#common-interview-questions)

---

## 1. var vs let vs const

**Definition:** Variables in JavaScript can be declared using three keywords - var, let, and const. Each has different scoping rules, hoisting behavior, and reassignment capabilities.

**Exp:** Yeh teen tarike hain variables banane ke liye. var purana hai, let aur const naye hain. var function mein kaam karta hai, let aur const block mein. const ko change nahi kar sakte.

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

[⬆️ Back to Top](#top)

---

## 2. Data Types

**Definition:** Data types tell us what kind of information we can store.

**Exp:** Data types matlab hum kya kya cheezein store kar sakte hain. Jaise number, text, true/false, etc.

**Theory:**
JavaScript mein mainly 7 types hain:

1. **String** - Text
2. **Number** - Numbers
3. **Boolean** - True/False
4. **Undefined** - Kuch set nahi kiya
5. **Null** - Khali
6. **Object** - Complex data
7. **Symbol** - Unique identifier

```javascript
// Simple examples
let myName = "Rahul"; // String
let myAge = 25; // Number
let isStudent = true; // Boolean
let address; // Undefined
let salary = null; // Null
let person = { name: "John" }; // Object

// Check type
console.log(typeof myName); // "string"
console.log(typeof myAge); // "number"
console.log(typeof isStudent); // "boolean"
```

[⬆️ Back to Top](#top)

---

## 3. Type Coercion

**Definition:** JavaScript automatically changes one data type to another.

**Exp:** Type coercion matlab JavaScript khud hi data type change kar deta hai. Magic ki tarah!

**Theory:**
JavaScript apne aap types convert kar deta hai operations mein.

```javascript
// Addition with string = string banta hai
console.log("5" + 2); // "52" (string)
console.log("Hello" + 5); // "Hello5"

// Other operations = number banta hai
console.log("5" - 2); // 3 (number)
console.log("10" * 2); // 20 (number)
console.log("8" / 2); // 4 (number)

// Boolean se number
console.log(true + 1); // 2 (true = 1)
console.log(false + 5); // 5 (false = 0)
```

[⬆️ Back to Top](#top)

---

## 4. == vs ===

**Definition:** Two ways to compare values in JavaScript.

**== Exp:** Loose comparison - type convert karke check karta hai. Jaise "5" == 5 true hoga.
**=== Exp:** Strict comparison - bilkul same hona chahiye. Type bhi same, value bhi same.

**Theory:**

- `==` Type convert karta hai phir compare karta hai
- `===` Direct compare karta hai, no conversion

```javascript
// == examples (loose)
console.log(5 == "5"); // true (string "5" becomes number 5)
console.log(true == 1); // true (true becomes 1)
console.log(false == 0); // true (false becomes 0)

// === examples (strict)
console.log(5 === "5"); // false (number vs string)
console.log(true === 1); // false (boolean vs number)
console.log(5 === 5); // true (same type, same value)

// Always use === - it's safer!
```

[⬆️ Back to Top](#top)

---

## 5. Scope (global, function, block)

**Definition:** Scope means where variables can be used in your code.

**Global Exp:** Sab jagah use kar sakte hain. Jaise ghar ka main gate - sabko pata hai.
**Function Exp:** Sirf function ke andar use kar sakte hain. Jaise bedroom - sirf family wale jaa sakte hain.
**Block Exp:** Sirf {} brackets ke andar use kar sakte hain. Jaise locker - sirf key wala khol sakta hai.

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

[⬆️ Back to Top](#top)

---

## 6. Hoisting

**Definition:** JavaScript moves variable declarations to the top before running code.

**Exp:** Hoisting matlab JavaScript variables ko upar le jaata hai. Jaise aap kisi ko pehle hi bata dete ho ki "main aaunga", phir baad mein actually aate ho.

**Theory:**
JavaScript declarations ko top pe move kar deta hai, but values nahi.

```javascript
// What you write:
console.log(myName); // undefined (not error!)
var myName = "Rahul";

// What JavaScript sees:
var myName; // moved to top
console.log(myName); // undefined
myName = "Rahul";

// let/const mein hoisting hai but error deta hai
// console.log(age); // Error!
let age = 25;

// Functions fully hoisted
sayHi(); // Works!
function sayHi() {
  console.log("Hi!");
}
```

[⬆️ Back to Top](#top)

---

## 7. Temporal Dead Zone (TDZ)

**Definition:** The time when let/const variables exist but cannot be used.

**Exp:** TDZ matlab let aur const variables ka waiting time. Jaise train platform pe hai but abhi board nahi kar sakte - wait karna padega.

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

[⬆️ Back to Top](#top)

---

## 8. Execution Context

**Definition:** The environment where JavaScript code runs.

**Exp:** Execution context matlab ek room hai jaha code execute hota hai. Har function ka apna room hota hai with uske variables aur information.

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
    console.log(outerVar); // Access from parent
    console.log(innerVar); // Access from own context
  }

  inner();
}

outer();
```

[⬆️ Back to Top](#top)

---

## 9. Call Stack

**Definition:** A list that tracks which functions are running.

**Exp:** Call stack ek list hai jo yaad rakhti hai ki kaunsa function chal raha hai. Jaise books ka pile - jo last mein aaya wo pehle nikle ga (LIFO).

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

[⬆️ Back to Top](#top)

---

## 10. Closures

**Definition:** A function that remembers variables from its parent function.

**Exp:** Closure matlab ek function jo apne papa function ki yaadein rakhta hai. Jaise bachha ghar chod kar bhi mummy papa ko yaad rakhta hai.

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
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
// console.log(counter.count); // undefined (private)
```

[⬆️ Back to Top](#top)

---

## 11. this Keyword

**Definition:** 'this' points to the object that is calling the function.

**Exp:** 'this' matlab "main" - jo object function ko call kar raha hai usko point karta hai. Jaise aap different jagah "main" bolte ho to different meaning hota hai.

**Theory:**
`this` refers to the object that is executing the current function.

```javascript
// Global context
console.log(this); // Window object (in browser)

// Object method
const person = {
  name: "John",
  greet: function () {
    console.log("Hello, " + this.name);
  },
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
greet.call(user); // "Hello, Alice"
greet.apply(user); // "Hello, Alice"
const boundGreet = greet.bind(user);
boundGreet(); // "Hello, Alice"
```

[⬆️ Back to Top](#top)

---

## 12. Arrow Functions vs Normal Functions

**Definition:** Short way to write functions using => arrow syntax.

**Normal Function Exp:** Purane style ka function. 'this' apna hota hai.
**Arrow Function Exp:** Naye style ka function. 'this' parent se aata hai. Short aur sweet.

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
  normalMethod: function () {
    console.log(this.name); // "Test"
  },
  arrowMethod: () => {
    console.log(this.name); // undefined (this is from global)
  },
};

obj.normalMethod(); // "Test"
obj.arrowMethod(); // undefined

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

[⬆️ Back to Top](#top)

---

## 13. IIFE (Immediately Invoked Function Expression)

**Definition:** A function that runs immediately after being created.

**Exp:** IIFE matlab function banana aur turant chala dena. Jaise khana banate hi turant kha lena - no waiting!

**Theory:**
IIFE is a function that runs as soon as it is defined. Used to create private scope.

```javascript
// Basic IIFE
(function () {
  console.log("IIFE executed!");
})();

// IIFE with parameters
(function (name) {
  console.log("Hello, " + name);
})("John");

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();

// Practical use: Private variables
const counter = (function () {
  let count = 0;

  return {
    increment: function () {
      return ++count;
    },
    decrement: function () {
      return --count;
    },
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
// count is private and cannot be accessed directly

// Module pattern
const myModule = (function () {
  const privateVar = "I'm private";

  function privateMethod() {
    console.log(privateVar);
  }

  return {
    publicMethod: function () {
      privateMethod();
    },
  };
})();

myModule.publicMethod(); // "I'm private"
// myModule.privateMethod(); // Error
```

[⬆️ Back to Top](#top)

---

## 14. Higher Order Functions

**Definition:** Functions that work with other functions.

**Exp:** Higher order functions matlab functions jo doosre functions ke saath kaam karte hain. Jaise map(), filter() - yeh functions ko input mein lete hain aur magic karte hain!

**Theory:**
Higher Order Functions are functions that either:

1. Take one or more functions as arguments (callback functions)
2. Return a function as their result
3. Or both

**Common Examples:**

- `map()`, `filter()`, `reduce()`, `forEach()`
- `setTimeout()`, `setInterval()`
- Event listeners
- Custom functions that accept callbacks

```javascript
// 1. Function that takes another function as argument
function greetUser(name, callback) {
  console.log("Hello " + name);
  callback();
}

function afterGreeting() {
  console.log("Nice to meet you!");
}

greetUser("John", afterGreeting);
// Output: "Hello John" then "Nice to meet you!"

// 2. Function that returns another function
function createMultiplier(multiplier) {
  return function (x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 3. Array methods are higher order functions
const numbers = [1, 2, 3, 4, 5];

// map() takes a function as argument
const doubled = numbers.map(function (num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() takes a function as argument
const evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0;
});
console.log(evenNumbers); // [2, 4]

// reduce() takes a function as argument
const sum = numbers.reduce(function (acc, num) {
  return acc + num;
}, 0);
console.log(sum); // 15

// 4. Using arrow functions (more concise)
const squared = numbers.map((num) => num * num);
console.log(squared); // [1, 4, 9, 16, 25]

// 5. Custom higher order function example
function withLogging(fn) {
  return function (...args) {
    console.log("Calling function with args:", args);
    const result = fn.apply(this, args);
    console.log("Function returned:", result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const addWithLogging = withLogging(add);
addWithLogging(2, 3);
// Output:
// "Calling function with args: [2, 3]"
// "Function returned: 5"

// 6. Practical example - Array utility functions
function processArray(arr, transformer, filter) {
  return arr.filter(filter).map(transformer);
}

const data = [1, 2, 3, 4, 5, 6];
const result = processArray(
  data,
  (x) => x * x, // transformer function
  (x) => x % 2 === 0, // filter function
);
console.log(result); // [4, 16, 36] (squares of even numbers)
```

**Interview Questions:**

1. What is a higher order function?
2. Give examples of built-in higher order functions
3. Write a custom higher order function
4. Explain the difference between `map()` and `forEach()`
5. How would you implement your own `map()` function?

**Benefits:**

- **Code Reusability:** Write generic functions that can work with different behaviors
- **Abstraction:** Hide complex logic behind simple function calls
- **Functional Programming:** Enables functional programming patterns
- **Composition:** Combine simple functions to create complex behaviors

[⬆️ Back to Top](#top)

---

## 15. Arrays

**Definition:** Arrays store multiple values in one variable with index numbers.

**Exp:** Arrays matlab ek dabba hai jisme multiple cheezein rakh sakte hain. Har cheez ka number (index) hota hai 0 se start.

**Theory:**
Array is like a numbered list starting from 0.

```javascript
// Create array
const fruits = ["apple", "banana", "orange"];

// Access by index
console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"

// Add/Remove
fruits.push("mango"); // Add at end
fruits.pop(); // Remove from end
fruits.unshift("grapes"); // Add at start
fruits.shift(); // Remove from start

// Splice - Add/Remove from anywhere
fruits.splice(1, 1); // Remove 1 item from index 1
fruits.splice(1, 0, "kiwi"); // Add "kiwi" at index 1
fruits.splice(1, 1, "pineapple"); // Replace item at index 1

// Slice - Copy part of array (doesn't change original)
const newFruits = fruits.slice(1, 3); // Copy from index 1 to 2

// Length
console.log(fruits.length); // How many items

// Loop through array
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Check if exists
console.log(fruits.includes("apple")); // true or false
```

[⬆️ Back to Top](#top)

---

## 16. map, filter, reduce

**Definition:** Three powerful array methods to transform data.

**map() Exp:** Har element ko change karke naya array banata hai. Jaise sabko double kar dena.
**filter() Exp:** Condition ke hisaab se elements choose karta hai. Jaise sirf even numbers nikalna.
**reduce() Exp:** Poore array ko ek value mein convert karta hai. Jaise sabka sum nikalna.

**Theory:**
Higher-order array methods for transforming and processing data.

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - Transform each element
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
];
const names = users.map((user) => user.name);
console.log(names); // ["John", "Jane"]

// filter - Select elements that meet condition
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

const adults = users.filter((user) => user.age >= 18);
console.log(adults); // Both users

// reduce - Reduce array to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const max = numbers.reduce((acc, num) => Math.max(acc, num));
console.log(max); // 5

// Chaining
const result = numbers
  .filter((num) => num % 2 === 0) // [2, 4]
  .map((num) => num * 2) // [4, 8]
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

[⬆️ Back to Top](#top)

---

## 17. Objects

**Definition:** Objects store data in key-value pairs, like a dictionary.

**Exp:** Objects matlab real life ki cheezein represent karte hain. Jaise person object - naam, umar, address sab ek jagah store kar sakte hain. Key-value pairs jaise dictionary mein word aur meaning.

**Theory:**
Objects are collections of key-value pairs.

```javascript
// Creating objects
const obj1 = { name: "John", age: 25 };
const obj2 = new Object();
const obj3 = Object.create(null);

// Accessing properties
console.log(obj1.name); // Dot notation
console.log(obj1["name"]); // Bracket notation

// Adding/Modifying
obj1.city = "New York";
obj1["country"] = "USA";

// Deleting
delete obj1.age;

// Methods
const person = {
  name: "John",
  greet: function () {
    console.log("Hello, " + this.name);
  },
  // ES6 shorthand
  sayHi() {
    console.log("Hi!");
  },
};

// Object methods
const keys = Object.keys(obj1); // Array of keys
const values = Object.values(obj1); // Array of values
const entries = Object.entries(obj1); // Array of [key, value] pairs

// Check property
console.log("name" in obj1); // true
console.log(obj1.hasOwnProperty("name")); // true

// Merge objects
const obj4 = { a: 1, b: 2 };
const obj5 = { b: 3, c: 4 };
const merged = Object.assign({}, obj4, obj5); // { a: 1, b: 3, c: 4 }
const merged2 = { ...obj4, ...obj5 }; // Same result

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

[⬆️ Back to Top](#top)

---

## 18. Shallow vs Deep Copy

**Definition:** Two ways to copy objects.

**Shallow Copy Exp:** Sirf upar wala layer copy karta hai. Andar ke references same rehte hain. Jaise room ka photocopy - furniture same rehta hai.
**Deep Copy Exp:** Poora object copy karta hai, andar tak. Bilkul independent copy. Jaise ghar ka duplicate banana - sab kuch naya.

**Theory:**

- Shallow copy: Copies only the first level, nested objects are still referenced
- Deep copy: Copies all levels, creating completely independent objects

```javascript
// Shallow copy examples
const original = {
  name: "John",
  address: {
    city: "New York",
  },
};

// Method 1: Spread operator (shallow)
const copy1 = { ...original };
copy1.name = "Jane";
copy1.address.city = "LA";
console.log(original.name); // "John" (not affected)
console.log(original.address.city); // "LA" (affected!)

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
    city: "New York",
  },
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
    return obj.map((item) => deepClone(item));
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
    city: "New York",
  },
};
const deepCopy2 = deepClone(original3);
deepCopy2.address.city = "LA";
console.log(original3.address.city); // "New York" (not affected)

// Method 3: structuredClone (modern browsers)
const deepCopy3 = structuredClone(original3);
```

[⬆️ Back to Top](#top)

---

## 19. DOM (Document Object Model)

**Definition:** Way to control HTML elements using JavaScript.

**Exp:** DOM matlab HTML page ko JavaScript se control karna. Jaise TV remote se TV control karte hain, waise hi DOM se webpage ke buttons, text, etc. change kar sakte hain.

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

[⬆️ Back to Top](#top)

---

## 20. Event Handling

**Definition:** Responding to user actions like clicks, typing, etc.

**Exp:** Event handling matlab user ke actions ko sunna aur reaction dena. Jaise doorbell bajne pe darwaza kholna - bell bajana event hai, darwaza kholna handling hai.

**Theory:**
Events are actions that happen in the browser (clicks, key presses, etc.).

```javascript
// Method 1: HTML attribute (not recommended)
// <button onclick="handleClick()">Click</button>

// Method 2: DOM property
const btn = document.getElementById("myBtn");
btn.onclick = function () {
  console.log("Clicked!");
};

// Method 3: addEventListener (best practice)
btn.addEventListener("click", function (event) {
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
  console.log(e.type); // "click"
  console.log(e.target); // Element clicked
  console.log(e.currentTarget); // Element with listener
  console.log(e.clientX); // Mouse X position
  console.log(e.clientY); // Mouse Y position

  e.preventDefault(); // Prevent default action
  e.stopPropagation(); // Stop bubbling
});

// Form example
const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const formData = new FormData(form);
  console.log(formData.get("username"));
});
```

[⬆️ Back to Top](#top)

---

## 21. Event Bubbling

**Definition:** Events travel from child element up to parent elements.

**Exp:** Event bubbling matlab event neeche se upar jaata hai. Jaise paani mein bubble upar aata hai. Button click kiya to parent div mein bhi event jaayega.

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

[⬆️ Back to Top](#top)

---

## 22. Event Capturing

**Definition:** Event capturing (also called trickling) is the process where an event starts from the root element and propagates downward to the target element, opposite of bubbling.

**Exp:** Event capturing matlab event upar se neeche ki taraf jaata hai - bubbling ka opposite. Root se target element tak event travel karta hai, jaise paani upar se neeche girta hai.

**Theory:**
Event capturing is the opposite of bubbling - event goes from root to target element.

```javascript
// Same HTML as above

// Use third parameter 'true' for capturing phase
parent.addEventListener(
  "click",
  () => {
    console.log("Parent div clicked (capturing)");
  },
  true,
);

child.addEventListener(
  "click",
  () => {
    console.log("Child div clicked (capturing)");
  },
  true,
);

btn.addEventListener(
  "click",
  () => {
    console.log("Button clicked");
  },
  true,
);

// Output when button clicked (capturing phase):
// "Parent div clicked (capturing)"
// "Child div clicked (capturing)"
// "Button clicked"

// Event flow: Capturing -> Target -> Bubbling
parent.addEventListener(
  "click",
  () => {
    console.log("Parent - capturing");
  },
  true,
);

parent.addEventListener(
  "click",
  () => {
    console.log("Parent - bubbling");
  },
  false,
);

btn.addEventListener("click", () => {
  console.log("Button clicked");
});

// Output:
// "Parent - capturing"
// "Button clicked"
// "Parent - bubbling"
```

[⬆️ Back to Top](#top)

---

## 23. Event Delegation

**Definition:** Event delegation is a technique where you attach a single event listener to a parent element to handle events from multiple child elements, taking advantage of event bubbling.

**Exp:** Event delegation matlab ek parent element pe event listener lagana aur usse sab children ke events handle karna. Jaise ek manager jo puri team ki responsibility leta hai individual members ke bajaye.

**Theory:**
Event delegation uses bubbling to handle events at a higher level instead of adding listeners to each child element.

```javascript
// Without delegation (inefficient for many items)
const buttons = document.querySelectorAll(".item");
buttons.forEach((btn) => {
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

[⬆️ Back to Top](#top)

---

## 24. Callbacks

**Definition:** A callback is a function that is passed as an argument to another function and is executed after (or during) the execution of that function. It allows asynchronous programming.

**Exp:** Callback matlab ek function ko doosre function ke andar pass karna taaki baad mein execute ho. Jaise restaurant mein order deke phone number dena - jab ready ho jayega to call kar denge (callback).

**Theory:**
A callback is a function passed as an argument to another function, to be executed later.

```javascript
// Simple callback
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

greet("John", function () {
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
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      getMoreData(c, function (d) {
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

[⬆️ Back to Top](#top)

---

## 25. Promises

**Definition:** Promises handle async operations and represent future values.

**Exp:** Promise matlab vaada. Jaise kisi se kahte ho "main 5 minute mein kaam kar dunga" - yeh promise hai. Teen states: pending (wait kar rahe hain), fulfilled (ho gaya), rejected (fail ho gaya).

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

[⬆️ Back to Top](#top)

---

## 26. async / await

**Definition:** async/await is syntactic sugar built on top of Promises that allows writing asynchronous code in a synchronous-like manner, making it more readable and easier to understand.

**Exp:** async/await matlab asynchronous code ko synchronous jaisa likhna. await lagane se function ruk jata hai jab tak Promise resolve nahi hota. Promises se bhi easy hai samajhne mein.

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
    fetchComments(1),
  ]);
  return { user, posts, comments };
}

// Practical example
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processData() {
  console.log("Starting...");

  await delay(1000);
  console.log("After 1 second");

  await delay(1000);
  console.log("After 2 seconds");

  return "Done!";
}

processData().then((result) => console.log(result));

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

[⬆️ Back to Top](#top)

---

## 27. Event Loop

**Definition:** The Event Loop is a mechanism that allows JavaScript to perform asynchronous operations despite being single-threaded. It continuously monitors the call stack and task queues to execute code.

**Exp:** Event Loop JavaScript ka traffic police hai jo decide karta hai ki kaunsa code kab chalega. Single thread mein async operations possible banata hai. Call stack, microtasks aur macrotasks ka order maintain karta hai.

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

Promise.resolve().then(() => {
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

[⬆️ Back to Top](#top)

---

## 28. setTimeout / setInterval

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
  return function (...args) {
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
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scroll event");
}, 1000);
```

[⬆️ Back to Top](#top)

---

## 29. localStorage / sessionStorage

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
    this.items = this.items.filter((item) => item.id !== itemId);
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

[⬆️ Back to Top](#top)

---

## 30. ES6 Features

**Theory:**
ES6 (ES2015) introduced many new features to JavaScript.

```javascript
// 1. let and const
let x = 10;
const PI = 3.14;

// 2. Arrow functions
const add = (a, b) => a + b;
const square = (x) => x * x;

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
  name, // shorthand for name: name
  age,
  greet() {
    // shorthand for greet: function()
    console.log("Hello");
  },
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
"hello".startsWith("he"); // true
"hello".endsWith("lo"); // true
"hello".includes("ll"); // true
"hello".repeat(3); // "hellohellohello"

// 17. Array methods
Array.from("hello"); // ["h", "e", "l", "l", "o"]
Array.of(1, 2, 3); // [1, 2, 3]
[1, 2, 3].find((x) => x > 1); // 2
[1, 2, 3].findIndex((x) => x > 1); // 1

// 18. Object methods
Object.assign({}, obj1, obj2);
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
```

---

## 31. Error Handling

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
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));

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

[⬆️ Back to Top](#top)

---

## 32. JavaScript Quirks

**Definition:** JavaScript quirks are unusual, unexpected, or counterintuitive behaviors and edge cases in the language that can lead to bugs if not properly understood by developers.

**Exp:** JavaScript ki weird aur unexpected behaviors jo beginners ko confuse karti hain. Jaise typeof null 'object' deta hai, ya NaN !== NaN. Yeh sab samajhna zaroori hai interviews ke liye.

**Theory:**
JavaScript has some unusual behaviors that can be surprising.

```javascript
// 1. typeof null
console.log(typeof null); // "object" (historical bug)

// 2. NaN is not equal to itself
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true (correct way)

// 3. Array comparison
console.log([] == []); // false (different references)
console.log([] === []); // false

// 4. Type coercion weirdness
console.log([] + []); // "" (empty string)
console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]"
console.log(true + true); // 2
console.log(true + false); // 1

// 5. Automatic semicolon insertion
function test() {
  return;
  {
    value: 42;
  }
}
console.log(test()); // undefined (not { value: 42 })

// 6. parseInt quirks
console.log(parseInt("08")); // 8
console.log(parseInt("10", 2)); // 2 (binary)
console.log(["1", "2", "3"].map(parseInt)); // [1, NaN, NaN]
// Fix: ["1", "2", "3"].map(Number)

// 7. Floating point precision
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
// Fix: Use toFixed() or libraries for precise math

// 8. Comparisons with null and undefined
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null > 0); // false
console.log(null == 0); // false
console.log(null >= 0); // true (weird!)

// 9. Math.max() and Math.min()
console.log(Math.max()); // -Infinity
console.log(Math.min()); // Infinity

// 10. Array holes
const arr = [1, 2, , 4]; // sparse array
console.log(arr.length); // 4
console.log(arr[2]); // undefined
console.log(2 in arr); // false (hole exists)

// 11. void operator
console.log(void 0); // undefined
console.log(void "hello"); // undefined

// 12. Comma operator
let x = (1, 2, 3);
console.log(x); // 3 (returns last value)

// 13. with statement (deprecated, don't use)
// Creates ambiguous scope

// 14. Function declarations in blocks
if (true) {
  function foo() {
    return 1;
  }
}
// Behavior varies across browsers

// 15. Labeled statements
loop1: for (let i = 0; i < 3; i++) {
  loop2: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break loop1; // breaks outer loop
    }
  }
}

// 16. Numbers
console.log(999999999999999999); // 1000000000000000000 (precision loss)
console.log(0.1 + 0.1 + 0.1 - 0.3); // 5.551115123125783e-17

// 17. String comparison
console.log("2" > "12"); // true (lexicographic comparison)
console.log("B" > "a"); // false ("B" = 66, "a" = 97 in ASCII)

// 18. Length property
function foo() {}
console.log(foo.length); // 0 (number of parameters)

function bar(a, b, c) {}
console.log(bar.length); // 3

// 19. Array.sort()
const nums = [1, 2, 10, 21];
nums.sort();
console.log(nums); // [1, 10, 2, 21] (sorts as strings!)
// Fix: nums.sort((a, b) => a - b)

// 20. Delete operator
const obj = { a: 1, b: 2 };
delete obj.a;
console.log(obj); // { b: 2 }

const arr2 = [1, 2, 3];
delete arr2[1];
console.log(arr2); // [1, empty, 3]
console.log(arr2.length); // 3 (length unchanged!)
```

[⬆️ Back to Top](#top)

---

## 33. Call, Apply & Bind

**Definition:** These are methods that allow you to explicitly set the value of 'this' in a function and control how functions are invoked with specific contexts and arguments.

**Exp:** Yeh teen methods hain jo 'this' ko control karne ke liye use karte hain. call() aur apply() function ko turant call karte hain specific context ke saath, bind() ek naya function return karta hai. Jaise remote control se TV channels change karna.

**Theory:**
These methods allow you to explicitly set the value of `this` in a function.

- **call()**: Calls function with specific `this` and individual arguments
- **apply()**: Same as call but arguments passed as array
- **bind()**: Returns new function with bound `this` (doesn't call immediately)

**Exp:** Think of them as ways to "borrow" methods from other objects or control what `this` refers to.

```javascript
const person1 = { name: "Alice", age: 25 };
const person2 = { name: "Bob", age: 30 };

function introduce(job, hobby) {
  return `Hi! I'm ${this.name}, ${this.age} years old. I work as ${job} and love ${hobby}.`;
}

// CALL - arguments passed individually
console.log(introduce.call(person1, "Developer", "coding"));
// "Hi! I'm Alice, 25 years old. I work as Developer and love coding."

// APPLY - arguments passed as array
console.log(introduce.apply(person2, ["Designer", "painting"]));
// "Hi! I'm Bob, 30 years old. I work as Designer and love painting."

// BIND - returns new function with bound 'this'
const aliceIntro = introduce.bind(person1);
console.log(aliceIntro("Teacher", "reading"));
// "Hi! I'm Alice, 25 years old. I work as Teacher and love reading."

// Practical use case: Method borrowing
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.apply(null, numbers)); // 7
// Modern way: Math.max(...numbers)

// Event handler binding
class Counter {
  constructor() {
    this.count = 0;
    // Without bind, 'this' would refer to button, not Counter
    this.button = document.getElementById("btn");
    this.button.addEventListener("click", this.increment.bind(this));
  }

  increment() {
    this.count++;
    console.log(`Count: ${this.count}`);
  }
}
```

[⬆️ Back to Top](#top)

---

## 34. Prototype & Inheritance

**Definition:** Way objects inherit properties and methods from other objects.

**Exp:** Prototype matlab inheritance system. Jaise bachha parents ki properties inherit karta hai, waise objects bhi doosre objects se properties inherit karte hain.

**Theory:**
Every JavaScript object has a prototype. Prototype is like a template that objects inherit properties and methods from. It's JavaScript's way of implementing inheritance.

**Exp:** Think of prototype as a "parent" that shares its properties with its "children". When you look for a property on an object, JavaScript first checks the object itself, then its prototype, then its prototype's prototype, and so on (prototype chain).

```javascript
// Constructor function
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

// Add methods to prototype (shared by all instances)
Animal.prototype.speak = function () {
  return `${this.name} the ${this.species} makes a sound`;
};

Animal.prototype.eat = function (food) {
  return `${this.name} is eating ${food}`;
};

// Create instances
const lion = new Animal("Simba", "Lion");
const elephant = new Animal("Dumbo", "Elephant");

console.log(lion.speak()); // "Simba the Lion makes a sound"
console.log(elephant.eat("grass")); // "Dumbo is eating grass"

// Inheritance
function Dog(name, breed) {
  Animal.call(this, name, "Dog"); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override parent method
Dog.prototype.speak = function () {
  return `${this.name} the ${this.breed} barks: Woof!`;
};

// Add new method
Dog.prototype.wagTail = function () {
  return `${this.name} is wagging tail!`;
};

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.speak()); // "Buddy the Golden Retriever barks: Woof!"
console.log(myDog.eat("bone")); // "Buddy is eating bone" (inherited from Animal)

// Prototype chain
console.log(myDog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true

// ES6 Classes (syntactic sugar over prototypes)
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    return `${this.make} ${this.model} is starting`;
  }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model); // Call parent constructor
    this.doors = doors;
  }

  honk() {
    return `${this.make} ${this.model}: BEEP BEEP!`;
  }
}

const myCar = new Car("Toyota", "Camry", 4);
console.log(myCar.start()); // "Toyota Camry is starting"
console.log(myCar.honk()); // "Toyota Camry: BEEP BEEP!"
```

[⬆️ Back to Top](#top)

---

## 35. null vs undefined

**Definition:** Two ways to represent "nothing" in JavaScript.

**null Exp:** Intentionally khali value set kiya hai. Developer ne purposely empty rakha hai.
**undefined Exp:** Variable declare kiya but value assign nahi kiya. JavaScript ka default empty state.

**Theory:**

- **undefined**: Variable declared but not assigned, or property that doesn't exist
- **null**: Intentional absence of value, must be explicitly assigned

- `undefined` = "I don't know what this is" (JavaScript's default)
- `null` = "I know this should be empty" (programmer's intention)

```javascript
// undefined examples
let a;
console.log(a); // undefined (declared but not assigned)

const obj = { name: "John" };
console.log(obj.age); // undefined (property doesn't exist)

function test() {}
console.log(test()); // undefined (no return value)

function greet(name) {
  console.log(name); // undefined if no argument passed
}
greet(); // undefined

// null examples
let b = null; // Intentionally set to null
console.log(b); // null

const user = {
  name: "Alice",
  avatar: null, // Explicitly no avatar
};

// Type checking
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (this is a known bug in JavaScript!)

// Comparison
console.log(null == undefined); // true (loose equality)
console.log(null === undefined); // false (strict equality)

// Practical usage
// Use null when you want to explicitly indicate "no value"
const getUserAvatar = (userId) => {
  const user = findUser(userId);
  return user ? user.avatar : null; // null indicates no avatar found
};

// undefined is usually JavaScript's default
let config = {};
console.log(config.theme); // undefined (property not set)

// Checking for both
function isNullOrUndefined(value) {
  return value == null; // This checks for both null and undefined
}

// Or more explicit
function isNullOrUndefined2(value) {
  return value === null || value === undefined;
}

// Default values
function greetUser(name) {
  name = name || "Guest"; // If name is null, undefined, or falsy
  console.log(`Hello, ${name}!`);
}

// Modern way with nullish coalescing
function greetUser2(name) {
  name = name ?? "Guest"; // Only if name is null or undefined
  console.log(`Hello, ${name}!`);
}
```

[⬆️ Back to Top](#top)

---

## 36. Debounce vs Throttle

**Definition:** Both are techniques to limit the frequency of function execution. Debounce delays execution until after a pause in activity, while throttle limits execution to once per specified time period.

**Exp:** Dono function calls ko control karne ke tarike hain. Debounce matlab 'ruk jao jab tak activity band na ho jaye', throttle matlab 'time pe time execute karo'. Jaise debounce = lift door (wait karta hai), throttle = traffic signal (fixed time pe change).

**Theory:**
Both are techniques to limit how often a function is called, but they work differently:

- **Debounce**: Delays execution until after a pause in activity
- **Throttle**: Limits execution to once per time period

- **Debounce**: Like waiting for someone to stop knocking before answering the door
- **Throttle**: Like answering the door at most once per minute, no matter how much knocking

```javascript
// DEBOUNCE - waits for pause in activity
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Search as user types
const searchInput = document.getElementById("search");
const debouncedSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
  // API call here
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
// Only searches 300ms after user stops typing

// THROTTLE - limits frequency
function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Usage: Scroll event handling
const throttledScroll = throttle(() => {
  console.log("Scroll event handled");
  // Update navbar, lazy load images, etc.
}, 100);

window.addEventListener("scroll", throttledScroll);
// Runs at most once every 100ms during scrolling

// Advanced throttle with trailing call
function throttleAdvanced(func, delay) {
  let lastCall = 0;
  let timeoutId;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          lastCall = new Date().getTime();
          func.apply(this, args);
        },
        delay - (now - lastCall),
      );
    }
  };
}

// Real-world examples

// Debounce: Form validation
const validateEmail = debounce((email) => {
  if (email.includes("@")) {
    console.log("Email is valid");
  } else {
    console.log("Email is invalid");
  }
}, 500);

// Throttle: Button clicks to prevent double submission
const handleSubmit = throttle(() => {
  console.log("Form submitted");
  // Submit form logic
}, 2000);

// Throttle: API calls for autocomplete
const fetchSuggestions = throttle((query) => {
  fetch(`/api/suggestions?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Suggestions:", data);
    });
}, 300);

// When to use what:
// Debounce: Search, form validation, window resize
// Throttle: Scroll events, mouse movement, API rate limiting
```

[⬆️ Back to Top](#top)

---

## 37. Memory Leaks in JavaScript

**Definition:** Memory leak occurs when a program allocates memory but fails to release it back to the system, causing the application to use increasingly more memory over time, potentially leading to performance issues or crashes.

**Exp:** Memory leak matlab app memory use karta rehta hai but wapas nahi karta. Jaise ghar mein saman ikattha karte rehna but kabhi safai nahi karna. Performance slow ho jati hai aur eventually crash ho sakta hai. Event listeners, timers aur references clean up karna zaroori hai.

**Theory:**
Memory leak occurs when your application keeps references to objects that are no longer needed, preventing garbage collector from freeing up memory.

**Exp:** Like keeping boxes in your room that you'll never use again - they take up space unnecessarily. In JavaScript, this happens when you forget to clean up event listeners, timers, or object references.

```javascript
// COMMON CAUSES OF MEMORY LEAKS

// 1. Forgotten timers
function memoryLeakTimer() {
  const data = new Array(1000000).fill("some data");

  setInterval(() => {
    // This keeps 'data' in memory forever
    console.log("Timer running");
  }, 1000);

  // FIX: Clear the timer
  // const timerId = setInterval(...);
  // clearInterval(timerId);
}

// 2. Event listeners not removed
function memoryLeakListener() {
  const button = document.getElementById("myButton");
  const largeData = new Array(1000000).fill("data");

  function handleClick() {
    console.log("Button clicked", largeData.length);
  }

  button.addEventListener("click", handleClick);

  // If button is removed from DOM but listener isn't removed,
  // both button and largeData stay in memory

  // FIX: Remove listener when done
  // button.removeEventListener('click', handleClick);
}

// 3. Closures keeping references
function memoryLeakClosure() {
  const largeArray = new Array(1000000).fill("data");

  return function () {
    // Even if we don't use largeArray here,
    // closure keeps reference to it
    console.log("Function called");
  };
}

const leakyFunction = memoryLeakClosure();
// largeArray stays in memory as long as leakyFunction exists

// 4. Global variables
function memoryLeakGlobal() {
  // Accidentally creating global variable
  globalData = new Array(1000000).fill("data"); // No 'var', 'let', or 'const'

  // Global variables are never garbage collected
}

// 5. Detached DOM nodes
function memoryLeakDOM() {
  const parent = document.getElementById("parent");
  const child = document.createElement("div");

  parent.appendChild(child);

  // Keep reference to child
  window.childReference = child;

  // Remove parent from DOM
  parent.remove();

  // child and parent are still in memory due to reference
  // FIX: window.childReference = null;
}

// 6. Circular references (less common in modern JS)
function memoryLeakCircular() {
  const obj1 = {};
  const obj2 = {};

  obj1.ref = obj2;
  obj2.ref = obj1;

  // In old browsers, this could cause memory leaks
  // Modern garbage collectors handle this
}

// HOW TO PREVENT MEMORY LEAKS

// 1. Clean up timers
class Component {
  constructor() {
    this.timerId = setInterval(() => {
      this.update();
    }, 1000);
  }

  destroy() {
    clearInterval(this.timerId); // Always clean up!
  }

  update() {
    console.log("Component updated");
  }
}

// 2. Remove event listeners
class EventComponent {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener("click", this.handleClick);
  }

  destroy() {
    document.removeEventListener("click", this.handleClick);
  }

  handleClick() {
    console.log("Clicked");
  }
}

// 3. WeakMap for object associations (doesn't prevent garbage collection)
const metadata = new WeakMap();

function setMetadata(object, meta) {
  metadata.set(object, meta);
}

function getMetadata(object) {
  return metadata.get(object);
}

// When object is garbage collected, its entry in WeakMap is too

// 4. Null references when done
let expensiveObject = createExpensiveObject();
// Use the object...
expensiveObject = null; // Release reference

// 5. Use AbortController for fetch requests
async function fetchWithCleanup() {
  const controller = new AbortController();

  try {
    const response = await fetch("/api/data", {
      signal: controller.signal,
    });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    }
  }

  // Can abort if component unmounts
  // controller.abort();
}

// DETECTING MEMORY LEAKS

// 1. Chrome DevTools Memory tab
// 2. Performance.measureUserAgentSpecificMemory() API
// 3. Monitor heap size
if ("memory" in performance) {
  console.log("Used JS heap:", performance.memory.usedJSHeapSize);
  console.log("Total JS heap:", performance.memory.totalJSHeapSize);
}

// 4. Simple memory monitoring
function monitorMemory() {
  if (performance.memory) {
    const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
    const total = Math.round(performance.memory.totalJSHeapSize / 1048576);
    console.log(`Memory: ${used}MB / ${total}MB`);
  }
}

setInterval(monitorMemory, 5000);
```

[⬆️ Back to Top](#top)

---

## 38. How async/await works internally

**Definition:** async/await is syntactic sugar over Promises that uses JavaScript's event loop mechanism. When await is encountered, the function execution is paused, control returns to the event loop, and resumes when the Promise resolves.

**Exp:** async/await internally Promises ka use karta hai. await lagane pe function pause ho jata hai, event loop doosre kaam karta rehta hai, jab Promise resolve hota hai to function wahi se continue hota hai. Jaise video pause karna aur baad mein wahi se play karna.

**Theory:**
Async/await is syntactic sugar over Promises. When you use `await`, JavaScript pauses the function execution, puts it aside, and continues with other tasks. When the awaited Promise resolves, the function resumes from where it left off.

**Exp:** Think of it like waiting in line at a restaurant - you give your order (start async function), then sit down (await), the kitchen works on your order (Promise processing), and when it's ready, they call your name (Promise resolves) and you continue eating (function resumes).

```javascript
// What happens under the hood

// This async/await code:
async function fetchData() {
  console.log("1. Starting");
  const result = await fetch("/api/data");
  console.log("3. Got result");
  return result.json();
}

// Is equivalent to this Promise code:
function fetchDataPromise() {
  console.log("1. Starting");
  return fetch("/api/data").then((result) => {
    console.log("3. Got result");
    return result.json();
  });
}

// Step-by-step execution
async function stepByStep() {
  console.log("Step 1: Function starts");

  // When await is hit:
  // 1. Expression is evaluated (Promise created)
  // 2. Function is suspended
  // 3. Control returns to caller
  // 4. Event loop continues with other tasks
  const data = await new Promise((resolve) => {
    console.log("Step 2: Promise created, function suspended");
    setTimeout(() => {
      console.log("Step 4: Promise resolving");
      resolve("data");
    }, 1000);
  });

  // When Promise resolves:
  // 1. Function resumes from this point
  // 2. 'data' gets the resolved value
  console.log("Step 5: Function resumed with:", data);
  return data;
}

console.log("Step 0: Before calling async function");
stepByStep().then((result) => {
  console.log("Step 6: Final result:", result);
});
console.log("Step 3: After calling async function (continues immediately)");

// Output:
// Step 0: Before calling async function
// Step 1: Function starts
// Step 2: Promise created, function suspended
// Step 3: After calling async function (continues immediately)
// Step 4: Promise resolving
// Step 5: Function resumed with: data
// Step 6: Final result: data

// Error handling transformation

// This async/await:
async function withErrorHandling() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
}

// Becomes this Promise code:
function withErrorHandlingPromise() {
  return riskyOperation()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("Error:", error.message);
      throw error;
    });
}

// Multiple awaits
async function multipleAwaits() {
  console.log("Start");

  // Each await suspends the function
  const user = await fetchUser();
  console.log("Got user:", user.name);

  const posts = await fetchPosts(user.id);
  console.log("Got posts:", posts.length);

  const comments = await fetchComments(posts[0].id);
  console.log("Got comments:", comments.length);

  return { user, posts, comments };
}

// This runs sequentially - each await waits for the previous one

// For parallel execution:
async function parallelExecution() {
  console.log("Start parallel");

  // Start all operations at once (don't await yet)
  const userPromise = fetchUser();
  const settingsPromise = fetchSettings();
  const notificationsPromise = fetchNotifications();

  // Now await all of them
  const user = await userPromise;
  const settings = await settingsPromise;
  const notifications = await notificationsPromise;

  // Or use Promise.all for cleaner syntax:
  // const [user, settings, notifications] = await Promise.all([
  //   fetchUser(),
  //   fetchSettings(),
  //   fetchNotifications()
  // ]);

  return { user, settings, notifications };
}

// Async function always returns a Promise
async function alwaysReturnsPromise() {
  return "hello"; // This becomes Promise.resolve('hello')
}

console.log(alwaysReturnsPromise()); // Promise {<fulfilled>: 'hello'}

// Even if you don't return anything
async function noReturn() {
  console.log("doing something");
  // Implicitly returns Promise.resolve(undefined)
}

// Async generators (advanced)
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

async function useAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log(value); // 1, 2, 3 (with delays)
  }
}

// Common pitfalls

// ❌ Forgetting await
async function forgotAwait() {
  const result = fetch("/api/data"); // This is a Promise, not the data!
  console.log(result); // [object Promise]
  return result;
}

// ✅ Correct usage
async function correctAwait() {
  const result = await fetch("/api/data");
  console.log(result); // Response object
  return result;
}

// ❌ Using await in loop incorrectly (sequential)
async function sequentialLoop(urls) {
  const results = [];
  for (const url of urls) {
    const result = await fetch(url); // Waits for each one
    results.push(result);
  }
  return results;
}

// ✅ Parallel processing
async function parallelLoop(urls) {
  const promises = urls.map((url) => fetch(url));
  return await Promise.all(promises);
}

// Real-world example: API service
class APIService {
  async fetchUserProfile(userId) {
    try {
      // Function suspends here, event loop continues
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Function suspends here again
      const userData = await response.json();

      // Both awaits completed, function resumes normally
      return {
        user: userData,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error; // Re-throw to let caller handle
    }
  }
}
```

[⬆️ Back to Top](#top)

---

## 39. Event Loop Phases

**Definition:** The Event Loop operates in specific phases that determine the execution order of different types of asynchronous operations, including call stack, microtask queue, and macrotask queue processing.

**Exp:** Event Loop ke specific phases hain jo decide karte hain ki kya kab chalega. Call stack pehle, phir microtasks (Promises), phir macrotasks (setTimeout). Jaise multi-lane highway mein different lanes ki speed limits - priority order maintain karta hai.

**Theory:**
The event loop has specific phases that determine the order of execution for different types of asynchronous operations. Understanding these phases helps predict the exact order of execution.

**Exp:** Think of it like a multi-lane highway with different speed limits - some lanes (microtasks) always go first, then others (macrotasks) follow in a specific order.

```javascript
// EVENT LOOP PHASES:
// 1. Call Stack (synchronous code)
// 2. Microtask Queue (Promises, queueMicrotask)
// 3. Macrotask Queue (setTimeout, setInterval, I/O)
// 4. Render (if needed)

// Detailed execution order
console.log("1. Synchronous start");

// Macrotasks
setTimeout(() => console.log("6. setTimeout 0ms"), 0);
setTimeout(() => console.log("7. setTimeout 10ms"), 10);

// Microtasks
Promise.resolve().then(() => console.log("3. Promise 1"));
queueMicrotask(() => console.log("4. queueMicrotask"));

// More microtasks created by microtasks
Promise.resolve()
  .then(() => {
    console.log("5. Promise 2");
    return Promise.resolve();
  })
  .then(() => console.log("8. Chained Promise"));

console.log("2. Synchronous end");

// Output:
// 1. Synchronous start
// 2. Synchronous end
// 3. Promise 1
// 4. queueMicrotask
// 5. Promise 2
// 8. Chained Promise (microtask created by microtask runs first)
// 6. setTimeout 0ms
// 7. setTimeout 10ms

// Complex example showing all phases
function demonstrateEventLoop() {
  console.log("=== Event Loop Demo ===");

  // Synchronous code (runs immediately)
  console.log("1. Sync start");

  // Schedule macrotasks
  setTimeout(() => console.log("7. setTimeout 0"), 0);
  setImmediate(() => console.log("8. setImmediate")); // Node.js only

  // Schedule I/O (macrotask)
  if (typeof process !== "undefined") {
    process.nextTick(() => console.log("3. process.nextTick")); // Node.js - highest priority microtask
  }

  // Schedule microtasks
  Promise.resolve().then(() => {
    console.log("4. Promise 1");

    // Microtask inside microtask
    Promise.resolve().then(() => console.log("5. Nested Promise"));
    queueMicrotask(() => console.log("6. Nested queueMicrotask"));
  });

  queueMicrotask(() => console.log("2. queueMicrotask"));

  console.log("0. Sync end");
}

// Advanced: Mixing async/await with event loop
async function mixedAsync() {
  console.log("A1. Async function start");

  setTimeout(() => console.log("D. setTimeout in async"), 0);

  await Promise.resolve();
  console.log("B. After first await");

  await new Promise((resolve) => {
    console.log("C1. In Promise executor");
    resolve();
  });
  console.log("C2. After second await");

  return "async done";
}

console.log("Start");
mixedAsync().then((result) => console.log("E.", result));
console.log("End");

// Output:
// Start
// A1. Async function start
// C1. In Promise executor
// End
// B. After first await
// C2. After second await
// E. async done
// D. setTimeout in async

// Browser vs Node.js differences
function browserVsNode() {
  console.log("1. Start");

  setTimeout(() => console.log("4. setTimeout"), 0);

  if (typeof process !== "undefined") {
    // Node.js only
    process.nextTick(() => console.log("2. process.nextTick"));
    setImmediate(() => console.log("5. setImmediate"));
  }

  Promise.resolve().then(() => console.log("3. Promise"));

  console.log("1. End");

  // Browser output: Start, End, Promise, setTimeout
  // Node.js output: Start, End, process.nextTick, Promise, setTimeout, setImmediate
}

// Practical implications

// Problem: UI blocking
function blockingOperation() {
  console.log("Starting blocking operation");

  // This blocks the event loop
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // Blocking for 2 seconds
  }

  console.log("Blocking operation done");
}

// Solution: Break work into chunks
function nonBlockingOperation() {
  let count = 0;
  const total = 1000000;

  function processChunk() {
    const chunkSize = 10000;
    const end = Math.min(count + chunkSize, total);

    while (count < end) {
      // Do some work
      count++;
    }

    if (count < total) {
      // Use setTimeout to yield control back to event loop
      setTimeout(processChunk, 0);
    } else {
      console.log("Non-blocking operation done");
    }
  }

  processChunk();
}

// Understanding microtask queue exhaustion
function microtaskExhaustion() {
  console.log("1. Start");

  setTimeout(() => console.log("3. setTimeout"), 0);

  function createMicrotask(n) {
    if (n > 0) {
      Promise.resolve().then(() => {
        console.log(`2.${n} Microtask`);
        createMicrotask(n - 1); // Creates another microtask
      });
    }
  }

  createMicrotask(3);

  console.log("1. End");

  // Output:
  // 1. Start
  // 1. End
  // 2.3 Microtask
  // 2.2 Microtask
  // 2.1 Microtask
  // 3. setTimeout (runs after ALL microtasks)
}

// Performance considerations
function performanceExample() {
  // ❌ Bad: Starving the event loop with too many microtasks
  function tooManyMicrotasks() {
    Promise.resolve().then(tooManyMicrotasks);
  }

  // ✅ Good: Use macrotasks to allow other work
  function balancedWork() {
    setTimeout(balancedWork, 0);
  }

  // ✅ Better: Use requestAnimationFrame for UI updates
  function animationWork() {
    // Do animation work
    requestAnimationFrame(animationWork);
  }

  // ✅ Best: Use requestIdleCallback for non-urgent work
  function idleWork(deadline) {
    while (deadline.timeRemaining() > 0) {
      // Do non-urgent work
    }
    requestIdleCallback(idleWork);
  }
}

// Debugging event loop issues
function debugEventLoop() {
  // Measure task timing
  function measureTask(name, task) {
    const start = performance.now();
    const result = task();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  }

  // Detect long-running tasks
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 50) {
        // Tasks longer than 50ms
        console.warn("Long task detected:", entry);
      }
    });
  });

  if ("observe" in observer) {
    observer.observe({ entryTypes: ["longtask"] });
  }
}
```

[⬆️ Back to Top](#top)

---

[⬆️ Back to Top](#top)

---

## 40. Module Pattern (IIFE)

**Definition:** Creates private and public parts in code using IIFE.

**Exp:** Module pattern matlab private aur public members banane ka tarika. Jaise ghar mein private room aur public room hote hain - kuch cheezein sirf family ke liye, kuch sab ke liye.

**Theory:**
The Module Pattern is one of the most important design patterns in JavaScript. It uses IIFE (Immediately Invoked Function Expression) to create a private scope.

```javascript
const MyModule = (function () {
  // Private variables
  let privateVar = "I am private";
  let privateCounter = 0;

  // Private methods
  function privateMethod() {
    console.log("This is private");
  }

  // Public API
  return {
    publicMethod: function () {
      console.log("Public method called");
      privateMethod(); // Can access private
    },

    getCounter: function () {
      return privateCounter;
    },

    increment: function () {
      privateCounter++;
    },
  };
})();

// Usage
MyModule.publicMethod(); // Works
// MyModule.privateVar; // undefined - not accessible
```

[⬆️ Back to Top](#top)

---

## 41. Revealing Module Pattern

**Definition:** An improved version of Module Pattern where all functions are defined first and then selectively exposed at the end, providing better organization and readability.

**Exp:** Normal module pattern ka improved version - sab functions pehle define karte hain, phir end mein jo chaahiye wo reveal karte hain.

**Theory:**
The Revealing Module Pattern organizes code by defining all functions first and then revealing only what should be public.

```javascript
const RevealingModule = (function () {
  let privateVar = "Hidden";

  function privateFunction() {
    console.log(privateVar);
  }

  function publicFunction1() {
    privateFunction();
  }

  function publicFunction2() {
    console.log("Another public function");
  }

  // Reveal public pointers to private functions
  return {
    method1: publicFunction1,
    method2: publicFunction2,
  };
})();

// Usage
RevealingModule.method1(); // Works
RevealingModule.method2(); // Works
```

[⬆️ Back to Top](#top)

---

## 42. Factory Function Pattern

**Definition:** Factory Pattern creates objects without using the 'new' keyword. It's a function that returns new object instances, providing an alternative to constructor functions.

**Exp:** Factory pattern matlab objects banane ka function. Constructor function ka alternative hai jo 'new' keyword ki zaroorat nahi.

**Theory:**
Factory functions provide a clean way to create objects with private variables and methods.

```javascript
function createPerson(name, age) {
  // Private variable (closure)
  let _id = Math.random().toString(36).substr(2, 9);

  return {
    name: name,
    age: age,
    greet: function () {
      console.log(`Hi, I'm ${this.name}`);
    },
    getId: function () {
      return _id; // Access private variable
    },
    setAge: function (newAge) {
      if (newAge > 0 && newAge < 150) {
        this.age = newAge;
      }
    },
  };
}

const person1 = createPerson("John", 25);
const person2 = createPerson("Jane", 30);

person1.greet(); // "Hi, I'm John"
console.log(person1.getId()); // Returns private ID
```

[⬆️ Back to Top](#top)

---

## 43. Observer Pattern (Pub-Sub)

**Definition:** Observer Pattern allows objects to subscribe to events and get notified when those events occur. It implements a one-to-many dependency between objects.

**Exp:** Observer pattern matlab event system - jab koi change ho to sab interested parties ko notify kar dena. Jaise newspaper subscription - jab news aaye to sab subscribers ko mil jaye.

**Theory:**
The Observer Pattern is fundamental for event-driven programming and decoupling components.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe to event
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // Unsubscribe from event
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }

  // Emit event
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

// Usage
const emitter = new EventEmitter();

const handler1 = (data) => console.log("Handler 1:", data);
const handler2 = (data) => console.log("Handler 2:", data);

emitter.on("test", handler1);
emitter.on("test", handler2);
emitter.emit("test", "Hello World!");
```

[⬆️ Back to Top](#top)

---

## 44. Advanced Debouncing & Throttling

**Definition:** Advanced implementations of debouncing and throttling with additional features like immediate execution, leading/trailing edge control, and cancellation capabilities.

**Exp:** Debounce aur throttle ke advanced versions - zyada control aur features ke saath. Jaise immediate execution ya specific timing control.

**Theory:**
Advanced debouncing and throttling provide more granular control over function execution timing.

```javascript
// Advanced Debounce with immediate option
function debounce(func, delay, immediate = false) {
  let timeoutId;

  return function executedFunction(...args) {
    const callNow = immediate && !timeoutId;

    const later = () => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);

    if (callNow) func.apply(this, args);
  };
}

// Advanced Throttle with leading and trailing options
function throttle(func, limit, options = {}) {
  let timeout;
  let previous = 0;

  return function (...args) {
    const now = Date.now();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = limit - (now - previous);

    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}
```

[⬆️ Back to Top](#top)

---

## 45. Lazy Loading with IntersectionObserver

**Definition:** Lazy Loading defers loading of resources until they are needed. IntersectionObserver API provides an efficient way to detect when elements enter the viewport.

**Exp:** Lazy loading matlab images ya content ko tab load karna jab wo screen pe aane wale hain. Bandwidth save karta hai aur page fast load karta hai.

**Theory:**
Lazy loading improves performance by loading resources on demand rather than all at once.

```javascript
class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    };

    this.imageObserver = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options,
    );

    this.loadLazyImages();
  }

  loadLazyImages() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => this.imageObserver.observe(img));
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.imageObserver.unobserve(img);
      }
    });
  }

  loadImage(img) {
    const imageLoader = new Image();

    imageLoader.onload = () => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      img.classList.add("loaded");
    };

    imageLoader.src = img.dataset.src;
  }
}

// Usage
const lazyLoader = new LazyLoader();
```

[⬆️ Back to Top](#top)

---

## 46. DOM Optimization Techniques

**Definition:** Techniques to minimize DOM manipulation costs, reduce reflows and repaints, and improve rendering performance through efficient DOM updates.

**Exp:** DOM ko efficiently update karne ke tarike taaki browser ko baar baar redraw na karna pade. Performance improve karne ke advanced methods.

**Theory:**
DOM operations are expensive. Optimizing them is crucial for performance.

```javascript
// Bad - Multiple reflows
function badDOMUpdate() {
  const element = document.getElementById("myDiv");
  element.style.width = "200px"; // Reflow
  element.style.height = "200px"; // Reflow
  element.style.background = "red"; // Repaint
}

// Good - Batch DOM changes
function goodDOMUpdate() {
  const element = document.getElementById("myDiv");
  element.style.cssText = "width: 200px; height: 200px; background: red;";
}

// Document Fragment for multiple additions
function efficientDOMAddition(items) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  document.getElementById("list").appendChild(fragment);
}

// Virtual Scrolling for large lists
function createVirtualList(container, items, itemHeight, visibleCount) {
  let startIndex = 0;
  let endIndex = Math.min(visibleCount, items.length);

  const renderVisible = () => {
    container.innerHTML = "";

    for (let i = startIndex; i < endIndex; i++) {
      const item = document.createElement("div");
      item.style.top = `${i * itemHeight}px`;
      item.textContent = items[i];
      container.appendChild(item);
    }
  };

  container.addEventListener("scroll", () => {
    const scrollTop = container.scrollTop;
    startIndex = Math.floor(scrollTop / itemHeight);
    endIndex = Math.min(startIndex + visibleCount, items.length);
    renderVisible();
  });
}
```

[⬆️ Back to Top](#top)

---

## 47. Memory Leak Prevention

**Definition:** Strategies and patterns to prevent memory leaks by properly managing event listeners, timers, closures, and other references that can prevent garbage collection.

**Exp:** Memory leaks ko prevent karne ke tarike - timers, event listeners aur references ko properly clean up karna taaki memory free ho sake.

**Theory:**
Memory leaks occur when objects can't be garbage collected due to unwanted references.

```javascript
class ComponentWithCleanup {
  constructor(element) {
    this.element = element;
    this.timers = [];
    this.listeners = [];
    this.abortController = new AbortController();

    this.init();
  }

  init() {
    // Bind methods to preserve context
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);

    // Track event listeners for cleanup
    this.addEventListener(this.element, "click", this.handleClick);
    this.addEventListener(window, "resize", this.handleResize);

    // Track timers for cleanup
    this.setTimer(() => console.log("Timer executed"), 1000);

    // Use AbortController for fetch requests
    this.fetchData();
  }

  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.listeners.push({ element, event, handler });
  }

  setTimer(callback, delay) {
    const timerId = setTimeout(callback, delay);
    this.timers.push(timerId);
    return timerId;
  }

  async fetchData() {
    try {
      const response = await fetch("/api/data", {
        signal: this.abortController.signal,
      });
      // Handle response
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
      }
    }
  }

  // CRUCIAL: Cleanup method
  destroy() {
    // Clear all timers
    this.timers.forEach((id) => clearTimeout(id));
    this.timers = [];

    // Remove all event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];

    // Abort fetch requests
    this.abortController.abort();

    // Clear references
    this.element = null;
  }
}
```

[⬆️ Back to Top](#top)

---

## 48. Pure vs Impure Functions

**Definition:** Two types of functions based on predictability and side effects.

**Pure Function Exp:** Same input = same output. Koi side effects nahi. Jaise calculator - 2+2 hamesha 4 dega.
**Impure Function Exp:** Different output de sakta hai ya kuch change kar sakta hai outside. Jaise random number generator.

**Theory:**
Understanding pure vs impure functions is crucial for functional programming and debugging.

```javascript
// Pure Functions
const pureFunctions = {
  add: (a, b) => a + b,
  multiply: (x, y) => x * y,

  // Doesn't modify original array
  addToArray: (arr, item) => [...arr, item],

  // Same input always gives same output
  calculateArea: (radius) => Math.PI * radius * radius,
};

// Impure Functions
let counter = 0;
const config = { multiplier: 2 };

const impureFunctions = {
  // Modifies external variable
  increment: () => ++counter,

  // Depends on external state
  getMultipliedValue: (x) => x * config.multiplier,

  // Modifies original array (side effect)
  pushToArray: (arr, item) => {
    arr.push(item);
    return arr;
  },

  // Has side effect (console.log)
  logAndReturn: (value) => {
    console.log("Processing:", value);
    return value * 2;
  },
};

// Pure function benefits:
// 1. Predictable
// 2. Easy to test
// 3. Cacheable (memoization)
// 4. No side effects
console.log(pureFunctions.add(2, 3)); // Always 5
console.log(pureFunctions.add(2, 3)); // Always 5

// Impure function issues:
console.log(impureFunctions.increment()); // 1
console.log(impureFunctions.increment()); // 2 - Different result!
```

[⬆️ Back to Top](#top)

---

## 49. Function Composition & Pipelines

**Definition:** Function composition is combining simple functions to create more complex operations. Pipelines allow data to flow through multiple transformation functions in sequence.

**Exp:** Function composition matlab simple functions ko combine karke complex operations banana. Pipeline matlab data ko multiple functions se pass karna jaise factory assembly line.

**Theory:**
Functional composition promotes code reusability and readability by breaking complex operations into simple, composable functions.

```javascript
// Basic function composition
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

// Helper functions
const addTax = (price) => price * 1.1;
const addShipping = (price) => price + 15;
const applyDiscount = (price) => price * 0.9;
const round = (price) => Math.round(price * 100) / 100;

// Using pipe (left to right - more readable)
const calculateFinalPrice = pipe(
  applyDiscount, // First: Apply 10% discount
  addShipping, // Then: Add $15 shipping
  addTax, // Then: Add 10% tax
  round, // Finally: Round to 2 decimals
);

console.log(calculateFinalPrice(100)); // 111.5

// Data processing pipeline
const users = [
  { name: "John", age: 25, salary: 50000, active: true },
  { name: "Jane", age: 30, salary: 75000, active: false },
  { name: "Bob", age: 35, salary: 60000, active: true },
];

const result = users
  .filter((user) => user.active)
  .filter((user) => user.age >= 25)
  .map((user) => ({ ...user, bonus: user.salary * 0.1 }))
  .reduce((total, user) => total + user.salary, 0);

console.log("Total salary:", result);
```

[⬆️ Back to Top](#top)

---

## 50. Separation of Concerns (MVC Pattern)

**Definition:** Separation of Concerns is a design principle that divides a program into distinct sections, each handling a separate concern. MVC (Model-View-Controller) is a common architectural pattern implementing this principle.

**Exp:** Separation of concerns matlab different responsibilities ko alag alag sections mein divide karna. MVC pattern mein Model (data), View (UI), aur Controller (logic) separate hote hain.

**Theory:**
Separating concerns makes code more maintainable, testable, and scalable.

```javascript
// Model - Data and Business Logic
class TodoModel {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  addTodo(text) {
    if (!text.trim()) throw new Error("Todo text cannot be empty");

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
    };

    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      return this.todos.splice(index, 1)[0];
    }
    throw new Error("Todo not found");
  }

  getTodos() {
    return [...this.todos];
  }
}

// View - DOM Manipulation Only
class TodoView {
  constructor() {
    this.todoList = document.getElementById("todoList");
    this.todoInput = document.getElementById("todoInput");
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("addBtn").addEventListener("click", () => {
      if (this.onAddTodo) {
        this.onAddTodo(this.todoInput.value);
      }
    });
  }

  renderTodos(todos) {
    this.todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${todo.text}</span>
                <button onclick="todoController.deleteTodo(${todo.id})">Delete</button>
            `;
      this.todoList.appendChild(li);
    });
  }

  clearInput() {
    this.todoInput.value = "";
  }
}

// Controller - Connects Model and View
class TodoController {
  constructor() {
    this.model = new TodoModel();
    this.view = new TodoView();
    this.bindEvents();
  }

  bindEvents() {
    this.view.onAddTodo = (text) => this.addTodo(text);
  }

  addTodo(text) {
    try {
      this.model.addTodo(text);
      this.view.clearInput();
      this.updateView();
    } catch (error) {
      alert(error.message);
    }
  }

  deleteTodo(id) {
    try {
      this.model.deleteTodo(id);
      this.updateView();
    } catch (error) {
      alert(error.message);
    }
  }

  updateView() {
    this.view.renderTodos(this.model.getTodos());
  }
}
```

[⬆️ Back to Top](#top)

---

## 51. Custom Utility Implementations

**Definition:** Creating custom implementations of built-in methods and utilities to understand their inner workings and provide specialized functionality.

**Exp:** Built-in methods ko khud implement karna understanding improve karne ke liye. Jaise map(), filter() ko scratch se banana.

**Theory:**
Implementing utilities from scratch helps understand JavaScript fundamentals and provides learning insights.

```javascript
// Custom Array Methods
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Deep Clone Implementation
function deepClone(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (visited.has(obj)) return visited.get(obj);

  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  if (Array.isArray(obj)) {
    const clonedArray = [];
    visited.set(obj, clonedArray);
    obj.forEach((item, index) => {
      clonedArray[index] = deepClone(item, visited);
    });
    return clonedArray;
  }

  const clonedObj = {};
  visited.set(obj, clonedObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key], visited);
    }
  }

  return clonedObj;
}

// Memoization utility
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage examples
const numbers = [1, 2, 3, 4];
console.log(numbers.myMap((x) => x * 2)); // [2, 4, 6, 8]

const expensiveFunction = memoize((n) => {
  console.log("Computing...");
  return n * n;
});

console.log(expensiveFunction(5)); // Computing... 25
console.log(expensiveFunction(5)); // 25 (cached, no "Computing...")
```

[⬆️ Back to Top](#top)

---

## 52. JavaScript Engine & Event Loop Deep Dive

**Definition:** Understanding how JavaScript engines work, including the call stack, heap memory, event loop, microtasks, and macrotasks to comprehend asynchronous behavior.

**Exp:** JavaScript engine kaise kaam karta hai browser mein - call stack, memory, event loop sab kaise coordinate karte hain asynchronous operations ke liye.

**Theory:**
The JavaScript engine consists of a call stack, heap memory, and event loop that work together to execute code.

```javascript
// Event Loop Demonstration
console.log("1. Start");

// Synchronous code
console.log("2. Synchronous");

// Macrotask (Timer API)
setTimeout(() => {
  console.log("5. Macrotask (setTimeout)");
}, 0);

// Microtask (Promise)
Promise.resolve().then(() => {
  console.log("4. Microtask (Promise)");
});

console.log("3. End");

// Output: 1, 2, 3, 4, 5
// Explanation: Call stack first, then microtasks, then macrotasks

// Call Stack visualization
function callStackDemo() {
  console.log("Call Stack Demo:");

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

  // Stack trace: first() -> second() -> third()
  // LIFO: third() pops first, then second(), then first()
}

// Microtask vs Macrotask priority
function queuePriorityDemo() {
  console.log("=== Queue Priority Demo ===");

  // Macrotasks (Task Queue)
  setTimeout(() => console.log("Macrotask 1"), 0);
  setTimeout(() => console.log("Macrotask 2"), 0);

  // Microtasks (Microtask Queue) - Higher priority
  Promise.resolve().then(() => console.log("Microtask 1"));
  Promise.resolve().then(() => {
    console.log("Microtask 2");
    // Nested microtask - still higher priority than macrotasks
    Promise.resolve().then(() => console.log("Nested Microtask"));
  });

  console.log("Synchronous");

  // Output:
  // Synchronous
  // Microtask 1
  // Microtask 2
  // Nested Microtask
  // Macrotask 1
  // Macrotask 2
}
```

[⬆️ Back to Top](#top)

---

## 53. Web APIs & Browser Threading

**Definition:** Web APIs provide browser functionality beyond core JavaScript, including DOM manipulation, network requests, timers, and geolocation. Understanding how these work with the single-threaded JavaScript runtime.

**Exp:** Web APIs browser ki extra functionality provide karte hain jo JavaScript ke core part nahi hain. Yeh background mein run karte hain aur event loop ke through JavaScript se communicate karte hain.

**Theory:**
Web APIs run in separate threads but communicate with JavaScript through the event loop and callback queues.

```javascript
// Web APIs Demo
class WebAPIsDemo {
  constructor() {
    this.demonstrateWebAPIs();
  }

  demonstrateWebAPIs() {
    console.log("=== Web APIs Demonstration ===");

    // DOM API
    if (typeof document !== "undefined") {
      document.addEventListener("click", (event) => {
        console.log("DOM Event handled by Web API");
        console.log("Clicked at:", event.clientX, event.clientY);
      });
    }

    // Timer API (handled by browser, not JavaScript engine)
    const timerId = setTimeout(() => {
      console.log("Timer API callback executed");
    }, 1000);

    // Network API (Fetch)
    if (typeof fetch !== "undefined") {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetch API result:", data.title);
        })
        .catch((error) => {
          console.log("Fetch API error:", error.message);
        });
    }

    // Geolocation API
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation API success:", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolocation API error:", error.message);
        },
      );
    }

    // Local Storage API
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("webapi-demo", "test-value");
      console.log("LocalStorage API:", localStorage.getItem("webapi-demo"));
    }
  }

  // Demonstrate how Web APIs don't block the main thread
  demonstrateNonBlocking() {
    console.log("Before long-running Web API call");

    // This doesn't block JavaScript execution
    setTimeout(() => {
      console.log("Long-running timer completed");
    }, 3000);

    console.log("After Web API call (not blocked)");

    // JavaScript continues executing while Web API runs in background
    for (let i = 0; i < 3; i++) {
      console.log(`Loop iteration ${i}`);
    }
  }
}

// Browser Threading Model
/*
Browser has multiple threads:
1. JavaScript Engine Thread (single-threaded)
2. GUI Rendering Thread
3. Timer Thread
4. Network Thread  
5. File I/O Thread

Web APIs run on separate threads and communicate via:
- Task Queue (Macrotasks)
- Microtask Queue
- Event Loop coordinates between threads
*/
```

[⬆️ Back to Top](#top)

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

[⬆️ Back to Top](#top)

**Good luck with your interviews! 🚀**
