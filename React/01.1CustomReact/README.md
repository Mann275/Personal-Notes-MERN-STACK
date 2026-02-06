# Custom React Implementation

## Topics Covered

- React internals understanding
- Virtual DOM concept
- Custom createElement function
- Custom render function
- JSX to JavaScript conversion
- DOM manipulation

## What This Project Does

Builds a mini React library from scratch to understand how React works internally.

## Key Concepts

### React Flow

1. Create element object (Virtual DOM)
2. Convert to real DOM elements
3. Render to browser

### Custom Functions

- `createElement()` - Creates element object
- `render()` - Converts object to DOM and renders

### Understanding JSX

```javascript
// JSX (what we write)
<div>Hello</div>

// JavaScript object (what React creates)
{
  type: 'div',
  props: { children: 'Hello' }
}

// Real DOM (what browser shows)
<div>Hello</div>
```

## Setup

Open `index.html` in browser - no build needed!

## Learning Outcome

Understand React's core working before using the real library.

### 1. **Custom createElement Function**

```javascript
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child),
      ),
    },
  };
}
```

### 2. **Custom Render Function**

```javascript
function render(element, container) {
  // Custom DOM manipulation logic
  // Virtual DOM to Real DOM conversion
}
```

### 3. **Component System**

- Functional component handling
- Props passing mechanism
- Children rendering logic

## Learning Outcomes

1. **React Internals Understanding**
   - How React creates elements
   - Virtual DOM concepts
   - Reconciliation basics

2. **DOM Manipulation**
   - Creating DOM nodes programmatically
   - Element property setting
   - Event handling setup

3. **JavaScript Fundamentals**
   - Object creation patterns
   - Function composition
   - Recursive algorithms

## Installation & Setup

```bash
# Open directly in browser
open index.html
```

## Code Examples

### Creating Elements

```javascript
const element = createElement("div", { className: "container" }, "Hello World");
```

### Rendering to DOM

```javascript
render(element, document.getElementById("root"));
```

## Educational Value

This project helps understand:

- How React works under the hood
- Virtual DOM implementation basics
- Component rendering pipeline
- JavaScript's role in modern frameworks

## Next Steps

- [ ] Add state management
- [ ] Implement hooks system
- [ ] Add event handling
- [ ] Create lifecycle methods
- [ ] Build component diffing algorithm
