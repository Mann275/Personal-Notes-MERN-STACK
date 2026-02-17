# 13 MiniProject - Social Media Application

A full-stack social media application built with Node.js, Express, MongoDB, and EJS featuring user authentication, post creation, likes, and data associations.

## 📚 Topics Covered

### 1. **Authentication & Authorization**

- **Bcrypt**: Password hashing and comparison for secure storage
- **JWT (JSON Web Tokens)**: Stateless authentication using signed tokens
- **Cookie-Parser**: Managing authentication tokens via cookies
- **Protected Routes**: Middleware to secure routes requiring login

### 2. **Data Association**

- **One-to-Many Relationship**: User can have multiple posts
- **Many-to-Many Relationship**: Posts can have multiple likes from different users
- **Mongoose Populate**: Fetching referenced documents from other collections
- **ObjectId References**: Linking documents across collections

### 3. **CRUD Operations**

- **Create**: Register users and create posts
- **Read**: Display user profile with all posts
- **Update**: Edit existing posts
- **Delete**: Remove posts with proper cleanup

### 4. **Express.js Middleware**

- Body parsing (JSON and URL-encoded)
- Cookie parsing for token management
- View engine setup (EJS)
- Custom authentication middleware

### 5. **MongoDB Operations**

- Schema design with Mongoose
- Array operations (`$push`, `$pull`)
- Finding and updating documents
- Conditional logic in queries

### 6. **File Uploads with Multer**

- **Multer Middleware**: Handling multipart/form-data
- **Storage Configuration**: Custom filename and destination
- **File Processing**: Saving uploaded files to server
- **Database Integration**: Storing file references in MongoDB

---

## 🔐 Authentication Flow

### Registration

1. User submits form with username, name, age, email, password
2. Check if user already exists
3. Generate salt with bcrypt (`bcrypt.genSalt()`)
4. Hash password with salt (`bcrypt.hash()`)
5. Create user in database
6. Generate JWT token with email and userid
7. Store token in cookie
8. Redirect to profile

### Login

1. User submits email and password
2. Find user by email
3. Compare password with hashed password (`bcrypt.compare()`)
4. If valid, generate JWT token
5. Store token in cookie
6. Redirect to profile

## 🔗 Routes

### Public Routes

| Method | Route       | Description             |
| ------ | ----------- | ----------------------- |
| GET    | `/`         | Registration page       |
| GET    | `/login`    | Login page              |
| POST   | `/register` | Create new user account |
| POST   | `/login`    | Authenticate user       |

### Protected Routes (Require Login)

| Method | Route             | Description                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/profile`        | User profile with all posts |
| GET    | `/profile/upload` | Profile picture upload page |
| POST   | `/upload`         | Upload profile picture      |
| POST   | `/post`           | Create new post             |
| GET    | `/like/:id`       | Toggle like/unlike on post  |
| GET    | `/edit/:id`       | Edit post page              |
| POST   | `/update/:id`     | Update post content         |
| GET    | `/delete/:id`     | Delete post and update user |
| GET    | `/logout`         | Clear token and logout      |

---

## 🔑 Key Concepts Explained

### 1. **Bcrypt - Password Hashing**

```javascript
// Generate salt (random data)
bcrypt.genSalt(10, (err, salt) => {
  // Hash password with salt
  bcrypt.hash(password, salt, async (err, hash) => {
    // Store hash in database
    user.password = hash;
  });
});

// Compare during login
bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
  if (result) {
    // Password matches
  }
});
```

**Why?** Plain text passwords are insecure. Bcrypt adds salt and creates one-way hash.

### 2. **JWT - JSON Web Tokens**

```javascript
// Create token
let token = jwt.sign({ email: email, userid: user._id }, "shhh");

// Verify token
let data = jwt.verify(req.cookies.token, "shhh");
```

**Why?** Stateless authentication - server doesn't store sessions, just verifies token signature.

### 3. **Mongoose Populate**

```javascript
// Without populate
let user = await UserModel.findOne({ email }).populate("posts");

// Returns full post objects instead of just IDs
```

**Why?** Fetches referenced documents automatically instead of manual joins.

### 4. **Data Association**

```javascript
// One-to-Many: User → Posts
user.posts.push(post._id);
await user.save();

// Many-to-Many: Posts ← → Users (likes)
post.likes.push(user._id);
```

**Why?** NoSQL databases use references to link related data across collections.

### 5. **Array Operations**

```javascript
// Add to array
post.likes.push(userId);

// Remove from array (MongoDB)
await UserModel.updateOne({ _id: userId }, { $pull: { posts: postId } });

// Remove from array (JavaScript)
post.likes.splice(post.likes.indexOf(userId), 1);
```

### 6. **Multer - File Uploads**

```javascript
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/upload");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

// Use in route
app.post("/upload", isloggedin, upload.single("image"), async (req, res) => {
  let user = await UserModel.findOne({ email: req.user.email });
  user.profilepic = req.file.filename;
  await user.save();
});
```

**Why?** Multer handles multipart/form-data for file uploads with custom storage configuration.

---

## 📦 Dependencies

```json
{
  "express": "Server framework",
  "mongoose": "MongoDB ODM",
  "ejs": "Templating engine",
  "bcrypt": "Password hashing",
  "jsonwebtoken": "JWT authentication",
  "cookie-parser": "Cookie handling",
  "multer": "File upload handling"
}
```

---

## 🔄 Application Flow

```
1. User visits → Home (/) → Registration Form
2. Submit → /register → Hash password → Create user → Generate JWT → Store in cookie
3. Redirect → /profile (protected) → Verify token → Show user posts
4. Upload Profile Pic → /profile/upload → Submit image → Save to /public/images/upload → Update user.profilepic
5. Create Post → /post → Save to DB → Link to user
6. Like Post → /like/:id → Toggle like → Update post
7. Edit Post → /edit/:id → Update form → /update/:id → Save changes
8. Delete Post → /delete/:id → Remove from user array → Delete post
9. Logout → /logout → Clear cookie → Redirect to login
```

---
