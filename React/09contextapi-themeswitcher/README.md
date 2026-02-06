# Theme Switcher - Context API + Tailwind Dark Mode

## Topics Covered

- Advanced Context API implementation
- Theme management with state
- Dark/Light mode toggle functionality
- Tailwind CSS dark mode configuration
- Global state for UI preferences
- localStorage for theme persistence

## What This Project Does

A complete theme switcher application that:

- Toggles between light and dark themes instantly
- Uses Context API to share theme state globally
- Integrates with Tailwind's dark mode feature
- Saves user preference in localStorage
- Updates entire app UI based on selected theme

## How It Works

### 1. Theme Context Setup

```javascript
// ThemeContext.js
import { createContext, useContext } from "react";

const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export function useTheme() {
  return useContext(ThemeContext);
}
```

### 2. App.jsx - Provider Setup

```javascript
function App() {
  const [themeMode, setThemeMode] = useState('light')

  const lightTheme = () => {
    setThemeMode('light')
  }

  const darkTheme = () => {
    setThemeMode('dark')
  }

  // Apply theme to HTML element
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className=\"min-h-screen bg-white dark:bg-gray-900\">
        <ThemeBtn />
        <Card />
      </div>
    </ThemeProvider>
  )
}
```

### 3. Using Dark Mode Classes

```javascript
function Card() {
  return (
    <div className=\"bg-white dark:bg-gray-800 border dark:border-gray-700\">
      <h2 className=\"text-gray-900 dark:text-white\">
        Theme Switcher Card
      </h2>
      <p className=\"text-gray-600 dark:text-gray-300\">
        This text changes color based on theme!
      </p>
    </div>
  )
}
```

## Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',  // Enable class-based dark mode
  content: [
    \"./index.html\",
    \"./src/**/*.{js,ts,jsx,tsx}\",
  ]
}
```

## Key Concepts

### Tailwind Dark Mode

- Add `darkMode: 'class'` in tailwind.config.js
- Use `dark:` prefix for dark mode styles
- When `<html>` has class \"dark\", all `dark:` styles activate

### Common Dark Mode Classes

```css
/* Backgrounds */
bg-white dark:bg-gray-900
bg-gray-100 dark:bg-gray-800

/* Text */
text-gray-900 dark:text-white
text-gray-600 dark:text-gray-300

/* Borders */
border-gray-300 dark:border-gray-700
```

### LocalStorage Integration

```javascript
useEffect(() => {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setThemeMode(savedTheme);
}, []);

useEffect(() => {
  // Save theme to localStorage
  localStorage.setItem("theme", themeMode);
  document.querySelector("html").classList.remove("light", "dark");
  document.querySelector("html").classList.add(themeMode);
}, [themeMode]);
```

## Setup

```bash
npm install
npm run dev
```

## Features

- Light/Dark theme toggle
- Persistent theme across all components
- Tailwind CSS integration
- Smooth theme transitions
- Real-world Context API usage
- localStorage persistence
- Instant UI updates

## Learning Outcomes

- Implementing theme management with Context API
- Using Tailwind's class-based dark mode
- Creating reusable theme context
- Managing global UI state
- Real-world state management patterns
