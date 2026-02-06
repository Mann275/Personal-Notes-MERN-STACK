# Background Changer - Dynamic Styling

## Topics Covered

- useState for color state
- Dynamic inline styles
- Event handling
- Conditional rendering
- Tailwind CSS

## What This Project Does

Click color buttons to change the background color of entire page in real-time.

## Key Concepts

### Dynamic Styling

```javascript
const [color, setColor] = useState('olive')

<div style={{ backgroundColor: color }}>
  // Content
</div>
```

### State-Driven UI

- State changes → UI updates
- No page reload needed
- Real-time visual feedback

### Event Handling

```javascript
<button onClick={() => setColor('red')}>Red</button>
<button onClick={() => setColor('blue')}>Blue</button>
```

## Setup

```bash
npm install
npm run dev
```

## Features

- Multiple color options
- Fixed button panel at bottom
- Instant color changes
- Responsive design

## Learning Outcome

Master dynamic styling and state-driven UI updates.

- **Flexbox Layout**: Organized button arrangement
- **Visual Feedback**: Buttons styled to match their respective colors

## Project Implementation

### What This Project Does

- Creates a full-screen background that changes color dynamically
- Provides a color palette with multiple color options
- Updates background color instantly when buttons are clicked
- Maintains responsive design across different screen sizes
- Combines TailwindCSS classes with inline styling for optimal design

### How It Works

1. **State Management**: `useState` hook stores current background color
2. **Dynamic Styling**: Background div uses inline `style` prop with state value
3. **Event Handling**: Each button has `onClick` handler that updates color state
4. **UI Layout**: Fixed bottom panel with centered color buttons
5. **Visual Design**: Buttons styled to match their respective colors
6. **State Logging**: Console.log tracks color changes for debugging

### Key Features Implemented

- ✅ Dynamic background color changing
- ✅ Multiple color options (Red, Blue, Green, Purple, White, Black)
- ✅ Responsive button layout with TailwindCSS
- ✅ Fixed positioning for always-visible controls
- ✅ Inline styling for dynamic color application
- ✅ Event handling with onClick functions
- ✅ State management with useState hook
- ✅ Visual feedback through button styling

### Component Structure

```jsx
function App() {
  const [color, setColor] = useState("#301934"); // Default color state

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }} // Dynamic styling
    >
      <div className="fixed flex flex-wrap justify-center bottom-14 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-2.5 shadow-lg bg-white px-3 py-1.5 rounded-2xl">
          <button
            onClick={() => setColor("red")} // State update
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>
          {/* More color buttons... */}
        </div>
      </div>
    </div>
  );
}
```

### How It Was Built

1. Set up React project with Vite and TailwindCSS
2. Created main container div with full screen dimensions
3. Implemented useState hook for color state management
4. Applied dynamic inline styling to background element
5. Created fixed bottom panel for color controls
6. Built color buttons with onClick event handlers
7. Styled buttons to visually represent their colors
8. Added smooth transitions with CSS duration classes
9. Configured responsive layout with Flexbox
10. Added console logging for state tracking

### Color Options Available

- 🔴 **Red** - Vibrant red background
- 🔵 **Blue** - Classic blue background
- 🟢 **Green** - Natural green background
- 🟣 **Purple** - Rich purple background
- ⚪ **White** - Clean white background
- ⚫ **Black** - Elegant black background

### TailwindCSS Classes Used

- **Layout**: `w-full`, `h-screen`, `fixed`, `flex`, `flex-wrap`
- **Positioning**: `bottom-14`, `inset-x-0`, `justify-center`
- **Spacing**: `px-2`, `px-3`, `py-1.5`, `gap-2.5`
- **Styling**: `shadow-lg`, `rounded-2xl`, `rounded-full`
- **Effects**: `duration-200`, `outline-none`

### Development Setup

```bash
npm install
npm run dev
```

### Technologies Used

- **React** - Component-based UI library with hooks
- **useState Hook** - For color state management
- **Vite** - Fast development server and build tool
- **TailwindCSS** - Utility-first CSS framework
- **Inline Styles** - Dynamic styling with JavaScript objects
- **Event Handling** - onClick events for user interaction
