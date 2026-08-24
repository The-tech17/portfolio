# Portfolio Stack Options Analysis

## Option 1: Simplest Stack (Static HTML + CSS + JS)

- **Architecture**: Single `index.html` file, vanilla JavaScript modules, static CSS styling.
- **Free Hosting**: GitHub Pages, Vercel, Netlify.
- **Backend Requirement**: None (Static host + client-side fetch / Formspree for forms).
- **Maintenance Burden**: Near zero. No node_modules drift or build breakages.
- **Trade-offs**: Manual HTML duplication if not using client-side dynamic JSON rendering.

---

## Option 2: Balanced Stack (Vanilla JS + JSON Data Renderer + Tailwind CDN) — [RECOMMENDED]

- **Architecture**: Single-page architecture powered by modular Vanilla JS (`renderer.js`, `tabs.js`, `dataLoader.js`) reading structured data from `data/portfolio.json`.
- **Free Hosting**: GitHub Pages / Vercel / Netlify.
- **Backend Requirement**: None. LocalStorage / Web APIs for dynamic state.
- **Maintenance Burden**: Extremely low. Simply edit `portfolio.json` or markdown files to add new projects.
- **Trade-offs**: Client-side rendering relies on JavaScript enabled in browser.

---

## Option 3: Most Powerful Stack (Next.js 14 + Tailwind CSS + Vercel Serverless)

- **Architecture**: React Server Components, App Router, TypeScript, Tailwind CSS, SSR.
- **Free Hosting**: Vercel Free Tier.
- **Backend Requirement**: Vercel Serverless API routes for contact forms and analytics.
- **Maintenance Burden**: High (regular npm updates, breaking Next.js API shifts, build step overhead).
- **Trade-offs**: Over-engineered for a personal portfolio; high setup overhead during internship time limits.
