# Technical Explainer: Client-Side Data Rendering Engine

## Real Build Feature

This section explains how the **Dynamic Data Rendering Engine** in `js/renderer.js` and `js/dataLoader.js` works in simple, clear language.

---

## How It Works (Step-by-Step)

1. **Data Centralization (`data/portfolio.json`)**: All project titles, problem/solution statements, github links, live demo URLs, and publication details are stored in a single JSON structured file.
2. **Fetch Request (`dataLoader.js`)**: When `index.html` loads, JavaScript issues an asynchronous HTTP fetch request (`fetch('data/portfolio.json')`) to parse the raw data into a memory object.
3. **HTML Generation (`renderer.js`)**: The renderer loops through the array of project objects and generates accessible HTML cards complete with tags, thumbnails, and modal trigger listeners.
4. **DOM Injection**: The generated HTML string is injected directly into `#projects-container` in the DOM.

---

## Why This Implementation Was Chosen

- **No Server Build Step**: Works directly on any static web server without requiring React compilation or Node.js runtime.
- **Fast Page Load**: Only loads data when needed and renders DOM elements instantly.
- **Easy Content Management**: Sanjana can update her projects by modifying `portfolio.json` without altering HTML files directly.
