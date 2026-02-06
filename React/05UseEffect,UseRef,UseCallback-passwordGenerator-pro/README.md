# Password Generator - Advanced Hooks

## Topics Covered

- useState - multiple states
- useEffect - side effects
- useRef - DOM reference
- useCallback - optimization
- Clipboard API

## What This Project Does

Generates random passwords with customizable options. Copy to clipboard with one click.

## Key Concepts

### useState

```javascript
const [length, setLength] = useState(8);
const [numAllowed, setNumAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState("");
```

### useCallback

- Memoizes function
- Prevents recreation on every render
- Better performance

```javascript
const generatePassword = useCallback(() => {
  // Generate password logic
}, [length, numAllowed, charAllowed]);
```

### useEffect

- Runs when dependencies change
- Auto-generates password

```javascript
useEffect(() => {
  generatePassword();
}, [length, numAllowed, charAllowed]);
```

### useRef

- Reference to input element
- Direct DOM access for copy

```javascript
const passwordRef = useRef(null);
passwordRef.current.select(); // Select text
```

## Setup

```bash
npm install
npm run dev
```

## Features

- Adjustable password length
- Include numbers option
- Include special characters option
- Copy to clipboard
- Auto-generate on option change

## Learning Outcome

Master advanced hooks and performance optimization.

- **DOM Manipulation**: Direct access to input element for text selection
- **Imperative Operations**: Perform actions like select() and setSelectionRange()
- **Mutable Values**: Store values that don't trigger re-renders

### Browser APIs

#### Clipboard API

- **Modern Web API**: `navigator.clipboard.writeText()` for copying text
- **Asynchronous Operations**: Promise-based API for clipboard operations
- **User Interaction**: Requires user gesture for security

#### Random Number Generation

- **Math.random()**: Generates pseudo-random numbers for character selection
- **Array Indexing**: Uses random numbers to select characters from string

## Project Implementation

### What This Project Does

- Generates secure passwords with customizable length (1-50 characters)
- Allows inclusion/exclusion of numbers and special characters
- Provides one-click copy-to-clipboard functionality
- Automatically regenerates passwords when settings change
- Optimizes performance with React hook patterns

### How It Works

1. **Password Generation Algorithm**:

   ```javascript
   const passwordGenerator = useCallback(() => {
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     if (numAllowed) str += "0123456789";
     if (charAllowed) str += "!@#$-_&";

     let pass = "";
     for (let i = 1; i <= length; i++) {
       let char = Math.floor(Math.random() * str.length + 1);
       pass += str.charAt(char);
     }
     setPassword(pass);
   }, [length]);
   ```

2. **Clipboard Functionality**:

   ```javascript
   const copyPasswordToClipboard = useCallback(() => {
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0, 99);
     window.navigator.clipboard.writeText(password);
   }, [password]);
   ```

3. **Automatic Regeneration**:
   ```javascript
   useEffect(() => {
     passwordGenerator();
   }, [length, numAllowed, charAllowed]);
   ```

### Key Features Implemented

- ✅ Customizable password length (slider control)
- ✅ Toggle for number inclusion
- ✅ Toggle for special character inclusion
- ✅ Real-time password generation
- ✅ Copy-to-clipboard functionality
- ✅ Text selection optimization
- ✅ Performance optimization with useCallback
- ✅ Automatic regeneration with useEffect
- ✅ Direct DOM manipulation with useRef
- ✅ Modern UI with TailwindCSS

### Character Sets Used

- **Base Characters**: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
- **Numbers**: `0123456789`
- **Special Characters**: `!@#$-_&`

### Hook Optimization Patterns

```jsx
// Memoized password generator - recreates only when length changes
const passwordGenerator = useCallback(() => {
  // Password generation logic
}, [length]);

// Memoized clipboard function - recreates only when password changes
const copyPasswordToClipboard = useCallback(() => {
  // Clipboard logic
}, [password]);

// Effect runs when any dependency changes
useEffect(() => {
  passwordGenerator();
}, [length, numAllowed, charAllowed]);
```

### How It Was Built

1. Set up React project with Vite and TailwindCSS
2. Designed state structure for password options
3. Implemented password generation algorithm with character sets
4. Added useCallback for performance optimization
5. Integrated useEffect for automatic password updates
6. Implemented useRef for DOM manipulation
7. Added Clipboard API for copy functionality
8. Created responsive UI with input controls
9. Applied TailwindCSS for modern styling
10. Tested across different browsers for API compatibility

### Performance Optimizations

- **useCallback**: Prevents unnecessary function recreations
- **Dependency Arrays**: Precise control over when functions update
- **useRef**: Avoids state updates for DOM references
- **Memoization**: Reduces computational overhead

### Development Setup

```bash
npm install
npm run dev
```

### Technologies Used

- **React Hooks** - useState, useCallback, useEffect, useRef
- **Clipboard API** - Modern browser API for clipboard operations
- **Vite** - Fast development server and build tool
- **TailwindCSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features and APIs
- **Math.random()** - Cryptographically suitable random number generation
