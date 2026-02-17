# Node.js + MongoDB Interview Guide

<a name="top"></a>

## 📑 Table of Contents

### **Node.js Fundamentals**

1. [What is Node.js](#1-what-is-nodejs)
2. [Node.js Architecture & Event Loop](#2-nodejs-architecture--event-loop)
3. [package.json vs package-lock.json](#3-packagejson-vs-package-lockjson)
4. [npm vs npx](#4-npm-vs-npx)
5. [require vs import (CommonJS vs ES6)](#5-require-vs-import-commonjs-vs-es6)
6. [Module System in Node.js](#6-module-system-in-nodejs)

### **Express.js Framework**

7. [What is Express.js](#7-what-is-expressjs)
8. [Middleware in Express](#8-middleware-in-express)
9. [app.use() vs app.get()](#9-appuse-vs-appget)
10. [Request and Response Objects](#10-request-and-response-objects)
11. [Routing in Express](#11-routing-in-express)
12. [Error Handling in Express](#12-error-handling-in-express)

### **Template Engines & Forms**

13. [What is EJS](#13-what-is-ejs)
14. [Dynamic Routing & Route Parameters](#14-dynamic-routing--route-parameters)
15. [Query Parameters vs Route Parameters vs Body](#15-query-parameters-vs-route-parameters-vs-body)
16. [GET vs POST Requests](#16-get-vs-post-requests)
17. [express.json() vs express.urlencoded()](#17-expressjson-vs-expressurlencoded)

### **MongoDB & Mongoose**

18. [What is MongoDB](#18-what-is-mongodb)
19. [SQL vs NoSQL](#19-sql-vs-nosql)
20. [MongoDB Terminology (Collection, Document, Field)](#20-mongodb-terminology-collection-document-field)
21. [What is Mongoose](#21-what-is-mongoose)
22. [Schema vs Model in Mongoose](#22-schema-vs-model-in-mongoose)
23. [CRUD Operations in Mongoose](#23-crud-operations-in-mongoose)
24. [findById vs findOne vs find](#24-findbyid-vs-findone-vs-find)
25. [Data Validation in Mongoose](#25-data-validation-in-mongoose)

### **Authentication & Security**

26. [Authentication vs Authorization](#26-authentication-vs-authorization)
27. [What are Cookies](#27-what-are-cookies)
28. [Cookies vs Sessions vs Tokens](#28-cookies-vs-sessions-vs-tokens)
29. [What is Bcrypt & Password Hashing](#29-what-is-bcrypt--password-hashing)
30. [What is JWT (JSON Web Tokens)](#30-what-is-jwt-json-web-tokens)
31. [How JWT Authentication Works](#31-how-jwt-authentication-works)
32. [Middleware for Protected Routes](#32-middleware-for-protected-routes)

### **Data Association & Relationships**

33. [Data Association in MongoDB](#33-data-association-in-mongodb)
34. [ObjectId References](#34-objectid-references)
35. [populate() in Mongoose](#35-populate-in-mongoose)
36. [One-to-Many Relationships](#36-one-to-many-relationships)
37. [Embedded Documents vs References](#37-embedded-documents-vs-references)

### **Advanced Concepts**

38. [RESTful API Design](#38-restful-api-design)
39. [MVC Architecture](#39-mvc-architecture)
40. [Environment Variables (.env)](#40-environment-variables-env)
41. [CORS (Cross-Origin Resource Sharing)](#41-cors-cross-origin-resource-sharing)
42. [Async/Await in Node.js](#42-asyncawait-in-nodejs)
43. [Error Handling Best Practices](#43-error-handling-best-practices)
44. [MongoDB Atlas vs Local MongoDB](#44-mongodb-atlas-vs-local-mongodb)
45. [Indexing in MongoDB](#45-indexing-in-mongodb)

---

## 1. What is Node.js

**Definition:**  
Node.js is a JavaScript runtime environment that allows you to execute JavaScript code on the server side, outside of a web browser.

**Exp:**  
Node.js ek runtime environment hai jo JavaScript ko browser ke bahar (server pe) run karta hai. Normally JavaScript sirf browser mein chalta tha, but Node.js ne isko server pe bhi laya.

**Theory:**

- Built on Chrome's V8 JavaScript engine
- Not a language, framework, or library - it's a runtime
- Enables building backend applications with JavaScript
- Uses event-driven, non-blocking I/O model
- Single-threaded but highly scalable

```javascript
// Simple Node.js server
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Node.js!");
});

server.listen(3000);
```

**Interview Line:**  
_Node.js is a JavaScript runtime built on V8 engine that enables server-side JavaScript execution using event-driven, non-blocking I/O._

[⬆️ Back to Top](#top)

---

## 2. Node.js Architecture & Event Loop

**Definition:**  
Node.js uses an event-driven, non-blocking I/O architecture with a single-threaded event loop that handles asynchronous operations efficiently.

**Exp:**  
Node.js single thread use karta hai lekin async operations ko efficiently handle karta hai. Event Loop continuously check karta hai ki koi task complete hua ya nahi.

**Theory:**

- **Single Thread**: Main execution thread
- **Event Loop**: Continuously monitors task queue
- **Non-blocking I/O**: Doesn't wait for I/O operations
- **Callback Queue**: Stores completed async operations
- **Phases**: Timers, I/O callbacks, idle, poll, check, close

**Workflow:**

```
Client Request → Node.js → Non-blocking I/O → Event Loop
                                              ↓
                                       Callback Queue
                                              ↓
                                         Response
```

**Interview Line:**  
_Node.js event loop enables handling multiple requests on a single thread by using non-blocking I/O and asynchronous callbacks._

[⬆️ Back to Top](#top)

---

## 3. package.json vs package-lock.json

**Definition:**  
package.json contains project metadata and dependencies, while package-lock.json locks exact versions of all dependencies and their sub-dependencies.

**Exp:**  
package.json main file hai jo project ki information aur dependencies list karta hai.  
package-lock.json exact versions lock kar deta hai taaki har jagah same versions install ho.

**Theory:**

**package.json:**

- Project name, version, scripts
- Dependencies list (main packages)
- Allows version ranges (^, ~)
- Created manually with `npm init`

**package-lock.json:**

- Exact versions of all packages
- Complete dependency tree
- Auto-generated by npm
- Ensures consistent installs

```json
// package.json
{
  "dependencies": {
    "express": "^5.0.0"  // Can install 5.x.x
  }
}

// package-lock.json
{
  "dependencies": {
    "express": {
      "version": "5.0.1"  // Exact version locked
    }
  }
}
```

**Interview Line:**  
_package.json defines project dependencies while package-lock.json ensures consistent installations by locking exact versions._

[⬆️ Back to Top](#top)

---

## 4. npm vs npx

**Definition:**  
npm is a package manager for installing and managing packages, while npx is a package runner that executes packages without installing them globally.

**Exp:**  
npm se packages install karte hain project mein.  
npx packages ko bina install kiye directly execute karta hai.

**Theory:**

**npm:**

- Install packages locally or globally
- Manage dependencies
- Run scripts from package.json

**npx:**

- Execute packages without installing
- Always uses latest version
- Useful for one-time commands

```bash
# npm - Install package
npm install express
npm install -g nodemon

# npx - Execute without installing
npx create-react-app my-app
npx nodemon server.js
```

**Interview Line:**  
_npm installs packages while npx executes packages directly without global installation._

[⬆️ Back to Top](#top)

---

## 5. require vs import (CommonJS vs ES6)

**Definition:**  
require is CommonJS syntax (Node.js default), while import is ES6 module syntax (modern JavaScript).

**Exp:**  
require purana tarika hai modules load karne ka (CommonJS).  
import naya ES6 tarika hai jo modern JavaScript use karta hai.

**Theory:**

**CommonJS (require):**

- Synchronous loading
- Default in Node.js
- Returns whole module

**ES6 Modules (import):**

- Static imports
- Tree-shaking support
- Named and default exports
- Needs `"type": "module"` in package.json

```javascript
// CommonJS (require)
const express = require("express");
const { User } = require("./models/user");

module.exports = router;

// ES6 Modules (import)
import express from "express";
import { User } from "./models/user.js";

export default router;
```

**Interview Line:**  
_require is CommonJS syntax for synchronous module loading while import is ES6 syntax supporting static imports and tree-shaking._

[⬆️ Back to Top](#top)

---

## 6. Module System in Node.js

**Definition:**  
Node.js module system allows splitting code into separate files. Each file is a module with its own scope.

**Exp:**  
Node.js mein har file ek module hai. Ek file ka code doosri file mein use karne ke liye export aur import karna padta hai.

**Theory:**

- **Core Modules**: Built-in (fs, http, path)
- **Local Modules**: Your own files
- **Third-party Modules**: From npm

```javascript
// userModel.js (exporting)
const User = {
  name: "Mann",
  age: 21,
};

module.exports = User;

// app.js (importing)
const User = require("./userModel");
console.log(User.name); // Mann
```

**Interview Line:**  
_Node.js module system enables code organization by allowing export/import between files._

[⬆️ Back to Top](#top)

---

## 7. What is Express.js

**Definition:**  
Express.js is a minimal and flexible Node.js web application framework that simplifies building web servers and APIs.

**Exp:**  
Express.js ek framework hai jo Node.js ke upar bana hai. Yeh web server aur APIs banane ko bahut easy banata hai.

**Theory:**

- Built on top of Node.js
- Handles routing easily
- Middleware support
- Template engine integration
- Simplifies request/response handling

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**Interview Line:**  
_Express.js is a minimal Node.js framework that simplifies building web servers with routing and middleware support._

[⬆️ Back to Top](#top)

---

## 8. Middleware in Express

**Definition:**  
Middleware are functions that have access to request, response, and next middleware in the request-response cycle.

**Exp:**  
Middleware ek beech ka function hai jo request aur response ke beech mein execute hota hai. Har middleware apna kaam karke next() call karta hai.

**Theory:**

- Executes between request and response
- Has access to `req`, `res`, `next`
- Can modify req/res objects
- Can end request-response cycle
- Must call `next()` to pass control

**Types:**

- Application-level
- Router-level
- Error-handling
- Built-in
- Third-party

```javascript
// Custom middleware
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next(); // Pass to next middleware
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

**Interview Line:**  
_Middleware are functions with access to req, res, and next that execute between request and response cycles._

[⬆️ Back to Top](#top)

---

## 9. app.use() vs app.get()

**Definition:**  
app.use() applies middleware to all routes or specific paths, while app.get() handles GET requests for specific routes.

**Exp:**  
app.use() middleware lagane ke liye use hota hai (sabhi routes ya specific path pe).  
app.get() sirf GET request handle karta hai specific route ke liye.

**Theory:**

**app.use():**

- Middleware mounting
- Works for all HTTP methods
- Can have path parameter
- Executed in order

**app.get():**

- Route handler for GET requests
- Specific HTTP method
- Route-specific logic

```javascript
// app.use() - Middleware for all routes
app.use(express.json());

// app.use() - Middleware for specific path
app.use("/api", apiRouter);

// app.get() - GET request handler
app.get("/users", (req, res) => {
  res.json({ users: [] });
});
```

**Interview Line:**  
_app.use() mounts middleware for all or specific paths while app.get() handles GET requests for specific routes._

[⬆️ Back to Top](#top)

---

## 10. Request and Response Objects

**Definition:**  
Request object (req) contains information about HTTP request, Response object (res) is used to send response back to client.

**Exp:**  
req object mein client se aaye data ki information hoti hai.  
res object se hum client ko response bhejte hain.

**Theory:**

**Request Object (req):**

- `req.params` - Route parameters
- `req.query` - Query strings
- `req.body` - Request body data
- `req.headers` - Request headers
- `req.cookies` - Cookies

**Response Object (res):**

- `res.send()` - Send response
- `res.json()` - Send JSON
- `res.status()` - Set status code
- `res.render()` - Render template
- `res.redirect()` - Redirect

```javascript
app.get("/user/:id", (req, res) => {
  // Request
  const userId = req.params.id; // Route param
  const search = req.query.search; // Query param

  // Response
  res.status(200).json({
    id: userId,
    search: search,
  });
});
```

**Interview Line:**  
_req object contains request data (params, query, body) while res object sends responses (send, json, render)._

[⬆️ Back to Top](#top)

---

## 11. Routing in Express

**Definition:**  
Routing determines how an application responds to client requests at specific endpoints (URI paths) and HTTP methods.

**Exp:**  
Routing decide karta hai ki kaunsa URL pe kaunsa function chalega. Different routes different pages ya data return karte hain.

**Theory:**

- Maps URL paths to handler functions
- Supports different HTTP methods
- Can have dynamic parameters
- Can be modularized with Router

```javascript
// Basic routing
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/user", (req, res) => {
  res.send("Create User");
});

// Dynamic routing
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Router module
const router = express.Router();
router.get("/profile", (req, res) => {
  res.send("Profile");
});
app.use("/user", router); // /user/profile
```

**Interview Line:**  
_Routing maps URL paths and HTTP methods to specific handler functions for processing requests._

[⬆️ Back to Top](#top)

---

## 12. Error Handling in Express

**Definition:**  
Error handling middleware catches and processes errors that occur during request processing.

**Exp:**  
Error handling middleware errors ko catch karta hai aur proper response bhejta hai. Yeh normal middleware ke baad define hota hai.

**Theory:**

- Special middleware with 4 parameters: `(err, req, res, next)`
- Defined after all routes
- Catches sync and async errors
- Should send appropriate error responses

```javascript
// Async error handling
app.get("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message,
  });
});
```

**Interview Line:**  
_Error handling middleware with 4 parameters catches errors and sends appropriate responses to clients._

[⬆️ Back to Top](#top)

---

## 13. What is EJS

**Definition:**  
EJS (Embedded JavaScript) is a templating engine that generates HTML with plain JavaScript.

**Exp:**  
EJS ek template engine hai jo HTML ke andar JavaScript code likhne deta hai. Dynamic content render karne ke liye use hota hai.

**Theory:**

- Embeds JavaScript in HTML
- Server-side rendering
- Supports partials and layouts
- Simple syntax: `<%= %>` for output, `<% %>` for logic

```javascript
// Setup
app.set("view engine", "ejs");

// Route
app.get("/profile", (req, res) => {
  res.render("profile", { name: "Mann", age: 21 });
});
```

```html
<!-- views/profile.ejs -->
<h1>Hello <%= name %></h1>
<p>Age: <%= age %></p>

<% if (age >= 18) { %>
<p>Adult</p>
<% } %>
```

**Interview Line:**  
_EJS is a templating engine that embeds JavaScript in HTML for server-side dynamic content rendering._

[⬆️ Back to Top](#top)

---

## 14. Dynamic Routing & Route Parameters

**Definition:**  
Dynamic routing uses URL parameters to create flexible routes that can handle variable values in the URL.

**Exp:**  
Dynamic routing mein URL ke kuch parts variable hote hain jo `:parameter` se define hote hain. Yeh `req.params` se access kar sakte hain.

**Theory:**

- Uses `:paramName` syntax
- Accessed via `req.params`
- Supports multiple parameters
- Creates flexible, reusable routes

```javascript
// Single parameter
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
// URL: /user/123 → userId = '123'

// Multiple parameters
app.get("/user/:userId/post/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, Post ${postId}`);
});
// URL: /user/5/post/99 → userId='5', postId='99'
```

**Interview Line:**  
_Dynamic routing uses URL parameters (:param) to create flexible routes accessible via req.params._

[⬆️ Back to Top](#top)

---

## 15. Query Parameters vs Route Parameters vs Body

**Definition:**  
Three different ways to send data: Route parameters (URL path), Query parameters (URL query string), and Request body (POST data).

**Exp:**  
Data bhejne ke teen tarike hain:  
Route params: URL mein directly (`/user/123`)  
Query params: URL ke baad `?` ke saath (`/search?name=mann`)  
Body: POST request ke saath hidden data

**Theory:**

| Type             | Location         | Access          | Use Case                |
| ---------------- | ---------------- | --------------- | ----------------------- |
| **Route Params** | `/user/:id`      | `req.params.id` | Resource identification |
| **Query Params** | `/search?q=node` | `req.query.q`   | Filtering, searching    |
| **Body**         | Request body     | `req.body.name` | Form data, large data   |

```javascript
// Route parameters
app.get("/user/:id", (req, res) => {
  console.log(req.params.id); // '123'
});
// URL: /user/123

// Query parameters
app.get("/search", (req, res) => {
  console.log(req.query.q); // 'node'
  console.log(req.query.limit); // '10'
});
// URL: /search?q=node&limit=10

// Body (needs middleware)
app.use(express.json());
app.post("/user", (req, res) => {
  console.log(req.body.name); // 'Mann'
  console.log(req.body.email); // 'mann@example.com'
});
```

**Interview Line:**  
_Route params identify resources in URL path, query params filter/search via URL query string, and body sends data in POST requests._

[⬆️ Back to Top](#top)

---

## 16. GET vs POST Requests

**Definition:**  
GET retrieves data from server (visible in URL), POST sends data to server (hidden in request body).

**Exp:**  
GET request data dikhane ya retrieve karne ke liye use hoti hai. Data URL mein visible hota hai.  
POST request data bhejne ke liye use hoti hai. Data hidden hota hai (form submission).

**Theory:**

| Feature           | GET           | POST          |
| ----------------- | ------------- | ------------- |
| **Purpose**       | Retrieve data | Send data     |
| **Data Location** | URL (visible) | Body (hidden) |
| **Security**      | Less secure   | More secure   |
| **Caching**       | Cacheable     | Not cached    |
| **Length Limit**  | Limited       | No limit      |
| **Bookmarkable**  | Yes           | No            |

```javascript
// GET - Retrieve users
app.get("/users", (req, res) => {
  const users = ["Mann", "John"];
  res.json(users);
});

// POST - Create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  // Save to database
  res.json({ message: "User created" });
});
```

**Interview Line:**  
_GET retrieves data with parameters in URL while POST sends data securely in request body._

[⬆️ Back to Top](#top)

---

## 17. express.json() vs express.urlencoded()

**Definition:**  
Both are built-in middleware for parsing request body data, but for different content types.

**Exp:**  
Dono middleware request body ko parse karte hain:  
`express.json()` - JSON data ke liye  
`express.urlencoded()` - Form data ke liye

**Theory:**

**express.json():**

- Parses JSON payloads
- Content-Type: application/json
- API requests

**express.urlencoded():**

- Parses URL-encoded data
- Content-Type: application/x-www-form-urlencoded
- HTML form submissions

```javascript
// Setup middleware
app.use(express.json()); // For JSON
app.use(express.urlencoded({ extended: true })); // For forms

// JSON data
app.post("/api/user", (req, res) => {
  console.log(req.body); // { "name": "Mann", "age": 21 }
});

// Form data
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(username); // 'mann123'
});
```

**Interview Line:**  
_express.json() parses JSON payloads while express.urlencoded() parses form-encoded data._

[⬆️ Back to Top](#top)

---

## 18. What is MongoDB

**Definition:**  
MongoDB is a NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON).

**Exp:**  
MongoDB ek NoSQL database hai jo data ko JSON jaisi format mein store karta hai. Yeh flexible hai aur schema change kar sakte hain easily.

**Theory:**

- Document-oriented database
- Stores data as BSON documents
- Schema-less (flexible structure)
- Horizontally scalable
- Rich query language
- Perfect for JavaScript applications

```javascript
// MongoDB Document Example
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Mann Patel",
  age: 21,
  skills: ["JavaScript", "React", "Node.js"],
  address: {
    city: "Mumbai",
    state: "Maharashtra"
  }
}
```

**Interview Line:**  
_MongoDB is a NoSQL database storing flexible, JSON-like BSON documents with dynamic schemas._

[⬆️ Back to Top](#top)

---

## 19. SQL vs NoSQL

**Definition:**  
SQL databases use structured tables with fixed schemas, NoSQL databases use flexible document/key-value storage.

**Exp:**  
SQL mein data tables mein hota hai (rows & columns), schema fixed hota hai.  
NoSQL mein data flexible format mein hota hai (documents), schema change kar sakte hain.

**Theory:**

| Feature           | SQL                       | NoSQL (MongoDB)                |
| ----------------- | ------------------------- | ------------------------------ |
| **Structure**     | Tables, rows, columns     | Collections, documents, fields |
| **Schema**        | Fixed schema              | Dynamic schema                 |
| **Scalability**   | Vertical (upgrade server) | Horizontal (add servers)       |
| **Relationships** | Complex joins             | Embedded/references            |
| **Examples**      | MySQL, PostgreSQL         | MongoDB, Redis                 |
| **Best For**      | Banking, transactions     | Flexible data, rapid dev       |
| **Query**         | SQL language              | JavaScript-like queries        |

```sql
-- SQL (MySQL)
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);
INSERT INTO users VALUES (1, 'Mann', 21);
```

```javascript
// NoSQL (MongoDB)
db.users.insertOne({
  name: "Mann",
  age: 21,
  skills: ["JS", "React"], // Flexible structure
});
```

**Interview Line:**  
_SQL uses fixed-schema tables with complex joins; NoSQL uses flexible documents with horizontal scalability._

[⬆️ Back to Top](#top)

---

## 20. MongoDB Terminology (Collection, Document, Field)

**Definition:**  
MongoDB organizes data in Collections (like tables), Documents (like rows), and Fields (like columns).

**Exp:**  
MongoDB ka structure:  
Collection = Table jaisa (users collection)  
Document = Row jaisa (ek user ka data)  
Field = Column jaisa (name, age fields)

**Theory:**

```
Database → Collection → Document → Field
```

| SQL Term | MongoDB Term          | Description                 |
| -------- | --------------------- | --------------------------- |
| Database | Database              | Top-level container         |
| Table    | Collection            | Group of documents          |
| Row      | Document              | Single record (JSON object) |
| Column   | Field                 | Key-value pair              |
| Index    | Index                 | Performance optimization    |
| JOIN     | Embedding/Referencing | Linking data                |

```javascript
// Database: "ecommerce"
//   Collection: "users"
//     Document:
{
  _id: ObjectId("..."),           // Auto-generated ID
  name: "Mann",                   // Field
  email: "mann@example.com",      // Field
  orders: [ObjectId("...")]       // Field (reference)
}
```

**Interview Line:**  
_MongoDB uses Collections (tables), Documents (rows), and Fields (columns) to organize data._

[⬆️ Back to Top](#top)

---

## 21. What is Mongoose

**Definition:**  
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation and simplifies database operations.

**Exp:**  
Mongoose ek library hai jo MongoDB ko use karna easy banata hai. Yeh schema validation deta hai aur queries simple banata hai.

**Theory:**

- ODM library for MongoDB
- Provides schema structure
- Built-in validation
- Middleware (hooks) support
- Query building helpers
- Type casting

**Benefits:**

- Schema enforcement
- Data validation
- Easier syntax
- Better error handling
- Relationship management

```javascript
// Without Mongoose (Native Driver)
db.collection("users").insertOne({ name: "Mann", age: 21 });

// With Mongoose (ODM)
const mongoose = require("mongoose");

// Schema definition
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// Create user
await User.create({ name: "Mann", age: 21 });
```

**Interview Line:**  
_Mongoose is an ODM library providing schema validation and simplified MongoDB operations for Node.js._

[⬆️ Back to Top](#top)

---

## 22. Schema vs Model in Mongoose

**Definition:**  
Schema defines the structure and rules for documents, Model is a constructor compiled from Schema for CRUD operations.

**Exp:**  
Schema ek blueprint hai jo batata hai document ka structure kya hoga.  
Model ek class hai jo Schema se banti hai aur actual database operations karti hai.

**Theory:**

**Schema:**

- Defines document structure
- Sets data types
- Adds validation rules
- Defines default values
- Cannot perform CRUD

**Model:**

- Compiled from Schema
- Performs CRUD operations
- Creates documents
- Queries database

```javascript
// 1. Define Schema (Blueprint)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 2. Create Model (Database interface)
const User = mongoose.model("User", userSchema);

// 3. Use Model for CRUD
const newUser = await User.create({
  name: "Mann",
  email: "mann@example.com",
  age: 21,
});
```

**Interview Line:**  
_Schema defines document structure and validation rules; Model is a constructor for performing CRUD operations._

[⬆️ Back to Top](#top)

---

## 23. CRUD Operations in Mongoose

**Definition:**  
CRUD stands for Create, Read, Update, Delete - the four basic database operations.

**Exp:**  
CRUD basic database operations hain:  
Create - Naya data banana  
Read - Data padhna/retrieve karna  
Update - Existing data change karna  
Delete - Data remove karna

**Theory:**

| Operation  | Mongoose Methods                     |
| ---------- | ------------------------------------ |
| **Create** | `create()`, `save()`                 |
| **Read**   | `find()`, `findOne()`, `findById()`  |
| **Update** | `updateOne()`, `findByIdAndUpdate()` |
| **Delete** | `deleteOne()`, `findByIdAndDelete()` |

```javascript
// CREATE
const user = await User.create({
  name: "Mann",
  email: "mann@example.com",
});

// READ
const allUsers = await User.find(); // All users
const oneUser = await User.findOne({ name: "Mann" }); // First match
const userById = await User.findById("123abc"); // By ID

// UPDATE
await User.findByIdAndUpdate(
  "123abc",
  {
    age: 22,
  },
  { new: true },
); // Returns updated document

// DELETE
await User.findByIdAndDelete("123abc");
await User.deleteOne({ name: "Mann" });
```

**Interview Line:**  
_CRUD operations in Mongoose: create() for creating, find() for reading, updateOne() for updating, deleteOne() for deleting._

[⬆️ Back to Top](#top)

---

## 24. findById vs findOne vs find

**Definition:**  
Three different methods to retrieve documents with different use cases and return values.

**Exp:**  
Teen tarike data retrieve karne ke:  
findById - ID se ek document  
findOne - Condition se pehla match  
find - Sab matching documents

**Theory:**

| Method           | Use Case             | Returns                 |
| ---------------- | -------------------- | ----------------------- |
| `findById(id)`   | Find by MongoDB \_id | Single document or null |
| `findOne(query)` | Find first match     | Single document or null |
| `find(query)`    | Find all matches     | Array of documents      |

```javascript
// findById - Search by _id
const user = await User.findById("507f1f77bcf86cd799439011");
// Returns: { _id: '507f...', name: 'Mann', age: 21 } or null

// findOne - First matching document
const user = await User.findOne({ email: "mann@example.com" });
// Returns: { _id: '...', email: 'mann@example.com', ... } or null

// find - All matching documents
const users = await User.find({ age: { $gte: 18 } });
// Returns: [{ _id: '...', age: 21 }, { _id: '...', age: 25 }]

// find with no query - All documents
const allUsers = await User.find();
// Returns: [all users]
```

**Interview Line:**  
_findById finds by \_id returning single document, findOne returns first match, find returns array of all matches._

[⬆️ Back to Top](#top)

---

## 25. Data Validation in Mongoose

**Definition:**  
Mongoose provides built-in and custom validators to ensure data meets specified requirements before saving to database.

**Exp:**  
Validation check karta hai ki data sahi hai ya nahi before database mein save karne se. Galat data ko reject karta hai.

**Theory:**

**Built-in Validators:**

- `required` - Field must be provided
- `unique` - No duplicates allowed
- `minlength` / `maxlength` - String length
- `min` / `max` - Number range
- `enum` - Allowed values only

**Custom Validators:**

- Custom validation functions
- Async validation support

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name too short"],
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Must be at least 18"],
    max: 100,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 6;
      },
      message: "Password must be at least 6 characters",
    },
  },
});

// Usage
try {
  await User.create({ name: "Ab" }); // Error: Name too short
} catch (error) {
  console.log(error.message);
}
```

**Interview Line:**  
_Mongoose validation ensures data integrity using built-in validators (required, min, max) and custom validation functions._

[⬆️ Back to Top](#top)

---

## 26. Authentication vs Authorization

**Definition:**  
Authentication verifies WHO you are (identity), Authorization determines WHAT you can access (permissions).

**Exp:**  
Authentication: Tum kaun ho? (Login with username/password)  
Authorization: Tumhe kya karne ki permission hai? (Admin vs user access)

**Theory:**

| Feature      | Authentication    | Authorization          |
| ------------ | ----------------- | ---------------------- |
| **Question** | Who are you?      | What can you do?       |
| **Process**  | Verify identity   | Verify permissions     |
| **Method**   | Login credentials | Roles, permissions     |
| **Example**  | Email + password  | Admin can delete users |
| **When**     | First step        | After authentication   |
| **Result**   | User verified     | Access granted/denied  |

```javascript
// AUTHENTICATION - Who are you?
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verify identity
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send("Invalid password");

  // User authenticated
  const token = jwt.sign({ userId: user._id }, "secret");
  res.json({ token });
});

// AUTHORIZATION - What can you do?
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  next();
};

app.delete("/user/:id", isLoggedIn, isAdmin, async (req, res) => {
  // Only admins can delete users
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});
```

**Interview Line:**  
_Authentication verifies user identity (login) while authorization determines access permissions (roles/rights)._

[⬆️ Back to Top](#top)

---

## 27. What are Cookies

**Definition:**  
Cookies are small pieces of data stored on the client's browser, sent with every HTTP request to the server.

**Exp:**  
Cookies browser mein save hote hain. Server cookies set karta hai aur har request ke saath cookies automatically server ko wapas jaate hain.

**Theory:**

- Stored on client-side (browser)
- Size limit: ~4KB per cookie
- Sent automatically with requests
- Can have expiration time
- Used for: sessions, preferences, tracking

**Cookie Properties:**

- `httpOnly` - JavaScript can't access (security)
- `secure` - Only sent over HTTPS
- `maxAge` - Expiration time
- `sameSite` - CSRF protection

```javascript
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Setting a cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Mann", {
    maxAge: 900000, // 15 minutes
    httpOnly: true, // Can't access via JS
    secure: true, // Only HTTPS
    sameSite: "strict",
  });
  res.send("Cookie set!");
});

// Reading cookies
app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  res.send(`Hello ${username}`);
});

// Clearing cookie
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie cleared!");
});
```

**Interview Line:**  
_Cookies are client-side stored data sent automatically with every request, used for authentication and user preferences._

[⬆️ Back to Top](#top)

---

## 28. Cookies vs Sessions vs Tokens

**Definition:**  
Three different approaches to maintain state and authentication in web applications.

**Exp:**  
Teen tarike user ko logged-in rakhne ke:  
Cookies - Browser mein data store  
Sessions - Server mein data store, cookie mein ID  
Tokens - Encrypted data, stateless

**Theory:**

| Feature         | Cookies          | Sessions           | Tokens (JWT)                 |
| --------------- | ---------------- | ------------------ | ---------------------------- |
| **Storage**     | Client (browser) | Server + client ID | Client (cookie/localStorage) |
| **Size**        | Limited (~4KB)   | Unlimited (server) | Medium (~1-2KB)              |
| **Security**    | Moderate         | More secure        | Very secure (signed)         |
| **Scalability** | Good             | Poor (server load) | Excellent (stateless)        |
| **Server Load** | Low              | High               | Very low                     |
| **Expiration**  | Client-side      | Server-side        | Self-contained               |
| **Use Case**    | Preferences      | Traditional apps   | APIs, microservices          |

```javascript
// COOKIES - Client storage
app.get("/login", (req, res) => {
  res.cookie("userId", "123");
  res.send("Logged in");
});

// SESSIONS - Server storage
const session = require("express-session");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

app.get("/login", (req, res) => {
  req.session.userId = "123"; // Stored on server
  res.send("Logged in");
});

// TOKENS (JWT) - Stateless
const jwt = require("jsonwebtoken");

app.get("/login", (req, res) => {
  const token = jwt.sign({ userId: "123" }, "secret");
  res.cookie("token", token);
  res.send("Logged in");
});
```

**Interview Line:**  
_Cookies store data client-side, sessions store server-side with client ID, JWT tokens store encrypted stateless data._

[⬆️ Back to Top](#top)

---

## 29. What is Bcrypt & Password Hashing

**Definition:**  
Bcrypt is a password hashing library that converts passwords into irreversible hashed strings for secure storage.

**Exp:**  
Bcrypt password ko encrypted hash mein convert karta hai jo reverse nahi ho sakta. Database mein plain password kabhi store nahi karte.

**Theory:**

- One-way hashing function
- Adds random salt for security
- Computationally expensive (slow = secure)
- Same password → Different hash (due to salt)
- Cannot reverse hash to password

**Why Bcrypt?**

- Brute-force resistant
- Rainbow table attacks ineffective
- Industry standard

```javascript
const bcrypt = require("bcrypt");

// HASHING - During Registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Generate salt (10 rounds)
  const salt = await bcrypt.genSalt(10);

  // Hash password with salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Store hashed password (NOT plain password!)
  await User.create({
    email,
    password: hashedPassword, // $2b$10$EaVFFKYP...
  });

  res.send("User registered");
});

// COMPARING - During Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  // Compare entered password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send("Invalid password");
  }

  res.send("Login successful");
});
```

**Interview Line:**  
_Bcrypt performs one-way password hashing with salt, making passwords irreversible and resistant to attacks._

[⬆️ Back to Top](#top)

---

## 30. What is JWT (JSON Web Tokens)

**Definition:**  
JWT is a compact, URL-safe token format for securely transmitting information between parties as a JSON object.

**Exp:**  
JWT ek encrypted token hai jo user ki information carry karta hai. Server isko verify karke user ko authenticate karta hai bina database query ke.

**Theory:**

**JWT Structure:**

```
header.payload.signature
```

1. **Header**: Token type and algorithm
2. **Payload**: User data (claims)
3. **Signature**: Verifies integrity

**Benefits:**

- Stateless (no server storage)
- Self-contained (contains user info)
- Secure (digitally signed)
- Scalable (works across servers)

```javascript
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

// CREATE TOKEN - After login
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "24h" },
  );

  res.cookie("token", token);
  res.json({ token });
});

// VERIFY TOKEN - Protected route
app.get("/profile", (req, res) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded); // { userId: '...', email: '...', role: '...' }

    res.json({ user: decoded });
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});
```

**JWT Example:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6Im1hbm5AZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Interview Line:**  
_JWT is a self-contained, stateless token format containing encoded user data, verified using a secret signature._

[⬆️ Back to Top](#top)

---

## 31. How JWT Authentication Works

**Definition:**  
JWT authentication workflow involves token generation on login, storage in cookies/localStorage, and verification on protected routes.

**Exp:**  
Login → Generate JWT → Store in cookie → Har request ke saath token send → Server verify karta hai → Access grant/deny

**Theory:**

**Authentication Flow:**

```
1. User Login → Credentials verified
2. Server generates JWT
3. Token sent to client (cookie)
4. Client stores token
5. Every request includes token
6. Server verifies token
7. Access granted/denied
```

```javascript
// 1. LOGIN - Generate and send token
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verify credentials
  const user = await User.findOne({ email });
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return res.status(401).send("Invalid credentials");

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "secret-key",
    { expiresIn: "7d" },
  );

  // Send token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ message: "Login successful" });
});

// 2. MIDDLEWARE - Verify token
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Please login first");
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
};

// 3. PROTECTED ROUTE - Use middleware
app.get("/profile", isLoggedIn, async (req, res) => {
  // req.user available (from middleware)
  const user = await User.findById(req.user.userId);
  res.json(user);
});

// 4. LOGOUT - Clear token
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});
```

**Interview Line:**  
_JWT authentication generates tokens on login, stores in cookies, verifies on each request, enabling stateless authentication._

[⬆️ Back to Top](#top)

---

## 32. Middleware for Protected Routes

**Definition:**  
Middleware functions that verify authentication tokens before allowing access to protected routes.

**Exp:**  
Protected routes wo hote hain jinko access karne ke liye login zaruri hai. Middleware check karta hai ki user logged in hai ya nahi.

**Theory:**

- Intercepts requests before route handler
- Verifies JWT token
- Attaches user info to request
- Redirects/denies if not authenticated

```javascript
// Authentication Middleware
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login"); // Redirect to login
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Make user data available
    next(); // Continue to route handler
  } catch (error) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

// Authorization Middleware (Role-based)
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admin only.");
  }
  next();
};

// Apply to routes
app.get("/dashboard", isLoggedIn, (req, res) => {
  // User must be logged in
  res.render("dashboard", { user: req.user });
});

app.get("/admin", isLoggedIn, isAdmin, (req, res) => {
  // User must be logged in AND be admin
  res.render("admin-panel");
});

// Multiple middlewares can be chained
app.post("/post/create", isLoggedIn, validatePost, async (req, res) => {
  // First check auth, then validate, then create
  const post = await Post.create({
    ...req.body,
    author: req.user.userId,
  });
  res.json(post);
});
```

**Interview Line:**  
_Protected route middleware verifies JWT tokens and user permissions before granting access to secure endpoints._

[⬆️ Back to Top](#top)

---

## 33. Data Association in MongoDB

**Definition:**  
Data association establishes relationships between different collections by storing references or embedding documents.

**Exp:**  
Data association ek collection ko dusre collection se link karta hai. Jaise ek user ke paas multiple posts ho sakte hain.

**Theory:**

**Two Approaches:**

1. **Embedding** - Store related data inside document
2. **Referencing** - Store ObjectId reference

**Relationships:**

- One-to-One
- One-to-Many
- Many-to-Many

```javascript
// User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Reference to Post model
    },
  ],
});

// Post Model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Creating association
const user = await User.findById(userId);
const post = await Post.create({
  title: "My First Post",
  content: "Hello World",
  author: user._id, // Store reference
});

// Add post reference to user
user.posts.push(post._id);
await user.save();
```

**Interview Line:**  
_Data association links collections using ObjectId references or embedded documents to establish relationships._

[⬆️ Back to Top](#top)

---

## 34. ObjectId References

**Definition:**  
ObjectId is MongoDB's unique identifier used to reference documents in other collections.

**Exp:**  
ObjectId ek unique ID hai jo har document ko milta hai. Isko use karke ek collection ko dusre collection se link karte hain.

**Theory:**

- 12-byte unique identifier
- Auto-generated by MongoDB
- Used for document references
- Enables relationships between collections

**Structure:**

```
_id: ObjectId("507f1f77bcf86cd799439011")
```

```javascript
// Post Schema with User reference
const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
    ref: "User", // References User model
  },
});

// User Schema with Posts references
const userSchema = new mongoose.Schema({
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

// Creating relationship
const user = await User.create({ name: "Mann" });
console.log(user._id); // ObjectId("507f1f77bcf86cd799439011")

const post = await Post.create({
  title: "Hello",
  author: user._id, // Store ObjectId reference
});

// User's posts array
user.posts.push(post._id);
await user.save();
```

**Interview Line:**  
_ObjectId is MongoDB's unique identifier used to create references between documents in different collections._

[⬆️ Back to Top](#top)

---

## 35. populate() in Mongoose

**Definition:**  
populate() replaces ObjectId references with actual document data, similar to SQL JOIN.

**Exp:**  
populate() ObjectId ko actual data se replace kar deta hai. Jaise user ID ki jagah pura user object mil jata hai.

**Theory:**

- Replaces references with actual data
- Similar to SQL JOIN
- Can populate nested fields
- Select specific fields only

```javascript
// Without populate
const post = await Post.findById(postId);
console.log(post.author); // ObjectId("507f1f77...")

// With populate
const post = await Post.findById(postId).populate("author");
console.log(post.author);
// {
//   _id: ObjectId("507f..."),
//   name: "Mann",
//   email: "mann@example.com"
// }

// Populate specific fields only
const post = await Post.findById(postId).populate("author", "name email"); // Only name and email

// Populate multiple fields
const post = await Post.findById(postId)
  .populate("author")
  .populate("comments");

// Nested populate
const post = await Post.findById(postId).populate({
  path: "comments",
  populate: {
    path: "user", // Populate user inside comments
    select: "name",
  },
});

// Populate in User (array of posts)
const user = await User.findById(userId).populate("posts");
console.log(user.posts); // Array of full post objects
```

**Interview Line:**  
_populate() replaces ObjectId references with actual referenced documents, similar to SQL JOIN operations._

[⬆️ Back to Top](#top)

---

## 36. One-to-Many Relationships

**Definition:**  
One-to-Many relationship is when one document can be associated with multiple documents in another collection.

**Exp:**  
One-to-Many matlab ek document ka relation multiple documents se. Jaise ek user ke multiple posts ho sakte hain.

**Theory:**

**Examples:**

- One User → Many Posts
- One Author → Many Books
- One Category → Many Products

**Implementation:**

- Store array of ObjectIds in parent
- Store single ObjectId in child

```javascript
// Models
const userSchema = new mongoose.Schema({
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Create relationship
app.get("/create-post/:userId", async (req, res) => {
  // 1. Create post
  const post = await Post.create({
    title: "My Post",
    content: "Hello World",
    user: req.params.userId, // Link to user
  });

  // 2. Add post reference to user
  const user = await User.findById(req.params.userId);
  user.posts.push(post._id);
  await user.save();

  res.json({ user, post });
});

// Get user with all posts
app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts"); // Get full post details

  res.json(user);
  // {
  //   name: "Mann",
  //   posts: [
  //     { title: "Post 1", content: "..." },
  //     { title: "Post 2", content: "..." }
  //   ]
  // }
});
```

**Interview Line:**  
_One-to-Many relationships link one parent document to multiple child documents using ObjectId references._

[⬆️ Back to Top](#top)

---

## 37. Embedded Documents vs References

**Definition:**  
Two approaches for data association: Embedding stores related data inside document, Referencing stores ObjectId links.

**Exp:**  
Embedding - Related data ko directly document ke andar store karna  
Referencing - ObjectId store karke link banana

**Theory:**

| Feature              | Embedded        | Referenced                |
| -------------------- | --------------- | ------------------------- |
| **Storage**          | Inside document | Separate collection       |
| **Performance**      | Fast (1 query)  | Slower (multiple queries) |
| **Data Duplication** | Possible        | No duplication            |
| **Updates**          | Harder          | Easier                    |
| **Document Size**    | Can grow large  | Stays small               |
| **Use Case**         | Rarely changes  | Frequently updated        |

```javascript
// EMBEDDED DOCUMENTS
const userSchema = new mongoose.Schema({
  name: String,
  address: {
    // Embedded document (stored inside user)
    street: String,
    city: String,
    zipCode: String,
  },
  comments: [
    {
      // Array of embedded documents
      text: String,
      createdAt: Date,
    },
  ],
});

const user = await User.create({
  name: "Mann",
  address: {
    city: "Mumbai",
    zipCode: "400001",
  },
  comments: [{ text: "Great!", createdAt: new Date() }],
});
// One query, all data retrieved

// REFERENCED DOCUMENTS
const userSchema = new mongoose.Schema({
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Stored in separate collection
    },
  ],
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Needs populate to get full data
const user = await User.findById(id).populate("posts");
// Multiple queries, but easier to update posts
```

**When to use:**

- **Embed**: Small, static data (address, settings)
- **Reference**: Large, frequently updated data (posts, comments)

**Interview Line:**  
_Embedded documents store data inside parent (fast retrieval), references store ObjectIds (easier updates, no duplication)._

[⬆️ Back to Top](#top)

---

## 38. RESTful API Design

**Definition:**  
REST (Representational State Transfer) is an architectural style for designing APIs using HTTP methods and resource-based URLs.

**Exp:**  
RESTful API design ka matlab clean, predictable URLs aur HTTP methods use karna. Har resource ka apna URL hota hai.

**Theory:**

**REST Principles:**

- Resource-based URLs
- Standard HTTP methods
- Stateless communication
- JSON response format

**HTTP Methods:**
| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve data | Get all users |
| POST | Create data | Create new user |
| PUT/PATCH | Update data | Update user |
| DELETE | Delete data | Delete user |

```javascript
// RESTful Routes for User Resource

// GET - Retrieve all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET - Retrieve single user
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST - Create new user
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// PUT/PATCH - Update user
app.put("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

// DELETE - Delete user
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Status Codes
// 200 - OK (successful GET, PUT)
// 201 - Created (successful POST)
// 204 - No Content (successful DELETE)
// 400 - Bad Request
// 404 - Not Found
// 500 - Internal Server Error
```

**Interview Line:**  
_RESTful API design uses resource-based URLs with standard HTTP methods for predictable, stateless communication._

[⬆️ Back to Top](#top)

---

## 39. MVC Architecture

**Definition:**  
MVC (Model-View-Controller) is a design pattern that separates application into three interconnected components.

**Exp:**  
MVC code ko teen parts mein divide karta hai:  
Model - Database aur data logic  
View - UI/Frontend (what user sees)  
Controller - Business logic (connects Model and View)

**Theory:**

```
User → Controller → Model → Database
         ↓           ↓
       View ← ─ ─ ─ ─
```

**Separation:**

- **Model**: Database schemas, data logic
- **View**: HTML templates (EJS), frontend
- **Controller**: Route handlers, business logic

```javascript
// PROJECT STRUCTURE
/*
project/
├── models/
│   ├── userModel.js       // Model
│   └── postModel.js
├── views/
│   ├── index.ejs          // View
│   └── profile.ejs
├── controllers/
│   ├── userController.js  // Controller
│   └── postController.js
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
└── app.js
*/

// MODEL (models/userModel.js)
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
module.exports = mongoose.model("User", userSchema);

// CONTROLLER (controllers/userController.js)
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.render("users", { users }); // Pass to view
};

exports.createUser = async (req, res) => {
  await User.create(req.body);
  res.redirect("/users");
};

// ROUTES (routes/userRoutes.js)
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);

module.exports = router;

// MAIN APP (app.js)
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);
```

**Benefits:**

- ✅ Organized code
- ✅ Easy to maintain
- ✅ Separation of concerns
- ✅ Reusable components

**Interview Line:**  
_MVC separates applications into Model (data), View (UI), and Controller (logic) for organized, maintainable code._

[⬆️ Back to Top](#top)

---

## 40. Environment Variables (.env)

**Definition:**  
Environment variables store configuration and sensitive data outside code, loaded at runtime from .env file.

**Exp:**  
.env file mein sensitive data store karte hain (passwords, API keys). Yeh file Git pe upload nahi karte security ke liye.

**Theory:**

- Store secrets (DB URL, API keys, JWT secret)
- Different configs for dev/production
- Never commit .env to Git
- Use `dotenv` package

```bash
# .env file
PORT=3000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/mydb
JWT_SECRET=mysupersecretkey123
NODE_ENV=development
API_KEY=abc123xyz789
```

```javascript
// Install dotenv
// npm install dotenv

// Load environment variables (app.js)
require("dotenv").config();

// Access environment variables
const port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET;

// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

// JWT signing
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
```

```gitignore
# .gitignore
node_modules/
.env          # Never commit .env file!
```

**Interview Line:**  
_Environment variables store sensitive configuration data in .env files, keeping secrets out of code and version control._

[⬆️ Back to Top](#top)

---

## 41. CORS (Cross-Origin Resource Sharing)

**Definition:**  
CORS is a security mechanism that allows or restricts web applications from making requests to different domains.

**Exp:**  
CORS browser ki security feature hai. Agar frontend aur backend alag domains pe hain, toh CORS enable karna padta hai requests allow karne ke liye.

**Theory:**

- Browser security feature
- Prevents unauthorized cross-origin requests
- Backend must allow CORS for frontend access
- Sets proper headers

**Scenario:**

```
Frontend:  http://localhost:3000 (React)
Backend:   http://localhost:5000 (Express)
          ↑
    CORS needed!
```

```javascript
// Install cors package
// npm install cors

const cors = require("cors");

// Enable CORS for all origins (development)
app.use(cors());

// Enable CORS for specific origin (production)
app.use(
  cors({
    origin: "https://myapp.com",
    credentials: true, // Allow cookies
  }),
);

// Manual CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Specific routes
app.get("/api/data", cors(), (req, res) => {
  res.json({ data: "Available to all origins" });
});
```

**Interview Line:**  
_CORS enables controlled cross-origin resource sharing by setting HTTP headers allowing frontend-backend communication across domains._

[⬆️ Back to Top](#top)

---

## 42. Async/Await in Node.js

**Definition:**  
Async/await provides a cleaner syntax for handling asynchronous operations, making async code look synchronous.

**Exp:**  
Async/await promises ko handle karne ka readable tarika hai. Code synchronous jaisa dikhta hai lekin asynchronously execute hota hai.

**Theory:**

- `async` function always returns a Promise
- `await` pauses execution until Promise resolves
- Cleaner than .then() chains
- Better error handling with try-catch

```javascript
// Without async/await (Promise chains)
function getUser(id) {
  return User.findById(id)
    .then((user) => {
      return Post.find({ author: user._id });
    })
    .then((posts) => {
      console.log(posts);
    })
    .catch((err) => {
      console.error(err);
    });
}

// With async/await (cleaner)
async function getUser(id) {
  try {
    const user = await User.findById(id);
    const posts = await Post.find({ author: user._id });
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

// Route handler with async/await
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const posts = await Post.find({ author: user._id });

    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Parallel execution
async function getData() {
  // Sequential (slow)
  const user = await User.findById(id);
  const posts = await Post.find(); // Waits for user

  // Parallel (fast)
  const [user, posts] = await Promise.all([User.findById(id), Post.find()]);
}
```

**Interview Line:**  
_Async/await provides synchronous-looking syntax for asynchronous operations, improving readability and error handling._

[⬆️ Back to Top](#top)

---

## 43. Error Handling Best Practices

**Definition:**  
Implementing consistent error handling strategies to catch, log, and respond to errors appropriately.

**Exp:**  
Proper error handling se application crash nahi hota aur users ko meaningful error messages milte hain.

**Theory:**

**Best Practices:**

- Use try-catch in async functions
- Centralized error handling middleware
- Proper HTTP status codes
- Log errors for debugging
- User-friendly error messages

```javascript
// 1. Try-Catch in Routes
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 2. Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Usage
app.get("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.json(user);
  } catch (error) {
    next(error); // Pass to error middleware
  }
});

// 3. Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error
  console.error("ERROR:", err);

  // Send response
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 4. Async Handler Wrapper (DRY approach)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new AppError("User not found", 404);
    res.json(user);
  }),
);

// 5. Mongoose Validation Errors
const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: err.errors,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
    });
  }

  res.status(500).json({ error: "Server Error" });
};
```

**Interview Line:**  
_Error handling best practices include try-catch blocks, centralized middleware, proper status codes, and user-friendly error messages._

[⬆️ Back to Top](#top)

---

## 44. MongoDB Atlas vs Local MongoDB

**Definition:**  
MongoDB Atlas is a cloud-hosted database service, while Local MongoDB runs on your computer.

**Exp:**  
Atlas cloud pe hosted database hai (internet se access).  
Local MongoDB apne computer pe run hota hai.

**Theory:**

| Feature        | MongoDB Atlas       | Local MongoDB   |
| -------------- | ------------------- | --------------- |
| **Location**   | Cloud (internet)    | Local machine   |
| **Setup**      | No installation     | Install MongoDB |
| **Access**     | Anywhere (internet) | Only local      |
| **Free Tier**  | 512MB free          | Unlimited       |
| **Backups**    | Automatic           | Manual          |
| **Scaling**    | Easy (cloud)        | Manual          |
| **Connection** | Connection string   | localhost       |
| **Best For**   | Production          | Development     |

```javascript
// LOCAL MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Local DB Connected"))
  .catch((err) => console.error(err));

// ATLAS MongoDB Connection
mongoose
  .connect("mongodb+srv://username:password@cluster0.mongodb.net/mydb")
  .then(() => console.log("Atlas DB Connected"))
  .catch((err) => console.error(err));

// Best Practice: Use environment variable
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);
```

**.env file:**

```bash
# Development (Local)
MONGODB_URL=mongodb://localhost:27017/mydb

# Production (Atlas)
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/proddb
```

**Interview Line:**  
_MongoDB Atlas is cloud-hosted with automatic backups and scaling, while Local MongoDB runs on local machine for development._

[⬆️ Back to Top](#top)

---

## 45. Indexing in MongoDB

**Definition:**  
Indexes are data structures that improve query performance by creating quick lookup references for specific fields.

**Exp:**  
Index ek book ka index page jaisa hai. Bina index ke puri book padhni padti hai, index se directly page pe ja sakte hain.

**Theory:**

- Speeds up queries significantly
- Creates lookup table for fields
- Trade-off: Faster reads, slower writes
- Automatic index on `_id` field

**Types:**

- Single Field Index
- Compound Index
- Unique Index
- Text Index

```javascript
// Schema with indexes
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // Creates unique index
    index: true, // Creates regular index
  },
  username: {
    type: String,
    index: true,
  },
  age: Number,
});

// Compound index (multiple fields)
userSchema.index({ username: 1, age: -1 });
// 1 = ascending, -1 = descending

// Text index for search
userSchema.index({ bio: "text", interests: "text" });

// Creating index manually
await User.createIndexes();

// Query performance comparison
// Without index
await User.find({ email: "mann@example.com" }); // Scans all documents

// With index on email
await User.find({ email: " mann@example.com" }); // Uses index (fast)

// Check if query uses index
const explain = await User.find({ email: "mann@example.com" }).explain(
  "executionStats",
);
console.log(explain);
```

**When to use indexes:**

- ✅ Frequently queried fields
- ✅ Fields used in sorting
- ✅ Unique constraints
- ❌ Rarely queried fields
- ❌ Fields with high write operations

**Interview Line:**  
_Indexes improve query performance by creating lookup structures, trading faster reads for slightly slower writes._

[⬆️ Back to Top](#top)

---

## 🎯 Interview Tips

### Common Questions to Expect:

1. **Explain the difference between Node.js and Express.js**
   - Node.js is runtime, Express is framework built on Node.js

2. **How does authentication work in your app?**
   - Walk through: Login → Bcrypt → JWT → Cookie → Middleware

3. **What's the difference between SQL and NoSQL?**
   - Structure, schema, scalability, use cases

4. **Explain middleware in Express**
   - Functions with req, res, next - executes between request and response

5. **How do you handle errors in Node.js?**
   - Try-catch, error middleware, async handlers

6. **What is JWT and why use it?**
   - Stateless token for authentication, self-contained, scalable

7. **Explain populate() in Mongoose**
   - Replaces ObjectId with actual data, like SQL JOIN

8. **What's the difference between cookies and sessions?**
   - Storage location, scalability, use cases

9. **How do you secure passwords?**
   - Bcrypt hashing with salt, never store plain text

10. **Explain RESTful API design**
    - Resource-based URLs, HTTP methods, stateless

### Quick Review Checklist:

✅ **Node.js Basics**

- Runtime environment, V8 engine
- Event loop, non-blocking I/O
- Module system (require/import)

✅ **Express.js**

- Middleware concept
- Routing and HTTP methods
- Request/Response objects
- Error handling

✅ **MongoDB & Mongoose**

- NoSQL vs SQL
- Schema and Model
- CRUD operations
- Data associations

✅ **Authentication**

- Bcrypt for passwords
- JWT for tokens
- Cookies for storage
- Protected routes with middleware

✅ **Best Practices**

- Environment variables
- Error handling
- MVC architecture
- RESTful API design
- CORS for cross-origin

---

**Happy Learning! 💻🚀**

Made with ❤️ for interview preparation

</div>
