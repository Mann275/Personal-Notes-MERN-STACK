# Custom React Implementation

A custom React library implementation built from scratch to understand React's core concepts and internals.

## Features

- **Custom React Library** built from scratch
- **Virtual DOM** implementation
- **Component Rendering** system
- **State Management** basics
- **JSX Transformation** understanding
- **React Internals** exploration

## Project Structure

```
01.1CustomReact/
├── index.html               # HTML template
├── index.js                # Main entry point with custom React
└── README.md
```

## Technologies Used

- **Vanilla JavaScript**
- **Custom DOM Manipulation**
- **HTML5**
- **CSS3**

## Key Concepts Implemented

### 1. **Custom createElement Function**
```javascript
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
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
const element = createElement(
  'div',
  { className: 'container' },
  'Hello World'
);
```

### Rendering to DOM
```javascript
render(element, document.getElementById('root'));
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