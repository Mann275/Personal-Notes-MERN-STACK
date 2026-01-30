# React Router Project

A React application demonstrating routing functionality with multiple pages and navigation.

## Features

- **React Router v6** implementation
- Multiple page navigation (Home, About, Contact, Github, User)
- Layout component with persistent header/footer
- Dynamic routing with parameters
- GitHub API integration for user data
- Responsive design with Tailwind CSS

## Project Structure

```
07reactRouter/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Header/             # Navigation header
│   │   ├── Footer/             # Site footer
│   │   ├── Home/               # Home page component
│   │   ├── About/              # About page component
│   │   ├── Contact/            # Contact page component
│   │   ├── Github/             # GitHub user data display
│   │   └── User/               # User profile component
│   ├── main.jsx                # App entry point
│   └── App.css                 # Global styles
├── package.json
└── README.md
```

## Technologies Used

- **React 18**
- **React Router v6**
- **Tailwind CSS**
- **Vite** (Build tool)
- **GitHub API** integration

## Key Concepts Learned

1. **React Router Setup**
   - `BrowserRouter` implementation
   - Route configuration
   - Navigation components

2. **Dynamic Routing**
   - URL parameters with `useParams`
   - Dynamic route matching
   - Parameter extraction

3. **Layout Pattern**
   - Persistent layout across routes
   - Outlet for nested routing
   - Shared navigation

4. **API Integration**
   - Fetching GitHub user data
   - Loading states management
   - Error handling

## Installation & Setup

```bash
npm install
npm run dev
```

## Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/github` - GitHub user data
- `/user/:userid` - Dynamic user profile

## Learning Outcomes

- Understanding of client-side routing
- Component-based navigation
- URL parameter handling
- API integration with routing
- Responsive design implementation
