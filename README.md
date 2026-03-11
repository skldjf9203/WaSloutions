# WaSloutions

A collection of web solutions and mini-apps.

---

## 📋 Task Manager

A fully client-side task management application built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no external dependencies.

### Features

| Feature | Description |
|---|---|
| ➕ Add Tasks | Create tasks with a title and an optional description |
| ✅ Complete Tasks | Toggle tasks between complete and incomplete |
| 🗑️ Delete Tasks | Remove individual tasks from the list |
| 🔍 Filter Tasks | View **All**, **Active**, or **Completed** tasks |
| 🔢 Task Counter | Live count of remaining (incomplete) tasks |
| 🧹 Clear Completed | Remove all completed tasks at once |
| 💾 Persistence | Tasks are saved to `localStorage` and survive page refreshes |

### File Structure

```
task-manager/
├── index.html      # App markup and structure
├── style.css       # Responsive, modern UI styles
├── app.js          # All task logic and state management
└── package.json    # Project metadata and dev-server scripts
```

### Getting Started

#### Option 1 – Open directly in a browser

Just double-click `task-manager/index.html` — no server needed.

#### Option 2 – Serve locally with npm

```bash
cd task-manager
npm start          # serves on http://localhost:3000
# or
npm run dev        # live-reloading dev server on http://localhost:3000
```

> **Requirements:** Node.js ≥ 14 (only needed for the dev server; the app itself has zero runtime dependencies).

### How It Works

1. **State** is held in a plain JavaScript array (`tasks[]`).
2. Every mutation (add / toggle / delete) calls `saveTasks()` which writes the array to `localStorage`.
3. `render()` is called after every mutation and rebuilds the DOM from scratch based on the current filter.
4. The empty-state message is shown automatically when the filtered list is empty.

### Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No polyfills required.

---

*More projects coming soon.*