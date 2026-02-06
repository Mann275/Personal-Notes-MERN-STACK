# Blog Project - Complete Full-Stack React Application

## Topics Covered

- Redux Toolkit for global state management
- React Router for multi-page navigation
- Appwrite (Backend as a Service) integration
- TinyMCE rich text editor
- React Hook Form for form handling
- User Authentication & Authorization
- File upload and image handling
- Environment variables for security
- Protected routes implementation
- Real-world app architecture

## What This Project Does

A complete, production-ready blog application featuring:

- User authentication system (signup/login/logout)
- Create, read, update, delete (CRUD) blog posts
- Rich text editor for formatted content
- Image upload for post thumbnails
- Protected routes (login required)
- Personal dashboard for managing own posts
- Responsive design
- Full backend integration

## Complete Architecture

```
Frontend (React)
    ├── Redux Toolkit (State Management)
    ├── React Router (Navigation)
    ├── TinyMCE (Rich Text Editor)
    └── React Hook Form (Form Handling)
        ↓
    Appwrite (Backend)
        ├── Authentication Service
        ├── Database Service (Posts)
        └── Storage Service (Images)
```

## How It Works - Step by Step

### 1. Appwrite Service Setup (appwrite/config.js)

```javascript
import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_URL)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Authentication Service
export class AuthService {
  async signup({ email, password, name }) {
    const userAccount = await account.create("unique()", email, password, name);
    return this.login({ email, password });
  }

  async login({ email, password }) {
    return await account.createEmailSession(email, password);
  }

  async logout() {
    return await account.deleteSessions();
  }

  async getCurrentUser() {
    return await account.get();
  }
}

// Database Service (Blog Posts)
export class DatabaseService {
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    return await databases.createDocument(
      process.env.VITE_APPWRITE_DATABASE_ID,
      process.env.VITE_APPWRITE_COLLECTION_ID,
      slug,
      { title, content, featuredImage, status, userId },
    );
  }

  async getPosts() {
    return await databases.listDocuments(
      process.env.VITE_APPWRITE_DATABASE_ID,
      process.env.VITE_APPWRITE_COLLECTION_ID,
    );
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    return await databases.updateDocument(
      process.env.VITE_APPWRITE_DATABASE_ID,
      process.env.VITE_APPWRITE_COLLECTION_ID,
      slug,
      { title, content, featuredImage, status },
    );
  }

  async deletePost(slug) {
    await databases.deleteDocument(
      process.env.VITE_APPWRITE_DATABASE_ID,
      process.env.VITE_APPWRITE_COLLECTION_ID,
      slug,
    );
  }
}

// Storage Service (Images)
export class StorageService {
  async uploadFile(file) {
    return await storage.createFile(
      process.env.VITE_APPWRITE_BUCKET_ID,
      "unique()",
      file,
    );
  }

  async deleteFile(fileId) {
    return await storage.deleteFile(
      process.env.VITE_APPWRITE_BUCKET_ID,
      fileId,
    );
  }

  getFilePreview(fileId) {
    return storage.getFilePreview(process.env.VITE_APPWRITE_BUCKET_ID, fileId);
  }
}
```

### 2. Redux Store Setup

```javascript
// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

### 3. Protected Route Component

```javascript
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status)

  if (authentication && !authStatus) {
    return <Navigate to=\"/login\" />
  }

  if (!authentication && authStatus) {
    return <Navigate to=\"/\" />
  }

  return children
}
```

### 4. Post Form with TinyMCE

```javascript
import { useForm } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function PostForm({ post }) {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const submit = async (data) => {
    if (post) {
      // Update existing post
      const file = data.image[0]
        ? await uploadFile(data.image[0])
        : null

      if (file) {
        await deleteFile(post.featuredImage)
      }

      const updatedPost = await updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage
      })
    } else {
      // Create new post
      const file = await uploadFile(data.image[0])

      const newPost = await createPost({
        ...data,
        featuredImage: file.$id,
        userId: userData.$id
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input {...register('title', { required: true })} />

      <input {...register('slug', { required: true })} />

      <Editor
        initialValue={post?.content || ''}
        init={{
          height: 500,
          menubar: true,
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image'],
          toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter'
        }}
        onEditorChange={(content) => setValue('content', content)}
      />

      <input type=\"file\" {...register('image')} />

      <select {...register('status')}>
        <option value=\"active\">Active</option>
        <option value=\"inactive\">Inactive</option>
      </select>

      <button type=\"submit\">
        {post ? 'Update' : 'Create'} Post
      </button>
    </form>
  )
}
```

### 5. Post Card Component

```javascript
import parse from 'html-react-parser'

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className=\"card\">
        <img src={getFilePreview(featuredImage)} alt={title} />
        <h2>{title}</h2>
        <div>{parse(content.substring(0, 100))}...</div>
      </div>
    </Link>
  )
}
```

## Key Technologies Explained

### Appwrite (Backend as a Service)

- No need to build backend from scratch
- Handles authentication, database, and file storage
- REST API integration
- Real-time capabilities
- Built-in security

### TinyMCE (Rich Text Editor)

- WYSIWYG editor for blog content
- Formatting options (bold, italic, lists, etc.)
- Image insertion
- HTML content generation

### React Hook Form

- Efficient form handling
- Built-in validation
- Less re-renders
- Easy error handling

### html-react-parser

- Safely renders HTML content
- Prevents XSS attacks
- Displays formatted blog posts

## Project Structure

```
src/
├── appwrite/
│   ├── auth.js              # Authentication service
│   ├── database.js          # Database operations
│   └── storage.js           # File upload/download
├── store/
│   ├── store.js             # Redux store
│   └── authSlice.js         # Auth state management
├── components/
│   ├── Header.jsx           # Navigation with auth check
│   ├── Footer.jsx
│   ├── PostCard.jsx         # Blog post card
│   ├── PostForm.jsx         # Create/Edit form
│   ├── Login.jsx            # Login component
│   ├── Signup.jsx           # Signup component
│   └── Protected.jsx        # Route protection
└── pages/
    ├── Home.jsx             # All posts
    ├── Post.jsx             # Single post view
    ├── AddPost.jsx          # Create new post
    ├── EditPost.jsx         # Edit existing post
    └── MyPosts.jsx          # User's posts
```

## Environment Variables (.env)

```env
VITE_APPWRITE_URL=\"https://cloud.appwrite.io/v1\"
VITE_APPWRITE_PROJECT_ID=\"your-project-id\"
VITE_APPWRITE_DATABASE_ID=\"your-database-id\"
VITE_APPWRITE_COLLECTION_ID=\"your-collection-id\"
VITE_APPWRITE_BUCKET_ID=\"your-bucket-id\"
VITE_TINYMCE_API_KEY=\"your-tinymce-api-key\"
```

## Setup Instructions

```bash
# Install dependencies
npm install

# Install required packages
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install appwrite
npm install @tinymce/tinymce-react
npm install react-hook-form
npm install html-react-parser

# Create .env file and add Appwrite credentials

# Run project
npm run dev
```

## Features

✅ User registration and login
✅ Logout functionality
✅ Create blog posts with images
✅ Edit existing posts
✅ Delete posts
✅ View all posts
✅ View single post details
✅ Rich text editor for content
✅ Image upload and preview
✅ Protected routes (auth required)
✅ Responsive design
✅ User-specific posts
✅ Active/Inactive post status

## Learning Outcomes

- Full-stack React application development
- Backend as a Service (BaaS) integration
- Complex state management with Redux Toolkit
- File upload handling
- Rich text editor integration
- Authentication and authorization flow
- Protected routes implementation
- Environment variables usage
- Real-world app architecture
- Production-ready patterns
- Complex state management
- Production-ready patterns
