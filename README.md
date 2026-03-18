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

## 🤖 GitHub Copilot Chat in VS Code

This repository includes VS Code workspace configuration (`.vscode/extensions.json` and `.vscode/settings.json`) to help you get **GitHub Copilot** and **GitHub Copilot Chat** running quickly.

### Prerequisites

1. A **GitHub account** with an active [Copilot subscription](https://github.com/features/copilot) (individual, team, or enterprise). A free trial is available.
2. **VS Code** version 1.82 or later ([download](https://code.visualstudio.com/)).

### Step-by-step setup

#### 1 – Install the extensions

**Option A — one-command setup (recommended)**

Open a terminal in the repo root and run the script for your OS:

```bash
# macOS / Linux
bash scripts/setup-copilot.sh
```

```powershell
# Windows (PowerShell) — allow local scripts first if needed:
# Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
.\scripts\setup-copilot.ps1
```

The script will:
- Check that the `code` CLI is on your PATH (and tell you how to add it if not)
- Install `GitHub.copilot` and `GitHub.copilot-chat` with `--force` to ensure the latest version
- Print step-by-step sign-in and activation instructions

> **`code` CLI not found?** Open VS Code → Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) → **Shell Command: Install 'code' command in PATH**, then re-run the script.

**Option B — install extensions manually**

When you open this repo in VS Code it will offer to install the recommended extensions automatically. Accept the prompt, **or** run:

```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

#### 2 – Sign in to GitHub

1. After installing, a GitHub icon appears in the VS Code **Activity Bar** (left sidebar).
2. Click **Sign in to use GitHub Copilot** in the status bar (bottom of the window), or open the **Accounts** menu (person icon, bottom-left) and choose **Sign in with GitHub**.
3. A browser window opens — authorise VS Code in your GitHub account and return to VS Code.

#### 3 – Open Copilot Chat

| Method | Action |
|---|---|
| Keyboard shortcut | `Ctrl+Alt+I` (Windows/Linux) or `Cmd+Ctrl+I` (macOS) |
| Activity Bar | Click the **Copilot Chat** icon (speech-bubble) in the left sidebar |
| Command Palette | `Ctrl+Shift+P` → type **"Open Chat"** → select **GitHub Copilot Chat: Open Chat** |

#### 4 – Verify it is working

Type a question in the Chat panel, e.g.:

```
What does app.js do?
```

Copilot Chat will respond with an explanation in the Chat panel. To verify inline suggestions are also working, open `task-manager/app.js` and start typing — Copilot will show grey-text completions as you type.

### Troubleshooting

| Symptom | Fix |
|---|---|
| "GitHub Copilot could not connect" | Check your internet connection and firewall. Copilot needs access to `*.github.com` and `*.githubcopilot.com`. |
| No Copilot icon / chat panel | Confirm both extensions (`GitHub.copilot` **and** `GitHub.copilot-chat`) are installed and **enabled** (not disabled for this workspace). |
| Signed in but no suggestions | Open the Command Palette → **GitHub Copilot: Enable** — make sure Copilot is enabled for the current language. |
| "You don't have access to GitHub Copilot" | Your GitHub account needs an active Copilot subscription or your organisation must grant you access. |
| Extension keeps asking to sign in | Sign out fully (**Accounts** menu → sign out), reload VS Code, then sign in again. |

> **Tip:** After signing in, run **Developer: Reload Window** from the Command Palette (`Ctrl+Shift+P`) if the Chat panel still does not appear.

---

*More projects coming soon.*