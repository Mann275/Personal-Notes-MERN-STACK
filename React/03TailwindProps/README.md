# Card Component - Props & Tailwind

## Topics Covered

- Props (Properties)
- Component reusability
- Tailwind CSS integration
- Default props
- Dynamic content

## What This Project Does

Reusable Card component with different data passed via props. Styled with Tailwind CSS.

## Key Concepts

### Props

```javascript
function Card({ username = "Guest", btnText = "Click" }) {
  return <div>{username}</div>
}

// Using component
<Card username="John" btnText="Visit" />
<Card username="Jane" />
```

### Why Props?

- Pass data from parent to child
- Make components reusable
- Same component, different data
- Props are read-only

### Tailwind CSS

- Utility classes: `bg-blue-500`, `p-4`, `rounded-lg`
- No custom CSS needed
- Fast styling
- Responsive by default

## Setup

```bash
npm install
npm run dev
```

## Features

- Multiple card instances
- Different data for each card
- Tailwind utility classes
- Default prop values

## Learning Outcome

Understand props and component reusability with Tailwind styling.

## Project Implementation

### What This Project Does

- Creates a reusable Card component for displaying user profiles
- Accepts `name` and `role` as props with default values
- Displays user image, name, and role in a styled card layout
- Renders multiple Card instances with different data
- Demonstrates TailwindCSS utility classes for styling

### How It Works

1. **Card Component**: Accepts props and renders a styled card with user information
2. **Props Destructuring**: Extracts `name` and `role` from props with default values
3. **TailwindCSS Styling**: Uses utility classes for layout, colors, spacing, and effects
4. **Component Reuse**: Multiple Card instances created with different prop values
5. **Default Props**: Shows how components handle missing prop values

### Key Features Implemented

- ✅ Reusable Card component with props
- ✅ Default prop values (`role = "Team"`)
- ✅ TailwindCSS utility-first styling
- ✅ Responsive card layout with shadows and borders
- ✅ Image integration with external URLs
- ✅ Multiple component instances with different data
- ✅ Clean component composition in App.jsx

### Component Structure

```jsx
// Card component with props destructuring and defaults
function Card({ name, role = "Team" }) {
  return (
    <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
      <img className="size-48 shadow-xl rounded-md" src="..." />
      <h5 className="mb-2 text-2xl font-semibold">{name}</h5>
      <p className="mb-3 text-body">{role}</p>
    </div>
  );
}

// Using Card component with different props
<Card name="Mann" role="Developer" />
<Card name="Patel" role="Fullstack" />
<Card name="ABC" />  {/* Uses default role */}
```

### How It Was Built

1. Set up React project with Vite and TailwindCSS
2. Created Card component in `components/Card.jsx`
3. Implemented props destructuring with default values
4. Applied TailwindCSS classes for modern card design
5. Added external image source for user avatars
6. Created multiple Card instances in App.jsx with different props
7. Configured TailwindCSS for utility-first styling approach
8. Tested component reusability with various prop combinations

### TailwindCSS Classes Used

- **Layout**: `block`, `max-w-sm`, `size-48`
- **Spacing**: `p-6`, `mb-2`, `mb-3`
- **Typography**: `text-2xl`, `font-semibold`, `text-heading`
- **Borders**: `border`, `rounded-base`, `rounded-md`
- **Effects**: `shadow-xs`, `shadow-xl`
- **Colors**: `bg-neutral-primary-soft`, `text-body`

### Development Setup

```bash
npm install
npm run dev
```

### Technologies Used

- **React** - Component-based UI library
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Props** - React's data passing mechanism
- **JSX** - JavaScript extension for component rendering
