#!/usr/bin/env bash
# setup-copilot.sh — Install GitHub Copilot + Copilot Chat extensions in VS Code
# Usage: bash scripts/setup-copilot.sh

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "=================================================="
echo "  GitHub Copilot Chat — VS Code Setup"
echo "=================================================="
echo ""

# ── 1. Check that the 'code' CLI is available ───────────────────────────────
if ! command -v code &>/dev/null; then
  echo -e "${RED}ERROR: 'code' command not found.${NC}"
  echo ""
  echo "To install the VS Code CLI, open VS Code and run:"
  echo "  Command Palette (Ctrl+Shift+P / Cmd+Shift+P)"
  echo "  → Shell Command: Install 'code' command in PATH"
  echo ""
  echo "Then re-run this script."
  exit 1
fi

echo -e "${GREEN}[OK] VS Code CLI found: $(command -v code)${NC}"
echo ""

# ── 2. Install extensions ────────────────────────────────────────────────────
EXTENSIONS=(
  "GitHub.copilot"
  "GitHub.copilot-chat"
)

for ext in "${EXTENSIONS[@]}"; do
  echo "Installing extension: ${ext} ..."
  code --install-extension "${ext}" --force
  echo -e "${GREEN}[OK] ${ext} installed${NC}"
  echo ""
done

# ── 3. Post-install instructions ─────────────────────────────────────────────
echo "=================================================="
echo -e "${GREEN}  Extensions installed successfully!${NC}"
echo "=================================================="
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "  1. Reload VS Code (or run: code --reuse-window .)"
echo "     Command Palette → Developer: Reload Window"
echo ""
echo "  2. Sign in to GitHub when prompted:"
echo "     • A 'Sign in to use GitHub Copilot' banner appears in the status bar"
echo "     • Or: Accounts icon (bottom-left) → Sign in with GitHub"
echo ""
echo "  3. Open Copilot Chat:"
echo "     • Keyboard:  Ctrl+Alt+I  (Windows/Linux)  |  Cmd+Ctrl+I  (macOS)"
echo "     • Activity Bar: click the speech-bubble icon in the left sidebar"
echo "     • Command Palette → GitHub Copilot Chat: Open Chat"
echo ""
echo "  NOTE: A GitHub Copilot subscription is required."
echo "        Start a free trial at https://github.com/features/copilot"
echo ""
