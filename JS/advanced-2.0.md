# 🚀 Complete Advanced JavaScript Mastery Guide

## 📚 Table of Contents

1. [Scope, Execution Context & Closures](#1-scope-execution-context--closures)
2. [The 'this' Keyword - All Scenarios](#2-the-this-keyword---all-scenarios)  
3. [Call, Apply & Bind Methods](#3-call-apply--bind-methods)
4. [Object Oriented Programming (OOP)](#4-object-oriented-programming-oop-in-javascript)
5. [Callbacks, Promises & Async/Await](#5-callbacks-promises--asyncawait)
6. [Fetch API & HTTP Basics](#6-fetch-api--http-basics)

---

## 1. Scope, Execution Context & Closures

### 🎯 What is Scope?

**Scope** determines where variables are accessible in your code. Think of it as the "visibility" of variables.

#### Types of Scope:

```javascript
// 🌍 GLOBAL SCOPE - Accessible everywhere
var globalVar = "I'm accessible everywhere";
let globalLet = "Global let variable";
const globalConst = "Global const variable";

function myFunction() {
    // 🏠 FUNCTION SCOPE - Only accessible within this function
    var functionVar = "Only inside function";
    
    if (true) {
        // 🧱 BLOCK SCOPE - Only accessible within these {}
        let blockLet = "Only in this block";
        const blockConst = "Also only in this block";
        var varInBlock = "Var ignores block scope!";
    }
    
    console.log(varInBlock); // ✅ Works - var ignores blocks
    // console.log(blockLet); // ❌ Error - let respects blocks
}
```

### ⚙️ Execution Context

**Execution Context** is like a container that holds:
- **Variables Environment** (where variables live)
- **Scope Chain** (where to look for variables)
- **this binding** (what 'this' points to)

#### Phases:
1. **Creation Phase**: Hoisting happens, 'this' is bound, scope chain created
2. **Execution Phase**: Code runs line by line

```javascript
function executionExample() {
    // Creation Phase: hoistedVar is declared (undefined)
    console.log(hoistedVar); // undefined (not error!)
    
    // Execution Phase: hoistedVar gets its value
    var hoistedVar = "Now I have a value!";
    console.log(hoistedVar); // "Now I have a value!"
}
```

### 🔒 Closures - The JavaScript Magic

**Closure**: A function that "remembers" variables from its outer scope even after the outer function has finished running.

#### Why Closures are Amazing:
- ✅ Create private variables
- ✅ Data persistence between function calls
- ✅ Function factories
- ✅ Module pattern

```javascript
// 🏭 Function Factory Example
function createCounter(initialValue = 0) {
    let count = initialValue; // Private variable
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => count = initialValue
    };
}

const counter1 = createCounter(10);
const counter2 = createCounter(0);

counter1.increment(); // 11
counter2.increment(); // 1
// Each counter has its own private 'count' variable!
```

#### Real-World Closure Examples:

```javascript
// 🛡️ Data Privacy
function bankAccount(initialBalance) {
    let balance = initialBalance; // Private!
    
    return {
        deposit: (amount) => balance += amount,
        withdraw: (amount) => balance >= amount ? balance -= amount : "Insufficient funds",
        getBalance: () => balance
        // No direct access to 'balance' from outside!
    };
}

// 🎯 Event Handler with Memory
function setupButtonCounter(buttonId) {
    let clickCount = 0;
    
    document.getElementById(buttonId).addEventListener('click', function() {
        clickCount++;
        console.log(`Button clicked ${clickCount} times`);
        // clickCount persists between clicks!
    });
}
```

---

## 2. The 'this' Keyword - All Scenarios

### 🎯 Understanding 'this'

**'this'** refers to the object that is executing the current function. Its value depends on **HOW** the function is called, not **WHERE** it's defined.

### 📋 The 'this' Rules (Priority Order):

#### 1. 🏹 Arrow Functions (Lexical 'this')
```javascript
const obj = {
    name: "My Object",
    regularMethod: function() {
        console.log(this.name); // "My Object"
        
        const arrowFunction = () => {
            console.log(this.name); // "My Object" (inherits from parent)
        };
        
        function regularFunction() {
            console.log(this.name); // undefined (default binding)
        }
        
        arrowFunction();
        regularFunction();
    }
};
```

#### 2. 🆕 New Binding
```javascript
function Person(name, age) {
    this.name = name; // 'this' refers to the new object being created
    this.age = age;
}

const alice = new Person("Alice", 25);
// 'this' inside Person refers to the alice object
```

#### 3. 🎯 Explicit Binding (call, apply, bind)
```javascript
const person = { name: "John" };

function sayHello() {
    console.log(`Hello, I'm ${this.name}`);
}

sayHello.call(person);  // "Hello, I'm John"
sayHello.apply(person); // "Hello, I'm John"

const boundFunction = sayHello.bind(person);
boundFunction(); // "Hello, I'm John"
```

#### 4. 🏠 Implicit Binding (Object Methods)
```javascript
const calculator = {
    value: 0,
    add: function(num) {
        this.value += num; // 'this' refers to calculator object
        return this;
    },
    multiply: function(num) {
        this.value *= num; // 'this' refers to calculator object
        return this;
    }
};

calculator.add(5).multiply(3); // Method chaining
console.log(calculator.value); // 15
```

#### 5. 🌐 Default Binding
```javascript
function globalFunction() {
    console.log(this); // Window object (browser) or undefined (strict mode)
}

globalFunction();
```

### ⚠️ Common 'this' Pitfalls & Solutions:

```javascript
const problematic = {
    name: "Problem Object",
    items: ["item1", "item2"],
    
    showItems: function() {
        // ❌ Problem: 'this' is lost in callback
        this.items.forEach(function(item) {
            // console.log(`${this.name} has ${item}`); // 'this' is undefined
        });
        
        // ✅ Solution 1: Arrow function
        this.items.forEach((item) => {
            console.log(`${this.name} has ${item}`); // 'this' preserved
        });
        
        // ✅ Solution 2: bind()
        this.items.forEach(function(item) {
            console.log(`${this.name} has ${item}`);
        }.bind(this));
        
        // ✅ Solution 3: Store reference
        const self = this;
        this.items.forEach(function(item) {
            console.log(`${self.name} has ${item}`);
        });
    }
};
```

---

## 3. Call, Apply & Bind Methods

### 🎯 The Power Trio

These methods let you explicitly control what **'this'** refers to in any function.

### 📞 call() Method
```javascript
function.call(thisArg, arg1, arg2, ...)
```

```javascript
const person1 = { name: "Alice", age: 25 };
const person2 = { name: "Bob", age: 30 };

function introduce(job, hobby) {
    return `Hi! I'm ${this.name}, ${this.age} years old. I work as a ${job} and love ${hobby}.`;
}

// Using call() - arguments passed individually
console.log(introduce.call(person1, "Developer", "coding"));
// "Hi! I'm Alice, 25 years old. I work as a Developer and love coding."
```

### 🍎 apply() Method
```javascript
function.apply(thisArg, [arg1, arg2, ...])
```

```javascript
// Using apply() - arguments passed as array
console.log(introduce.apply(person2, ["Designer", "painting"]));
// "Hi! I'm Bob, 30 years old. I work as a Designer and love painting."

// Practical: Finding max in array
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.apply(null, numbers)); // 7
// Modern way: Math.max(...numbers)
```

### 🔗 bind() Method
```javascript
const boundFunction = function.bind(thisArg, arg1, arg2, ...)
```

```javascript
// bind() returns a new function - doesn't call immediately
const aliceIntro = introduce.bind(person1);
console.log(aliceIntro("Teacher", "reading"));

// Partial application
const aliceTeacher = introduce.bind(person1, "Teacher");
console.log(aliceTeacher("swimming")); // Only need to pass hobby
```

### 🛠️ Real-World Use Cases:

#### 1. Method Borrowing
```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// Borrow push method
Array.prototype.push.apply(array1, array2);
console.log(array1); // [1, 2, 3, 4, 5, 6]

// Modern way: array1.push(...array2)
```

#### 2. Converting Array-like Objects
```javascript
function convertArguments() {
    // arguments is array-like, not real array
    const realArray = Array.prototype.slice.call(arguments);
    return realArray;
}

console.log(convertArguments(1, 2, 3, 4)); // [1, 2, 3, 4]
// Modern way: Array.from(arguments) or [...arguments]
```

#### 3. Event Handler Binding
```javascript
class Counter {
    constructor() {
        this.count = 0;
        this.button = document.getElementById('myButton');
        
        // Without bind, 'this' would refer to button, not Counter
        this.button.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick() {
        this.count++;
        console.log(`Clicked ${this.count} times`);
    }
}
```

---

## 4. Object Oriented Programming (OOP) in JavaScript

### 🎯 OOP Principles in JavaScript

JavaScript supports multiple OOP patterns:
- **Encapsulation**: Bundling data and methods
- **Inheritance**: Creating new classes based on existing ones
- **Polymorphism**: Same interface, different implementations
- **Abstraction**: Hiding implementation details

### 🏗️ Constructor Functions (ES5 Way)

```javascript
function Animal(name, species) {
    this.name = name;
    this.species = species;
    this.isAlive = true;
}

// Add methods to prototype (shared among all instances)
Animal.prototype.speak = function() {
    return `${this.name} the ${this.species} makes a sound`;
};

Animal.prototype.eat = function(food) {
    return `${this.name} is eating ${food}`;
};

// Create instances
const lion = new Animal("Simba", "Lion");
const elephant = new Animal("Dumbo", "Elephant");

console.log(lion.speak()); // "Simba the Lion makes a sound"
```

### 🧬 Inheritance with Prototypes

```javascript
function Dog(name, breed) {
    Animal.call(this, name, "Dog"); // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override parent method
Dog.prototype.speak = function() {
    return `${this.name} the ${this.breed} barks: Woof!`;
};

// Add new method
Dog.prototype.wagTail = function() {
    return `${this.name} is wagging tail!`;
};

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.speak());   // "Buddy the Golden Retriever barks: Woof!"
console.log(myDog.eat("bone")); // "Buddy is eating bone" (inherited)
```

### 🆕 ES6 Classes (Modern Way)

```javascript
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        return `${this.make} ${this.model} is now running`;
    }
    
    stop() {
        this.isRunning = false;
        return `${this.make} ${this.model} has stopped`;
    }
    
    // Static method (called on class, not instance)
    static compare(vehicle1, vehicle2) {
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
        const result = super.start();
        return `${result}. All ${this.doors} doors locked.`;
    }
    
    honk() {
        return `${this.make} ${this.model}: BEEP BEEP!`;
    }
}

const myCar = new Car("Toyota", "Camry", 2023, 4);
console.log(myCar.start()); // "Toyota Camry is now running. All 4 doors locked."
```

### 🔒 Private Fields and Methods (ES2022)

```javascript
class BankAccount {
    #balance = 0;           // Private field
    #accountNumber;         // Private field
    
    constructor(owner, initialBalance = 0) {
        this.owner = owner;
        this.#balance = initialBalance;
        this.#accountNumber = this.#generateAccountNumber();
    }
    
    // Private method
    #generateAccountNumber() {
        return Math.floor(Math.random() * 1000000);
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return `Deposited $${amount}. Balance: $${this.#balance}`;
        }
        return "Amount must be positive";
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return `Withdrew $${amount}. Balance: $${this.#balance}`;
        }
        return "Invalid amount";
    }
    
    getBalance() {
        return this.#balance; // Controlled access to private field
    }
}

const account = new BankAccount("John", 1000);
console.log(account.deposit(500));  // "Deposited $500. Balance: $1500"
// console.log(account.#balance);   // ❌ SyntaxError - can't access private field
```

### 🎛️ Getters and Setters

```javascript
class Temperature {
    constructor(celsius = 0) {
        this._celsius = celsius;
    }
    
    // Getter - access like a property
    get celsius() {
        return this._celsius;
    }
    
    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    }
    
    get kelvin() {
        return this._celsius + 273.15;
    }
    
    // Setter - assign like a property
    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Cannot be below absolute zero");
        }
        this._celsius = value;
    }
    
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature(25);
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F`); // "25°C = 77°F"

temp.fahrenheit = 100; // Using setter
console.log(`New temp: ${temp.celsius}°C`); // "New temp: 37.78°C"
```

### 🧩 Mixin Pattern

```javascript
// Mixins are reusable functionality
const Flyable = {
    fly() { return `${this.name} is flying!`; },
    land() { return `${this.name} has landed`; }
};

const Swimmable = {
    swim() { return `${this.name} is swimming!`; },
    dive() { return `${this.name} is diving!`; }
};

class Duck {
    constructor(name) {
        this.name = name;
        // Add multiple mixins
        Object.assign(this, Flyable, Swimmable);
    }
    
    quack() {
        return `${this.name}: Quack!`;
    }
}

const duck = new Duck("Donald");
console.log(duck.fly());   // "Donald is flying!"
console.log(duck.swim());  // "Donald is swimming!"
console.log(duck.quack()); // "Donald: Quack!"
```

---

## 5. Callbacks, Promises & Async/Await

### 🎯 The Evolution of Async JavaScript

JavaScript handles asynchronous operations in three main ways:
1. **Callbacks** (oldest, can create "callback hell")
2. **Promises** (ES6, much cleaner)
3. **Async/Await** (ES2017, looks like synchronous code)

### 📞 Callbacks

**Callback**: A function passed as an argument to another function, executed after some operation completes.

```javascript
// Simple callback
function greetUser(name, callback) {
    console.log(`Hello, ${name}!`);
    callback(); // Execute the callback
}

greetUser("Alice", function() {
    console.log("Nice to meet you!");
});

// Async callback with setTimeout
function delayedMessage(message, delay, callback) {
    setTimeout(() => {
        console.log(message);
        callback();
    }, delay);
}

delayedMessage("This is delayed!", 2000, () => {
    console.log("Callback executed!");
});
```

#### Array Methods with Callbacks
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - select elements that match condition
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce - combine all elements into single value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15
```

#### ⚠️ Callback Hell Problem
```javascript
// This creates hard-to-read nested code
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            // ... more nesting
            console.log("Finally done!");
        });
    });
});
```

### 🤝 Promises

**Promise**: An object representing the eventual completion (or failure) of an asynchronous operation.

#### Promise States:
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

```javascript
// Creating a Promise
function fetchData(shouldSucceed = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve("Data fetched successfully!");
            } else {
                reject(new Error("Failed to fetch data"));
            }
        }, 2000);
    });
}

// Using Promises
fetchData(true)
    .then(data => {
        console.log("Success:", data);
        return "Processing data...";
    })
    .then(processed => {
        console.log("Processed:", processed);
    })
    .catch(error => {
        console.error("Error:", error.message);
    })
    .finally(() => {
        console.log("Operation completed");
    });
```

#### Promise Chaining (Solves Callback Hell)
```javascript
function step1() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 1 complete");
            resolve("Step 1 data");
        }, 1000);
    });
}

function step2(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 2 complete with:", data);
            resolve("Step 2 data");
        }, 1000);
    });
}

function step3(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 3 complete with:", data);
            resolve("Final result");
        }, 1000);
    });
}

// Clean chain instead of nested callbacks
step1()
    .then(result1 => step2(result1))
    .then(result2 => step3(result2))
    .then(finalResult => {
        console.log("All steps done:", finalResult);
    })
    .catch(error => {
        console.error("Error in chain:", error);
    });
```

#### Promise Utility Methods
```javascript
const promise1 = fetchData(true);
const promise2 = fetchData(true);
const promise3 = fetchData(false);

// Promise.all() - wait for all to succeed
Promise.all([promise1, promise2])
    .then(results => {
        console.log("All succeeded:", results);
    })
    .catch(error => {
        console.log("At least one failed:", error);
    });

// Promise.race() - first one to complete wins
Promise.race([promise1, promise2, promise3])
    .then(result => {
        console.log("First to complete:", result);
    });

// Promise.allSettled() - wait for all regardless of outcome
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index}: Success -`, result.value);
            } else {
                console.log(`Promise ${index}: Failed -`, result.reason);
            }
        });
    });
```

### ⚡ Async/Await

**Async/Await**: Syntactic sugar over Promises that makes async code look synchronous.

```javascript
// Async function always returns a Promise
async function fetchUserData(id) {
    try {
        console.log(`Fetching user ${id}...`);
        
        // await pauses execution until Promise resolves
        const user = await fetch(`/api/users/${id}`).then(r => r.json());
        console.log("User:", user.name);
        
        const posts = await fetch(`/api/users/${id}/posts`).then(r => r.json());
        console.log("Posts:", posts.length);
        
        return { user, posts };
        
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw to let caller handle
    }
}

// Using async function
fetchUserData(123)
    .then(result => {
        console.log("Got user data:", result);
    })
    .catch(error => {
        console.error("Failed to get user:", error);
    });
```

#### Sequential vs Parallel Execution
```javascript
// ❌ Sequential (slow) - operations wait for each other
async function sequentialFetch() {
    const start = Date.now();
    
    const user = await fetchData(); // Wait 2s
    const posts = await fetchData(); // Wait another 2s
    const comments = await fetchData(); // Wait another 2s
    
    console.log(`Sequential took: ${Date.now() - start}ms`); // ~6000ms
    return [user, posts, comments];
}

// ✅ Parallel (fast) - operations run simultaneously
async function parallelFetch() {
    const start = Date.now();
    
    // Start all operations at once
    const [user, posts, comments] = await Promise.all([
        fetchData(), // All start together
        fetchData(), // All start together  
        fetchData()  // All start together
    ]);
    
    console.log(`Parallel took: ${Date.now() - start}ms`); // ~2000ms
    return [user, posts, comments];
}
```

#### Real-World Example: API Operations
```javascript
class UserService {
    async getUser(id) {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) {
                throw new Error(`User not found: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Get user error:", error);
            throw error;
        }
    }
    
    async getUserWithPosts(id) {
        try {
            // Fetch user and posts in parallel for better performance
            const [user, posts] = await Promise.all([
                this.getUser(id),
                fetch(`/api/users/${id}/posts`).then(r => r.json())
            ]);
            
            return { ...user, posts };
            
        } catch (error) {
            console.error("Get user with posts error:", error);
            throw error;
        }
    }
    
    async processMultipleUsers(userIds) {
        const results = [];
        
        // Process users with error handling
        for (const id of userIds) {
            try {
                const user = await this.getUserWithPosts(id);
                results.push(user);
            } catch (error) {
                console.error(`Failed to process user ${id}:`, error.message);
                results.push({ id, error: error.message });
            }
        }
        
        return results;
    }
}
```

---

## 6. Fetch API & HTTP Basics

### 🌐 HTTP Fundamentals

**HTTP (HyperText Transfer Protocol)**: The foundation of data communication on the web.

#### HTTP Methods:
- **GET**: Retrieve data (should not modify server)
- **POST**: Create new resource
- **PUT**: Update entire resource (replace)
- **PATCH**: Partial update of resource  
- **DELETE**: Remove resource
- **HEAD**: Get headers only (no body)
- **OPTIONS**: Get allowed methods

#### HTTP Status Codes:
- **2xx Success**: 200 OK, 201 Created, 204 No Content
- **3xx Redirection**: 301 Moved, 304 Not Modified
- **4xx Client Error**: 400 Bad Request, 401 Unauthorized, 404 Not Found
- **5xx Server Error**: 500 Internal Error, 503 Service Unavailable

### 🎣 Fetch API Basics

**Fetch**: Modern way to make HTTP requests (replaces XMLHttpRequest).

```javascript
// Basic GET request
async function basicFetch() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // Always check if request succeeded
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Data:", data);
        
        // Response object properties
        console.log("Status:", response.status);      // 200
        console.log("Status Text:", response.statusText); // "OK"
        console.log("Headers:", response.headers);
        
    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Request error:", error.message);
        }
    }
}
```

### 📝 Different HTTP Methods with Fetch

#### POST Request (Create Data)
```javascript
async function createPost(postData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
            throw new Error(`POST failed: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Created:", result);
        return result;
        
    } catch (error) {
        console.error("Create error:", error);
        throw error;
    }
}

// Usage
createPost({
    title: "My New Post",
    body: "This is the content of my post",
    userId: 1
});
```

#### PUT Request (Full Update)
```javascript
async function updatePost(id, postData) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });
    
    return await response.json();
}

// Usage
updatePost(1, {
    id: 1,
    title: "Updated Title",
    body: "Updated content",
    userId: 1
});
```

#### PATCH Request (Partial Update)
```javascript
async function patchPost(id, updates) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    
    return await response.json();
}

// Usage - only update title
patchPost(1, { title: "New Title Only" });
```

#### DELETE Request
```javascript
async function deletePost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        console.log(`Post ${id} deleted`);
        return true;
    }
    throw new Error(`Delete failed: ${response.status}`);
}
```

### 🔧 Advanced Fetch Features

#### Request with Timeout
```javascript
async function fetchWithTimeout(url, timeoutMs = 5000) {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return await response.json();
        
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeoutMs}ms`);
        }
        throw error;
    }
}
```

#### Authentication & Custom Headers
```javascript
async function authenticatedRequest(url, token) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'User-Agent': 'MyApp/1.0',
            'X-Custom-Header': 'CustomValue'
        }
    });
    
    if (response.status === 401) {
        throw new Error('Unauthorized - Invalid token');
    }
    
    return await response.json();
}
```

#### File Upload with FormData
```javascript
async function uploadFile(file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add other form fields
    Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
    });
    
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData // Don't set Content-Type for FormData
    });
    
    return await response.json();
}

// Usage with file input
// const fileInput = document.getElementById('fileInput');
// uploadFile(fileInput.files[0], { category: 'images', userId: 123 });
```

### 🏗️ Complete API Client Class

```javascript
class APIClient {
    constructor(baseURL, defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };
        
        try {
            console.log(`${config.method || 'GET'} ${url}`);
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            // Handle different content types
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
            
        } catch (error) {
            console.error(`API Error: ${error.message}`);
            throw error;
        }
    }
    
    // Convenience methods
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT', 
            body: JSON.stringify(data)
        });
    }
    
    async patch(endpoint, data) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Usage
const api = new APIClient('https://jsonplaceholder.typicode.com');

async function exampleUsage() {
    try {
        // Get all posts
        const posts = await api.get('/posts');
        console.log(`Found ${posts.length} posts`);
        
        // Create new post
        const newPost = await api.post('/posts', {
            title: 'My Post',
            body: 'Post content',
            userId: 1
        });
        console.log('Created:', newPost);
        
        // Update post
        const updated = await api.put('/posts/1', {
            id: 1,
            title: 'Updated Post',
            body: 'Updated content',
            userId: 1
        });
        console.log('Updated:', updated);
        
        // Delete post
        await api.delete('/posts/1');
        console.log('Post deleted');
        
    } catch (error) {
        console.error('API operations failed:', error.message);
    }
}
```

---

## 🎉 Congratulations! You've Mastered Advanced JavaScript!

### 🎯 What You've Learned:

#### ✅ **Scope, Execution Context & Closures**
- Global, Function, and Block Scope
- Execution Context phases
- Closures for data privacy and persistence

#### ✅ **The 'this' Keyword**  
- Arrow functions (lexical this)
- new, explicit, implicit, and default binding
- Common pitfalls and solutions

#### ✅ **Call, Apply & Bind**
- Method borrowing and 'this' control
- Function currying and partial application
- Event handler binding

#### ✅ **Object Oriented Programming**
- Constructor functions and prototypes
- ES6 Classes with inheritance
- Private fields, getters/setters, mixins

#### ✅ **Callbacks, Promises & Async/Await**
- Evolution from callbacks to modern async patterns
- Promise chaining and utility methods
- Clean async code with async/await

#### ✅ **Fetch API & HTTP Basics**
- HTTP methods and status codes
- Modern API communication
- Error handling and advanced features

### 🚀 Next Steps:

1. **Practice Projects**: Build real applications using these concepts
2. **Explore Frameworks**: React, Vue, Angular (they use these concepts heavily)
3. **Learn Node.js**: Server-side JavaScript
4. **Study TypeScript**: Type-safe JavaScript
5. **Master Testing**: Jest, Cypress for reliable code
6. **Stay Updated**: JavaScript evolves constantly!

### 💡 Pro Tips:

- **Practice Daily**: Code every day to reinforce concepts
- **Read Code**: Study other developers' implementations  
- **Build Projects**: Apply concepts in real-world scenarios
- **Join Communities**: Connect with other JavaScript developers
- **Keep Learning**: JavaScript ecosystem is always evolving

---

**Happy Coding! 🎉 You're now equipped with advanced JavaScript skills to build amazing applications!**