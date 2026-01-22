/*
 * ==================== HOW REACT WORKS - SIMPLE VERSION ====================
 *
 * 1. REACT ELEMENTS (Virtual DOM):
 *    - React creates a JavaScript object that describes what the page should look like
 *    - Instead of changing the real DOM directly, React uses these objects first
 *    - Example: { type: 'div', props: { className: 'box' }, children: 'Hello' }
 *
 * 2. JSX TO JAVASCRIPT:
 *    - You write <button>Click me</button> in JSX
 *    - The computer converts it to: React.createElement('button', {}, 'Click me')
 *    - This creates the JavaScript object that React understands
 *
 * 3. TURNING INTO REAL DOM:
 *    - React takes the JavaScript object and creates actual HTML elements
 *    - It sets all the properties (like href, className, etc.) on these elements
 *    - Then it puts them on the webpage
 *
 * 4. SMART UPDATES (Diffing):
 *    - When something changes, React creates a new object version
 *    - It compares the old and new versions to find what changed
 *    - Only the changed parts get updated on the page (faster and efficient)
 *
 * 5. DATA FLOWS DOWN:
 *    - Parent components pass data to child components
 *    - Children get this data as "props" but can't change the parent's data directly
 *    - When data changes, everything below it updates automatically
 *
 * 6. WHAT WE'RE BUILDING:
 *    - A simple version of React showing these core ideas
 */

function crender(reactele, container) {
  /*
    const domEle=document.createElement(reactele.type)
    domEle.innerHTML=reactele.Children
    domEle.setAttribute('href', reactele.props.href)
    domEle.setAttribute('target', reactele.props.target)
    container.appendChild(domEle)
*/

  // Step 1: Create the actual DOM element based on the element type
  const domEle = document.createElement(reactele.type);

  // Step 2: Set the inner content (children)
  domEle.innerHTML = reactele.Children;

  // Step 3: Loop through all props and set them as attributes
  // This is what React does internally when applying props to elements
  for (const prop in reactele.props) {
    if (prop === "Children") continue; // Skip children as it's already handled
    domEle.setAttribute(prop, reactele.props[prop]);
  }

  // Step 4: Append the created element to the container (mount to DOM)
  container.appendChild(domEle);
}

// ==================== REACT ELEMENT STRUCTURE ====================
// This object represents a Virtual DOM element
// In real React, this would be created by React.createElement() or JSX
const reactele = {
  type: "a", // HTML tag name (or component in real React)
  props: {
    // Properties/attributes to be applied to the element
    href: "https://www.patelmann.me",
    target: "_blank",
  },
  Children: "Click here", // Content inside the element (can be text or nested elements)
};

// ==================== MOUNTING TO THE DOM ====================
// Get the root container from the actual DOM
const root = document.querySelector("#root");

// Call our custom render function to convert React Element → Real DOM
crender(reactele, root);
