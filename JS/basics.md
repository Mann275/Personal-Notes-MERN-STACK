# JavaScript Basics

## 📑 Table of Contents

1. [Variables & Declaration](#1-variables--declaration)
2. [Scope Types](#2-scope-types)
3. [Variable Behaviors](#3-variable-behaviors)
4. [Hoisting](#4-hoisting)
5. [Data Types](#5-data-types)
6. [Type System](#6-type-system)
7. [Truthy and Falsy Values](#7-truthy-and-falsy-values)
8. [Equality Operators](#8-equality-operators)
9. [Operators](#9-operators)
10. [Control Flow Statements](#10-control-flow-statements)
11. [Functions](#11-functions)
12. [Advanced Function Concepts](#12-advanced-function-concepts)
13. [Arrays](#13-arrays)
14. [Objects](#14-objects)

---

## 1. Variables & Declaration

### var, let, and const
- **var**: Function scoped, can be redeclared and reassigned
- **let**: Block scoped, can be reassigned but not redeclared
- **const**: Block scoped, cannot be reassigned or redeclared

```javascript
var d; // Declaration
var di = 1; // Declaration and initialization
var di = 10; // Re-declaration allowed

let l = 10;
// let l = 10; // Error - cannot be redeclared
l = 20; // Reassignment allowed

const c = 100;
// const c = 200; // Error - cannot be changed or redeclared
```

---

## 2. Scope Types

### Global Scope
- Variables accessible throughout the program

### Block Scope
- Variables accessible only within the block `{ }`

### Function Scope
- Variables accessible only within the function

```javascript
var gs = 1; // global variable
let bs = 10; // block variable

function fscope() {
    var fs = 1000; // function scoped variable
    if (true) {
        let bs = 20; // block scoped variable
    }
}
```

---

## 3. Variable Behaviors

### Reassignment
Changing the value of an existing variable

### Redeclaration
Declaring the same variable again

### Temporal Dead Zone (TDZ)
Period when variables are inaccessible before initialization

```javascript
// console.log(tdza); // Error - TDZ
let tdza = 10;
```

---

## 4. Hoisting

Variable declarations are moved to the top of their scope, but initialization remains in place.

```javascript
console.log(hoist); // undefined
var hoist = 1;

// Behind the scenes:
// var hoist = undefined; // hoisted to top
// console.log(hoist);
// hoist = 1;
```

---

## 5. Data Types

### Primitive Data Types
- **Number**: `42`, `3.14`
- **String**: `"Hello"`, `'World'`
- **Boolean**: `true`, `false`
- **Null**: Intentional absence of value
- **Undefined**: Variable declared but not initialized
- **Symbol**: Unique identifier (ES6)
- **BigInt**: Large integers (ES2020)

```javascript
let num = 42;
let str = "Hello";
let bool = true;
let nothing = null;
let notDefined;
let sym = Symbol('unique');
let bigNum = 9007199254740991n;
```

### Non-Primitive/Reference Data Types
- **Object**: `{}`
- **Array**: `[]`
- **Function**: `()`

```javascript
let obj = { name: "Mann", age: 22 };
let arr = [1, 2, 3, 4, 5];
let func = function() {};
```

---

## 6. Type System

### Dynamic Typing
Variables can hold different data types at different times

### typeof Operator
Check data type of variables

```javascript
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" (quirk)
typeof {}; // "object"
typeof []; // "object"
typeof function(){}; // "function"
```

### Type Coercion
- **Implicit Conversion**: Automatic conversion by JavaScript
- **Explicit Conversion**: Manual conversion using `String()`, `Number()`, `Boolean()`

```javascript
// Implicit
let result = '5' + 10; // '510' (number coerced to string)

// Explicit
String(100); // "100"
Number('42'); // 42
Boolean(0); // false
```

---

## 7. Truthy and Falsy Values

### Falsy Values (Only 6)
- `false`
- `0`
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

**Everything else is truthy!**

```javascript
if (0) { } // won't execute
if (1) { } // will execute
if ('') { } // won't execute
if ('hello') { } // will execute
```

---

## 8. Equality Operators

### == (Loose Equality)
Compares values after type coercion

### === (Strict Equality)
Compares values without type coercion (checks both value and type)

```javascript
5 == '5';  // true (type coercion)
5 === '5'; // false (different types)

null == undefined;  // true
null === undefined; // false
```

---

## 9. Operators

### Arithmetic Operators
`+`, `-`, `*`, `/`, `%`, `++`, `--`, `**`

```javascript
10 + 5;  // 15
10 - 5;  // 5
10 * 5;  // 50
10 / 5;  // 2
10 % 3;  // 1 (remainder)
2 ** 3;  // 8 (exponentiation)
```

### Comparison Operators
`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`

### Assignment Operators
`=`, `+=`, `-=`, `*=`, `/=`, `%=`

### Logical Operators
`&&`, `||`, `!`

```javascript
true && false;  // false
true || false;  // true
!true;          // false
```

### Unary Operators
`+`, `-`, `++`, `--`, `!`, `typeof`

### Ternary Operator
```javascript
condition ? expr1 : expr2

let age = 18;
let status = age >= 18 ? 'Adult' : 'Minor';
```

### instanceof Operator
Checks if an object is an instance of a specific class

```javascript
[] instanceof Array;  // true
{} instanceof Object; // true
```

---

## 10. Control Flow Statements

### Conditional Statements

#### if, else, else-if
```javascript
if (condition) {
    // code
} else if (anotherCondition) {
    // code
} else {
    // code
}
```

#### switch-case
```javascript
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code
}
```

#### Early Return
```javascript
function checkAge(age) {
    if (age < 18) return 'Minor';
    if (age < 60) return 'Adult';
    return 'Senior';
}
```

### Looping Statements

#### for loop
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

#### while loop
```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

#### do-while loop
```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

#### for...in loop
Iterates over object properties
```javascript
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
    console.log(key, obj[key]);
}
```

#### for...of loop
Iterates over iterable objects (arrays, strings)
```javascript
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
    console.log(value);
}
```

#### forEach method
```javascript
arr.forEach(function(value, index) {
    console.log(index, value);
});
```

### Jump Statements
- **break**: Exit loop immediately
- **continue**: Skip to next iteration
- **return**: Exit function and return value

---

## 11. Functions

### Function Declaration
```javascript
function funcName(param1, param2) {
    return param1 + param2;
}
```

### Function Expression
```javascript
let funcExp = function(param1, param2) {
    return param1 + param2;
};
```

### Arrow Function
```javascript
let arrowFunc = (param1, param2) => {
    return param1 + param2;
};

// Shorter syntax for single expression
let add = (a, b) => a + b;
```

### Parameters vs Arguments
- **Parameters**: Names listed in function definition
- **Arguments**: Actual values passed to function

```javascript
function greet(name) { // 'name' is parameter
    console.log('Hello ' + name);
}

greet('Mann'); // 'Mann' is argument
```

### Default Parameters
```javascript
function greet(name = 'Guest') {
    console.log('Hello ' + name);
}

greet(); // 'Hello Guest'
greet('Mann'); // 'Hello Mann'
```

### Rest Parameters
Represents indefinite number of arguments as an array

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5); // 15
```

### Spread Operator
Expands array into individual elements

```javascript
let arr = [1, 2, 3];
console.log(...arr); // 1 2 3

let arr2 = [...arr, 4, 5]; // [1, 2, 3, 4, 5]
```

### Return Values
```javascript
function add(a, b) {
    return a + b; // returns result
}

let result = add(5, 3); // 8
```

### Early Return
```javascript
function checkValue(val) {
    if (val < 0) return 'Negative';
    if (val === 0) return 'Zero';
    return 'Positive';
}
```

### Pure vs Impure Functions

#### Pure Functions
- Same output for same input
- No side effects
- Doesn't modify external state

```javascript
function add(a, b) {
    return a + b; // pure
}
```

#### Impure Functions
- May have different outputs
- Has side effects
- Modifies external state

```javascript
let count = 0;
function increment() {
    count++; // modifies external variable (impure)
    return count;
}
```

---

## 12. Advanced Function Concepts

### Closures
A function that retains access to its lexical scope even when executed outside that scope

```javascript
function outer() {
    let count = 0;
    
    function inner() {
        count++;
        console.log(count);
    }
    
    return inner;
}

let counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

### Lexical Scoping
Functions are executed using the variable scope of their definition location

```javascript
let x = 10;

function outer() {
    let x = 20;
    
    function inner() {
        console.log(x); // accesses x from outer scope
    }
    
    inner();
}

outer(); // 20
```

### IIFE (Immediately Invoked Function Expression)
A function that is defined and executed immediately

```javascript
(function() {
    console.log('IIFE executed!');
})();

// Arrow function IIFE
(() => {
    console.log('Arrow IIFE!');
})();
```

---

## 13. Arrays

### Declaration
```javascript
let arr = [1, 2, 3, 4, 5];
let empty = [];
let mixed = [1, 'hello', true, null];
```

### Accessing Elements
```javascript
arr[0]; // 1 (first element)
arr[arr.length - 1]; // 5 (last element)
```

### Mutating Array Methods
Modify the original array

#### push()
Add elements to end
```javascript
arr.push(6); // [1, 2, 3, 4, 5, 6]
```

#### pop()
Remove last element
```javascript
arr.pop(); // [1, 2, 3, 4, 5]
```

#### shift()
Remove first element
```javascript
arr.shift(); // [2, 3, 4, 5]
```

#### unshift()
Add elements to beginning
```javascript
arr.unshift(0); // [0, 2, 3, 4, 5]
```

#### splice()
Add/remove elements at any position
```javascript
arr.splice(2, 1, 10); // removes 1 element at index 2, adds 10
```

#### sort()
Sort array
```javascript
let nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b); // [1, 1, 3, 4, 5] ascending
nums.sort((a, b) => b - a); // [5, 4, 3, 1, 1] descending
```

#### reverse()
Reverse array
```javascript
arr.reverse(); // [5, 4, 3, 2, 1]
```

### Non-mutating Array Methods
Return new array/value, don't modify original

#### slice()
Extract portion of array
```javascript
let newArr = arr.slice(1, 4); // [2, 3, 4]
```

#### indexOf()
Find index of element
```javascript
arr.indexOf(3); // 2
```

#### includes()
Check if element exists
```javascript
arr.includes(3); // true
```

### Iteration Methods

#### forEach()
Execute function for each element
```javascript
arr.forEach((value, index) => {
    console.log(index, value);
});
```

#### map()
Create new array by transforming each element
```javascript
let doubled = arr.map(value => value * 2);
// [2, 4, 6, 8, 10]
```

#### filter()
Create new array with elements that pass condition
```javascript
let evens = arr.filter(value => value % 2 === 0);
// [2, 4]
```

#### reduce()
Reduce array to single value
```javascript
let sum = arr.reduce((total, value) => total + value, 0);
// 15
```

#### some()
Check if any element passes condition
```javascript
let hasEven = arr.some(value => value % 2 === 0);
// true
```

#### every()
Check if all elements pass condition
```javascript
let allPositive = arr.every(value => value > 0);
// true
```

### Destructuring Assignment
Unpack array values into variables

```javascript
let [a, b, c] = [1, 2, 3];
// a = 1, b = 2, c = 3

let [first, , third] = [1, 2, 3];
// first = 1, third = 3 (skips second)
```

### Spread Operator
Copy or merge arrays

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

let combined = [...arr1, ...arr2]; // merge arrays
```

---

## 14. Objects

### Declaration
```javascript
let obj = {
    name: 'Mann',
    age: 22,
    city: 'NY'
};
```

### Property Access

#### Dot Notation
```javascript
obj.name; // 'Mann'
obj.age = 23; // modify
obj.country = 'USA'; // add new property
```

#### Bracket Notation
```javascript
obj['name']; // 'Mann'
obj['age'] = 23; // modify

let key = 'city';
obj[key]; // 'NY'
```

### Object Methods

#### Object.keys()
Returns array of keys
```javascript
Object.keys(obj); // ['name', 'age', 'city']
```

#### Object.values()
Returns array of values
```javascript
Object.values(obj); // ['Mann', 22, 'NY']
```

#### Object.entries()
Returns array of [key, value] pairs
```javascript
Object.entries(obj);
// [['name', 'Mann'], ['age', 22], ['city', 'NY']]
```

#### hasOwnProperty()
Check if property exists
```javascript
obj.hasOwnProperty('name'); // true
obj.hasOwnProperty('country'); // false
```

#### Object.assign()
Merge objects
```javascript
let newObj = Object.assign({}, obj, { country: 'USA' });
```

#### Object.freeze()
Prevent all modifications
```javascript
Object.freeze(obj);
obj.age = 30; // won't work
delete obj.name; // won't work
```

#### Object.seal()
Prevent adding/removing properties, allow modification
```javascript
Object.seal(obj);
obj.age = 30; // works
obj.country = 'USA'; // won't work
delete obj.name; // won't work
```

### Cloning Objects

#### Shallow Clone (Spread Operator)
```javascript
let clone = { ...obj };
```

#### Deep Clone (JSON Methods)
```javascript
let deepClone = JSON.parse(JSON.stringify(obj));
```

### for...in Loop
Iterate over object properties
```javascript
for (let key in obj) {
    console.log(`${key}: ${obj[key]}`);
}
```

---

## Summary

This covers all JavaScript basics including:
- Variables, scope, and hoisting
- Data types and type system
- Operators and control flow
- Functions and closures
- Arrays and objects
- Modern JavaScript features (destructuring, spread, etc.)

**Next Step**: Move to [Advanced JavaScript](advance.md) to learn DOM manipulation, events, async programming, and more!
