# 🍃 MongoDB - Complete Reference Guide

> Pure MongoDB concepts — shell commands, queries, operators, aggregation, indexing & more.

---

## 📚 Table of Contents

1. [What is MongoDB?](#1-what-is-mongodb)
2. [Key Concepts & Terminology](#2-key-concepts--terminology)
3. [Installation & Setup](#3-installation--setup)
4. [MongoDB Shell (mongosh)](#4-mongodb-shell-mongosh)
5. [Databases & Collections](#5-databases--collections)
6. [CRUD Operations](#6-crud-operations)
7. [Query Operators](#7-query-operators)
8. [Update Operators](#8-update-operators)
9. [Projection](#9-projection)
10. [Sorting, Limiting & Skipping](#10-sorting-limiting--skipping)
11. [Aggregation Pipeline](#11-aggregation-pipeline)
12. [Indexing](#12-indexing)
13. [Schema Validation](#13-schema-validation)
14. [Relationships: Embedding vs Referencing](#14-relationships-embedding-vs-referencing)
15. [Data Types in MongoDB](#15-data-types-in-mongodb)
16. [Quick Cheatsheet](#16-quick-cheatsheet)

---

## 1. What is MongoDB?

- **MongoDB** is a **NoSQL**, open-source, document-oriented database.
- Data is stored in **BSON** (Binary JSON) format as **documents** inside **collections**.
- It is **schema-less** — documents in the same collection can have different fields.
- Best suited for: flexible/hierarchical data, rapid prototyping, horizontal scaling.

### SQL vs MongoDB

| SQL         | MongoDB               |
| ----------- | --------------------- |
| Database    | Database              |
| Table       | Collection            |
| Row         | Document              |
| Column      | Field                 |
| Primary Key | `_id` field           |
| JOIN        | `$lookup` / Embedding |

---

## 2. Key Concepts & Terminology

| Term           | Description                                 |
| -------------- | ------------------------------------------- |
| **Document**   | A single record (like a JSON object)        |
| **Collection** | Group of documents (like a table)           |
| **Database**   | Container for collections                   |
| **`_id`**      | Auto-generated unique identifier (ObjectId) |
| **BSON**       | Binary JSON — MongoDB's storage format      |
| **Mongosh**    | Interactive MongoDB shell                   |
| **Mongoose**   | ODM (Object Document Mapper) for Node.js    |

---

## 3. Installation & Setup

### Start MongoDB Server

```bash
# Windows (run MongoDB service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod

# Or directly
mongod
```

### Open MongoDB Shell

```bash
mongosh
```

---

## 4. MongoDB Shell (mongosh)

```bash
mongosh                        # connect to localhost:27017
mongosh "mongodb://localhost:27017/mydb"   # connect to specific db
exit                           # exit the shell
```

### Helpful Shell Commands

```js
show dbs                   // list all databases
show collections           // list all collections in current db
db                         // show current database
cls                        // clear screen
db.stats()                 // database statistics
db.collection.help()       // help for collection methods
```

---

## 5. Databases & Collections

### Databases

```js
use myDatabase          // switch to (or create) a database
db.dropDatabase()       // delete current database
```

### Collections

```js
db.createCollection("users")         // explicitly create collection
db.users.drop()                      // delete a collection
show collections                     // list all collections
db.getCollectionNames()              // array of collection names
```

> **Note:** Collections are created automatically when you first insert a document.

---

## 6. CRUD Operations

### ➕ CREATE

```js
// Insert one document
db.users.insertOne({
  name: "Manvendra",
  age: 22,
  city: "Jaipur",
});

// Insert multiple documents
db.users.insertMany([
  { name: "Rahul", age: 25 },
  { name: "Priya", age: 21 },
  { name: "Amit", age: 30 },
]);
```

---

### 📖 READ

```js
// Find all documents
db.users.find();

// Find with a filter
db.users.find({ city: "Jaipur" });

// Find one document
db.users.findOne({ name: "Rahul" });

// Pretty print (mongosh does this by default)
db.users.find().pretty();

// Count documents
db.users.countDocuments();
db.users.countDocuments({ age: { $gt: 20 } });
```

---

### ✏️ UPDATE

```js
// Update first matching document
db.users.updateOne(
  { name: "Rahul" }, // filter
  { $set: { age: 26 } }, // update
);

// Update all matching documents
db.users.updateMany({ city: "Jaipur" }, { $set: { verified: true } });

// Replace entire document (except _id)
db.users.replaceOne({ name: "Amit" }, { name: "Amit", age: 31, city: "Delhi" });

// Upsert — insert if not found
db.users.updateOne({ name: "Neha" }, { $set: { age: 24 } }, { upsert: true });
```

---

### 🗑️ DELETE

```js
// Delete first matching document
db.users.deleteOne({ name: "Priya" });

// Delete all matching documents
db.users.deleteMany({ verified: false });

// Delete all documents in collection
db.users.deleteMany({});
```

---

## 7. Query Operators

### Comparison Operators

| Operator | Meaning               | Example                                 |
| -------- | --------------------- | --------------------------------------- |
| `$eq`    | Equal                 | `{ age: { $eq: 22 } }`                  |
| `$ne`    | Not equal             | `{ age: { $ne: 22 } }`                  |
| `$gt`    | Greater than          | `{ age: { $gt: 18 } }`                  |
| `$gte`   | Greater than or equal | `{ age: { $gte: 18 } }`                 |
| `$lt`    | Less than             | `{ age: { $lt: 30 } }`                  |
| `$lte`   | Less than or equal    | `{ age: { $lte: 30 } }`                 |
| `$in`    | In array              | `{ city: { $in: ["Delhi","Jaipur"] } }` |
| `$nin`   | Not in array          | `{ city: { $nin: ["Mumbai"] } }`        |

```js
db.users.find({ age: { $gte: 18, $lte: 30 } });
db.users.find({ city: { $in: ["Delhi", "Jaipur"] } });
```

---

### Logical Operators

| Operator | Meaning             |
| -------- | ------------------- |
| `$and`   | All conditions true |
| `$or`    | At least one true   |
| `$not`   | Negates condition   |
| `$nor`   | None true           |

```js
// AND (implicit — just use a single object)
db.users.find({ age: { $gt: 18 }, city: "Jaipur" });

// Explicit $and
db.users.find({ $and: [{ age: { $gt: 18 } }, { city: "Jaipur" }] });

// $or
db.users.find({ $or: [{ age: { $lt: 20 } }, { city: "Delhi" }] });

// $not
db.users.find({ age: { $not: { $gt: 25 } } });
```

---

### Element Operators

```js
// Field exists
db.users.find({ phone: { $exists: true } });

// Field is of a certain BSON type
db.users.find({ age: { $type: "number" } });
```

---

### Array Operators

```js
// Match documents where array contains value
db.users.find({ hobbies: "coding" });

// $all — array contains all specified values
db.users.find({ hobbies: { $all: ["coding", "reading"] } });

// $elemMatch — at least one element matches all conditions
db.orders.find({
  items: { $elemMatch: { qty: { $gt: 5 }, price: { $lt: 100 } } },
});

// $size — array has exact length
db.users.find({ hobbies: { $size: 3 } });
```

---

### Evaluation Operators

```js
// $regex — pattern matching
db.users.find({ name: { $regex: /^M/i } }); // starts with M (case-insensitive)

// $expr — use aggregation expressions in queries
db.orders.find({ $expr: { $gt: ["$total", "$budget"] } });
```

---

## 8. Update Operators

### Field Update Operators

| Operator  | Description                         |
| --------- | ----------------------------------- |
| `$set`    | Set field value                     |
| `$unset`  | Remove a field                      |
| `$inc`    | Increment a numeric field           |
| `$mul`    | Multiply a numeric field            |
| `$rename` | Rename a field                      |
| `$min`    | Update only if new value is less    |
| `$max`    | Update only if new value is greater |

```js
db.users.updateOne({ name: "Manvendra" }, { $set: { age: 23 } });
db.users.updateOne({ name: "Manvendra" }, { $unset: { phone: "" } });
db.users.updateOne({ name: "Manvendra" }, { $inc: { age: 1 } });
db.users.updateOne({ name: "Manvendra" }, { $mul: { salary: 1.1 } });
db.users.updateOne({ name: "Manvendra" }, { $rename: { city: "location" } });
```

---

### Array Update Operators

| Operator    | Description                               |
| ----------- | ----------------------------------------- |
| `$push`     | Add element to array                      |
| `$pull`     | Remove matching elements from array       |
| `$pop`      | Remove first (`-1`) or last (`1`) element |
| `$addToSet` | Add element only if not already present   |
| `$each`     | Use with `$push` to add multiple values   |

```js
// push
db.users.updateOne({ name: "Rahul" }, { $push: { hobbies: "gaming" } });

// push multiple values
db.users.updateOne(
  { name: "Rahul" },
  { $push: { hobbies: { $each: ["coding", "chess"] } } },
);

// pull — removes all matching elements
db.users.updateOne({ name: "Rahul" }, { $pull: { hobbies: "gaming" } });

// addToSet — no duplicates
db.users.updateOne({ name: "Rahul" }, { $addToSet: { hobbies: "coding" } });

// pop — remove last element
db.users.updateOne({ name: "Rahul" }, { $pop: { hobbies: 1 } });
```

---

## 9. Projection

Control which fields are returned. `1` = include, `0` = exclude.

```js
// Include only name and age (exclude _id)
db.users.find({}, { name: 1, age: 1, _id: 0 });

// Exclude specific fields
db.users.find({}, { password: 0, __v: 0 });
```

> **Rule:** Cannot mix include `1` and exclude `0` in same projection (except for `_id`).

---

## 10. Sorting, Limiting & Skipping

```js
// Sort ascending (1) or descending (-1)
db.users.find().sort({ age: 1 }); // youngest first
db.users.find().sort({ age: -1 }); // oldest first
db.users.find().sort({ name: 1, age: -1 }); // multi-field sort

// Limit — return only N documents
db.users.find().limit(5);

// Skip — skip first N documents (pagination)
db.users.find().skip(10);

// Pagination pattern (page 2, 5 per page)
db.users.find().sort({ _id: 1 }).skip(5).limit(5);
```

---

## 11. Aggregation Pipeline

Aggregation processes documents through a **pipeline** of stages.

```js
db.collection.aggregate([ stage1, stage2, stage3, ... ])
```

### Common Stages

| Stage        | Description                    |
| ------------ | ------------------------------ |
| `$match`     | Filter documents (like `find`) |
| `$group`     | Group and aggregate data       |
| `$project`   | Shape the output documents     |
| `$sort`      | Sort documents                 |
| `$limit`     | Limit count                    |
| `$skip`      | Skip count                     |
| `$lookup`    | Join with another collection   |
| `$unwind`    | Deconstruct an array field     |
| `$count`     | Count documents                |
| `$addFields` | Add new computed fields        |

---

### `$match`

```js
db.orders.aggregate([{ $match: { status: "completed" } }]);
```

### `$group`

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$city", // group by field
      totalOrders: { $sum: 1 }, // count
      revenue: { $sum: "$amount" },
      avgAmount: { $avg: "$amount" },
      maxAmount: { $max: "$amount" },
      minAmount: { $min: "$amount" },
    },
  },
]);
```

### `$project`

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      upperName: { $toUpper: "$name" }, // computed field
      birthYear: { $subtract: [2026, "$age"] },
    },
  },
]);
```

### `$unwind`

```js
// turns { tags: ["a","b","c"] } into 3 separate documents
db.posts.aggregate([{ $unwind: "$tags" }]);
```

### `$lookup` (JOIN)

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users", // collection to join
      localField: "userId", // field in orders
      foreignField: "_id", // field in users
      as: "userDetails", // output array field
    },
  },
]);
```

### Full Pipeline Example

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, userId: "$_id", total: 1 } },
]);
```

---

## 12. Indexing

Indexes speed up read queries by avoiding full collection scans.

### Create & Manage Indexes

```js
// Single field index (ascending)
db.users.createIndex({ email: 1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Compound index (multiple fields)
db.users.createIndex({ city: 1, age: -1 });

// Text index (for full-text search)
db.articles.createIndex({ title: "text", body: "text" });

// TTL index (auto-delete documents after N seconds)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// List all indexes
db.users.getIndexes();

// Drop an index
db.users.dropIndex("email_1");

// Drop all indexes (except _id)
db.users.dropIndexes();
```

### Explain Query (check if index is used)

```js
db.users.find({ email: "test@test.com" }).explain("executionStats");
```

---

## 13. Schema Validation

Enforce rules on documents at the database level.

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],
      properties: {
        name: { bsonType: "string", description: "must be a string" },
        email: { bsonType: "string", pattern: "^.+@.+$" },
        age: { bsonType: "int", minimum: 0, maximum: 150 },
      },
    },
  },
  validationAction: "error", // "warn" or "error"
});
```

---

## 14. Relationships: Embedding vs Referencing

### Embedding (Denormalized) — store related data inside the document

```js
// Good for: one-to-few, data always accessed together
{
  _id: ObjectId("..."),
  name: "Manvendra",
  address: {
    street: "MG Road",
    city: "Jaipur",
    pin: "302001"
  }
}
```

### Referencing (Normalized) — store ObjectId of related document

```js
// Good for: one-to-many, large sub-documents, data accessed independently
// User document
{ _id: ObjectId("abc"), name: "Manvendra" }

// Post document
{ _id: ObjectId("xyz"), title: "My Post", author: ObjectId("abc") }
```

### When to use which?

| Embedding ✅                        | Referencing ✅                  |
| ----------------------------------- | ------------------------------- |
| Data accessed together always       | Data accessed independently     |
| One-to-few relationship             | One-to-many / many-to-many      |
| Sub-document rarely changes         | Sub-document changes frequently |
| No 16MB document size limit concern | Large, growing arrays           |

---

## 15. Data Types in MongoDB

| BSON Type     | Example            |
| ------------- | ------------------ |
| `String`      | `"hello"`          |
| `Integer`     | `42`               |
| `Double`      | `3.14`             |
| `Boolean`     | `true / false`     |
| `ObjectId`    | `ObjectId("...")`  |
| `Date`        | `new Date()`       |
| `Array`       | `[1, 2, 3]`        |
| `Object`      | `{ key: "value" }` |
| `Null`        | `null`             |
| `Binary Data` | Buffer/binary      |

```js
// Date example
db.events.insertOne({ name: "Conference", date: new Date("2026-05-01") });

// ObjectId example
const { ObjectId } = require("mongodb");
db.users.findOne({ _id: new ObjectId("64abc123...") });
```

---

## 16. Quick Cheatsheet

```js
// ───── DATABASE ─────
use dbName                          // switch/create db
db.dropDatabase()                   // drop current db
show dbs                            // list dbs

// ───── COLLECTIONS ─────
db.createCollection("name")         // create collection
db.name.drop()                      // drop collection
show collections                    // list collections

// ───── INSERT ─────
db.col.insertOne({})
db.col.insertMany([{}, {}])

// ───── READ ─────
db.col.find()                       // all docs
db.col.find({ field: val })         // filter
db.col.findOne({ field: val })      // first match
db.col.find().sort({ f: 1 })        // sort asc
db.col.find().limit(5)              // limit
db.col.find().skip(10)              // skip
db.col.find({}, { name: 1, _id: 0}) // projection
db.col.countDocuments({ f: val })   // count

// ───── UPDATE ─────
db.col.updateOne({ filter }, { $set: { f: v } })
db.col.updateMany({ filter }, { $set: { f: v } })
db.col.replaceOne({ filter }, { newDoc })

// ───── DELETE ─────
db.col.deleteOne({ filter })
db.col.deleteMany({ filter })
db.col.deleteMany({})               // delete all

// ───── INDEXES ─────
db.col.createIndex({ field: 1 })
db.col.createIndex({ field: 1 }, { unique: true })
db.col.getIndexes()
db.col.dropIndex("index_name")

// ───── AGGREGATION ─────
db.col.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$city", count: { $sum: 1 } } },
  { $sort:  { count: -1 } }
])
```

---

> Made with ❤️ for MongoDB revision — pure shell, no Mongoose here!
