# 📘 HTML Complete Beginner Notes

This README covers all the basic HTML concepts I've learned and practiced from **Basics.html**. It's meant as revision notes + reference for future projects.

---

## 1️⃣ What is HTML?

- **HTML** = HyperText Markup Language
- Used to structure web pages
- Not a programming language, it's a markup language

---

## 2️⃣ Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  Content goes here
</body>
</html>
```

**Explanation:**
- `<!DOCTYPE html>` → tells browser this is HTML5
- `<html>` → root element
- `<head>` → metadata, title, SEO stuff
- `<body>` → visible content

---

## 3️⃣ Heading Tags

`<h1>` to `<h6>`

- `<h1>` → biggest heading
- `<h6>` → smallest heading
- Used for SEO + page structure

---

## 4️⃣ Paragraph & Line Break

```html
<p>This is a paragraph</p>
<br>
<hr>
```

- `<p>` → paragraph
- `<br>` → line break
- `<hr>` → horizontal line (section divider)

---

## 5️⃣ Anchor (Link) Tag

```html
<a href="https://example.com">Same Tab</a>
<a href="https://example.com" target="_blank">New Tab</a>
```

**Types:**
- External links
- Relative links
- Image as a link

---

## 6️⃣ Image Tag

```html
<img src="image.jpg" alt="description" height="150" width="200">
```

- `alt` → accessibility + SEO
- Self-closing tag

---

## 7️⃣ Text Formatting Tags

```html
<b>Bold</b>
<i>Italic</i>
<u>Underline</u>
```

> Use for basic formatting (CSS preferred in real projects).

---

## 8️⃣ Big & Small Text

```html
<big>Big</big>
<small>Small</small>
```

---

## 9️⃣ Subscript & Superscript

```html
H<sub>2</sub>O
E = mc<sup>2</sup>
```

> Used in math & chemistry formulas.

---

## 🔟 Preformatted Text

```html
<pre>
Preserves
spaces and
line breaks
</pre>
```

> Used when spacing matters.

---

## 1️⃣1️⃣ Semantic Page Layout Tags

```html
<header>
<main>
<section>
<article>
<aside>
<footer>
```

**Why important?**
- Better SEO
- Clean structure
- Easy to understand code

---

## 1️⃣2️⃣ Div vs Span

**Div (Block-level)**
```html
<div>Block container</div>
```

**Span (Inline)**
```html
<span>Inline container</span>
```

---

## 1️⃣3️⃣ Lists

**Unordered List**
```html
<ul>
  <li>Item</li>
</ul>
```

**Ordered List**
```html
<ol>
  <li>Item</li>
</ol>
```

> Supports nested lists.

---

## 1️⃣4️⃣ Tables

```html
<table border="1">
  <caption>Title</caption>
  <thead>
    <tr><th>Header</th></tr>
  </thead>
  <tbody>
    <tr><td>Data</td></tr>
  </tbody>
</table>
```

**Important Tags:**
- `<thead>`, `<tbody>`
- `<tr>` → row
- `<th>` → header
- `<td>` → data
- `colspan` → merge columns

---

## 1️⃣5️⃣ Forms

```html
<form action="/submit">
  <input type="text">
  <input type="password">
  <input type="radio">
  <input type="checkbox">
  <textarea></textarea>
  <select>
    <option>Option</option>
  </select>
  <input type="submit">
</form>
```

**Input Types Used:**
- text
- password
- radio
- checkbox
- textarea
- dropdown

---

## 1️⃣6️⃣ Class & ID

```html
<div id="unique" class="group"></div>
```

- `id` → unique
- `class` → reusable
- Mostly used with CSS & JS

---

## 1️⃣7️⃣ iframe

```html
<iframe src="https://example.com"></iframe>
```

**Used to embed:**
- Websites
- YouTube videos
- Maps

---

## 1️⃣8️⃣ Video Tag

```html
<video src="video.mp4" controls></video>
```

> Used for self-hosted videos.

---

## ✅ What I Learned Overall

- ✔️ HTML page structure
- ✔️ Semantic tags
- ✔️ Forms & inputs
- ✔️ Tables & lists
- ✔️ Media embedding
- ✔️ Clean readable markup

---

**📝 Notes from:** [Basics.html](Basics.html)
