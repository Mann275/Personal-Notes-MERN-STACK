# React Interview Guide

<a name="top"></a>

## 📑 Table of Contents

### **React Fundamentals**

1. [What is React & How React Works](#1-what-is-react--how-react-works)
2. [JSX and Babel](#2-jsx-and-babel)
3. [Virtual DOM](#3-virtual-dom)
4. [Components](#4-components)

### **React Hooks**

5. [What are Hooks](#5-what-are-hooks)
6. [useState](#6-usestate)
7. [useEffect](#7-useeffect)
8. [useRef](#8-useref)
9. [useCallback](#9-usecallback)
10. [Custom Hooks](#10-custom-hooks)

### **React Router**

11. [React Router Basics](#11-react-router-basics)
12. [Link vs NavLink](#12-link-vs-navlink)
13. [Dynamic Routes (useParams)](#13-dynamic-routes-useparams)
14. [Query Parameters (useSearchParams)](#14-query-parameters-usesearchparams)
15. [useNavigate](#15-usenavigate)

### **State Management**

16. [Props](#16-props)
17. [Prop Drilling Problem](#17-prop-drilling-problem)
18. [Context API](#18-context-api)
19. [Redux Basics](#19-redux-basics)
20. [Redux Toolkit](#20-redux-toolkit)

### **Advanced Concepts**

21. [Controlled vs Uncontrolled Components](#21-controlled-vs-uncontrolled-components)
22. [Keys in React](#22-keys-in-react)
23. [React.memo vs useCallback vs useMemo](#23-reactmemo-vs-usecallback-vs-usememo)
24. [Lifting State Up](#24-lifting-state-up)
25. [Error Boundaries](#25-error-boundaries)
26. [React Performance Optimization](#26-react-performance-optimization)

### **Styling & Forms**

27. [Tailwind Integration](#27-tailwind-integration)
28. [Formik](#28-formik)
29. [Yup Validation](#29-yup-validation)

---

## 1. What is React & How React Works

<a name="1-what-is-react--how-react-works"></a>

**Definition:**  
React is a JavaScript library used for building fast, scalable, and interactive user interfaces.

**Exp:**  
React ek UI library hai jo website ko components mein tod deta hai.  
Jab data change hota hai, React poora page reload nahi karta, sirf wahi part update karta hai jahan change hua.

**Theory:**

- React UI ka Virtual DOM banata hai (memory mein)
- Jab state ya props change hoti hain:
  - React naya Virtual DOM banata hai
  - Old aur new Virtual DOM compare karta hai (diffing)
  - Sirf changed elements real DOM mein update hote hain
- Is process ko Reconciliation bolte hain
- Isi wajah se React fast hota hai

```javascript
// React internally creates objects like this
const element = {
  type: "div",
  props: {
    className: "container",
    children: "Hello React",
  },
};

// React converts it to real DOM
// <div class="container">Hello React</div>
```

**Interview Line:**  
_React efficiently updates UI using Virtual DOM and reconciliation._

[⬆️ Back to Top](#top)

---

## 2. JSX and Babel

<a name="2-jsx-and-babel"></a>

**Definition:**  
JSX is a syntax extension that allows writing HTML-like code inside JavaScript. Babel converts JSX into browser-readable JavaScript.

**Exp:**  
JSX HTML jaisa dikhta hai, lekin hai JavaScript.  
Browser JSX nahi samajhta, isliye Babel JSX ko normal JavaScript mein convert karta hai.

**Theory:**

- JSX code readable aur clean hota hai
- JSX ke andar JavaScript expressions use kar sakte hain
- Babel ek transpiler hai:
  - JSX → JavaScript
  - Modern JS → Browser-compatible JS

```javascript
// JSX
const element = <h1 className="title">Hello World</h1>;

// After Babel conversion
const element = React.createElement(
  "h1",
  { className: "title" },
  "Hello World",
);
```

**Interview Line:**  
_JSX improves readability and Babel converts it into plain JavaScript._

[⬆️ Back to Top](#top)

---

## 3. Virtual DOM

<a name="3-virtual-dom"></a>

**Definition:**  
Virtual DOM is a lightweight in-memory representation of the real DOM.

**Exp:**  
Real DOM slow hota hai. React pehle memory mein check karta hai ki kya change hua, phir sirf wahi real DOM mein update karta hai.

**Theory:**

- React DOM ka virtual copy memory mein rakhta hai
- State change hone par:
  - Naya Virtual DOM banta hai
  - Old aur new Virtual DOM compare hota hai
  - Minimum changes real DOM mein apply hote hain
- React Fiber algorithm async rendering allow karta hai

```javascript
// Direct DOM update (slow)
document.getElementById("text").innerText = "Hello";

// React way (optimized)
const [text, setText] = useState("Hi");
setText("Hello");
```

**Interview Line:**  
_Virtual DOM minimizes real DOM operations, improving performance._

[⬆️ Back to Top](#top)

---

## 4. Components

<a name="4-components"></a>

**Definition:**  
Components are reusable and independent pieces of UI.

**Exp:**  
Components chhote UI blocks hote hain — jaise button, card, navbar.  
Ek baar banao, poori app mein reuse karo.

**Theory:**

- UI ko logical parts mein todte hain
- Props ke through data receive karte hain
- State ke through data manage karte hain
- Components nested ho sakte hain
- Code reusable aur maintainable hota hai

```javascript
// Functional Component
function Welcome({ name }) {
  return <h1>Hello {name}</h1>;
}

// Usage
<Welcome name="React" />;
<Welcome name="JavaScript" />;
```

**Interview Line:**  
_Components make UI reusable and easier to maintain._

[⬆️ Back to Top](#top)

---

## 5. What are Hooks

<a name="5-what-are-hooks"></a>

**Definition:**  
Hooks are special functions in React that allow you to use state and other React features inside functional components.

**Exp:**  
Pehle React mein state aur lifecycle sirf class components mein hota tha.  
Hooks aane ke baad functional components bhi powerful ho gaye — ab state, side effects, sab kuch function ke andar use kar sakte hain.

**Theory:**

- Hooks React 16.8 mein introduce hue
- Hooks ka naam hamesha `use` se start hota hai
- Hooks sirf:
  - Functional components
  - Custom hooks  
    mein use hote hain
- Hooks ko:
  - loops ke andar ❌
  - conditions ke andar ❌  
    call nahi kar sakte
- Hooks ne class components ko almost obsolete bana diya

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Interview Line:**  
_Hooks allow functional components to use state and lifecycle features._

[⬆️ Back to Top](#top)

---

## 6. useState

<a name="6-usestate"></a>

**Definition:**  
useState is a React hook that lets a component store and manage local state.

**Exp:**  
useState component ko yaad rakhne ki power deta hai.  
Jaise counter value, form input, toggle state, etc.  
State change hoti hai → component re-render hota hai.

**Theory:**

- useState ek array return karta hai:
  - current value
  - update function
- State update hone par UI automatically update hota hai
- State immutable hoti hai (direct change ❌)
- Multiple states ek component mein ho sakti hain

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}

// Multiple states
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [isActive, setIsActive] = useState(false);
```

**Interview Line:**  
_useState manages component-level state and triggers re-render on update._

[⬆️ Back to Top](#top)

---

## 7. useEffect

<a name="7-useeffect"></a>

**Definition:**  
useEffect is used to perform side effects in React components.

**Exp:**  
Jo kaam render ke baad karna ho — jaise:

- API call
- timer
- event listener
- document title change

wo sab useEffect karta hai.

**Theory:**

- useEffect render ke baad chalta hai
- Dependency array decide karta hai kab chalega
- Cleanup function memory leaks prevent karta hai
- Class lifecycle methods ka replacement hai

**Dependency behavior:**

| Dependency | Behavior                  |
| ---------- | ------------------------- |
| none       | Har render ke baad        |
| `[]`       | Sirf first render (mount) |
| `[value]`  | Jab value change ho       |

```javascript
import { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

**Cleanup Example:**

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

**Interview Line:**  
_useEffect handles side effects and runs after component render._

[⬆️ Back to Top](#top)

---

## 8. useRef

<a name="8-useref"></a>

**Definition:**  
useRef creates a mutable reference that persists across renders without causing re-render.

**Exp:**  
useRef ka use hota hai jab:

- DOM element ko directly access karna ho
- Koi value store karni ho jo re-render na karaye

**Theory:**

- useRef ek object return karta hai `{ current }`
- `.current` change karne se re-render nahi hota
- Mostly DOM access ke liye use hota hai
- Previous values store karne ke kaam aata hai

```javascript
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}

// Store mutable value
const countRef = useRef(0);
countRef.current += 1;
```

**Interview Line:**  
_useRef stores mutable values without triggering re-render._

[⬆️ Back to Top](#top)

---

## 9. useCallback

<a name="9-usecallback"></a>

**Definition:**  
useCallback returns a memoized version of a function that changes only when its dependencies change.

**Exp:**  
Normally har render pe naya function create hota hai.  
useCallback function ko remember karta hai taaki unnecessary re-render na ho.

**Theory:**

- Performance optimization ke liye use hota hai
- Mostly child components ke saath
- React.memo ke saath best kaam karta hai
- Har function ko memoize karna zaroori nahi

```javascript
import { useState, useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return <Child onClick={increment} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>+</button>;
});
```

**Interview Line:**  
_useCallback prevents unnecessary function recreation and re-renders._

[⬆️ Back to Top](#top)

---

## 10. Custom Hooks

**Definition:** Custom hooks are reusable functions that contain React hooks logic. They let you extract component logic into reusable functions.

**Exp:** Custom hooks apni khud ki hooks hain jo reusable logic ko share karne ke liye banate hain. Logic ek jagah likho, kahin bhi use karo.

**Theory:**

<a name="10-custom-hooks"></a>

**Definition:**  
Custom hooks are reusable functions that contain hook logic and can be shared across components.

**Exp:**  
Agar same logic (API call, auth, form handling) baar-baar likh rahe ho,  
toh us logic ko custom hook bana do.

**Theory:**

- Custom hook ka naam `use` se start hota hai
- Dusre hooks ke andar hooks use kar sakte hain
- Code reuse aur readability improve hoti hai
- Business logic UI se separate hota hai

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

function User() {
  const { data, loading } = useFetch("/api/user");

  if (loading) return <p>Loading...</p>;
  return <h1>{data.name}</h1>;
}
```

**Interview Line:**  
_Custom hooks help reuse stateful logic across components._

[⬆️ Back to Top](#top)

---

## 11. React Router Basics

<a name="11-react-router-basics"></a>

**Definition:**  
React Router is a library that enables client-side routing in React applications without full page reloads.

**Exp:**  
React Router se hum Single Page Application (SPA) banate hain.  
URL change hota hai, component change hota hai — page reload nahi hota.

**Theory:**

- SPA mein browser reload nahi hota
- React Router URL ke basis pe component render karta hai
- Core concepts:
  - **RouterProvider** – router ko app ko deta hai
  - **Route** – URL aur component ka mapping
  - **Outlet** – child routes render karne ki jagah
- Modern React Router (v6+) data APIs support karta hai

```javascript
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <>
      <nav>Navbar</nav>
      <Outlet />
    </>
  );
}
```

**Interview Line:**  
_React Router enables navigation in SPA without reloading the page._

[⬆️ Back to Top](#top)

---

## 12. Link vs NavLink

<a name="12-link-vs-navlink"></a>

**Definition:**  
Link and NavLink are components used for navigation in React Router. NavLink provides active state styling.

**Exp:**  
Dono page reload ke bina navigation karte hain.  
Farq bas itna hai ki NavLink automatically bata deta hai kaunsa page active hai.

**Theory:**

- **Link**
  - Simple navigation
  - No active styling
- **NavLink**
  - Active route detect karta hai
  - Styling/class conditionally add karta hai
- Navbar ke liye NavLink best hota hai

```javascript
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>
    </nav>
  );
}
```

**Interview Line:**  
_NavLink provides active route styling, Link does not._

[⬆️ Back to Top](#top)

---

## 13. Dynamic Routes (useParams)

<a name="13-dynamic-routes-useparams"></a>

**Definition:**  
Dynamic routes allow passing variable values in the URL. useParams reads those values inside components.

**Exp:**  
Jab URL ke andar data bhejna ho — jaise userId, productId —  
toh hum dynamic routes use karte hain.

**Theory:**

- Route mein `:paramName` likhte hain
- `useParams()` URL se values nikalta hai
- Mostly use cases:
  - User profile
  - Product detail page
  - Blog post page

```javascript
import { useParams } from "react-router-dom";

<Route path="/user/:userId" element={<User />} />;

function User() {
  const { userId } = useParams();
  return <h1>User ID: {userId}</h1>;
}

// URL: /user/101
// userId = "101"
```

**Interview Line:**  
_useParams is used to access dynamic route parameters._

[⬆️ Back to Top](#top)

---

## 14. Query Parameters (useSearchParams)

<a name="14-query-parameters-usesearchparams"></a>

**Definition:**  
Query parameters are key-value pairs in the URL used for filters, search, and pagination. useSearchParams helps manage them.

**Exp:**  
URL ke end mein jo `?key=value` hota hai, wahi query params hain.  
Search, filter, pagination mein bohot common hai.

**Theory:**

- Format: `?query=react&page=2`
- `useSearchParams()` return karta hai:
  - current params
  - update function
- URL change hota hai but page reload nahi hota

```javascript
import { useSearchParams } from "react-router-dom";

function Search() {
  const [params, setParams] = useSearchParams();

  const query = params.get("query");

  const updateQuery = () => {
    setParams({ query: "react", page: 1 });
  };

  return (
    <>
      <p>Search: {query}</p>
      <button onClick={updateQuery}>Search React</button>
    </>
  );
}

// URL: /search?query=javascript
// query = "javascript"

// After button click:
// URL: /search?query=react&page=1
```

**Interview Line:**  
_useSearchParams is used to read and update URL query parameters._

[⬆️ Back to Top](#top)

---

## 15. useNavigate

<a name="15-usenavigate"></a>

**Definition:**  
useNavigate is a hook used for programmatic navigation in React Router.

**Exp:**  
Jab button click, login success, ya form submit ke baad  
code ke through page change karna ho, tab useNavigate use hota hai.

**Theory:**

- `navigate("/path")` – new page
- `navigate(-1)` – back
- `navigate(-2)` – two pages back
- `replace: true` history replace karta hai
- Navigation ke saath data bhi bhej sakte ho

```javascript
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login, navigate to dashboard
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}

// Other navigation examples:
function Examples() {
  const navigate = useNavigate();

  return (
    <>
      {/* Go to specific route */}
      <button onClick={() => navigate("/home")}>Go Home</button>

      {/* Go back one page */}
      <button onClick={() => navigate(-1)}>Back</button>

      {/* Go back two pages */}
      <button onClick={() => navigate(-2)}>Back 2 Pages</button>

      {/* Navigate with state data */}
      <button
        onClick={() =>
          navigate("/product/1", {
            state: { from: "home" },
          })
        }
      >
        View Product
      </button>

      {/* Replace current history entry */}
      <button onClick={() => navigate("/", { replace: true })}>
        Replace with Home
      </button>
    </>
  );
}
```

**Interview Line:**  
_useNavigate allows navigation through code instead of links._

[⬆️ Back to Top](#top)

---

## 16. Props

<a name="16-props"></a>

**Definition:**  
Props (short for properties) are used to pass data from a parent component to a child component in React.

**Exp:**  
Props ka matlab hai parent se child ko data bhejna.  
Bilkul waise jaise function ko arguments dete ho.

**Theory:**

- Props are read-only (child change nahi kar sakta)
- Parent → Child direction mein data flow hota hai
- Props kisi bhi type ke ho sakte hain:
  - string, number, boolean
  - object, array
  - function
- Props destructuring se code clean hota hai
- children ek special prop hai

```javascript
// Real-world e-commerce example
function ProductList() {
  const products = [
    { id: 1, name: "iPhone 15", price: 79999, rating: 4.5 },
    { id: 2, name: "AirPods Pro", price: 24999, rating: 4.8 },
  ];

  return (
    <div>
      {products.map((product) => (
        // Parent passes data as props to child
        <ProductCard
          key={product.id}
          name={product.name} // String prop
          price={product.price} // Number prop
          rating={product.rating} // Number prop
          onBuy={() => alert(`Buying ${product.name}`)} // Function prop
        />
      ))}
    </div>
  );
}

// Child receives props and uses them
function ProductCard({ name, price, rating, onBuy }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>₹{price}</p>
      <p>⭐ {rating}</p>
      <button onClick={onBuy}>Add to Cart</button>
    </div>
  );
}
```

**Interview Line:**  
_Props are used to pass data from parent to child components._

[⬆️ Back to Top](#top)

---

## 17. Prop Drilling Problem

<a name="17-prop-drilling-problem"></a>

**Definition:**  
Prop drilling occurs when props are passed through multiple component levels unnecessarily.

**Exp:**  
Jab data grandparent se direct grandchild ko chahiye hota hai,  
lekin beech ke components sirf pass-through ban jaate hain —  
isse code messy ho jata hai.

**Theory:**

- Data flow: App → Parent → Child → GrandChild
- Middle components data use nahi karte
- Code hard to maintain ho jata hai
- Future changes risky ho jaate hain
- Solution:
  - Context API
  - Redux

```javascript
// Shopping cart example - total 3 levels deep
function App() {
  const [cart, setCart] = useState([
    { id: 1, name: "iPhone", price: 79999 },
    { id: 2, name: "AirPods", price: 24999 },
  ]);

  // Cart needed at level 3, but we pass from level 0
  return <Header cart={cart} />;
}

function Header({ cart }) {
  // ❌ Header doesn't use cart, just passes it down
  return (
    <nav>
      <Logo />
      <CartSection cart={cart} /> {/* Passing through */}
    </nav>
  );
}

function CartSection({ cart }) {
  // ❌ CartSection doesn't use cart either, just passes down
  return <CartIcon cart={cart} />;
  {
    /* Passing through */
  }
}

function CartIcon({ cart }) {
  // ✅ FINALLY using cart here at level 3!
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <span>
      🛒 {cart.length} items - ₹{total}
    </span>
  );
}

// Problem: Header and CartSection are just pass-through
// They waste code space and make refactoring hard
```

**Interview Line:**  
_Prop drilling makes code difficult to scale and maintain._

[⬆️ Back to Top](#top)

---

## 18. Context API

<a name="18-context-api"></a>

**Definition:**  
Context API allows sharing data across the component tree without passing props manually at every level.

**Exp:**  
Context API se hum direct grandchild ko data de sakte hain,  
beech ke components ko props pass karne ki zarurat nahi hoti.

**Theory:**

- Prop drilling ka solution hai
- Common use cases:
  - Theme (dark/light)
  - Auth user
  - Language
- 3 main steps:
  - Create Context
  - Provide Context
  - Consume Context

```javascript
import { createContext, useContext, useState } from "react";

// Step 1: Create context (global state container)
const ThemeContext = createContext();

// Step 2: Provider (wraps app and provides value)
function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // All children can access theme and toggleTheme
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Navbar />
      <HomePage />
      <Footer />
    </ThemeContext.Provider>
  );
}

function Navbar() {
  // No props needed! Direct access via context
  return <ThemeToggleButton />;
}

// Step 3: Consume context anywhere in the tree
function ThemeToggleButton() {
  // Direct access to context value
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function HomePage() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === "light" ? "#fff" : "#000" }}>
      <h1>Welcome!</h1>
    </div>
  );
}

// No prop drilling! Any component can access context directly
```

        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>

);
}

function HomePage() {
const { theme } = useContext(ThemeContext);
return (
<div style={{ background: theme === "light" ? "#fff" : "#000" }}>
<h1>Welcome!</h1>
</div>
);
}

````

**Interview Line:**
_Context API is used to avoid prop drilling for global data._

[⬆️ Back to Top](#top)

---

## 19. Redux Basics

<a name="19-redux-basics"></a>

**Definition:**
Redux is a state management library that stores the entire application state in a single global store.

**Exp:**
Redux mein poori app ka data ek jagah store hota hai.
Koi bhi component directly us data ko access kar sakta hai.

**Theory:**

- Redux follows one-way data flow
- Core concepts:
  - Store – state ka ghar
  - Action – kya hua
  - Reducer – state kaise change hogi
  - Dispatch – action bhejna
- Complex apps ke liye useful

```javascript
import { createStore } from "redux";

// Step 1: Define initial state
const initialState = {
  todos: [],
};

// Step 2: Create reducer (decides how state changes)
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      // Create new array with new todo added
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };

    case "DELETE_TODO":
      // Filter out todo with matching id
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_TODO":
      // Toggle completed status of matching todo
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    default:
      return state;
  }
}

// Step 3: Create store
const store = createStore(todoReducer);

// Step 4: Dispatch actions to update state
store.dispatch({ type: "ADD_TODO", payload: "Learn Redux" });
store.dispatch({ type: "ADD_TODO", payload: "Build Project" });

// Step 5: Get current state
console.log(store.getState());
// Output: { todos: [{id: 1, text: 'Learn Redux'}, {id: 2, text: 'Build Project'}] }
````

**Interview Line:**  
_Redux manages global state using a predictable data flow._

[⬆️ Back to Top](#top)

---

## 20. Redux Toolkit

<a name="20-redux-toolkit"></a>

**Definition:**  
Redux Toolkit (RTK) is the official, recommended way to write Redux logic with less boilerplate.

**Exp:**  
Purana Redux kaafi verbose tha.  
Redux Toolkit kam code, clean syntax, aur best practices by default deta hai.

**Theory:**

- Redux ka modern version
- Boilerplate kam karta hai
- createSlice reducer + actions ek saath banata hai
- Immer use karta hai (direct mutation allowed)
- Async logic ke liye createAsyncThunk

```javascript
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Step 1: Create slice (combines reducer + actions)
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Direct mutation allowed (Immer handles it)
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Step 2: Configure store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Step 3: Use in component
function Counter() {
  // Get state from store
  const count = useSelector((state) => state.counter.value);

  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <>
      <p>Count: {count}</p>
      {/* Dispatch action on button click */}
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        +
      </button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>
        -
      </button>
    </>
  );
}
```

**Interview Line:**  
_Redux Toolkit simplifies Redux and is the recommended approach today._

[⬆️ Back to Top](#top)

---

## 21. Controlled vs Uncontrolled Components

<a name="21-controlled-vs-uncontrolled-components"></a>

**Definition:**  
Controlled components are form elements whose value is managed by React state, while uncontrolled components rely on the DOM to manage their state.

**Exp:**  
Agar input ka value React state control kar raha hai → Controlled.  
Agar input apna kaam DOM khud kar raha hai → Uncontrolled.

**Theory:**

- **Controlled**
  - Value comes from state
  - Full control + validation easy
  - Recommended approach
- **Uncontrolled**
  - Value stored in DOM
  - Access via ref
  - Less control, less predictable

```javascript
import { useState, useRef } from "react";

// CONTROLLED - React controls the value
function ControlledInput() {
  const [name, setName] = useState("");

  return (
    <input
      value={name} // Value from state
      onChange={(e) => setName(e.target.value)} // Update state on change
    />
  );
}

// UNCONTROLLED - DOM controls the value
function UncontrolledInput() {
  const inputRef = useRef();

  const submit = () => {
    // Access DOM directly when needed
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} /> {/* No value prop */}
      <button onClick={submit}>Submit</button>
    </>
  );
}
```

**Interview Line:**  
_Controlled components give React full control over form data._

[⬆️ Back to Top](#top)

---

## 22. Keys in React

<a name="22-keys-in-react"></a>

**Definition:**  
Keys are special attributes used by React to identify elements in a list uniquely.

**Exp:**  
Jab hum list render karte hain (map),  
React ko batana padta hai kaunsa item kaunsa hai — wahi key hoti hai.

**Theory:**

- Keys help React:
  - Identify list items
  - Optimize re-rendering
- Keys must be:
  - Unique
  - Stable
- Index as key ❌ (unless list is static)

```javascript
const items = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Orange" },
];

// ✅ GOOD - Using unique ID from data
items.map((item) => <li key={item.id}>{item.name}</li>);

// ❌ BAD - Using array index
// Problem: If list reorders, React gets confused
items.map((item, index) => <li key={index}>{item.name}</li>);

// Why index is bad:
// Before: [1: Apple, 2: Banana, 3: Orange]
// After delete Banana: [1: Apple, 2: Orange]
// React thinks Orange is Banana (same index 1)
```

**Interview Line:**  
_Keys help React efficiently update lists._

[⬆️ Back to Top](#top)

---

## 23. React.memo vs useCallback vs useMemo

<a name="23-memo-vs-callback-vs-memo"></a>

**Definition:**  
These are optimization tools used to prevent unnecessary re-renders in React.

**Exp:**  
React by default zyada re-render karta hai.  
Ye teen tools performance improve karte hain — lekin sirf jab zarurat ho.

**Theory:**

🔹 **React.memo**

- Component ko memoize karta hai
- Props same → re-render nahi

```javascript
// Without memo: Child re-renders every time Parent re-renders
// With memo: Child only re-renders if 'value' prop changes
const Child = React.memo(({ value }) => {
  console.log("Rendered");
  return <p>{value}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name] = useState("React");

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Child value={name} /> {/* Won't re-render when count changes */}
    </>
  );
}
```

🔹 **useCallback**

- Function ko memoize karta hai
- Mostly props ke through function pass karte waqt

```javascript
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback: New function created every render
  // With useCallback: Same function reference maintained
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // Empty deps = function never recreated

  return <MemoizedChild onClick={handleClick} />;
}
```

🔹 **useMemo**

- Expensive calculation ka result memoize karta hai

```javascript
function SearchList({ items, filter }) {
  // Without useMemo: Calculation runs on every render
  // With useMemo: Calculation only when 'items' or 'filter' changes
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) => item.includes(filter));
  }, [items, filter]); // Only recalculate when these change

  return <List data={filteredItems} />;
}
```

**Interview Line:**  
_React.memo memoizes components, useCallback memoizes functions, useMemo memoizes values._

[⬆️ Back to Top](#top)

---

## 24. Lifting State Up

<a name="24-lifting-state-up"></a>

**Definition:**  
Lifting state up means moving shared state to the closest common parent component.

**Exp:**  
Jab do child components ko same data chahiye,  
toh state ko unke parent mein shift kar dete hain.

**Theory:**

- Avoids duplicate state
- Keeps data in sync
- Common in forms & filters
- React recommended pattern

```javascript
// Problem: Two children need to share count state
// Solution: Lift state to common parent

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Child A reads the count */}
      <ChildA count={count} />

      {/* Child B updates the count */}
      <ChildB setCount={setCount} />
    </>
  );
}

function ChildA({ count }) {
  return <h1>Count: {count}</h1>;
}

function ChildB({ setCount }) {
  return <button onClick={() => setCount((c) => c + 1)}>Increment</button>;
}

// Both children stay in sync because parent owns the state
```

**Interview Line:**  
_Lifting state up keeps shared data consistent._

[⬆️ Back to Top](#top)

---

## 25. Error Boundaries

<a name="25-error-boundaries"></a>

**Definition:**  
Error Boundaries are React components that catch JavaScript errors in their child component tree.

**Exp:**  
Agar kisi component mein error aa jaye,  
toh poori app crash na ho — isliye Error Boundary use hota hai.

**Theory:**

- Only works with class components
- Catches:
  - Rendering errors
  - Lifecycle errors
- Does NOT catch:
  - Event handlers
  - Async errors

```javascript
import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  // Called when error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log error info (optional)
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Show fallback UI
      return <h2>⚠️ Something went wrong</h2>;
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent /> {/* If this crashes, fallback UI shows */}
    </ErrorBoundary>
  );
}
```

**Interview Line:**  
_Error boundaries prevent the entire app from crashing._

[⬆️ Back to Top](#top)

---

## 26. React Performance Optimization

<a name="26-react-performance-optimization"></a>

**Definition:**  
Performance optimization in React focuses on reducing unnecessary renders and improving UI responsiveness.

**Exp:**  
React fast hota hai, lekin galat code se slow bhi ho sakta hai.  
Optimization ka matlab hai sirf zaruri render hone dena.

**Theory:**

- Use React.memo
- Use useCallback & useMemo
- Avoid inline functions in props
- Lazy load components
- Proper keys in lists
- Avoid unnecessary state

```javascript
import React, { lazy, Suspense } from "react";

// Lazy loading - Component loads only when needed
const LazyPage = React.lazy(() => import("./Page"));

function App() {
  return (
    // Suspense shows fallback while component loads
    <Suspense fallback={<div>Loading...</div>}>
      <LazyPage />
    </Suspense>
  );
}

// Other optimization tips:
function OptimizedComponent() {
  const [count, setCount] = useState(0);

  // ❌ BAD - Inline object creates new reference every render
  return <Child style={{ color: "red" }} />;

  // ✅ GOOD - Create outside or use useMemo
  const style = useMemo(() => ({ color: "red" }), []);
  return <Child style={style} />;
}
```

**Interview Line:**  
_Performance optimization reduces unnecessary re-renders._

[⬆️ Back to Top](#top)

---

## 27. Tailwind Integration

<a name="27-tailwind-integration"></a>

**Definition:**  
Tailwind CSS is a utility-first CSS framework used to build modern UI quickly without writing custom CSS.

**Exp:**  
Tailwind mein pehle se ready classes hoti hain.  
CSS file likhne ke bajay direct JSX ke andar classes likhte ho — fast & clean.

**Theory:**

- Utility-first approach
- No class-name thinking headache
- Responsive + dark mode built-in
- Best for component-based UI
- Works perfectly with React

```javascript
// Install and setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};

// Component with Tailwind
function Card() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Title</h2>
      <p className="text-gray-600">Content</p>
    </div>
  );
}
```

**Interview Line:**  
_Tailwind speeds up UI development using utility classes._

[⬆️ Back to Top](#top)

---

## 28. Formik

<a name="28-formik"></a>

**Definition:**  
Formik is a React library used to manage form state, validation, and submission easily.

**Exp:**  
Normal forms mein bohot boilerplate hota hai  
(value, onChange, error handling).  
Formik ye sab automatically handle kar leta hai.

**Theory:**

- Handles form state
- Handles validation
- Handles submit
- Reduces repetitive code
- Works best with Yup

```javascript
import { useFormik } from "formik";

function Login() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input name="email" onChange={formik.handleChange} />
      <input name="password" type="password" onChange={formik.handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
```

**Interview Line:**  
_Formik simplifies form handling in React._

[⬆️ Back to Top](#top)

---

## 29. Yup Validation

<a name="29-yup-validation"></a>

**Definition:**  
Yup is a schema-based validation library commonly used with Formik.

**Exp:**  
Yup mein hum rules likhte hain —  
Formik automatically un rules ke basis pe errors handle karta hai.

**Theory:**

- Schema-based validation
- Clean & readable
- Supports complex rules
- Perfect with Formik

```javascript
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

useFormik({
  initialValues: { email: "", password: "" },
  validationSchema: schema,
});
```

**Interview Line:**  
_Yup provides clean and scalable form validation._

[⬆️ Back to Top](#top)

---

## Interview Tips

### Common Questions to Prepare:

1. Explain React lifecycle
2. What is Virtual DOM and how it works?
3. Difference between class and functional components
4. When to use useEffect?
5. What is prop drilling and how to solve it?
6. Context API vs Redux - when to use what?
7. How does React Router work?
8. **Controlled vs Uncontrolled components** ⭐
9. **What are keys in React and why important?** ⭐
10. **React.memo vs useCallback vs useMemo** ⭐
11. **Lifting State Up concept** ⭐
12. Error Boundaries
13. How to optimize React performance?
14. useEffect cleanup function
15. Custom hooks - when and why?

### Tips:

- ✅ Explain with simple examples
- ✅ Mention real-world use cases
- ✅ Compare with alternatives
- ✅ Discuss pros and cons
- ✅ Show code examples if asked

---

**Happy Learning! 🚀**

_This guide covers essential React concepts for interviews. Practice building projects to strengthen these concepts._
