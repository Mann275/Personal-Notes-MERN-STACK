# React with Vite

## Topics Covered

- React basics
- Component creation
- JSX syntax
- Import/Export components
- Vite setup
- Project structure

## What This Project Does

Basic React setup with Vite showing how to create and use components.

## Key Concepts

### Components

- JavaScript functions that return JSX
- Reusable UI building blocks
- Can be imported and exported

### JSX

- HTML-like syntax in JavaScript
- Must return single parent element
- Use `className` instead of `class`

### Vite

- Fast development server
- Hot Module Replacement (HMR)
- Instant updates without refresh
- Better than traditional bundlers

## Project Structure

```
src/
├── App.jsx       # Main component
├── main.jsx      # Entry point
└── components/   # Custom components
```

## Setup

```bash
npm install
npm run dev
```

## Learning Outcome

Understand React project setup and component basics.

- Creates a main App component that imports and renders a custom component
- Demonstrates basic component structure and JSX syntax
- Shows how to organize components in separate files
- Uses Vite for fast development and build process

### How It Works

1. **App.jsx**: Main application component that imports the `Final` component from `star.jsx`
2. **star.jsx**: Custom component that returns a simple JSX element
3. **Component Structure**: Shows proper React functional component syntax
4. **File Organization**: Separates components into different files for better maintainability

### Key Features Implemented

- ✅ Custom React component creation
- ✅ Component import/export functionality
- ✅ JSX rendering
- ✅ Vite development environment setup
- ✅ Basic project structure organization

### How It Was Built

1. Created React app using Vite template
2. Built custom `Final` component in `star.jsx`
3. Imported and used the component in main `App.jsx`
4. Configured Vite for optimal development experience
5. Added ESLint for code quality

### Development Setup

```bash
npm install
npm run dev
```

### Technologies Used

- **React** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **JSX** - JavaScript extension for writing HTML-like syntax
- **ESLint** - Code linting and formatting
