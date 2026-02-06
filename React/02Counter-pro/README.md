# Counter App - useState Hook

## Topics Covered

- useState hook
- State management
- Event handling
- Conditional logic
- Component re-rendering

## What This Project Does

Simple counter with increment/decrement buttons. Counter range: 0 to 20.

## Key Concepts

### useState Hook

```javascript
const [counter, setCounter] = useState(0);
// counter - current value
// setCounter - function to update value
// 0 - initial value
```

### State Updates

- When state changes, component re-renders
- UI updates automatically
- Always use setter function, never change state directly

### Event Handling

```javascript
<button onClick={addValue}>+</button>
<button onClick={removeValue}>-</button>
```

### Conditional Logic

- Don't go below 0
- Don't go above 20
- Check before updating state

## Setup

```bash
npm install
npm run dev
```

## Learning Outcome

Master useState hook and state management basics.

### What This Project Does

- Creates a counter with a numeric display
- Provides "Add" and "Remove" buttons to modify the counter
- Implements boundary conditions (0 ≤ counter ≤ 5)
- Logs counter actions to the console for debugging

### How It Works

1. **State Initialization**: Uses `useState(0)` to create a counter state starting at 0
2. **Add Function**: Increments counter by 1 if it's less than 5
3. **Remove Function**: Decrements counter by 1 if it's greater than 0
4. **Conditional Logic**: Prevents counter from exceeding boundaries
5. **UI Updates**: Counter value updates automatically when state changes

### Key Features Implemented

- ✅ State management with useState hook
- ✅ Event handling with onClick events
- ✅ Conditional logic for boundary validation
- ✅ Console logging for debugging
- ✅ Real-time UI updates based on state changes
- ✅ Button controls for user interaction

### How It Was Built

1. Set up React application with Vite
2. Imported useState hook from React
3. Created state variable for counter with initial value 0
4. Implemented addValue function with upper boundary (max: 5)
5. Implemented removeValue function with lower boundary (min: 0)
6. Added onClick event handlers to buttons
7. Created responsive UI displaying current counter value
8. Added console.log statements for debugging and learning

### Code Structure

```jsx
const [counter, setCounter] = useState(0); // State declaration

const addValue = () => {
  // Increment function
  if (counter < 5) {
    setCounter(counter + 1);
  }
};

const removeValue = () => {
  // Decrement function
  if (counter > 0) {
    setCounter(counter - 1);
  }
};
```

### Development Setup

```bash
npm install
npm run dev
```

### Technologies Used

- **React** - UI library with hooks for state management
- **Vite** - Fast development server and build tool
- **useState Hook** - For managing component state
- **JavaScript ES6** - Modern JavaScript features
