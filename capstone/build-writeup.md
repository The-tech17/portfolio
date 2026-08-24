# Technical Build Write-Up & Decisions

## Executive Summary

This write-up documents the technical decisions, architecture, hard bugs solved, and stack choices made by Sanjana Londhe while engineering her portfolio for the FlyRank AI Internship & Capstone.

---

## 1. Chosen Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+ Modules), Tailwind CSS utility tokens.
- **Data Engine**: Asynchronous client-side JSON data renderer (`data/portfolio.json`).
- **Hosting**: GitHub Pages / Vercel static deployment.

### Why This Stack Was Chosen over Framework Alternatives

- **Zero Maintenance Overhead**: React/Next.js frameworks introduce build tooling drift, hydration errors, and frequent breaking updates. Vanilla JS guarantees 100% stability and sub-second performance.
- **Content Flexibility**: Modifying `data/portfolio.json` or adding markdown files updates the portfolio instantly without recompilation.

---

## 2. Hardest Bug Encountered & Resolution

### Bug: Asynchronous Modal Content Hydration & Focus Trap

- **Symptom**: When opening project detail modals via search command palette or card clicks, keyboard focus remained behind the modal container, and markdown rendering sometimes threw unhandled promise rejections on slow networks.
- **Root Cause**: Modal toggle script fired before the async markdown fetch finished, leading to race conditions between DOM insertion and focus management.
- **Fix**: Refactored `js/renderer.js` to await markdown content fetch inside an explicit `async/await` wrapper, applying `aria-hidden="false"` and setting focus to `#modal-close` only after DOM hydration completed cleanly.

---

## 3. Future Roadmap ("What I Would Build Next")

1. Add native offline Service Worker caching (Progressive Web App).
2. Integrate WebAssembly (Wasm) client-side email classification model for zero-network spam detection.
