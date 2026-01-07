# JavaScript Basics

**Notes Link**: [JavaScript Notes - Google Drive](https://drive.google.com/file/d/1E89bUb7EwGPVhebj5V03P2Qs-RQwJdny/view)

## Topics Covered

### 1. Variables & Declaration
- **var**: Function scoped, can be redeclared and reassigned
- **let**: Block scoped, can be reassigned but not redeclared
- **const**: Block scoped, cannot be reassigned or redeclared

### 2. Scope Types
- **Global Scope**: Variables accessible throughout the program
- **Block Scope**: Variables accessible only within the block `{ }`
- **Function Scope**: Variables accessible only within the function

### 3. Variable Behaviors
- **Reassignment**: Changing the value of an existing variable
- **Redeclaration**: Declaring the same variable again
- **Temporal Dead Zone (TDZ)**: Period when variables are inaccessible before initialization

### 4. Hoisting
- Variable declarations are moved to the top of their scope
- Initialization remains in place
- Affects `var`, `let`, `const`, and function declarations differently

### 5. Data Types
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

### 6. Type System
- **Dynamic Typing**: Variables can hold different data types
- **typeof Operator**: Check data type of variables
- **Type Coercion**: Automatic/implicit conversion between data types
- **Explicit Conversion**: Manual conversion using `String()`, `Number()`, `Boolean()`

### 7. Truthy and Falsy Values
#### Falsy Values:
- `false`
- `0`
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

**Everything else is truthy**

### 8. Equality Operators
- **== (loose equality)**: Compares values after type coercion
- **=== (strict equality)**: Compares values without type coercion

### 9. Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`, `++`, `--`, `**`
- **Comparison**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
- **Logical**: `&&`, `||`, `!`
- **Unary**: `+`, `-`, `++`, `--`, `!`, `typeof`
- **Ternary**: `condition ? expr1 : expr2`
- **instanceof**: Checks object instance type

### 10. Control Flow Statements
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

### 11. Functions
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

### 12. Advanced Function Concepts
- **Closures**: Functions retaining access to lexical scope
- **Lexical Scoping**: Functions executed using definition location scope
- **IIFE**: Immediately Invoked Function Expression

### 13. Arrays
- **Declaration**: `let arr = [1,2,3,4,5]`
- **Accessing Elements**: Using index `arr[0]`

#### Array Methods:
- **Mutating**: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`
- **Non-mutating**: `slice()`, `indexOf()`, `includes()`
- **Iteration**: `forEach()`, `map()`, `filter()`, `reduce()`, `some()`, `every()`

#### Advanced Array Features:
- **Destructuring Assignment**: Unpack array values into variables
- **Spread Operator**: Copy or merge arrays

### 14. Objects
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

## Getting Started
1. Open [Basics.js](Basics.js) to see practical examples of all concepts
2. Use [index.html](index.html) to test your JavaScript code in the browser
3. Refer to the [Google Drive notes](https://drive.google.com/file/d/1E89bUb7EwGPVhebj5V03P2Qs-RQwJdny/view) for detailed explanations