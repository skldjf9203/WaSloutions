# setup-copilot.ps1 — Install GitHub Copilot + Copilot Chat extensions in VS Code
# Usage (from repo root):  .\scripts\setup-copilot.ps1
# On first run you may need:  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

$ErrorActionPreference = 'Stop'

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  GitHub Copilot Chat — VS Code Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Check that the 'code' CLI is available ───────────────────────────────
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: 'code' command not found." -ForegroundColor Red
    Write-Host ""
    Write-Host "To install the VS Code CLI, open VS Code and run:"
    Write-Host "  Command Palette (Ctrl+Shift+P)"
    Write-Host "  -> Shell Command: Install 'code' command in PATH"
    Write-Host ""
    Write-Host "Then re-run this script."
    exit 1
}

Write-Host "VS Code CLI found: $((Get-Command code).Source)" -ForegroundColor Green
Write-Host ""

# ── 2. Install extensions ────────────────────────────────────────────────────
$extensions = @(
    "GitHub.copilot",
    "GitHub.copilot-chat"
)

foreach ($ext in $extensions) {
    Write-Host "Installing extension: $ext ..."
    code --install-extension $ext --force
    Write-Host "$ext installed" -ForegroundColor Green
    Write-Host ""
}

# ── 3. Post-install instructions ─────────────────────────────────────────────
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Extensions installed successfully!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. Reload VS Code:"
Write-Host "     Command Palette -> Developer: Reload Window"
Write-Host ""
Write-Host "  2. Sign in to GitHub when prompted:"
Write-Host "     - Status bar banner: 'Sign in to use GitHub Copilot'"
Write-Host "     - Or: Accounts icon (bottom-left) -> Sign in with GitHub"
Write-Host ""
Write-Host "  3. Open Copilot Chat:"
Write-Host "     - Keyboard:       Ctrl+Alt+I"
Write-Host "     - Activity Bar:   click the speech-bubble icon"
Write-Host "     - Command Palette: GitHub Copilot Chat: Open Chat"
Write-Host ""
Write-Host "  NOTE: A GitHub Copilot subscription is required." -ForegroundColor Yellow
Write-Host "        Start a free trial at https://github.com/features/copilot"
Write-Host ""
