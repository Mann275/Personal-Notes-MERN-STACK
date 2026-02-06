# Todo App - Redux Toolkit State Management

## Topics Covered

- Redux Toolkit setup and configuration
- Store creation with configureStore
- Creating Slices (reducers + actions combined)
- useSelector hook for reading state
- useDispatch hook for updating state
- Global state management
- Redux DevTools integration

## What This Project Does

A Todo application using Redux Toolkit for state management, demonstrating:

- Modern Redux approach with minimal boilerplate
- Clean and scalable state management architecture
- How to structure Redux for real applications
- Industry-standard patterns for state management

## How It Works - Complete Flow

### 1. Create Redux Store (store.js)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer, // Add reducers here
  },
});

export default store;
```

### 2. Create Todo Slice (todoSlice.js)

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [{ id: 1, text: \"Hello World\" }]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: Date.now(),
        text: action.payload
      }
      state.todos.push(todo)  // Direct mutation allowed!
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      )
    },

    updateTodo: (state, action) => {
      const { id, text } = action.payload
      const todo = state.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.text = text
      }
    }
  }
})

// Export actions
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

// Export reducer
export default todoSlice.reducer
```

### 3. Provide Store to App (main.jsx)

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

### 4. Use Redux in Components

#### Adding Todo

```javascript
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice'

function AddTodo() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo(input))
    setInput('')
  }

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type=\"text\"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type=\"submit\">Add Todo</button>
    </form>
  )
}
```

#### Displaying & Removing Todos

```javascript
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "./todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </div>
  );
}
```

## Redux Toolkit Concepts Explained

### What is Redux Toolkit?

Modern way to use Redux with:

- Less boilerplate code
- Built-in best practices
- Simpler setup
- Direct state mutation (handled by Immer internally)

### Redux Flow

```
User Action (Button Click)
    ↓
dispatch(addTodo(\"Buy milk\"))
    ↓
Reducer in todoSlice receives action
    ↓
State updated in Store
    ↓
useSelector detects change
    ↓
Component re-renders with new data
```

### Key Differences from Context API

| Context API          | Redux Toolkit         |
| -------------------- | --------------------- |
| Good for small apps  | Better for large apps |
| Simple setup         | Requires store setup  |
| Limited debugging    | Redux DevTools        |
| Can cause re-renders | Optimized updates     |
| No middleware        | Middleware support    |

### When to Use Redux Toolkit?

✅ Large applications with complex state
✅ State needed across many components
✅ Need middleware (logging, API calls)
✅ Want time-travel debugging
✅ Team collaboration on big projects

### When NOT to Use?

❌ Simple apps (Context API is fine)
❌ Learning React basics
❌ Small projects with minimal state

## Redux Toolkit Structure

```
src/
├── app/
│   └── store.js              # Redux store configuration
├── features/
│   └── todo/
│       └── todoSlice.js      # Slice with actions & reducer
├── components/
│   ├── AddTodo.jsx          # Dispatch actions
│   └── Todos.jsx            # Read from store
└── main.jsx                  # Provider setup
```

## Important Redux Toolkit Features

### 1. configureStore

- Automatically combines reducers
- Includes Redux DevTools
- Sets up middleware

### 2. createSlice

- Combines actions + reducer
- Auto-generates action creators
- Uses Immer for immutable updates

### 3. Direct Mutation

```javascript
// Old Redux (Complex) ❌
return {
  ...state,
  todos: [...state.todos, action.payload],
};

// Redux Toolkit (Simple) ✅
state.todos.push(action.payload);
```

## Setup

```bash
# Install dependencies
npm install @reduxjs/toolkit react-redux

# Run project
npm run dev
```

## Features

✅ Add todos
✅ Remove todos
✅ Update todos
✅ Global state management
✅ Redux DevTools integration
✅ Clean state management
✅ Scalable architecture
✅ Type-safe actions

## Redux DevTools

Access in browser:

1. Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools)
2. Open browser DevTools
3. Click Redux tab
4. See all actions and state changes
5. Time-travel through state history!

## Learning Outcomes

- Setting up Redux Toolkit store
- Creating slices with actions and reducers
- Using useSelector and useDispatch
- Managing global state efficiently
- Redux flow and data management
- When to choose Redux over Context API
- Industry-standard state management patterns
