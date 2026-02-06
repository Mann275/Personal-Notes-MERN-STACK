# Mini Context API - Introduction to Global State

## Topics Covered

- Context API fundamentals
- createContext function
- Context Provider pattern
- useContext hook
- Global state management
- Solving prop drilling problem

## What This Project Does

A beginner-friendly introduction to Context API that demonstrates:

- How to share data across multiple components without props
- Creating and using context for user information
- Accessing global state from any component in the tree
- Clean alternative to passing props through multiple levels

## The Prop Drilling Problem

```javascript
// WITHOUT Context API (Prop Drilling) ❌
function App() {
  const user = { name: "John", age: 25 };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // Just passing down
}

function Child({ user }) {
  return <GrandChild user={user} />; // Still passing down
}

function GrandChild({ user }) {
  return <div>{user.name}</div>; // Finally using it!
}
```

## Solution: Context API ✅

```javascript
// WITH Context API - Clean and Direct!

// 1. Create Context
const UserContext = createContext();

// 2. Provide Context
function App() {
  const user = { name: "John", age: 25 };
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

// 3. Skip middle components - No props needed!
function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

// 4. Use Context directly where needed
function GrandChild() {
  const user = useContext(UserContext); // Direct access!
  return <div>{user.name}</div>;
}
```

## How It Works - Step by Step

### Step 1: Create Context

```javascript
import { createContext } from "react";

// Create context with default value
const UserContext = createContext();
```

### Step 2: Create Provider Component

```javascript
function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@example.com",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```

### Step 3: Wrap App with Provider

```javascript
function App() {
  return (
    <UserContextProvider>
      <Header />
      <Main />
      <Footer />
    </UserContextProvider>
  );
}
```

### Step 4: Use Context Anywhere

```javascript
function Header() {
  const { user } = useContext(UserContext);
  return <h1>Welcome, {user.name}!</h1>;
}

function Footer() {
  const { user, setUser } = useContext(UserContext);

  const updateUser = () => {
    setUser({ name: "John Doe", email: "john@example.com" });
  };

  return <button onClick={updateUser}>Update User</button>;
}
```

## Key Concepts

### When to Use Context API?

✅ User authentication state
✅ Theme (dark/light mode)
✅ Language preferences
✅ Shopping cart data
✅ Any data needed by many components

### When NOT to Use?

❌ Data that changes very frequently (use Redux instead)
❌ Simple parent-child data passing (props are fine)
❌ Performance-critical applications with complex state

## Setup

```bash
npm install
npm run dev
```

## Features

- User context example
- Theme context example
- Direct data access in any component
- No prop passing needed
- Clean component structure
- Beginner-friendly examples

## Learning Outcomes

- Understanding Context API purpose
- Creating and providing context
- Consuming context with useContext
- Solving prop drilling problem
- Managing global state simply
