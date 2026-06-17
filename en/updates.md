# Updates | TIMEFLOW

> Full TIMEFLOW 0.1.6 changelog (build 0.1.5733) and 0.1.5 archive: macOS now available alongside Windows, LAN and Online Sync, Manual Sessions, mobile WebUI access, custom date range, hardened security, plus new features and bug fixes.

Source: https://timeflow.conceptfab.com/en/updates.html

Product updates

## TIMEFLOW 0.1.6 *— full changelog.*

The complete list of changes in **TIMEFLOW 0.1.6** (build 0.1.5733): macOS as an equal platform alongside Windows, custom date range, mobile access via WebUI, LAN and Online Sync, manual sessions and hardened security. The archived 0.1.5 release is preserved below.

[← Back to home](../index.html)

New features Improvements Bug fixes Security

Platforms

## Windows and macOS — two equal *platforms.*

TIMEFLOW is developed **in parallel on Windows and macOS** — the same functionality and native tracking on each, neither is an add-on to the other. This release brings the native macOS engine (per-app CPU via `libproc`, window titles and file-level tracking via `CGWindowList`, a localized tray menu) up to par with the Windows build.
- **[Fix]** Per-app CPU measurement on macOS now uses direct `libproc proc_pidinfo()` deltas — consistent with the Windows FILETIME path and stable across tick-to-tick comparisons.
- **[Fix]** macOS window titles (needed for file-level tracking and AI suggestions) read via `CGWindowList` — previously returned an empty string.
- **[Fix]** Idle background attribution uses the same `effective_elapsed.max(1s)` cap as the foreground path, so minutes of idle time no longer get credited to background apps.
- **[Fix]** Tracker now uses `SystemTime::now()` (UTC epoch) instead of `Local::now()` to detect sleep gaps — no more phantom `save_daily` runs across DST transitions.
- **[Fix]** Online-sync worker stores its `JoinHandle` and is joined cleanly before respawn or restart — no more thread leaks.
- **[Fix]** Tombstone `sync_key` uses `exe_name|start_time` (migrated via `m21`), so deletes don't jump across machines.
- **[Security]** LAN `/lan/local-identity` no longer returns the pairing secret — it's only handed out by `/lan/pair` after the pairing code is accepted, with a 10-attempt-per-60 s per-IP throttle.

Version 0.1.6 · by module

## Full change list grouped by *module.*

Scope: custom date range, mobile WebUI access, security, Dashboard, Sessions, Projects, Reports, Applications, AI & Model, Settings, Daemon, Data, Estimates, Analysis, Help, LAN Sync and Online Sync.

### Custom Date Range

A new date picker lets you analyze any period — not just the predefined day/week/month presets.
- **[New]** Shared date-range component (Custom Range) across Dashboard, Estimates and Time Analysis.
- **[Improvement]** Once a custom range is selected, metrics, charts and valuations recompute for exactly the chosen days.
- **[Improvement]** Previous/next arrows hide when the range is not cyclic — fewer confusing controls.

New

### WebUI — the whole dashboard in a browser

Headless mode serves the entire TIMEFLOW interface in a browser — the same dashboard from your phone or another device on the local network, without opening the app window.
- **[New]** WebUI serves practically the whole dashboard in a browser (headless mode): you browse and edit data just like on the desktop — from your phone or another device on the local network.
- **[New]** The daemon runs as a background server; start the WebUI from the tray menu after enabling "Web Server" in Settings (default port 47892).
- **[New]** Localhost (`127.0.0.1`) signs in automatically — no password; devices on the local network need a 6-digit pairing code from the Web Server settings tab.
- **[New]** Responsive mobile layout (top menu, scrollable controls) — data tables stay readable on a phone.
- **[Improvement]** Settings (rounding, currency, working hours, language) are shared between the desktop app and the WebUI.
- **[Security]** The connection uses unencrypted HTTP — use it only on a trusted local network.

New

### LAN Sync — Pairing & Parity

Safer and more predictable device linking on the local network.
- **[New]** Device pairing wizard: a one-time, expiring code plus the ability to unpair.
- **[Security]** Synchronization is blocked between different TIMEFLOW versions (version gating) — protects against inconsistent data merges.
- **[Security]** Local data cleanup never deletes records received from the other device.
- **[Fix]** macOS: sync options in the tray menu are hidden when sync is unavailable (instead of confusing, inactive entries).
- **[Fix]** More reliable daemon status detection on macOS and Windows.

Mixed

### Security & Privacy

An internal security review hardened the app's defenses without changing your workflow.
- **[Security]** Sync-trigger endpoints are reachable only locally (loopback) — they can't be called from the network.
- **[Security]** The local interface (`127.0.0.1`) works without a code; a pairing code is required only when accessing from another device on the LAN.
- **[Security]** Prototype pollution protection re-enabled.
- **[Security]** The `.env` file is loaded only from the app data directory (no more walking up parent directories).
- **[Security]** The WebUI server rejects paths containing `..` (path-traversal protection).

Security

### Daemon, Autostart & Time Measurement

More accurate background activity measurement and a more reliable service start.
- **[Improvement]** CPU time is counted as activity only when you're actually at the computer — rendering or computations while you're away no longer inflate stats.
- **[Improvement]** Windows: daemon autostart now uses a registry entry instead of a `.lnk` shortcut — eliminates OneDrive (Known Folder Move) issues and silent startup failures.

Improvements

### Stability & Performance

Smaller app files and a more polished interface.
- **[Improvement]** Smaller binaries after stripping debug symbols from the release build.
- **[Improvement]** Refined typography and more consistent data layout in tables and views.
- **[Improvement]** Optimized database operations (backup/VACUUM) for greater consistency.

Improvements

### Project Manager (PM)

A full project-management module alongside automatic tracking — budgets, deadlines, statuses and on-disk folder structure.
- **[New]** Dedicated "PM" tab with a project list and a clients panel.
- **[New]** Create projects with auto-numbering (per year), budget, deadline and status (Active / Inactive / Archived).
- **[New]** On-disk folder tree built from templates; template manager (create, edit, delete, `{name}` placeholder).
- **[New]** TF Match — link a PM project to a tracked TIMEFLOW project: budget and deadline next to actual measured time.
- **[New]** Filters (year, client, status), sorting, search, a saved view, and a project folder-size indicator.

New

### Clients

A new view aggregating time and estimated value per client, with client-list management.
- **[New]** Client cards: color, total value, project count and tracked time; click opens the client page.
- **[New]** Manage the client list (add, edit, archive) and assign clients to projects.
- **[New]** Auto-build the client list from project names with one click.
- **[New]** Client filter in Estimates (multi-select) — choose whose projects count toward the metrics and the report.
- **[New]** Clients with no activity collapse under a toggle; amounts use the currency from Settings.

New

### Time-computation method choice

You choose the time-computation method in Settings, and the architecture is ready for more algorithms in the future.
- **[New]** "Time algorithm" tab in Settings — pick how time is computed (today: the Fair Time Algorithm, i.e. wall-clock with multitasking deduplication).
- **[New]** Pluggable architecture (strategy + registry) — adding another method in the future needs no UI changes.
- **[Improvement]** Switching the method recomputes from the raw sessions — nothing is overwritten, your source data stays intact.
- **[Improvement]** The chosen method applies consistently across Dashboard, project cards, Estimates and reports.

Mixed

### Time rounding

Configurable time rounding in reports and estimates — without touching your source data.
- **[New]** "Rounding" tab in Settings: enable/disable plus interval (1, 5, 6, 10, 15, 30 or 60 min, rounded up).
- **[New]** Three variants: round the total, each session separately, or to full hours per day.
- **[New]** "Full / Rounded" toggle in reports (print/PDF too); rounded time scales the value in Estimates proportionally.
- **[Improvement]** Rounding is a presentation layer only — the raw time in the database stays untouched.

Mixed

Version 0.1.6 · views and pipeline

## Dashboard, sessions, projects, reports and *applications.*

Everyday views got faster loading, safer operations and better handling of large lists.

### Dashboard

Faster view loading and a new full-screen mode for reports.
- **[New]** `ReportView` mode without sidebar and topbar (clean screen for print/PDF).
- **[Improvement]** One loading pipeline for stats, projects and timeline instead of several separate runs.
- **[Improvement]** `custom` range support with logical hiding of previous/next arrows when the range is not cyclic.
- **[Fix]** The "All Projects" chart skips 0s records and invalid time values.

Mixed

### Sessions

Major expansion of session-list workflows and the full split pipeline.
- **[New]** Project list modes for manual assignment: Active A-Z, Newest → Top → Rest, Top → Newest → Rest.
- **[Improvement]** Smart context-menu positioning (keeps menus inside the viewport).
- **[Improvement]** `Score Breakdown` cache and prefetch with timeout for large lists.
- **[Fix]** Guard against re-splitting already split sessions (`split_source_session_id`).
- **[Fix]** Session split is now transactional: preserves total duration, correctly splits `file_activities` and stores AI feedback.

Mixed

### Projects

More accurate project metrics and safer administrative operations.
- **[Improvement]** `Project Extra Info` now computes in the real date range (faster and without all-time CTE overhead).
- **[Fix]** "Exclude" and "Delete project" now perform reference cleanup and commit within a single transaction.
- **[Improvement]** Better deduplication of project candidate names from file hints.

Mixed

### Reports

Faster report generation and full localization for the template editor.
- **[Improvement]** Report backend now loads projects, extra info, estimates and sessions in parallel.
- **[Improvement]** Template editor and section preview are connected to i18n keys (PL/EN), with no hardcoded labels.
- **[Fix/Improvement]** Safer template save/duplicate flow (localized copy suffix, fewer state side effects).

Mixed

### Applications

Better handling of very large app lists and more stable actions.
- **[New]** "Show more" pagination (batches of 100 rows) for the applications table.
- **[Improvement]** Sorting and searching reset list viewport for better control of results.
- **[Fix]** Explicit error handling for color change, rename and delete actions.

Mixed

Version 0.1.6 · AI, settings and data

## AI model, daemon, settings, data and *finances.*

The largest model iteration, rebuilt settings, and the data, estimates and analysis modules buttoned up.

### AI & Model

Largest model iteration so far: quality metrics, training control and knowledge reset.
- **[New]** "AI Progress & Quality" panel (precision, feedback trend, auto-safe runs/rollback, data coverage).
- **[New]** `Training Horizon` 30–730 days and training blacklists (exe + folders) available from UI.
- **[New]** One-click AI knowledge reset (model + feedback history + auto-runs cleanup).
- **[Improvement]** Training now uses richer context: `file_path`, `detected_path`, `window_title`, `title_history`.

New

### Settings

Settings tab was rebuilt into clearer working sections.
- **[Improvement]** New split between General and Advanced/Algorithms for better option grouping.
- **[New]** Session Management: Merge Gap, Skip short sessions, Auto-rebuild on startup, and manual session rebuild.
- **[Improvement]** Session Split moved to advanced section (max projects, tolerance, auto-split).
- **[New]** Extended Online Sync: sync on startup, auto-sync interval, logging, and ACK/pending/reseed statuses.

Mixed

### Daemon & Tray

More reliable process control and more honest activity measurement.
- **[Improvement]** Start/Stop/Restart daemon now waits for actual process state (polling), without blind delays.
- **[Improvement]** Dashboard detection now uses process snapshots (ToolHelp), with no `tasklist` dependency.
- **[New]** Idle guard: foreground time is not counted when user is idle (>= 2 minutes).
- **[New]** Recording of `detected_path`, `activity_type` and `title_history` for better AI context.

Mixed

### Data & Import

Expanded import quality and safer database operations.
- **[New]** Import now stores extended activity fields: `window_title`, `detected_path`, `title_history`, `activity_type`.
- **[Improvement]** Overlapping-session validation in archive now runs in one SQL pass (temp table join).
- **[Fix]** `clear_all_data` also clears `session_manual_overrides` and `tombstones`.
- **[Fix]** Safer `export_database` (path control + proper quoting).

Mixed

### Estimates & Analysis

Financial and analytics modules are aligned with the new key system and more stable rendering.
- **[Improvement]** Unified validations and save/error messages in both modules.
- **[Improvement]** More stable range refresh and fewer unnecessary toolbar rerenders.
- **[Fix/Improvement]** Better flow from valued boosted sessions directly to Sessions view.

Mixed

### Help

Documentation was expanded with new workflows and diagnostic scenarios.
- **[Improvement]** New Sessions, AI and ReportView flows documented (including split pipeline and print/PDF mode).
- **[Improvement]** Added Online Sync scenarios: ACK pending, server snapshot cleanup, and relation to Demo Mode.
- **[Improvement]** Added guidance for new settings: Training Horizon, blacklists, auto-split and auto-rebuild.

Improvements

Version 0.1.6 · sync and manual sessions

## LAN Sync, Online Sync and manual *sessions.*

Full peer-to-peer and online synchronization with encryption, plus manual logging of off-screen work — all integrated with reports and estimates.

### LAN Sync

Full peer-to-peer synchronization over local network — no cloud, no accounts, no servers.
- **[New]** 13-step sync protocol with automatic peer discovery via UDP broadcast.
- **[New]** Automatic master/slave role election or manual role override in settings.
- **[New]** Data transfer over HTTP within local network — data never leaves your home network.
- **[New]** SQLite database merge with hash-based conflict resolution and tombstone tracking.
- **[New]** Configurable sync interval (manual, every 4h, 8h, 12h, 24h or 48h) and peer discovery duration.
- **[New]** Automatic database backup before every synchronization.

New

### Online Sync

Coordinated internet synchronization with full encryption — data goes to dedicated storage, not TIMEFLOW servers.
- **[New]** Coordination server manages sync order (sessions, heartbeat, step reporting) — it sees only metadata, never content.
- **[New]** SFTP transfer with AES-256-GCM encryption and one-time credentials per sync session.
- **[New]** Delta sync — only changed tables are sent, based on per-table hashes (projects, apps, sessions, tombstones).
- **[New]** Auto-sync on app startup or at configurable intervals.
- **[New]** Real-time transfer progress tracking (13 steps: discovery → negotiation → transfer → merge → distribution).
- **[New]** Bearer token authentication with server URL and API key configuration in settings.

New

### Manual Sessions

Log off-screen work — meetings, phone calls and other offline activities with full report integration.
- **[New]** Three manual session types: meeting, phone call, other — with a dedicated database table.
- **[New]** Flexible date ranges (multi-day sessions) with project and app assignment.
- **[New]** Manual sessions count toward project statistics, estimates and reports alongside automatic sessions.
- **[New]** Tombstone support for manual sessions — full compatibility with LAN and Online sync.

New

This is the complete list of changes for **TIMEFLOW 0.1.6** (build 0.1.5733) — including custom date range, mobile WebUI access, hardened security, and the LAN Sync, Online Sync, and Manual Sessions modules. The archived 0.1.5 section is preserved below.

[Join beta tests →](../index.html#beta) [Back to home →](../index.html)

Archive · Version 0.1.5

## Version 0.1.5 — full changelog *(archive).*

Below is the complete archived change list for **TIMEFLOW 0.1.5**. Covered modules: Dashboard, Sessions, Projects, Estimates, Analysis, Applications, AI & Model, Settings, Data and Help.

New features Improvements Bug fixes

### Dashboard

Better real-time visibility into system health and key workflow alerts.
- **[New]** Real-time service monitoring for Daemon, Sync and AI states without window refresh.
- **[Improvement]** Refreshed version indicator with engine mismatch detection and reload requirement handling.
- **[New]** BugHunter widget for quick beta bug verification and reporting actions.
- **[New]** Dynamic TopBar orphan-session counters with red visual alerts for unassigned time.

Mixed

### Sessions

Major list performance upgrade and more transparent AI assignment quality controls.
- **[Improvement]** New virtualized rendering engine for long session ranges and very large datasets.
- **[New]** Expanded AI Score UI with confidence breakdown bars and per-candidate assignment chances.
- **[New]** Reinforcement feedback controls (Thumbs Up / Thumbs Down) to train assignment quality.
- **[Improvement]** Better split-session handling for work evidence spanning multiple projects.
- **[Fix]** Correct Polish date/time formatting in session views (e.g. day-month order).

Mixed

### Projects

Clearer project-level metrics and faster navigation in larger client structures.
- **[New]** Refreshed project card with session counter and AI status.
- **[New]** Boosted Sessions counter on project cards, aligned with Estimates views.
- **[New]** Project color editing via dedicated palette (`color` property) for stronger visual mapping.
- **[Improvement]** Faster project search by name with better query path and load-more pagination.
- **[Improvement]** More robust client structure detection and rate summary consistency.

Mixed

### Estimates

Higher trust in valuation outputs and smoother loading interactions.
- **[Fix]** Backend re-fetch no longer freezes tables during date sorting changes.
- **[Fix]** Boosted Estimates now include only real, existing sessions (no stale DB points).
- **[Improvement]** Better global rates and multi-currency (PLN/USD/EUR) parsing through improved `currency` handling.

Mixed

### Time Analysis

Faster aggregation and smoother chart interaction in long-range views.
- **[Improvement]** Memoized daily/weekly/monthly totals (Zustand + React useMemo) with lower compute overhead.

Improvements

### Applications

Stable statistics behavior during language switching and translation fallback handling.
- **[Fix/Improvement]** Integrated i18n flow with no empty keys and no inline-code translation fallback.

Mixed

### AI & Model

More predictable AI behavior and better signals for retraining readiness.
- **[New]** New Data pulse indicators when enough user feedback is collected for weight refresh.
- **[Fix]** Hard reassignment rules so manually re-mapped sessions do not snap back to old AI choices.
- **[Improvement]** Refined `min_confidence` safety thresholds and clearer auto-assignment behavior.

Mixed

### Settings

More control over UX performance and stronger customization options.
- **[New]** Chart animation switch for lower-end machines (Recharts animation control).
- **[Improvement]** Custom UI Alerts (toasts and decision dialogs) replacing raw `alert()` / `confirm()` usage.

Mixed

### Data

Safer backup/sync communication and less disruptive maintenance flow.
- **[Improvement]** Quieter backup scheduling, dedicated hard Sync refresh button, and clearer encrypted token-backup status messaging.

Improvements

### Help

Documentation now mirrors real AI logic and language consistency expectations.
- **[Improvement]** Updated AI & Model docs: auto-safe criteria, minimum confidence threshold and manual-flag behavior.
- **[Improvement]** Full language consistency across new entries and localized Quick Start / Help content architecture.

Improvements

This is the archived change list for **TIMEFLOW 0.1.5**. The newest 0.1.6 section is available above.

[Join beta tests →](../index.html#beta) [Back to home →](../index.html)
