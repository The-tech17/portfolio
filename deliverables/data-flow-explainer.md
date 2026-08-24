# Data Flow Diagram & Step Explainer

```
[User Input: Form / Search] 
          │
          ▼
  [js/app.js / palette.js]  ───(Validation Check)───► [Invalid Input Error Toast]
          │
          ▼ (Valid Payload)
  [Local State / Dynamic Fetch API]
          │
          ▼
  [DOM Re-render: Filtered Cards / Success Banner]
```

---

## Data Flow Steps

1. **Event Capture**: Keyboard events (`keydown`, `input`) or Form Submit button clicks trigger listener callbacks.
2. **State Mutation**: The internal query filter state updates in real time.
3. **View Synchronization**: The DOM renderer updates matching element nodes without triggering full page reloads.
