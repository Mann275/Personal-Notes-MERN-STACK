/*
╔═══════════════════════════════════════════════════════════════╗
║                ADVANCED JAVASCRIPT CONCEPTS                  ║
║           Design Patterns & Performance Optimization         ║
╚═══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 1. DESIGN PATTERNS IN JAVASCRIPT
// ═══════════════════════════════════════════════════════════════

console.log("=== 1. DESIGN PATTERNS ===");

// MODULE PATTERN (IIFE)
// =====================
const MyModule = (function () {
  // Private variables and methods
  let privateVar = "I am private";
  let privateCounter = 0;

  function privateMethod() {
    console.log("This is a private method");
    console.log("Private variable:", privateVar);
  }

  // Public API (Revealing Module Pattern)
  return {
    // Public methods
    publicMethod: function () {
      console.log("Public method called");
      privateMethod(); // Can access private
    },

    getCounter: function () {
      return privateCounter;
    },

    increment: function () {
      privateCounter++;
      console.log("Counter incremented to:", privateCounter);
    },

    decrement: function () {
      privateCounter--;
      console.log("Counter decremented to:", privateCounter);
    },

    reset: function () {
      privateCounter = 0;
      console.log("Counter reset to 0");
    },
  };
})();

// Usage
MyModule.publicMethod();
MyModule.increment();
MyModule.increment();
console.log("Current counter:", MyModule.getCounter());

// REVEALING MODULE PATTERN
// ========================
const RevealingModule = (function () {
  let privateVar = "Hidden from outside";
  let publicVar = "I am public";

  function privateFunction() {
    console.log("Private function called");
    console.log("Accessing private var:", privateVar);
  }

  function publicFunction1() {
    console.log("Public function 1");
    privateFunction();
  }

  function publicFunction2() {
    console.log("Public function 2");
    console.log("Public var:", publicVar);
  }

  function setPrivateVar(value) {
    privateVar = value;
  }

  // Reveal public pointers to private functions
  return {
    method1: publicFunction1,
    method2: publicFunction2,
    setPrivate: setPrivateVar,
    publicVariable: publicVar,
  };
})();

// FACTORY FUNCTION PATTERN
// ========================
function createPerson(name, age, profession) {
  // Private variables (closure)
  let _id = Math.random().toString(36).substr(2, 9);
  let _createdAt = new Date();

  return {
    // Public properties
    name: name,
    age: age,
    profession: profession,

    // Public methods
    greet: function () {
      console.log(`Hi, I'm ${this.name}, ${this.age} years old`);
    },

    getAge: function () {
      return this.age;
    },

    setAge: function (newAge) {
      if (newAge > 0 && newAge < 150) {
        this.age = newAge;
      } else {
        console.log("Invalid age");
      }
    },

    getId: function () {
      return _id; // Access private variable
    },

    getCreatedAt: function () {
      return _createdAt;
    },

    work: function () {
      console.log(`${this.name} is working as a ${this.profession}`);
    },
  };
}

// Usage
const person1 = createPerson("John", 25, "Developer");
const person2 = createPerson("Jane", 30, "Designer");

person1.greet();
person1.work();
console.log("Person 1 ID:", person1.getId());

// OBSERVER PATTERN (Pub-Sub)
// ===========================
class EventEmitter {
  constructor() {
    this.events = {};
    this.maxListeners = 10;
  }

  // Subscribe to an event
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    if (this.events[event].length >= this.maxListeners) {
      console.warn(
        `Max listeners (${this.maxListeners}) exceeded for event: ${event}`,
      );
    }

    this.events[event].push(callback);
    return this; // For chaining
  }

  // Subscribe once
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
    return this;
  }

  // Unsubscribe from an event
  off(event, callback) {
    if (!this.events[event]) return this;

    if (!callback) {
      // Remove all listeners for this event
      delete this.events[event];
    } else {
      // Remove specific callback
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }

    return this;
  }

  // Emit an event
  emit(event, ...args) {
    if (!this.events[event]) return false;

    this.events[event].forEach((callback) => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });

    return true;
  }

  // Get listener count
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  // Get all event names
  eventNames() {
    return Object.keys(this.events);
  }
}

// Usage Example
const emitter = new EventEmitter();

const userLoginHandler = (user) => {
  console.log(`User ${user.name} logged in`);
  console.log(`Email: ${user.email}`);
};

const analyticsHandler = (user) => {
  console.log(`Analytics: User login tracked for ${user.name}`);
};

const notificationHandler = (user) => {
  console.log(`Notification: Welcome back ${user.name}!`);
};

// Subscribe to events
emitter.on("userLogin", userLoginHandler);
emitter.on("userLogin", analyticsHandler);
emitter.once("userLogin", notificationHandler); // Only fires once

// Emit event
emitter.emit("userLogin", { name: "John", email: "john@example.com" });
emitter.emit("userLogin", { name: "Jane", email: "jane@example.com" });

console.log("Listeners for userLogin:", emitter.listenerCount("userLogin"));

// ═══════════════════════════════════════════════════════════════
// 2. PERFORMANCE OPTIMIZATION
// ═══════════════════════════════════════════════════════════════

console.log("\n=== 2. PERFORMANCE OPTIMIZATION ===");

// DEBOUNCING AND THROTTLING
// ==========================

// Debounce - Wait for pause in activity
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

// Advanced throttle with leading and trailing options
function advancedThrottle(func, limit, options = {}) {
  let timeout;
  let previous = 0;

  const later = function (context, args) {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    func.apply(context, args);
  };

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
      timeout = setTimeout(() => later(this, args), remaining);
    }
  };
}

// Usage Examples
const debouncedSearch = debounce(function (query) {
  console.log("Searching for:", query);
  // Simulate API call
  console.log("API call made...");
}, 300);

const throttledScroll = throttle(function (event) {
  console.log("Scroll position:", window.scrollY);
}, 100);

// LAZY LOADING WITH INTERSECTION OBSERVER
// =======================================
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

    this.init();
  }

  init() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      this.imageObserver.observe(img);
    });
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
    // Add loading placeholder
    img.classList.add("loading");

    // Create new image to preload
    const imageLoader = new Image();

    imageLoader.onload = () => {
      img.src = img.dataset.src;
      img.classList.remove("loading", "lazy");
      img.classList.add("loaded");
    };

    imageLoader.onerror = () => {
      img.classList.remove("loading");
      img.classList.add("error");
      console.error("Failed to load image:", img.dataset.src);
    };

    imageLoader.src = img.dataset.src;
  }

  // Add new images to observer
  observe(img) {
    this.imageObserver.observe(img);
  }

  // Stop observing
  disconnect() {
    this.imageObserver.disconnect();
  }
}

// DOM OPTIMIZATION TECHNIQUES
// ===========================
class DOMOptimizer {
  // Batch DOM updates
  static batchDOMUpdates(element, updates) {
    // Use document fragment for multiple additions
    const fragment = document.createDocumentFragment();

    // Hide element to prevent reflows
    const display = element.style.display;
    element.style.display = "none";

    updates.forEach((update) => {
      if (typeof update === "function") {
        update(element);
      }
    });

    // Restore display
    element.style.display = display;

    return element;
  }

  // Efficient list rendering
  static renderList(container, items, renderItem) {
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const element = renderItem(item);
      fragment.appendChild(element);
    });

    // Single DOM manipulation
    container.appendChild(fragment);
  }

  // Virtual scrolling for large lists
  static createVirtualList(container, items, itemHeight, visibleCount) {
    let startIndex = 0;
    let endIndex = Math.min(visibleCount, items.length);

    const totalHeight = items.length * itemHeight;
    const viewport = document.createElement("div");
    viewport.style.height = `${totalHeight}px`;
    viewport.style.position = "relative";

    const renderVisible = () => {
      viewport.innerHTML = "";

      for (let i = startIndex; i < endIndex; i++) {
        const item = document.createElement("div");
        item.style.position = "absolute";
        item.style.top = `${i * itemHeight}px`;
        item.style.height = `${itemHeight}px`;
        item.textContent = items[i];
        viewport.appendChild(item);
      }
    };

    container.addEventListener("scroll", () => {
      const scrollTop = container.scrollTop;
      startIndex = Math.floor(scrollTop / itemHeight);
      endIndex = Math.min(startIndex + visibleCount, items.length);
      renderVisible();
    });

    container.appendChild(viewport);
    renderVisible();
  }
}

// MEMORY LEAK PREVENTION
// ======================
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

    // Add event listeners with cleanup tracking
    this.addEventListener(this.element, "click", this.handleClick);
    this.addEventListener(window, "resize", this.handleResize);

    // Timer with cleanup tracking
    this.setTimer(() => {
      console.log("Component timer executed");
    }, 1000);

    // Fetch with abort signal
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

  setInterval(callback, delay) {
    const intervalId = setInterval(callback, delay);
    this.timers.push(intervalId);
    return intervalId;
  }

  async fetchData() {
    try {
      const response = await fetch("/api/data", {
        signal: this.abortController.signal,
      });
      const data = await response.json();
      console.log("Data fetched:", data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
      }
    }
  }

  handleClick(event) {
    console.log("Element clicked:", event.target);
  }

  handleResize(event) {
    console.log("Window resized:", window.innerWidth, window.innerHeight);
  }

  // CRUCIAL: Cleanup method to prevent memory leaks
  destroy() {
    // Clear all timers
    this.timers.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    this.timers = [];

    // Remove all event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];

    // Abort any ongoing fetch requests
    this.abortController.abort();

    // Clear references
    this.element = null;

    console.log("Component cleaned up successfully");
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. ADVANCED TOPICS & ARCHITECTURE
// ═══════════════════════════════════════════════════════════════

console.log("\n=== 3. ADVANCED TOPICS ===");

// PURE VS IMPURE FUNCTIONS
// =========================
class FunctionTypes {
  static demonstratePureFunctions() {
    console.log("=== Pure Functions ===");

    // Pure function - same input = same output, no side effects
    const add = (a, b) => a + b;
    const multiply = (x, y) => x * y;
    const calculateArea = (radius) => Math.PI * radius * radius;

    // Pure function - doesn't modify original array
    const addToArray = (arr, item) => [...arr, item];
    const removeFromArray = (arr, index) => [
      ...arr.slice(0, index),
      ...arr.slice(index + 1),
    ];

    // Testing pure functions
    console.log("add(2, 3):", add(2, 3)); // Always 5
    console.log("multiply(4, 5):", multiply(4, 5)); // Always 20

    const originalArray = [1, 2, 3];
    const newArray = addToArray(originalArray, 4);
    console.log("Original array:", originalArray); // [1, 2, 3] - unchanged
    console.log("New array:", newArray); // [1, 2, 3, 4]

    return { add, multiply, calculateArea, addToArray, removeFromArray };
  }

  static demonstrateImpureFunctions() {
    console.log("=== Impure Functions ===");

    let counter = 0;
    const config = { multiplier: 2 };

    // Impure - modifies external variable
    const increment = () => ++counter;

    // Impure - depends on external state
    const getMultipliedValue = (x) => x * config.multiplier;

    // Impure - modifies original array
    const pushToArray = (arr, item) => {
      arr.push(item);
      return arr;
    };

    // Impure - has side effects (console.log)
    const logAndReturn = (value) => {
      console.log("Processing:", value);
      return value * 2;
    };

    // Testing impure functions
    console.log("increment():", increment()); // 1
    console.log("increment():", increment()); // 2 - different result!

    const testArray = [1, 2, 3];
    pushToArray(testArray, 4);
    console.log("Modified original array:", testArray); // [1, 2, 3, 4]

    return { increment, getMultipliedValue, pushToArray, logAndReturn };
  }
}

// FUNCTIONAL PROGRAMMING PIPELINE
// ===============================
class FunctionalProgramming {
  static createPipeline() {
    // Sample data
    const users = [
      {
        name: "John",
        age: 25,
        salary: 50000,
        active: true,
        department: "Engineering",
      },
      {
        name: "Jane",
        age: 30,
        salary: 75000,
        active: false,
        department: "Design",
      },
      {
        name: "Bob",
        age: 35,
        salary: 60000,
        active: true,
        department: "Engineering",
      },
      {
        name: "Alice",
        age: 28,
        salary: 80000,
        active: true,
        department: "Marketing",
      },
      {
        name: "Charlie",
        age: 32,
        salary: 55000,
        active: true,
        department: "Engineering",
      },
    ];

    // Functional pipeline
    const result = users
      .filter((user) => user.active) // Only active users
      .filter((user) => user.age >= 25) // Adults only
      .filter((user) => user.department === "Engineering") // Engineers only
      .map((user) => ({
        ...user,
        bonus: user.salary * 0.15, // Add 15% bonus
        taxDeduction: user.salary * 0.2, // 20% tax
      }))
      .map((user) => ({
        ...user,
        netSalary: user.salary + user.bonus - user.taxDeduction,
      }))
      .reduce(
        (acc, user) => {
          acc.totalSalary += user.salary;
          acc.totalBonus += user.bonus;
          acc.totalNetSalary += user.netSalary;
          acc.count++;
          return acc;
        },
        { totalSalary: 0, totalBonus: 0, totalNetSalary: 0, count: 0 },
      );

    console.log("Engineering department summary:", result);

    return result;
  }

  // Compose and Pipe functions
  static createComposeFunctions() {
    // Compose - right to left
    const compose =
      (...fns) =>
      (value) =>
        fns.reduceRight((acc, fn) => fn(acc), value);

    // Pipe - left to right (more intuitive)
    const pipe =
      (...fns) =>
      (value) =>
        fns.reduce((acc, fn) => fn(acc), value);

    // Helper functions
    const addTax = (price) => price * 1.1; // Add 10% tax
    const addShipping = (price) => price + 15; // Add $15 shipping
    const applyDiscount = (price) => price * 0.9; // Apply 10% discount
    const round = (price) => Math.round(price * 100) / 100; // Round to 2 decimal places

    // Using compose (right to left)
    const calculateFinalPriceCompose = compose(
      round,
      addTax,
      addShipping,
      applyDiscount,
    );

    // Using pipe (left to right - more readable)
    const calculateFinalPricePipe = pipe(
      applyDiscount,
      addShipping,
      addTax,
      round,
    );

    console.log("Original price: $100");
    console.log("Final price (compose):", calculateFinalPriceCompose(100));
    console.log("Final price (pipe):", calculateFinalPricePipe(100));

    return { compose, pipe };
  }
}

// SEPARATION OF CONCERNS ARCHITECTURE
// ===================================
// Model - Data and Business Logic
class TodoModel {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  addTodo(text) {
    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };

    if (todo.text) {
      this.todos.push(todo);
      return todo;
    }

    throw new Error("Todo text cannot be empty");
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      return this.todos.splice(index, 1)[0];
    }
    throw new Error("Todo not found");
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      return todo;
    }
    throw new Error("Todo not found");
  }

  getTodos() {
    return [...this.todos]; // Return copy to prevent external modification
  }

  getActiveTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  clearCompleted() {
    const completed = this.getCompletedTodos();
    this.todos = this.getActiveTodos();
    return completed;
  }
}

// View - DOM Manipulation
class TodoView {
  constructor() {
    this.app = document.getElementById("todoApp");
    this.setupUI();
    this.setupEventListeners();
  }

  setupUI() {
    this.app.innerHTML = `
            <div class="todo-container">
                <h1>Todo Application</h1>
                <div class="input-section">
                    <input type="text" id="todoInput" placeholder="Enter a todo...">
                    <button id="addBtn">Add Todo</button>
                </div>
                <div class="filter-section">
                    <button id="showAll" class="active">All</button>
                    <button id="showActive">Active</button>
                    <button id="showCompleted">Completed</button>
                    <button id="clearCompleted">Clear Completed</button>
                </div>
                <ul id="todoList"></ul>
                <div id="stats"></div>
            </div>
        `;

    this.todoInput = document.getElementById("todoInput");
    this.todoList = document.getElementById("todoList");
    this.stats = document.getElementById("stats");
  }

  setupEventListeners() {
    document.getElementById("addBtn").addEventListener("click", () => {
      if (this.onAddTodo) {
        this.onAddTodo(this.todoInput.value);
      }
    });

    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && this.onAddTodo) {
        this.onAddTodo(this.todoInput.value);
      }
    });

    document.getElementById("showAll").addEventListener("click", () => {
      if (this.onFilterChange) this.onFilterChange("all");
    });

    document.getElementById("showActive").addEventListener("click", () => {
      if (this.onFilterChange) this.onFilterChange("active");
    });

    document.getElementById("showCompleted").addEventListener("click", () => {
      if (this.onFilterChange) this.onFilterChange("completed");
    });

    document.getElementById("clearCompleted").addEventListener("click", () => {
      if (this.onClearCompleted) this.onClearCompleted();
    });
  }

  renderTodos(todos, filter = "all") {
    this.todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;
      li.innerHTML = `
                <input type="checkbox" ${todo.completed ? "checked" : ""} 
                       data-id="${todo.id}" class="todo-toggle">
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" data-id="${todo.id}">Delete</button>
            `;

      // Add event listeners
      li.querySelector(".todo-toggle").addEventListener("change", (e) => {
        if (this.onToggleTodo) this.onToggleTodo(parseInt(e.target.dataset.id));
      });

      li.querySelector(".delete-btn").addEventListener("click", (e) => {
        if (this.onDeleteTodo) this.onDeleteTodo(parseInt(e.target.dataset.id));
      });

      this.todoList.appendChild(li);
    });

    this.updateFilterButtons(filter);
  }

  updateStats(total, active, completed) {
    this.stats.innerHTML = `
            <span>Total: ${total}</span>
            <span>Active: ${active}</span>
            <span>Completed: ${completed}</span>
        `;
  }

  updateFilterButtons(activeFilter) {
    document.querySelectorAll(".filter-section button").forEach((btn) => {
      btn.classList.remove("active");
    });

    const filterMap = {
      all: "showAll",
      active: "showActive",
      completed: "showCompleted",
    };

    if (filterMap[activeFilter]) {
      document.getElementById(filterMap[activeFilter]).classList.add("active");
    }
  }

  clearInput() {
    this.todoInput.value = "";
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    this.app.prepend(errorDiv);

    setTimeout(() => errorDiv.remove(), 3000);
  }
}

// Controller - Connects Model and View
class TodoController {
  constructor() {
    this.model = new TodoModel();
    this.view = new TodoView();
    this.currentFilter = "all";

    this.bindEvents();
    this.updateView();
  }

  bindEvents() {
    this.view.onAddTodo = (text) => this.addTodo(text);
    this.view.onDeleteTodo = (id) => this.deleteTodo(id);
    this.view.onToggleTodo = (id) => this.toggleTodo(id);
    this.view.onFilterChange = (filter) => this.setFilter(filter);
    this.view.onClearCompleted = () => this.clearCompleted();
  }

  addTodo(text) {
    try {
      this.model.addTodo(text);
      this.view.clearInput();
      this.updateView();
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  deleteTodo(id) {
    try {
      this.model.deleteTodo(id);
      this.updateView();
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  toggleTodo(id) {
    try {
      this.model.toggleTodo(id);
      this.updateView();
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.updateView();
  }

  clearCompleted() {
    this.model.clearCompleted();
    this.updateView();
  }

  updateView() {
    let todosToShow;

    switch (this.currentFilter) {
      case "active":
        todosToShow = this.model.getActiveTodos();
        break;
      case "completed":
        todosToShow = this.model.getCompletedTodos();
        break;
      default:
        todosToShow = this.model.getTodos();
    }

    this.view.renderTodos(todosToShow, this.currentFilter);

    const allTodos = this.model.getTodos();
    const activeTodos = this.model.getActiveTodos();
    const completedTodos = this.model.getCompletedTodos();

    this.view.updateStats(
      allTodos.length,
      activeTodos.length,
      completedTodos.length,
    );
  }
}

// CUSTOM UTILITY IMPLEMENTATIONS
// ===============================
class CustomUtils {
  // Custom Array Methods
  static implementArrayMethods() {
    // Custom map implementation
    Array.prototype.myMap = function (callback, thisArg) {
      if (this == null) {
        throw new TypeError(
          "Array.prototype.myMap called on null or undefined",
        );
      }

      if (typeof callback !== "function") {
        throw new TypeError("callback must be a function");
      }

      const result = [];
      const O = Object(this);
      const len = parseInt(O.length) || 0;

      for (let i = 0; i < len; i++) {
        if (i in O) {
          result[i] = callback.call(thisArg, O[i], i, O);
        }
      }

      return result;
    };

    // Custom filter implementation
    Array.prototype.myFilter = function (callback, thisArg) {
      if (this == null) {
        throw new TypeError(
          "Array.prototype.myFilter called on null or undefined",
        );
      }

      if (typeof callback !== "function") {
        throw new TypeError("callback must be a function");
      }

      const result = [];
      const O = Object(this);
      const len = parseInt(O.length) || 0;

      for (let i = 0; i < len; i++) {
        if (i in O) {
          if (callback.call(thisArg, O[i], i, O)) {
            result.push(O[i]);
          }
        }
      }

      return result;
    };

    // Custom reduce implementation
    Array.prototype.myReduce = function (callback, initialValue) {
      if (this == null) {
        throw new TypeError(
          "Array.prototype.myReduce called on null or undefined",
        );
      }

      if (typeof callback !== "function") {
        throw new TypeError("callback must be a function");
      }

      const O = Object(this);
      const len = parseInt(O.length) || 0;
      let accumulator = initialValue;
      let k = 0;

      if (arguments.length < 2) {
        if (len === 0) {
          throw new TypeError("Reduce of empty array with no initial value");
        }

        // Find first element
        while (k < len && !(k in O)) {
          k++;
        }

        accumulator = O[k++];
      }

      while (k < len) {
        if (k in O) {
          accumulator = callback(accumulator, O[k], k, O);
        }
        k++;
      }

      return accumulator;
    };
  }

  // Deep Clone Implementation
  static deepClone(obj, visited = new WeakMap()) {
    // Handle null and primitives
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // Handle circular references
    if (visited.has(obj)) {
      return visited.get(obj);
    }

    // Handle Date
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    // Handle RegExp
    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags);
    }

    // Handle Arrays
    if (Array.isArray(obj)) {
      const clonedArray = [];
      visited.set(obj, clonedArray);

      for (let i = 0; i < obj.length; i++) {
        clonedArray[i] = this.deepClone(obj[i], visited);
      }

      return clonedArray;
    }

    // Handle Objects
    const clonedObj = {};
    visited.set(obj, clonedObj);

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = this.deepClone(obj[key], visited);
      }
    }

    return clonedObj;
  }

  // Memoization utility
  static memoize(fn) {
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
}

// EVENT LOOP & BROWSER ARCHITECTURE DEMO
// =======================================
class EventLoopDemo {
  static demonstrateEventLoop() {
    console.log("=== Event Loop Demonstration ===");

    console.log("1. Synchronous start");

    // Macrotask (Timer API)
    setTimeout(() => {
      console.log("4. Macrotask (setTimeout)");
    }, 0);

    // Microtask (Promise)
    Promise.resolve().then(() => {
      console.log("3. Microtask (Promise)");
    });

    console.log("2. Synchronous end");

    // Expected output: 1, 2, 3, 4
    // Explanation: Call stack first, then microtasks, then macrotasks
  }

  static demonstrateCallStack() {
    console.log("=== Call Stack Demonstration ===");

    function first() {
      console.log("First function start");
      second();
      console.log("First function end");
    }

    function second() {
      console.log("Second function start");
      third();
      console.log("Second function end");
    }

    function third() {
      console.log("Third function executed");
    }

    first();

    // Call Stack visualization:
    // 1. first() pushed to stack
    // 2. second() pushed to stack
    // 3. third() pushed to stack and immediately popped
    // 4. second() popped after completion
    // 5. first() popped after completion
  }

  static demonstrateWebAPIs() {
    console.log("=== Web APIs Demonstration ===");

    // DOM API
    if (typeof document !== "undefined") {
      document.addEventListener("click", () => {
        console.log("DOM Event handled by Web API");
      });
    }

    // Network API (Fetch)
    if (typeof fetch !== "undefined") {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((data) => console.log("Fetch API result:", data.title))
        .catch((error) => console.log("Fetch error:", error.message));
    }

    // Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => console.log("Geolocation:", position.coords),
        (error) => console.log("Geolocation error:", error.message),
      );
    }
  }

  static queuePriorityDemo() {
    console.log("=== Task Queue vs Microtask Queue ===");

    // Macrotasks (Task Queue)
    setTimeout(() => console.log("Macrotask 1"), 0);
    setTimeout(() => console.log("Macrotask 2"), 0);

    // Microtasks (Microtask Queue) - Higher priority
    Promise.resolve().then(() => console.log("Microtask 1"));
    Promise.resolve().then(() => {
      console.log("Microtask 2");
      // Nested microtask
      Promise.resolve().then(() => console.log("Nested Microtask"));
    });

    console.log("Synchronous");

    // Expected output:
    // Synchronous
    // Microtask 1
    // Microtask 2
    // Nested Microtask
    // Macrotask 1
    // Macrotask 2
  }
}

// INITIALIZE DEMOS (Uncomment to run specific examples)
console.log("Advanced JavaScript Examples Loaded!");
console.log("Uncomment specific demo calls to see them in action:");

// MyModule.publicMethod();
// const person = createPerson('Alice', 28, 'Developer');
// person.greet();
// FunctionTypes.demonstratePureFunctions();
// FunctionalProgramming.createPipeline();
// EventLoopDemo.demonstrateEventLoop();
// CustomUtils.implementArrayMethods();

// For TodoApp, make sure you have the HTML structure:
// const todoApp = new TodoController();
