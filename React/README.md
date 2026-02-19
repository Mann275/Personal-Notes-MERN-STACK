# ⚛️ React Learning Hub - COMPLETE! ✅

**Status**: All React fundamentals, hooks, routing, state management and advanced concepts covered comprehensively!

[📝 Complete React Interview Guide →](../React-Interview.md)

## 📖 Topics Covered

## React Fundamentals

### 1. [What is React & How React Works](../React-Interview.md#1-what-is-react--how-react-works)

- React is a JavaScript library for building fast, interactive UIs
- Uses Virtual DOM for efficient updates
- Component-based architecture
- Reconciliation process optimizes re-renders

### 2. [JSX and Babel](../React-Interview.md#2-jsx-and-babel)

- JSX: HTML-like syntax in JavaScript
- Babel: Transpiles JSX to plain JavaScript
- Makes code readable and maintainable

### 3. [Virtual DOM](../React-Interview.md#3-virtual-dom)

- Lightweight in-memory representation of real DOM
- Compares old and new Virtual DOM (diffing)
- Only updates changed parts in real DOM
- React Fiber enables async rendering

### 4. [Components](../React-Interview.md#4-components)

- Reusable UI building blocks
- Accept props and manage state
- Can be nested and composed
- Make code modular and maintainable

---

## React Hooks

### 5. [What are Hooks](../React-Interview.md#5-what-are-hooks)

- Special functions to use React features in functional components
- Introduced in React 16.8
- Always start with `use` prefix
- Cannot be used inside loops or conditions

### 6. [useState](../React-Interview.md#6-usestate)

- Manages component state
- Returns current state and setter function
- Re-renders component when state changes
- Can hold any data type

### 7. [useEffect](../React-Interview.md#7-useeffect)

- Handles side effects in components
- Runs after render
- Dependency array controls when it runs
- Cleanup function prevents memory leaks

### 8. [useRef](../React-Interview.md#8-useref)

- Creates mutable reference that persists across renders
- Doesn't trigger re-renders when changed
- Common uses: DOM access, storing previous values

### 9. [useCallback](../React-Interview.md#9-usecallback)

- Memoizes functions to prevent recreation
- Useful when passing callbacks to child components
- Dependency array controls when function recreates

### 10. [Custom Hooks](../React-Interview.md#10-custom-hooks)

- Reusable functions containing hook logic
- Start with `use` prefix
- Share stateful logic across components
- Separate business logic from UI

---

## React Router

### 11. [React Router Basics](../React-Interview.md#11-react-router-basics)

- Enables client-side routing in Single Page Applications
- No page reload on navigation
- RouterProvider, Route, Outlet components

### 12. [Link vs NavLink](../React-Interview.md#12-link-vs-navlink)

- **Link**: Simple navigation without active state
- **NavLink**: Provides active state styling
- NavLink best for navigation menus

### 13. [Dynamic Routes (useParams)](../React-Interview.md#13-dynamic-routes-useparams)

- Pass variable values in URL
- useParams hook reads URL parameters
- Common for user profiles, product pages, blog posts

### 14. [Query Parameters (useSearchParams)](../React-Interview.md#14-query-parameters-usesearchparams)

- Key-value pairs after `?` in URL
- useSearchParams manages query strings
- Used for filters, search, pagination

### 15. [useNavigate](../React-Interview.md#15-usenavigate)

- Programmatic navigation in React Router
- Navigate on button click, form submit, login success
- Can pass state data between routes

---

## State Management

### 16. [Props](../React-Interview.md#16-props)

- Pass data from parent to child components
- Read-only (immutable)
- Can be any data type: string, number, object, array, function

### 17. [Prop Drilling Problem](../React-Interview.md#17-prop-drilling-problem)

- Passing props through multiple component levels
- Middle components don't use the props
- Makes code messy and hard to maintain
- Solution: Context API or Redux

### 18. [Context API](../React-Interview.md#18-context-api)

- Share data across component tree without prop drilling
- Three steps: Create, Provide, Consume
- Common uses: theme, auth, language

### 19. [Redux Basics](../React-Interview.md#19-redux-basics)

- Global state management library
- Store: central state container
- Action: describes what happened
- Reducer: updates state based on action
- Dispatch: sends actions to store

### 20. [Redux Toolkit](../React-Interview.md#20-redux-toolkit)

- Modern, recommended way to use Redux
- Less boilerplate code
- createSlice combines reducers and actions
- Built-in Immer for direct state mutation

---

## Advanced Concepts

### 21. [Controlled vs Uncontrolled Components](../React-Interview.md#21-controlled-vs-uncontrolled-components)

- **Controlled**: React state controls form values
- **Uncontrolled**: DOM manages its own state
- Controlled gives more control and validation

### 22. [Keys in React](../React-Interview.md#22-keys-in-react)

- Unique identifiers for list items
- Help React track changes efficiently
- Must be unique and stable
- Don't use array index (unless list is static)

### 23. [React.memo vs useCallback vs useMemo](../React-Interview.md#23-memo-vs-callback-vs-memo)

- **React.memo**: Memoizes components
- **useCallback**: Memoizes functions
- **useMemo**: Memoizes computed values
- All prevent unnecessary re-renders

### 24. [Lifting State Up](../React-Interview.md#24-lifting-state-up)

- Move shared state to closest common parent
- Single source of truth
- Children receive data via props
- Children send updates via callbacks

### 25. [Error Boundaries](../React-Interview.md#25-error-boundaries)

- Catch JavaScript errors in component tree
- Display fallback UI instead of crashing
- Only work with class components
- Don't catch event handler or async errors

### 26. [React Performance Optimization](../React-Interview.md#26-react-performance-optimization)

- Use React.memo for expensive components
- Use useCallback & useMemo appropriately
- Lazy load components with React.lazy
- Avoid inline objects in props
- Use proper keys in lists

---

## Styling & Forms

### 27. [Tailwind Integration](../React-Interview.md#27-tailwind-integration)

- Utility-first CSS framework
- Pre-built classes for rapid development
- Responsive + dark mode built-in
- Works perfectly with component-based UI

### 28. [Formik](../React-Interview.md#28-formik)

- React form library
- Handles form state, validation, submission
- Reduces boilerplate code
- Works best with Yup for validation

### 29. [Yup Validation](../React-Interview.md#29-yup-validation)

- Schema-based validation library
- Clean and readable validation rules
- Perfect integration with Formik
- Supports complex validation patterns

---


## 🚀 Getting Started

**Setup any project:**

```bash
cd [project-name]
npm install
npm run dev
```

---

**📝 Happy Learning! 🚀**

---

## 📂 Projects

| #   | Project Name            | Topics Covered                 |
| --- | ----------------------- | ------------------------------ |
| 1   | Custom React            | React internals, Virtual DOM   |
| 2   | Vite Project            | React setup, basics            |
| 3   | Counter                 | useState, event handling       |
| 4   | Tailwind Props          | Props, Tailwind CSS            |
| 5   | BG Changer              | useState, dynamic styling      |
| 6   | Password Generator      | useEffect, useRef, useCallback |
| 7   | Currency Converter      | Custom hooks, API integration  |
| 8   | React Router            | Routing, navigation            |
| 9   | Mini Context            | Context API basics             |
| 10  | Theme Switcher          | Context API, theme management  |
| 11  | Todo with Local Storage | Context API, localStorage      |
| 12  | Redux Todo              | Redux Toolkit                  |
| 13  | Formik & Yup            | Form validation                |

---

## 🚀 Interview Guide

**📝 Complete React Interview Questions:** [React-Interview.md](React-Interview.md)

---

**Setup:**

```bash
cd [project-name]
npm install
npm run dev
```
