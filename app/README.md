# Project Plan: yt-dlp GUI Desktop Application

_devlopment guidance for **Highway 2 Hell**!_

---

## 🎯 Goals & Scope

- **Primary Objective**: Build a cross-platform desktop GUI for `yt-dlp` using Tauri + React.
- **Platforms**:

  - Windows (primary) via NSIS installer
  - macOS via DMG
  - Linux via AppImage (optional .deb/.rpm later)

- **Key Features**:

  1. Single-video & playlist downloads with per-item selection
  2. Download queue with configurable concurrency (default 5)
  3. Pause/resume, retry/abort on failure
  4. Simple & advanced format selector
  5. Progress tracking & unlimited history/logs (local storage)
  6. File naming templates with tokens (incl. resolution)
  7. Optional background updates for GUI & `yt-dlp` binary
  8. Localization with i18next (multi-language support)

---

## 🧩 Architecture Overview

### 1. Tauri Backend (Rust)

- **Process Management**: Spawn `yt-dlp` child processes, track state
- **Queue Logic**:

  - In-memory queue with states: queued, downloading, paused, failed, complete
  - Concurrency limiter (user setting)
  - On failure: mark as failed, wait for user retry/abort

- **Storage**:

  - History/logs in local SQLite (rusqlite) or flat JSON

- **Auto-Update**:

  - GUI updates via `tauri-plugin-auto-updater` pointing at GitHub/GitLab releases
  - `yt-dlp` updates: bundled binary + background check (toggleable: auto/manual update)

### 2. React Frontend

- **Application Structure**: Single-page React app scaffolded with Vite.
- **UI Library**: Material UI.
- **Pages/Components**:

  - **Download**: URL input → metadata fetch → item selection
  - **Queue**: List view with progress bars & controls (pause/resume, retry, abort)
  - **Settings**:

    - Concurrency control
    - Toggle GUI auto-update
    - Toggle `yt-dlp` background update
    - Filename template editor with tokens: `{uploader}`, `{playlist}`, `{upload_date}`, `{title}`, `{resolution}`, `{ext}`
    - Language selector

  - **History**: Scrollable log, clear/delete entries

- **State Management**: **Zustand** for a lightweight, scalable store handling queue state, settings, and history.
- **Routing**: **TanStack Router** to manage nested routes and layouts between Download, Queue, Settings, and History pages.
- **Localization**: **i18next** with React bindings for multi-language support

---

## 📦 Packaging & Distribution

| Platform | Format         | Tooling                                 |
| -------: | -------------- | --------------------------------------- |
|  Windows | NSIS installer | Tauri NSIS bundler                      |
|    macOS | DMG            | Tauri DMG bundler                       |
|    Linux | AppImage       | Tauri AppImage bundler; later .deb/.rpm |

---

## ⚙️ Update Strategy

1. **GUI**: `tauri-plugin-auto-updater` → GitHub/GitLab releases
2. **yt-dlp**: Bundled at build → “Check for yt-dlp update” background task (toggle in Settings)

---

## 🛠️ Tech Stack & Tooling

- **Frontend**: React + Vite + Material UI + Zustand + TanStack Router + i18next
- **Backend**: Tauri (Rust) + rusqlite for logs
- **CI/CD**: GitHub Actions for build & release
- **Linting/Formatting**: ESLint (React), Prettier, `cargo fmt` / `clippy` for Rust

\---Last updated: June 13, 2025\_
