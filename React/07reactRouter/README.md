# React Router

## Topics Covered

- React Router v6
- Multi-page navigation
- Layout component
- Dynamic routing with useParams
- API integration
- Nested routes

## What This Project Does

Multi-page React application using React Router for navigation between different pages without page reload.

## Key Concepts

### React Router Setup

- `createBrowserRouter`
- `createRoutesFromElements`
- `Route` component
- `RouterProvider`

### Navigation

- `Link` - Basic navigation
- `NavLink` - Navigation with active state
- `Outlet` - Render child routes

### Dynamic Routing

- URL parameters: `/user/:userid`
- `useParams()` hook to access parameters
- Different content based on URL

### Layout Pattern

- Persistent header and footer
- Content changes with routes
- Shared navigation across pages

## Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/github` - GitHub user data
- `/user/:userid` - Dynamic user profile

## Setup

```bash
npm install react-router-dom
npm run dev
```

## Features

- Client-side routing
- No page reload navigation
- Dynamic routes
- GitHub API integration
- Persistent layout
- Active link styling
