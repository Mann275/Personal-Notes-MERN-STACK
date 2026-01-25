<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

# ⚛️ React – Complete Learning Notes

</div>

These notes cover React fundamentals, hooks, components, props, state management, and project examples.

## 📄 Official Resources

- [React Official Documentation](https://react.dev/)
- [React Cheat Sheet](https://react-cheatsheet.com/)

---

<div align="center">

## 🔹 What is React?

</div>

- React is a **JavaScript library** for building user interfaces
- Created and maintained by **Facebook (Meta)**
- Used for building **single-page applications (SPA)**
- Component-based architecture
- Uses **Virtual DOM** for efficient updates

---

## 🔹 Why React?

- **Fast** – Virtual DOM updates only changed parts
- **Reusable Components** – Write once, use anywhere
- **Large Ecosystem** – Tons of libraries and tools
- **Strong Community** – Active support and resources
- **JSX** – Write HTML-like syntax in JavaScript

---

## 🔹 React Setup

### Create React App with Vite (Recommended)

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

### Traditional Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

---

## 🔹 JSX (JavaScript XML)

- Syntax extension for JavaScript
- Allows writing HTML-like code in JavaScript
- Gets compiled to `React.createElement()` calls

### Rules:

- Must return **single parent element**
- Use `className` instead of `class`
- Use `camelCase` for attributes (e.g., `onClick`, `onChange`)
- JavaScript expressions inside `{}`

```jsx
function App() {
  const name = "React";
  return (
    <div className="container">
      <h1>Hello {name}!</h1>
    </div>
  );
}
```

---

## 🔹 Components

Two types of components:

### Functional Components (Modern)

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Class Components (Legacy)

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

---

## 🔹 Props

- **Props** = Properties
- Used to pass data from parent to child component
- Props are **read-only** (immutable)

```jsx
// Parent Component
function App() {
  return <Card title="React" description="A JS library" />;
}

// Child Component
function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
```

### Props Destructuring

```jsx
function Card({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

---

## 🔹 State

- **State** = Component's internal data
- State is **mutable** (can be changed)
- When state changes, component **re-renders**

### useState Hook

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 🔹 React Hooks

Hooks let you use state and other React features in functional components.

### Common Hooks:

| Hook          | Purpose                                  |
| ------------- | ---------------------------------------- |
| `useState`    | Manage component state                   |
| `useEffect`   | Side effects (API calls, timers)         |
| `useContext`  | Access context values                    |
| `useRef`      | Reference DOM elements or persist values |
| `useMemo`     | Memoize expensive calculations           |
| `useCallback` | Memoize functions                        |
| `useReducer`  | Complex state management                 |

---

## 🔹 useState Hook

```jsx
const [state, setState] = useState(initialValue);
```

- Returns an array: `[currentState, updaterFunction]`
- `setState` triggers re-render

```jsx
function Example() {
  const [name, setName] = useState("John");
  const [age, setAge] = useState(25);

  return (
    <div>
      <p>
        {name} is {age} years old
      </p>
      <button onClick={() => setAge(age + 1)}>Birthday</button>
    </div>
  );
}
```

---

## 🔹 useEffect Hook

Used for **side effects**:

- API calls
- Timers
- DOM manipulation
- Subscriptions

```jsx
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

### Examples:

#### Run once (on mount)

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

#### Run when dependency changes

```jsx
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);
```

#### Run on every render

```jsx
useEffect(() => {
  console.log("Component rendered");
});
```

---

## 🔹 Event Handling

```jsx
function Button() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Common Events:

- `onClick`
- `onChange`
- `onSubmit`
- `onMouseEnter`
- `onMouseLeave`

---

## 🔹 Conditional Rendering

### Using if-else

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in</h1>;
}
```

### Using Ternary Operator

```jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome back!" : "Please sign in"}</h1>;
}
```

### Using && Operator

```jsx
function Notification({ hasMessage }) {
  return <div>{hasMessage && <p>You have new messages!</p>}</div>;
}
```

---

## 🔹 Lists & Keys

```jsx
function TodoList() {
  const todos = ["Learn React", "Build Projects", "Get Job"];

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

**Note:** Use unique IDs instead of index when possible.

---

## 🔹 Forms

### Controlled Components

```jsx
function Form() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 🔹 useRef Hook

- Access DOM elements directly
- Persist values without triggering re-render

```jsx
function InputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

---

## 🔹 React Router

For navigation in single-page applications.

### Installation

```bash
npm install react-router-dom
```

### Basic Usage

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🔹 Project Structure

```
01vite-project/
├── src/
│   ├── App.jsx        # Main component
│   ├── main.jsx       # Entry point
│   └── components/    # Reusable components
├── public/            # Static files
├── index.html         # HTML template
├── package.json       # Dependencies
└── vite.config.js     # Vite configuration
```

---

## 🔹 Projects in this Repository

1. **01.1CustomReact** - Understanding React from scratch
2. **01vite-project** - Basic Vite + React setup
3. **02Counter-pro** - Counter app with state management
4. **03TailwindProps** - Props and Tailwind CSS integration
5. **04bgchanger-pro** - Background color changer app

---

## 🔹 Best Practices

✅ **Use functional components** instead of class components  
✅ **Keep components small** and focused  
✅ **Use meaningful names** for components and functions  
✅ **Extract reusable logic** into custom hooks  
✅ **Use keys** properly in lists  
✅ **Avoid inline functions** in JSX for performance  
✅ **Use React DevTools** for debugging

---

## 🔹 Common Mistakes

❌ Modifying state directly (use setter function)  
❌ Missing keys in lists  
❌ Forgetting dependencies in `useEffect`  
❌ Using index as key in dynamic lists  
❌ Not cleaning up side effects

---

## 🔹 Useful Resources

- [React Official Docs](https://react.dev/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Hooks Documentation](https://react.dev/reference/react)

---

<div align="center">

Made with ⚛️ by learning React

</div>
