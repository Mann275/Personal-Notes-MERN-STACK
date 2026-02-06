# Todo App - Context API + Local Storage Persistence

## Topics Covered

- Context API for global state management
- Local Storage for data persistence
- Complete CRUD operations
- useEffect for side effects and storage sync
- Array manipulation methods (map, filter)
- Controlled form inputs
- Conditional rendering and styling
- Inline editing functionality

## What This Project Does

A complete, production-ready Todo application featuring:

- Add, edit, delete, and toggle todos
- Global state management with Context API
- Data persistence using browser's localStorage
- Inline editing functionality
- Mark todos as complete/incomplete
- Data survives page refresh
- Clean and intuitive UI

## How It Works - Complete Flow

### 1. Context Setup

```javascript
// TodoContext.js
import { createContext, useContext } from 'react'

export const TodoContext = createContext({
  todos: [
    { id: 1, todo: \"Todo msg\", completed: false }
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {}
})

export const useTodo = () => {
  return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider
```

### 2. App.jsx - Provider Implementation

```javascript
function App() {
  const [todos, setTodos] = useState([])

  // Add Todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  // Update Todo
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id ? todo : prevTodo
    ))
  }

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // Toggle Complete
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id
        ? { ...prevTodo, completed: !prevTodo.completed }
        : prevTodo
    ))
  }

  // Load from localStorage on mount
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(\"todos\"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem(\"todos\", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <TodoForm />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </TodoProvider>
  )
}
```

### 3. TodoForm Component

```javascript
function TodoForm() {
  const [todo, setTodo] = useState(\"\")
  const { addTodo } = useTodo()

  const add = (e) => {
    e.preventDefault()
    if (!todo) return
    addTodo({ todo, completed: false })
    setTodo(\"\")  // Clear input
  }

  return (
    <form onSubmit={add}>
      <input
        type=\"text\"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder=\"Write Todo...\"
      />
      <button type=\"submit\">Add</button>
    </form>
  )
}
```

### 4. TodoItem Component (with Inline Edit)

```javascript
function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }

  return (
    <div>
      <input
        type=\"checkbox\"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      <input
        type=\"text\"
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        className={todo.completed ? \"line-through\" : \"\"}
      />

      <button onClick={() => {
        if (isTodoEditable) {
          editTodo()
        } else {
          setIsTodoEditable(true)
        }
      }}>
        {isTodoEditable ? \"Save\" : \"Edit\"}
      </button>

      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  )
}
```

## LocalStorage Integration Explained

### Saving Data

```javascript
// Runs whenever 'todos' array changes
useEffect(() => {
  localStorage.setItem(\"todos\", JSON.stringify(todos))
}, [todos])
```

### Loading Data

```javascript
// Runs once when component mounts
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem(\"todos\"))
  if (todos && todos.length > 0) {
    setTodos(todos)
  }
}, [])
```

## CRUD Operations Breakdown

### Create (Add)

```javascript
const addTodo = (todo) => {
  setTodos((prev) => [
    { id: Date.now(), ...todo }, // New todo at start
    ...prev, // Existing todos
  ]);
};
```

### Read (Display)

```javascript
{
  todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
}
```

### Update (Edit)

```javascript
const updateTodo = (id, todo) => {
  setTodos((prev) =>
    prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
  );
};
```

### Delete (Remove)

```javascript
const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};
```

## Setup

```bash
npm install
npm run dev
```

## Features

✅ Add new todos
✅ Edit todos inline
✅ Delete todos
✅ Mark as complete/incomplete
✅ Strikethrough for completed todos
✅ Color coding (purple = active, green = completed)
✅ Data persists after page refresh
✅ Context API for state management
✅ localStorage integration
✅ Responsive design
✅ Disable edit for completed todos

## Learning Outcomes

- Complex state management with Context API
- Browser localStorage API usage
- CRUD operations implementation
- Array manipulation methods
- Conditional rendering
- Form handling in React
- useEffect for side effects
- Real-world app architecture
