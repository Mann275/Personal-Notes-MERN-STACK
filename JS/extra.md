# Advanced JavaScript Concepts

## 1. Design Patterns in JavaScript

**Exp:** Design patterns matlab reusable solutions hain common programming problems ke liye. Yeh proven approaches hain jo code ko organized aur maintainable banate hain.

### Module Pattern (IIFE)

**Exp:** Module pattern matlab private aur public members banane ka tarika. IIFE use karke private scope create karte hain.

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
```

### Revealing Module Pattern

**Exp:** Normal module pattern ka improved version - sab functions pehle define karte hain, phir end mein reveal karte hain.

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
```

### Factory Function Pattern

**Exp:** Factory pattern matlab objects banane ka function. Constructor function ka alternative hai.

```javascript
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet: function () {
      console.log(`Hi, I'm ${this.name}`);
    },
    getAge: function () {
      return this.age;
    },
  };
}

const person1 = createPerson("John", 25);
const person2 = createPerson("Jane", 30);
```

### Observer Pattern (Basic Pub-Sub)

**Exp:** Observer pattern matlab event system - jab koi change ho to sab interested parties ko notify kar dena.

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

## 2. Performance Optimization

**Exp:** Performance optimization matlab application ko fast aur efficient banane ke techniques. Memory, loading time aur user experience improve karne ke tarike.

### Debouncing and Throttling

**Exp:** Function calls ko control karne ke advanced tarike.

```javascript
// Debounce - Wait for pause in activity
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle - Limit execution frequency
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

// Usage examples
const debouncedSearch = debounce(function (query) {
  console.log("Searching for:", query);
}, 300);

const throttledScroll = throttle(function () {
  console.log("Scroll event");
}, 100);
```

### Lazy Loading Images with IntersectionObserver

**Exp:** Images ko tab load karna jab wo screen pe aane wale hain - bandwidth save karta hai.

```javascript
// Lazy loading implementation
class LazyLoader {
  constructor() {
    this.imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    this.loadLazyImages();
  }

  loadLazyImages() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => this.imageObserver.observe(img));
  }
}

// Usage
const lazyLoader = new LazyLoader();
```

### Code Splitting (Intro level)

**Exp:** Code ko chhote parts mein divide karna taaki sirf zaroorat ke hisaab se load ho.

```javascript
// Dynamic imports for code splitting
async function loadModule() {
  try {
    const module = await import("./heavyModule.js");
    module.init();
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}

// Load on demand
document.getElementById("loadBtn").addEventListener("click", loadModule);
```

### Avoiding Unnecessary Reflows and Repaints

**Exp:** DOM changes ko optimize karna taaki browser ko baar baar redraw na karna pade.

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
  // Or use classes
  // element.className = 'newStyle';
}

// Document Fragment for multiple additions
function efficientDOMAddition(items) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  document.getElementById("list").appendChild(fragment); // Single reflow
}
```

### Memory Leaks: Timers, Event Listeners

**Exp:** Memory leaks ko prevent karna - timers aur event listeners ko properly clean up karna.

```javascript
class ComponentWithCleanup {
  constructor() {
    this.intervalId = null;
    this.handleClick = this.handleClick.bind(this);
    this.init();
  }

  init() {
    // Timer that could cause memory leak
    this.intervalId = setInterval(() => {
      console.log("Timer running");
    }, 1000);

    // Event listener that could cause memory leak
    document.addEventListener("click", this.handleClick);
  }

  handleClick(event) {
    console.log("Clicked at:", event.clientX, event.clientY);
  }

  // Cleanup method - IMPORTANT!
  destroy() {
    // Clear timer
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Remove event listener
    document.removeEventListener("click", this.handleClick);
  }
}

// Usage
const component = new ComponentWithCleanup();

// When component is no longer needed
// component.destroy(); // Prevent memory leaks
```

## 3. Advanced Topics & Architecture Thinking

**Exp:** Advanced topics matlab complex concepts aur clean architecture banane ke principles. Professional development mein use hone wale patterns aur best practices.

### Pure vs Impure Functions

**Exp:** Pure functions predictable hote hain - same input se same output, no side effects.

```javascript
// Pure function - no side effects, same input = same output
function pureFunctions() {
  // Pure
  const add = (a, b) => a + b;
  const multiply = (x) => x * 2;

  // Pure - doesn't modify original array
  const addToArray = (arr, item) => [...arr, item];

  return { add, multiply, addToArray };
}

// Impure function - has side effects
function impureFunctions() {
  let counter = 0;

  // Impure - modifies external variable
  const increment = () => ++counter;

  // Impure - modifies original array
  const pushToArray = (arr, item) => {
    arr.push(item);
    return arr;
  };

  // Impure - depends on external state
  const getCurrentCount = () => counter;

  return { increment, pushToArray, getCurrentCount };
}
```

### Functional Programming Basics (map/filter/reduce as Pipeline)

**Exp:** Functional programming matlab functions ko pipeline ki tarah use karna - data transform karne ke liye.

```javascript
// Functional programming pipeline
const users = [
  { name: "John", age: 25, salary: 50000, active: true },
  { name: "Jane", age: 30, salary: 75000, active: false },
  { name: "Bob", age: 35, salary: 60000, active: true },
  { name: "Alice", age: 28, salary: 80000, active: true },
];

// Pipeline: filter -> map -> reduce
const result = users
  .filter((user) => user.active) // Only active users
  .filter((user) => user.age >= 25) // Adults only
  .map((user) => ({ ...user, bonus: user.salary * 0.1 })) // Add bonus
  .reduce((total, user) => total + user.salary, 0); // Total salary

console.log("Total salary of active adults:", result);

// Compose functions
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const addTax = (price) => price * 1.1;
const addShipping = (price) => price + 10;
const applyDiscount = (price) => price * 0.9;

const calculateFinalPrice = compose(addTax, addShipping, applyDiscount);
console.log("Final price:", calculateFinalPrice(100));
```

### Separation of Concerns (DOM vs Logic)

**Exp:** DOM manipulation aur business logic ko alag rakhna - maintainable code ke liye.

```javascript
// Bad - Mixed concerns
function badTodoApp() {
  const todos = [];

  function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value;

    // Business logic mixed with DOM
    todos.push({ id: Date.now(), text, completed: false });
    input.value = "";

    const list = document.getElementById("todoList");
    const li = document.createElement("li");
    li.innerHTML = `${text} <button onclick="deleteTodo(${todos.length - 1})">Delete</button>`;
    list.appendChild(li);
  }
}

// Good - Separated concerns
class TodoApp {
  constructor() {
    this.todos = [];
    this.view = new TodoView();
    this.init();
  }

  // Business Logic Layer
  addTodo(text) {
    const todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    this.todos.push(todo);
    this.view.renderTodos(this.todos);
    return todo;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.view.renderTodos(this.todos);
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.view.renderTodos(this.todos);
    }
  }

  init() {
    this.view.onAddTodo = (text) => this.addTodo(text);
    this.view.onDeleteTodo = (id) => this.deleteTodo(id);
    this.view.onToggleTodo = (id) => this.toggleTodo(id);
  }
}

// View Layer - Only handles DOM
class TodoView {
  constructor() {
    this.todoList = document.getElementById("todoList");
    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.addBtn.addEventListener("click", () => {
      if (this.onAddTodo) {
        this.onAddTodo(this.todoInput.value);
        this.todoInput.value = "";
      }
    });
  }

  renderTodos(todos) {
    this.todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";
      li.innerHTML = `
                <span>${todo.text}</span>
                <button onclick="app.toggleTodo(${todo.id})">Toggle</button>
                <button onclick="app.deleteTodo(${todo.id})">Delete</button>
            `;
      this.todoList.appendChild(li);
    });
  }
}
```

### Custom Utilities (e.g., own implementation of map, deep clone)

**Exp:** Built-in methods ko khud implement karna - understanding improve karne ke liye.

```javascript
// Custom Array Methods
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// Deep Clone Implementation
function deepClone(obj) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // Handle Objects
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

// Usage examples
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.myMap((x) => x * 2)); // [2, 4, 6, 8, 10]

const original = {
  name: "John",
  hobbies: ["reading", "coding"],
  address: { city: "New York", zip: 10001 },
};
const cloned = deepClone(original);
cloned.address.city = "Los Angeles";
console.log(original.address.city); // Still 'New York'
```

### How JS Works in Browser (Event Loop, Web APIs, Call Stack)

**Exp:** Browser mein JavaScript kaise kaam karta hai - complete picture.

```javascript
// Event Loop Demonstration
console.log("1. Start");

// Synchronous
console.log("2. Synchronous");

// Asynchronous - Web API (Timer)
setTimeout(() => {
  console.log("4. Timeout callback");
}, 0);

// Asynchronous - Promise (Microtask)
Promise.resolve().then(() => {
  console.log("3. Promise callback");
});

console.log("5. End");

// Output: 1, 2, 5, 3, 4
// Explanation: Call stack first, then microtasks, then macrotasks

// Web APIs Example
class EventLoopDemo {
  constructor() {
    this.setupWebAPIExamples();
  }

  setupWebAPIExamples() {
    // DOM API
    document.addEventListener("click", () => {
      console.log("DOM Event (Web API)");
    });

    // Timer API
    setTimeout(() => {
      console.log("Timer API");
    }, 1000);

    // Network API
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => console.log("Fetch API result:", data.title));
  }

  demonstrateCallStack() {
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

    // Call Stack visualization:
    // 1. first() pushed
    // 2. second() pushed
    // 3. third() pushed and popped
    // 4. second() popped
    // 5. first() popped
  }
}

// Task Queue vs Microtask Queue
function queueDemo() {
  console.log("=== Queue Priority Demo ===");

  // Macrotask (Task Queue)
  setTimeout(() => console.log("Macrotask 1"), 0);
  setTimeout(() => console.log("Macrotask 2"), 0);

  // Microtask (Microtask Queue)
  Promise.resolve().then(() => console.log("Microtask 1"));
  Promise.resolve().then(() => console.log("Microtask 2"));

  console.log("Synchronous");

  // Output:
  // Synchronous
  // Microtask 1
  // Microtask 2
  // Macrotask 1
  // Macrotask 2
}
```
