# Advanced JavaScript

## 📑 Table of Contents

1. [DOM (Document Object Model)](#1-dom-document-object-model)
   - [Selecting Elements](#selecting-elements)
   - [Attribute Manipulation](#attribute-manipulation)
   - [Dynamic DOM Manipulation](#dynamic-dom-manipulation)
   - [Modifying Content](#modifying-content)
   - [Modifying Styles](#modifying-styles)
   - [Traversing the DOM](#traversing-the-dom)
2. [Events and Event Handling](#2-events-and-event-handling)
   - [Event Binding Methods](#event-binding-methods)
   - [Common Events](#common-events)
   - [Event Object](#event-object)
   - [Event Bubbling and Capturing](#event-bubbling-and-capturing)
   - [Event Delegation](#event-delegation)
3. [Forms and Form Validation](#3-forms-and-form-validation)
   - [Form Elements](#form-elements)
   - [Accessing Form Elements](#accessing-form-elements)
   - [Form Validation](#form-validation)
4. [Timers and Intervals](#4-timers-and-intervals)
   - [setTimeout()](#settimeout)
   - [setInterval()](#setinterval)
   - [Practical Examples](#practical-examples)
5. [Browser Storage](#5-browser-storage)
   - [Local Storage](#local-storage)
   - [Session Storage](#session-storage)
   - [Cookies](#cookies)
   - [Storage Comparison](#storage-comparison)

---

## 1. DOM (Document Object Model)

### What is DOM?
The DOM is a programming interface for HTML documents. It represents the page structure as a tree of objects that can be manipulated with JavaScript.

### Selecting Elements

#### getElementById()
```javascript
let element = document.getElementById('myId');
```

#### getElementsByClassName()
```javascript
let elements = document.getElementsByClassName('myClass');
// Returns HTMLCollection (array-like)
```

#### getElementsByTagName()
```javascript
let paragraphs = document.getElementsByTagName('p');
// Returns HTMLCollection
```

#### querySelector()
Select first matching element (uses CSS selectors)
```javascript
let element = document.querySelector('.myClass');
let element2 = document.querySelector('#myId');
let element3 = document.querySelector('div > p');
```

#### querySelectorAll()
Select all matching elements (uses CSS selectors)
```javascript
let elements = document.querySelectorAll('.myClass');
// Returns NodeList (can use forEach)
```

### Attribute Manipulation

#### getAttribute()
```javascript
let value = element.getAttribute('href');
```

#### setAttribute()
```javascript
element.setAttribute('href', 'https://example.com');
element.setAttribute('class', 'new-class');
```

#### removeAttribute()
```javascript
element.removeAttribute('disabled');
```

#### hasAttribute()
```javascript
if (element.hasAttribute('data-id')) {
    // do something
}
```

#### Direct Property Access
```javascript
element.id = 'newId';
element.className = 'new-class';
element.src = 'image.jpg';
element.href = 'https://example.com';
```

### Dynamic DOM Manipulation

#### Creating Elements
```javascript
let newDiv = document.createElement('div');
let newP = document.createElement('p');
let textNode = document.createTextNode('Hello World');
```

#### Adding Elements

##### appendChild()
Add as last child
```javascript
parent.appendChild(newDiv);
```

##### append()
Add multiple nodes/text
```javascript
parent.append(newDiv, 'Some text', newP);
```

##### prepend()
Add as first child
```javascript
parent.prepend(newDiv);
```

##### insertBefore()
```javascript
parent.insertBefore(newDiv, referenceNode);
```

##### insertAdjacentHTML()
```javascript
element.insertAdjacentHTML('beforebegin', '<div>Before</div>');
// positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
```

#### Removing Elements

##### remove()
```javascript
element.remove();
```

##### removeChild()
```javascript
parent.removeChild(childElement);
```

#### Replacing Elements

##### replaceChild()
```javascript
parent.replaceChild(newElement, oldElement);
```

##### replaceWith()
```javascript
oldElement.replaceWith(newElement);
```

#### Cloning Elements
```javascript
let clone = element.cloneNode(true); // true = deep clone
```

### Modifying Content

#### innerHTML
Get/set HTML content
```javascript
element.innerHTML = '<p>New <strong>HTML</strong> content</p>';
```

#### textContent
Get/set text content (ignores HTML tags)
```javascript
element.textContent = 'Plain text content';
```

#### innerText
Similar to textContent but respects styling (hidden elements)
```javascript
element.innerText = 'Visible text';
```

### Modifying Styles

#### Inline Styles
```javascript
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';
element.style.display = 'none';
```

#### CSS Classes

##### classList.add()
```javascript
element.classList.add('active', 'highlight');
```

##### classList.remove()
```javascript
element.classList.remove('active');
```

##### classList.toggle()
```javascript
element.classList.toggle('active'); // add if absent, remove if present
```

##### classList.contains()
```javascript
if (element.classList.contains('active')) {
    // do something
}
```

##### classList.replace()
```javascript
element.classList.replace('old-class', 'new-class');
```

### Traversing the DOM

#### Parent Navigation
```javascript
element.parentNode;
element.parentElement;
element.closest('.parent-class'); // finds nearest ancestor
```

#### Child Navigation
```javascript
element.children; // HTMLCollection of child elements
element.childNodes; // NodeList (includes text nodes)
element.firstElementChild;
element.lastElementChild;
element.childElementCount;
```

#### Sibling Navigation
```javascript
element.nextElementSibling;
element.previousElementSibling;
```

---

## 2. Events and Event Handling

### What are Events?
Events are actions or occurrences that happen in the browser (click, keypress, page load, etc.)

### Event Binding Methods

#### Inline Event Handlers (Not Recommended)
```html
<button onclick="handleClick()">Click Me</button>
```

#### DOM Property
```javascript
element.onclick = function() {
    console.log('Clicked!');
};
```

#### addEventListener() (Recommended)
```javascript
element.addEventListener('click', function(event) {
    console.log('Clicked!');
});

// With arrow function
element.addEventListener('click', (event) => {
    console.log('Clicked!');
});

// Multiple listeners possible
element.addEventListener('click', handler1);
element.addEventListener('click', handler2);
```

#### removeEventListener()
```javascript
element.removeEventListener('click', handlerFunction);
// Note: Must be the same function reference
```

### Common Events

#### Mouse Events
- `click` - Element is clicked
- `dblclick` - Element is double-clicked
- `mousedown` - Mouse button is pressed
- `mouseup` - Mouse button is released
- `mousemove` - Mouse pointer moves
- `mouseenter` - Mouse enters element
- `mouseleave` - Mouse leaves element
- `mouseover` - Mouse over element (bubbles)
- `mouseout` - Mouse out of element (bubbles)
- `contextmenu` - Right-click

```javascript
element.addEventListener('click', (e) => {
    console.log('Clicked at:', e.clientX, e.clientY);
});

element.addEventListener('mousemove', (e) => {
    console.log('Mouse position:', e.pageX, e.pageY);
});
```

#### Keyboard Events
- `keydown` - Key is pressed down
- `keyup` - Key is released
- `keypress` - Key is pressed (deprecated)

```javascript
document.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key);
    console.log('Key code:', e.code);
    
    if (e.key === 'Enter') {
        console.log('Enter pressed!');
    }
    
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // prevent browser save
        console.log('Ctrl+S pressed!');
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        console.log('Space bar pressed');
    }
});
```

#### Form Events
- `submit` - Form is submitted
- `change` - Input value changes (after blur)
- `input` - Input value changes (real-time)
- `focus` - Element receives focus
- `blur` - Element loses focus
- `reset` - Form is reset

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page reload
    console.log('Form submitted');
});

input.addEventListener('input', (e) => {
    console.log('Current value:', e.target.value);
});

input.addEventListener('change', (e) => {
    console.log('Value changed to:', e.target.value);
});
```

#### Window Events
- `load` - Page fully loaded
- `DOMContentLoaded` - DOM is ready
- `resize` - Window is resized
- `scroll` - Page is scrolled
- `unload` - Page is about to unload
- `beforeunload` - Before page unload

```javascript
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is ready');
});

window.addEventListener('resize', () => {
    console.log('Window resized:', window.innerWidth, window.innerHeight);
});

window.addEventListener('scroll', () => {
    console.log('Scroll position:', window.scrollY);
});
```

### Event Object

The event object contains information about the event and is passed to event handlers.

#### Common Event Properties
```javascript
element.addEventListener('click', (event) => {
    // Target and Current Target
    console.log(event.target); // element that triggered event
    console.log(event.currentTarget); // element with listener
    
    // Mouse position
    console.log(event.clientX, event.clientY); // relative to viewport
    console.log(event.pageX, event.pageY); // relative to document
    console.log(event.offsetX, event.offsetY); // relative to element
    
    // Keyboard modifiers
    console.log(event.ctrlKey); // true if Ctrl pressed
    console.log(event.shiftKey); // true if Shift pressed
    console.log(event.altKey); // true if Alt pressed
    console.log(event.metaKey); // true if Cmd/Win pressed
    
    // Event type
    console.log(event.type); // 'click'
    
    // Timestamp
    console.log(event.timeStamp);
});
```

#### Event Methods
```javascript
element.addEventListener('click', (event) => {
    // Prevent default behavior
    event.preventDefault();
    
    // Stop propagation (bubbling)
    event.stopPropagation();
    
    // Stop immediate propagation
    event.stopImmediatePropagation();
});
```

### Event Bubbling and Capturing

#### Event Propagation Phases
1. **Capturing Phase**: Event travels down from root to target
2. **Target Phase**: Event reaches target element
3. **Bubbling Phase**: Event bubbles up from target to root

#### Event Bubbling (Default)
Events bubble up from child to parent

```javascript
// HTML: <div id="parent"><button id="child">Click</button></div>

parent.addEventListener('click', () => {
    console.log('Parent clicked');
});

child.addEventListener('click', () => {
    console.log('Child clicked');
});

// Clicking child logs:
// "Child clicked"
// "Parent clicked" (bubbles up)
```

#### Event Capturing
Events captured while traveling down

```javascript
parent.addEventListener('click', () => {
    console.log('Parent clicked');
}, true); // true enables capturing

child.addEventListener('click', () => {
    console.log('Child clicked');
});

// Clicking child logs:
// "Parent clicked" (captured first)
// "Child clicked"
```

#### Stop Propagation
```javascript
child.addEventListener('click', (e) => {
    e.stopPropagation(); // stops bubbling
    console.log('Child clicked');
});

// Now only "Child clicked" is logged
```

### Event Delegation

Attach single listener to parent instead of multiple listeners to children.

**Benefits:**
- Better performance
- Works with dynamically added elements

```javascript
// Instead of adding listener to each item
// Add one listener to parent
ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log('List item clicked:', e.target.textContent);
    }
});

// Works even for items added later
let newLi = document.createElement('li');
newLi.textContent = 'New item';
ul.appendChild(newLi); // listener automatically works
```

---

## 3. Forms and Form Validation

### Form Elements

```html
<form id="myForm">
    <input type="text" id="username" name="username" required>
    <input type="email" id="email" name="email" required>
    <input type="password" id="password" name="password" required>
    <input type="checkbox" id="terms" name="terms">
    <input type="radio" name="gender" value="male">
    <input type="radio" name="gender" value="female">
    <select id="country" name="country">
        <option value="usa">USA</option>
        <option value="uk">UK</option>
    </select>
    <textarea id="message" name="message"></textarea>
    <button type="submit">Submit</button>
</form>
```

### Accessing Form Elements

```javascript
let form = document.getElementById('myForm');

// Access by name
let username = form.elements.username;
let email = form.elements.email;

// Access by id
let password = document.getElementById('password');

// Get form values
console.log(username.value);
console.log(email.value);
```

### Form Events

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page reload
    
    // Get form data
    let formData = new FormData(form);
    
    // Access values
    console.log(formData.get('username'));
    console.log(formData.get('email'));
    
    // Or as object
    let data = Object.fromEntries(formData);
    console.log(data);
});
```

### Form Validation

#### HTML5 Validation Attributes
```html
<input type="text" required>
<input type="email" required>
<input type="number" min="1" max="100">
<input type="text" pattern="[A-Za-z]{3,}" title="3+ letters">
<input type="text" minlength="3" maxlength="20">
```

#### JavaScript Validation

##### Basic Validation
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let username = form.elements.username.value;
    let email = form.elements.email.value;
    let password = form.elements.password.value;
    
    // Validate username
    if (username.trim() === '') {
        alert('Username is required');
        return;
    }
    
    if (username.length < 3) {
        alert('Username must be at least 3 characters');
        return;
    }
    
    // Validate email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
    }
    
    // Validate password
    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }
    
    // If all valid
    console.log('Form is valid!');
    // Submit form data
});
```

##### Real-time Validation
```javascript
username.addEventListener('input', (e) => {
    let value = e.target.value;
    let errorMsg = document.getElementById('username-error');
    
    if (value.length < 3) {
        errorMsg.textContent = 'Username must be at least 3 characters';
        username.classList.add('invalid');
    } else {
        errorMsg.textContent = '';
        username.classList.remove('invalid');
    }
});
```

##### Custom Validation
```javascript
password.addEventListener('blur', (e) => {
    let value = e.target.value;
    
    let hasUpper = /[A-Z]/.test(value);
    let hasLower = /[a-z]/.test(value);
    let hasNumber = /\d/.test(value);
    let hasSpecial = /[!@#$%^&*]/.test(value);
    
    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        password.setCustomValidity('Password must contain uppercase, lowercase, number, and special character');
    } else {
        password.setCustomValidity(''); // clear error
    }
});
```

### Validation API

```javascript
// Check validity
if (input.checkValidity()) {
    console.log('Input is valid');
} else {
    console.log('Input is invalid');
    console.log(input.validationMessage);
}

// Validity state
console.log(input.validity.valid); // overall validity
console.log(input.validity.valueMissing); // required field empty
console.log(input.validity.typeMismatch); // wrong type (email, url)
console.log(input.validity.patternMismatch); // pattern not matched
console.log(input.validity.tooLong); // exceeds maxlength
console.log(input.validity.tooShort); // below minlength
console.log(input.validity.rangeOverflow); // exceeds max
console.log(input.validity.rangeUnderflow); // below min
```

---

## 4. Timers and Intervals

### setTimeout()
Execute function once after delay

```javascript
// Basic usage
setTimeout(() => {
    console.log('Executed after 2 seconds');
}, 2000);

// With function reference
function greet() {
    console.log('Hello!');
}
setTimeout(greet, 1000);

// With parameters
setTimeout((name, age) => {
    console.log(`${name} is ${age} years old`);
}, 1000, 'Mann', 22);

// Store timeout ID to cancel
let timeoutId = setTimeout(() => {
    console.log('This may not execute');
}, 3000);

// Cancel timeout
clearTimeout(timeoutId);
```

### setInterval()
Execute function repeatedly at intervals

```javascript
// Basic usage
setInterval(() => {
    console.log('Executed every 2 seconds');
}, 2000);

// Counter example
let count = 0;
let intervalId = setInterval(() => {
    count++;
    console.log('Count:', count);
    
    if (count === 5) {
        clearInterval(intervalId); // stop after 5
    }
}, 1000);

// Clear interval
clearInterval(intervalId);
```

### Practical Examples

#### Countdown Timer
```javascript
let seconds = 10;

let countdownId = setInterval(() => {
    console.log(seconds);
    seconds--;
    
    if (seconds < 0) {
        clearInterval(countdownId);
        console.log('Time\'s up!');
    }
}, 1000);
```

#### Debouncing
Delay execution until after user stops typing

```javascript
let debounceTimer;

searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(() => {
        console.log('Searching for:', e.target.value);
        // Make API call here
    }, 500); // wait 500ms after user stops typing
});
```

#### Throttling
Limit execution frequency

```javascript
let throttleTimer;
let throttleDelay = 1000;

window.addEventListener('scroll', () => {
    if (throttleTimer) return;
    
    throttleTimer = setTimeout(() => {
        console.log('Scroll position:', window.scrollY);
        throttleTimer = null;
    }, throttleDelay);
});
```

---

## 5. Browser Storage

### Local Storage

Persistent storage (data survives page refresh and browser restart)

#### setItem()
```javascript
localStorage.setItem('username', 'Mann');
localStorage.setItem('age', '22');
localStorage.setItem('isLoggedIn', 'true');
```

#### getItem()
```javascript
let username = localStorage.getItem('username');
console.log(username); // 'Mann'
```

#### removeItem()
```javascript
localStorage.removeItem('username');
```

#### clear()
```javascript
localStorage.clear(); // removes all items
```

#### key()
```javascript
let firstKey = localStorage.key(0); // get key at index 0
```

#### Length
```javascript
console.log(localStorage.length); // number of items
```

#### Storing Objects
```javascript
// Objects must be stringified
let user = { name: 'Mann', age: 22 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
let storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'Mann'
```

#### Storing Arrays
```javascript
let todos = ['Task 1', 'Task 2', 'Task 3'];
localStorage.setItem('todos', JSON.stringify(todos));

let storedTodos = JSON.parse(localStorage.getItem('todos'));
console.log(storedTodos[0]); // 'Task 1'
```

### Session Storage

Temporary storage (data cleared when tab/browser closes)

**Same API as localStorage:**

```javascript
// Set item
sessionStorage.setItem('tempData', 'value');

// Get item
let data = sessionStorage.getItem('tempData');

// Remove item
sessionStorage.removeItem('tempData');

// Clear all
sessionStorage.clear();

// Length
console.log(sessionStorage.length);
```

### Cookies

Small text files stored by browser

#### Set Cookie
```javascript
// Basic cookie
document.cookie = "username=Mann";

// Cookie with expiration (7 days)
let date = new Date();
date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
document.cookie = `username=Mann; expires=${date.toUTCString()}`;

// Cookie with path
document.cookie = "username=Mann; path=/";

// Secure cookie (HTTPS only)
document.cookie = "username=Mann; secure";

// HttpOnly (not accessible via JavaScript - set on server)
// SameSite attribute
document.cookie = "username=Mann; SameSite=Strict";
```

#### Get Cookie
```javascript
// Get all cookies
console.log(document.cookie); // "username=Mann; age=22"

// Get specific cookie
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

let username = getCookie('username');
```

#### Delete Cookie
```javascript
// Set expiration to past date
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

### Storage Comparison

| Feature | Local Storage | Session Storage | Cookies |
|---------|--------------|-----------------|---------|
| **Capacity** | ~10MB | ~5-10MB | ~4KB |
| **Lifetime** | Persistent | Tab session | Configurable |
| **Accessibility** | Same origin | Same tab | Same origin |
| **Sent to Server** | No | No | Yes (every request) |
| **Use Case** | User preferences | Temp session data | Authentication |

### Storage Events

Listen for storage changes (works across tabs)

```javascript
window.addEventListener('storage', (e) => {
    console.log('Storage changed!');
    console.log('Key:', e.key);
    console.log('Old Value:', e.oldValue);
    console.log('New Value:', e.newValue);
    console.log('URL:', e.url);
    console.log('Storage Area:', e.storageArea);
});
```

### Practical Examples

#### Remember User Preference
```javascript
// Save theme preference
function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
}

// Load theme on page load
window.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
});

// Toggle theme
themeButton.addEventListener('click', () => {
    let currentTheme = localStorage.getItem('theme') || 'light';
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});
```

#### Shopping Cart
```javascript
// Add to cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Remove from cart
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear cart
function clearCart() {
    localStorage.removeItem('cart');
}
```

---

## Summary

This covers all advanced JavaScript topics including:
- **DOM Manipulation**: Selecting, creating, modifying elements
- **Event Handling**: Mouse, keyboard, form events, bubbling, delegation
- **Forms**: Validation techniques and form handling
- **Timers**: setTimeout, setInterval, debouncing, throttling
- **Storage**: localStorage, sessionStorage, cookies

**Next Step**: Practice these concepts by building interactive web applications!

---

## Additional Advanced Topics to Explore

- **Asynchronous JavaScript**: Callbacks, Promises, Async/Await
- **Fetch API**: Making HTTP requests
- **ES6+ Features**: Destructuring, modules, classes
- **Error Handling**: try...catch, custom errors
- **Regular Expressions**: Pattern matching
- **JSON**: Parsing and stringifying
- **Browser APIs**: Geolocation, Notification, etc.
