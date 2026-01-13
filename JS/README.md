# JavaScript Learning Hub

**Notes Link**: [JavaScript Notes - Google Drive](https://drive.google.com/file/d/1E89bUb7EwGPVhebj5V03P2Qs-RQwJdny/view)

---

## 📚 Quick Navigation

### [JavaScript Basics →](basics.md)
Master the fundamentals of JavaScript

### [Advanced JavaScript →](advance.md)
Learn DOM, events, forms, storage, and more

---

## 📖 Topics Covered

## Basic JavaScript Topics

Click on any topic to jump to the detailed explanation in [basics.md](basics.md)

### 1. [Variables & Declaration](basics.md#1-variables--declaration)
- **var**: Function scoped, can be redeclared and reassigned
- **let**: Block scoped, can be reassigned but not redeclared
- **const**: Block scoped, cannot be reassigned or redeclared

### 2. [Scope Types](basics.md#2-scope-types)
- **Global Scope**: Variables accessible throughout the program
- **Block Scope**: Variables accessible only within the block `{ }`
- **Function Scope**: Variables accessible only within the function

### 3. [Variable Behaviors](basics.md#3-variable-behaviors)
- **Reassignment**: Changing the value of an existing variable
- **Redeclaration**: Declaring the same variable again
- **Temporal Dead Zone (TDZ)**: Period when variables are inaccessible before initialization

### 4. [Hoisting](basics.md#4-hoisting)
- Variable declarations are moved to the top of their scope
- Initialization remains in place
- Affects `var`, `let`, `const`, and function declarations differently

### 5. [Data Types](basics.md#5-data-types)
#### Primitive Data Types:
- Number
- String  
- Boolean
- Null
- Undefined
- Symbol
- BigInt

#### Non-Primitive/Reference Data Types:
- Object `{}`
- Array `[]`
- Function `()`

### 6. [Type System](basics.md#6-type-system)
- **Dynamic Typing**: Variables can hold different data types
- **typeof Operator**: Check data type of variables
- **Type Coercion**: Automatic/implicit conversion between data types
- **Explicit Conversion**: Manual conversion using `String()`, `Number()`, `Boolean()`

### 7. [Truthy and Falsy Values](basics.md#7-truthy-and-falsy-values)
#### Falsy Values:
- `false`
- `0`
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

**Everything else is truthy**

### 8. [Equality Operators](basics.md#8-equality-operators)
- **== (loose equality)**: Compares values after type coercion
- **=== (strict equality)**: Compares values without type coercion

### 9. [Operators](basics.md#9-operators)
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`, `++`, `--`, `**`
- **Comparison**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
- **Logical**: `&&`, `||`, `!`
- **Unary**: `+`, `-`, `++`, `--`, `!`, `typeof`
- **Ternary**: `condition ? expr1 : expr2`
- **instanceof**: Checks object instance type

### 10. [Control Flow Statements](basics.md#10-control-flow-statements)
#### Conditional Statements:
- `if`, `else`, `else-if`
- `switch-case`
- Early return

#### Looping Statements:
- `for` loop
- `while` loop
- `do-while` loop
- `for...in` loop
- `for...of` loop
- `forEach` method

#### Jump Statements:
- `break`
- `continue` 
- `return`

### 11. [Functions](basics.md#11-functions)
#### Function Types:
- **Function Declaration**: `function funcName() {}`
- **Function Expression**: `let func = function() {}`
- **Arrow Function**: `let func = () => {}`

#### Function Concepts:
- **Parameters vs Arguments**
- **Default Parameters**: Default values for parameters
- **Rest Parameters**: `...args` - indefinite number of arguments as array
- **Spread Parameters**: `...array` - expand array into individual elements
- **Return Values**: Functions can return values
- **Early Return**: Exit function before end based on condition

#### Function Types:
- **Pure Functions**: Same output for same input, no side effects
- **Impure Functions**: May have different outputs or side effects

### 12. [Advanced Function Concepts](basics.md#12-advanced-function-concepts)
- **Closures**: Functions retaining access to lexical scope
- **Lexical Scoping**: Functions executed using definition location scope
- **IIFE**: Immediately Invoked Function Expression

### 13. [Arrays](basics.md#13-arrays)
- **Declaration**: `let arr = [1,2,3,4,5]`
- **Accessing Elements**: Using index `arr[0]`

#### Array Methods:
- **Mutating**: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`
- **Non-mutating**: `slice()`, `indexOf()`, `includes()`
- **Iteration**: `forEach()`, `map()`, `filter()`, `reduce()`, `some()`, `every()`

#### Advanced Array Features:
- **Destructuring Assignment**: Unpack array values into variables
- **Spread Operator**: Copy or merge arrays

### 14. [Objects](basics.md#14-objects)
- **Declaration**: `let obj = { key: value }`
- **Property Access**: Dot notation `obj.property` and bracket notation `obj['property']`

#### Object Methods:
- `Object.keys()`: Returns array of keys
- `Object.values()`: Returns array of values  
- `Object.entries()`: Returns array of [key,value] pairs
- `hasOwnProperty()`: Check if property exists
- `Object.assign()`: Merge objects
- `Object.freeze()`: Prevent modifications
- `Object.seal()`: Prevent adding/removing properties

#### Object Features:
- **Cloning**: Using spread operator
- **Deep Cloning**: Using `JSON.parse(JSON.stringify())`
- **for...in loop**: Iterate over object properties

---

## Advanced JavaScript Topics

Click on any topic to jump to the detailed explanation in [advance.md](advance.md)

### 1. [DOM (Document Object Model)](advance.md#1-dom-document-object-model)
- [Selecting Elements](advance.md#selecting-elements) - getElementById, querySelector, querySelectorAll
- [Attribute Manipulation](advance.md#attribute-manipulation) - getAttribute, setAttribute, removeAttribute
- [Dynamic DOM Manipulation](advance.md#dynamic-dom-manipulation) - createElement, appendChild, remove
- [Modifying Content](advance.md#modifying-content) - innerHTML, textContent, innerText
- [Modifying Styles](advance.md#modifying-styles) - style property, classList
- [Traversing the DOM](advance.md#traversing-the-dom) - parent, children, siblings

### 2. [Events and Event Handling](advance.md#2-events-and-event-handling)
- [Event Binding Methods](advance.md#event-binding-methods) - addEventListener, removeEventListener
- [Common Events](advance.md#common-events) - mouse, keyboard, form, window events
- [Event Object](advance.md#event-object) - properties and methods
- [Event Bubbling and Capturing](advance.md#event-bubbling-and-capturing) - propagation phases
- [Event Delegation](advance.md#event-delegation) - efficient event handling

### 3. [Forms and Form Validation](advance.md#3-forms-and-form-validation)
- [Form Elements](advance.md#form-elements) - input, select, textarea
- [Accessing Form Elements](advance.md#accessing-form-elements) - FormData, form.elements
- [Form Validation](advance.md#form-validation) - HTML5 and JavaScript validation
- [Validation API](advance.md#validation-api) - checkValidity, validity states

### 4. [Timers and Intervals](advance.md#4-timers-and-intervals)
- [setTimeout()](advance.md#settimeout) - delayed execution
- [setInterval()](advance.md#setinterval) - repeated execution
- [Practical Examples](advance.md#practical-examples) - countdown, debouncing, throttling

### 5. [Browser Storage](advance.md#5-browser-storage)
- [Local Storage](advance.md#local-storage) - persistent storage
- [Session Storage](advance.md#session-storage) - temporary storage
- [Cookies](advance.md#cookies) - small text files
- [Storage Comparison](advance.md#storage-comparison) - when to use what

---

## 🚀 Getting Started
1. **Beginners**: Start with [basics.md](basics.md) to learn JavaScript fundamentals
2. **Intermediate**: Move to [advance.md](advance.md) for DOM, events, and browser APIs
3. **Practice**: Open [Basics.js](Basics.js) for code examples
4. **Test**: Use [index.html](index.html) to test your JavaScript code in the browser
5. **Reference**: Check [Google Drive notes](https://drive.google.com/file/d/1E89bUb7EwGPVhebj5V03P2Qs-RQwJdny/view) for additional explanations

---

## 📂 File Structure

```
JS/
├── README.md          # Main navigation hub (you are here)
├── basics.md          # Complete guide to JavaScript basics
├── advance.md         # Advanced topics: DOM, events, storage
├── Basics.js          # Code examples for basic concepts
├── adv.js             # Code examples for advanced concepts
├── index.html         # HTML file to test JavaScript
├── interview.md       # Interview questions and answers
└── form/              # Form examples
    ├── form.html
    ├── form.css
    └── form.js
```

---

## 💡 Learning Path

1. **Week 1-2**: Master [basics.md](basics.md)
   - Variables, data types, operators
   - Control flow and functions
   - Arrays and objects

2. **Week 3-4**: Study [advance.md](advance.md)
   - DOM manipulation
   - Event handling
   - Forms and validation

3. **Week 5+**: Practice projects
   - Build interactive websites
   - Create form validators
   - Implement storage solutions

---

## 🎯 Quick Reference

- **Basics.js Code**: [Basics.js](Basics.js)
- **Advanced Code**: [adv.js](adv.js)
- **Interview Prep**: [interview.md](interview.md)
- **External Notes**: [Google Drive](https://drive.google.com/file/d/1E89bUb7EwGPVhebj5V03P2Qs-RQwJdny/view)