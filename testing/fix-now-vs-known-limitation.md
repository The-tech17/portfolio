# QA Bug Triage: Fix-Now vs Known Limitation

## Fix-Now Items (Resolved Prior to Submission)

1. **Accessibility Attributes**: Added missing `aria-selected` and `aria-controls` to navigation tabs in `index.html`.
2. **Missing Meta Description**: Added meta description and OpenGraph tags to head of `index.html`.
3. **Modal Esc Listener**: Bound ESC key event to close project detail modal and command palette.

---

## Known Limitations (Documented Post-Capstone Roadmap)

1. **Offline PWA Support**: Portfolio does not currently register a Service Worker for offline PWA caching.
2. **Dynamic Serverless Contact Backend**: Contact form currently logs payloads client-side or routes via Formspree API without a dedicated custom serverless database.
