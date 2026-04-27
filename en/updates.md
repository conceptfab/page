# Updates | TIMEFLOW

> Full TIMEFLOW 0.1.6 changelog (build 0.1.556) and 0.1.5 archive: macOS now available alongside Windows, LAN and Online Sync, Manual Sessions, new features and bug fixes.

Source: https://timeflow.conceptfab.com/en/updates.html

# Product updates TIMEFLOW

Concept / creation / execution All rights reserved

## What's new — TIMEFLOW on macOS

**macOS** joins Windows as a fully supported platform. Daemon, dashboard and activity monitoring run natively — with native per-app CPU measurement (`libproc`), window titles and file-level tracking (`CGWindowList`), and a localized tray menu.
- **[Fix]** Per-app CPU measurement on macOS now uses direct `libproc proc_pidinfo()` deltas — consistent with the Windows FILETIME path and stable across tick-to-tick comparisons.
- **[Fix]** macOS window titles (needed for file-level tracking and AI suggestions) read via `CGWindowList` — previously returned an empty string.
- **[Fix]** Idle background attribution uses the same `effective_elapsed.max(1s)` cap as the foreground path, so minutes of idle time no longer get credited to background apps.
- **[Fix]** Tracker now uses `SystemTime::now()` (UTC epoch) instead of `Local::now()` to detect sleep gaps — no more phantom `save_daily` runs across DST transitions.
- **[Fix]** Online-sync worker stores its `JoinHandle` and is joined cleanly before respawn or restart — no more thread leaks.
- **[Fix]** Tombstone `sync_key` uses `exe_name|start_time` (migrated via `m21`), so deletes don't jump across machines.
- **[Security]** LAN `/lan/local-identity` no longer returns the pairing secret — it's only handed out by `/lan/pair` after the pairing code is accepted, with a 10-attempt-per-60s per-IP throttle.

## Version 0.1.6 — full changelog

This document contains the complete list of changes in **TIMEFLOW 0.1.6** (build 0.1.556). Scope: Dashboard, Sessions, Projects, Reports, Applications, AI & Model, Settings, Daemon, Data, Estimates, Analysis, Help, LAN Sync and Online Sync.

New features Improvements Bug fixes

### Dashboard

Faster view loading and a new full-screen mode for reports.
- **[New]** `ReportView` mode without sidebar and topbar (clean screen for print/PDF).
- **[Improvement]** One loading pipeline for stats, projects and timeline instead of several separate runs.
- **[Improvement]** `custom` range support with logical hiding of previous/next arrows when the range is not cyclic.
- **[Fix]** The "All Projects" chart skips 0s records and invalid time values.

### Sessions

Major expansion of session-list workflows and the full split pipeline.
- **[New]** Project list modes for manual assignment: Active A-Z, Newest → Top → Rest, Top → Newest → Rest.
- **[Improvement]** Smart context-menu positioning (keeps menus inside the viewport).
- **[Improvement]** `Score Breakdown` cache and prefetch with timeout for large lists.
- **[Fix]** Guard against re-splitting already split sessions (`split_source_session_id`).
- **[Fix]** Session split is now transactional: preserves total duration, correctly splits `file_activities` and stores AI feedback.

### Projects

More accurate project metrics and safer administrative operations.
- **[Improvement]** `Project Extra Info` now computes in the real date range (faster and without all-time CTE overhead).
- **[Fix]** "Exclude" and "Delete project" now perform reference cleanup and commit within a single transaction.
- **[Improvement]** Better deduplication of project candidate names from file hints.

### Reports

Faster report generation and full localization for the template editor.
- **[Improvement]** Report backend now loads projects, extra info, estimates and sessions in parallel.
- **[Improvement]** Template editor and section preview are connected to i18n keys (PL/EN), with no hardcoded labels.
- **[Fix/Improvement]** Safer template save/duplicate flow (localized copy suffix, fewer state side effects).

### Applications

Better handling of very large app lists and more stable actions.
- **[New]** "Show more" pagination (batches of 100 rows) for the applications table.
- **[Improvement]** Sorting and searching reset list viewport for better control of results.
- **[Fix]** Explicit error handling for color change, rename and delete actions.

### AI & Model

Largest model iteration so far: quality metrics, training control and knowledge reset.
- **[New]** "AI Progress & Quality" panel (precision, feedback trend, auto-safe runs/rollback, data coverage).
- **[New]** `Training Horizon` 30–730 days and training blacklists (exe + folders) available from UI.
- **[New]** One-click AI knowledge reset (model + feedback history + auto-runs cleanup).
- **[Improvement]** Training now uses richer context: `file_path`, `detected_path`, `window_title`, `title_history`.

### Settings

Settings tab was rebuilt into clearer working sections.
- **[Improvement]** New split between General and Advanced/Algorithms for better option grouping.
- **[New]** Session Management: Merge Gap, Skip short sessions, Auto-rebuild on startup, and manual session rebuild.
- **[Improvement]** Session Split moved to advanced section (max projects, tolerance, auto-split).
- **[New]** Extended Online Sync: sync on startup, auto-sync interval, logging, and ACK/pending/reseed statuses.

### Daemon & Tray

More reliable process control and more honest activity measurement.
- **[Improvement]** Start/Stop/Restart daemon now waits for actual process state (polling), without blind delays.
- **[Improvement]** Dashboard detection now uses process snapshots (ToolHelp), with no `tasklist` dependency.
- **[New]** Idle guard: foreground time is not counted when user is idle (>= 2 minutes).
- **[New]** Recording of `detected_path`, `activity_type` and `title_history` for better AI context.

### Data & Import

Expanded import quality and safer database operations.
- **[New]** Import now stores extended activity fields: `window_title`, `detected_path`, `title_history`, `activity_type`.
- **[Improvement]** Overlapping-session validation in archive now runs in one SQL pass (temp table join).
- **[Fix]** `clear_all_data` also clears `session_manual_overrides` and `tombstones`.
- **[Fix]** Safer `export_database` (path control + proper quoting).

### Estimates & Analysis

Financial and analytics modules are aligned with the new key system and more stable rendering.
- **[Improvement]** Unified validations and save/error messages in both modules.
- **[Improvement]** More stable range refresh and fewer unnecessary toolbar rerenders.
- **[Fix/Improvement]** Better flow from valued boosted sessions directly to Sessions view.

### Help

Documentation was expanded with new workflows and diagnostic scenarios.
- **[Improvement]** New Sessions, AI and ReportView flows documented (including split pipeline and print/PDF mode).
- **[Improvement]** Added Online Sync scenarios: ACK pending, server snapshot cleanup, and relation to Demo Mode.
- **[Improvement]** Added guidance for new settings: Training Horizon, blacklists, auto-split and auto-rebuild.

### LAN Sync

Full peer-to-peer synchronization over local network — no cloud, no accounts, no servers.
- **[New]** 13-step sync protocol with automatic peer discovery via UDP broadcast.
- **[New]** Automatic master/slave role election or manual role override in settings.
- **[New]** Data transfer over HTTP within local network — data never leaves your home network.
- **[New]** SQLite database merge with hash-based conflict resolution and tombstone tracking.
- **[New]** Configurable sync interval (manual, every 4h, 8h, 12h, 24h or 48h) and peer discovery duration.
- **[New]** Automatic database backup before every synchronization.

### Online Sync

Coordinated internet synchronization with full encryption — data goes to dedicated storage, not TIMEFLOW servers.
- **[New]** Coordination server manages sync order (sessions, heartbeat, step reporting) — it sees only metadata, never content.
- **[New]** SFTP transfer with AES-256-GCM encryption and one-time credentials per sync session.
- **[New]** Delta sync — only changed tables are sent, based on per-table hashes (projects, apps, sessions, tombstones).
- **[New]** Auto-sync on app startup or at configurable intervals.
- **[New]** Real-time transfer progress tracking (13 steps: discovery → negotiation → transfer → merge → distribution).
- **[New]** Bearer token authentication with server URL and API key configuration in settings.

### Manual Sessions

Log off-screen work — meetings, phone calls and other offline activities with full report integration.
- **[New]** Three manual session types: meeting, phone call, other — with a dedicated database table.
- **[New]** Flexible date ranges (multi-day sessions) with project and app assignment.
- **[New]** Manual sessions count toward project statistics, estimates and reports alongside automatic sessions.
- **[New]** Tombstone support for manual sessions — full compatibility with LAN and Online sync.

This is the complete list of changes for **TIMEFLOW 0.1.6** (build 0.1.556) — including the new LAN Sync, Online Sync, and Manual Sessions modules. The archived 0.1.5 section is preserved below.

[Join beta tests](./index.html#beta) [Back to home](./index.html)

## Version 0.1.5 — full changelog (archive)

Below is the complete archived change list for **TIMEFLOW 0.1.5**. Covered modules: Dashboard, Sessions, Projects, Estimates, Analysis, Applications, AI & Model, Settings, Data and Help.

New features Improvements Bug fixes

### Dashboard

Better real-time visibility into system health and key workflow alerts.
- **[New]** Real-time service monitoring for Daemon, Sync and AI states without window refresh.
- **[Improvement]** Refreshed version indicator with engine mismatch detection and reload requirement handling.
- **[New]** BugHunter widget for quick beta bug verification and reporting actions.
- **[New]** Dynamic TopBar orphan-session counters with red visual alerts for unassigned time.

### Sessions

Major list performance upgrade and more transparent AI assignment quality controls.
- **[Improvement]** New virtualized rendering engine for long session ranges and very large datasets.
- **[New]** Expanded AI Score UI with confidence breakdown bars and per-candidate assignment chances.
- **[New]** Reinforcement feedback controls (Thumbs Up / Thumbs Down) to train assignment quality.
- **[Improvement]** Better split-session handling for work evidence spanning multiple projects.
- **[Fix]** Correct Polish date/time formatting in session views (e.g. day-month order).

### Projects

Clearer project-level metrics and faster navigation in larger client structures.
- **[New]** Refreshed project card with session counter and AI status.
- **[New]** Boosted Sessions counter on project cards, aligned with Estimates views.
- **[New]** Project color editing via dedicated palette (`color` property) for stronger visual mapping.
- **[Improvement]** Faster project search by name with better query path and load-more pagination.
- **[Improvement]** More robust client structure detection and rate summary consistency.

### Estimates

Higher trust in valuation outputs and smoother loading interactions.
- **[Fix]** Backend re-fetch no longer freezes tables during date sorting changes.
- **[Fix]** Boosted Estimates now include only real, existing sessions (no stale DB points).
- **[Improvement]** Better global rates and multi-currency (PLN/USD/EUR) parsing through improved `currency` handling.

### Time Analysis

Faster aggregation and smoother chart interaction in long-range views.
- **[Improvement]** Memoized daily/weekly/monthly totals (Zustand + React useMemo) with lower compute overhead.

### Applications

Stable statistics behavior during language switching and translation fallback handling.
- **[Fix/Improvement]** Integrated i18n flow with no empty keys and no inline-code translation fallback.

### AI & Model

More predictable AI behavior and better signals for retraining readiness.
- **[New]** New Data pulse indicators when enough user feedback is collected for weight refresh.
- **[Fix]** Hard reassignment rules so manually re-mapped sessions do not snap back to old AI choices.
- **[Improvement]** Refined `min_confidence` safety thresholds and clearer auto-assignment behavior.

### Settings

More control over UX performance and stronger customization options.
- **[New]** Chart animation switch for lower-end machines (Recharts animation control).
- **[Improvement]** Custom UI Alerts (toasts and decision dialogs) replacing raw `alert()` / `confirm()` usage.

### Data

Safer backup/sync communication and less disruptive maintenance flow.
- **[Improvement]** Quieter backup scheduling, dedicated hard Sync refresh button, and clearer encrypted token-backup status messaging.

### Help

Documentation now mirrors real AI logic and language consistency expectations.
- **[Improvement]** Updated AI & Model docs: auto-safe criteria, minimum confidence threshold and manual-flag behavior.
- **[Improvement]** Full language consistency across new entries and localized Quick Start / Help content architecture.

This is the archived change list for **TIMEFLOW 0.1.5**. The newest 0.1.6 section is available above.

[Join beta tests](./index.html#beta) [Back to home](./index.html)
