# Help | TIMEFLOW

> TIMEFLOW Help Center: quick start, dashboard, sessions, projects, AI, data, daemon and settings.

Source: https://timeflow.conceptfab.com/en/help.html

Help

## TIMEFLOW *Help Center.*

**TIMEFLOW** is a desktop time tracker that runs in the background and stays out of your way. Instead of logging hours manually, you get automatic tracking of windows, processes, and files — the app figures out which project your time belongs to. Below you'll find a guide to every section: quick start, dashboard, sessions, projects, estimates, applications, time analysis, AI, data, daemon, and settings.

[← Back to home](../index.html)

Concept / creation / execution: CONCEPTFAB All rights reserved

About the software

## Automatic tracking, local *AI and privacy.*

**TIMEFLOW** is a desktop time tracker that runs in the background and stays out of your way. Instead of logging hours manually, you get automatic tracking of windows, processes, and files — the app figures out which project your time belongs to.

### Automatic tracking

The TIMEFLOW Daemon watches which apps and files you're working in — hands-free, no clicking needed.

Tracking

### Intelligent categorization

A local ML engine learns your habits — everything stays on your machine, nothing goes to the cloud.

AI

### Financial analysis

See what your work is actually worth — rates, multipliers, and valuations in one place.

Finance

### Privacy & locality

Your data is your data. Everything lives in a local SQLite database — nobody else has access.

Privacy

Launch the Quick Start tutorial →

Section guide

## Quick Start, Dashboard, Sessions and *Projects.*

From first launch to everyday work with session lists and project structure.

### Quick Start

Quick TIMEFLOW setup — from install to first launch. The tutorial walks you through the entire setup step by step.

**Key functionalities:**
- Step-by-step guidance from .exe preparation to Daemon launch.
- Project folder and application process tracking setup.
- First assignment workflow and local AI onboarding.
- Available from the sidebar rocket icon and Help screen.
- Automatically clears first-run hint after tutorial completion.

Start

### Dashboard

What's happening now — metrics, activity, and key numbers at a glance.

**Key functionalities:**
- Integrated metrics cards: tracked time, apps, active projects.
- Interactive timeline with hourly/day view depending on range.
- Top projects and most-used applications overview.
- Fast range switch: today, week, month, all time.
- Timeline mode for real-time engagement visibility.
- Auto-import status and data-read error notifications.
- Refresh button syncing directly from running Daemon.

View

### Sessions

All recorded work blocks — with filters, assignments, and AI insights.

**AI Data interpretation.** The AI Data view shows why the model picked a project — where the confidence comes from and what it's based on.
- **Confidence:** how sure the model is about its pick.
- **Evidence Count:** how many similar sessions you've approved before.
- **Score & Base Log Prob:** raw numbers from the ML engine — under-the-hood diagnostics.
- **Matched Tokens & Context:** keywords and signals the model relied on.
- **Penalty:** negative signals — the model hit something ambiguous.

**Key functionalities:**
- Add comments and notes via session context menu.
- Rate multipliers (x2/custom) for high-value work blocks.
- AI suggestions review and approval/rejection workflow.
- Manual session adding for meetings/calls/offline work.
- Batch Assign for multiple sessions in one action.
- Detailed, Compact and AI Data view modes.
- Sorting/filtering by app, project, date, duration.

Mixed

### Projects

Your projects, folders, and auto-detection of new candidates from activity.

**Key functionalities:**
- Freeze inactive projects to declutter assignment workflows.
- Auto-freezing after configurable inactivity period.
- Unfreeze projects back to active state instantly.
- Folder sync auto-detects new project candidates.
- Candidate detection based on observed folder activity.
- Root folder management for monitored disk locations.
- Exclude projects from view without permanent deletion.
- Real-time filtering by project name/path.
- Project color editing (presets + custom color).

Organization

Section guide

## Estimates, Applications and time *analysis.*

The value of your work, the list of monitored processes, and visualizations of trends and intensity.

### Estimates

Rates, multipliers, and valuations — see how much you're earning per project and period.

**Key functionalities:**
- Global and project-specific hourly rate definitions.
- Session multipliers included in final project valuation.
- Manual sessions contribute to project budget totals.
- Profitability analysis across month/year periods.
- Daily and weekly earnings visual breakdown.
- Cross-project value comparison by work type.

Finance

### Applications

What TIMEFLOW sees on your machine — process list, aliases, and tracking blocks.

**Key functionalities:**
- Full list of tracked applications with time statistics.
- Application aliases for human-readable naming.
- Tracking block for apps you do not want to monitor.
- Archive app data without removing app definition.
- Direct app-to-project assignment mapping.

Processes

### Time Analysis

Heatmaps, charts, and trends — when you work hardest and on what.

**Key functionalities:**
- Hourly and daily activity heatmaps.
- Monthly view with week numbering.
- Intensity analysis for peak productivity windows.
- Stacked bars showing project share over total time.
- Detailed project timeline view.

Visualizations

Section guide

## AI & Model, Data, Daemon and *Settings.*

The local ML engine, database operations, the background process, and the app's full configuration.

### AI & Model

Local Rust ML engine — reads app context, time of day, and file names. 100% offline, no external APIs. A classification model written in Rust. No external APIs — all computation and data stay on your disk.

**1. What does it learn from?**
- **App context:** which apps you assign to which projects.
- **Time context:** what time and day of week you work.
- **Name tokens:** keywords pulled from file and window names.

**2. How does it decide?**
- **Confidence:** certainty from 0 to 1 (sigmoid).
- **Evidence Count:** how many past approvals back the prediction.
- **Margin:** gap between the top pick and the runner-up.

**3. Operating modes**
- **Suggest:** proposes assignments for user approval.
- **Auto-Safe:** automates only high-certainty cases.

**4. Recommended starting settings**
- **Mode: suggest** — learns fastest from your corrections.
- **Suggest Min Confidence: 0.4–0.5** — more suggestions = faster learning (raise the bar later).
- **Feedback Weight: 10–15** — picks up quickly without going off the rails.
- **Auto-safe Confidence: 0.85–0.95**, **Min Evidence: 5** — safe automation.

*Model data lives in SQLite on disk — with every correction you make, it gets smarter and more accurate.*

**Key functionalities:**
- Auto-Safe batch assignment mode.
- Rollback of last automatic assignment batch.
- Confidence policy threshold management.
- Learning Center powered by user corrections.
- Training readiness notifications.
- Modes: Off, Suggest, Auto-Safe.
- 100% local privacy-first ML pipeline.

AI

### Data

Import, export, and housekeeping — backup, cleanup, optimization.

**Key functionalities:**
- ZIP export of full database or selected projects.
- JSON import of daemon-generated daily reports.
- Maintenance tools for cleanup and size optimization.
- Operation history for data changes.
- Backup and SQLite maintenance toolkit.

Database

### Daemon

Start, stop, logs, and status of the background process that collects activity data.

**Key functionalities:**
- Status diagnostics and health visibility.
- Service start/stop/restart from dashboard.
- Windows autostart integration.
- Real-time logs for troubleshooting.
- Daemon/dashboard version compatibility insight.

Process

### Settings

Working hours, gap fill, sync, demo mode, DB optimization, and the rest of the config.

**Key functionalities:**
- Working Hours affecting timeline visuals.
- Session Management (gap fill and short-block ignore).
- Freeze threshold configuration for project lifecycle.
- Online sync setup (URL, user ID, token).
- Demo mode for safe testing.
- Auto optimize DB scheduler and manual run.
- Emergency clear for full reset.
- Animation/performance tuning.

Configuration

Tutorial

## Quick *Start.*

A quick plan — from launching the app to your first assignments and AI training.

### Step 1 — File preparation

Drop **timeflow-dashboard.exe** and **timeflow-demon.exe** into one folder and launch the dashboard.

Step 1

### Step 2 — Projects setup

In **Projects**, point to your parent work directory — each subfolder becomes a separate project.

Step 2

### Step 3 — Add applications

In **Applications**, add the processes you want to track (e.g. figma.exe) and give them readable aliases.

Step 3

### Step 4 — Start Daemon

In **Daemon**, fire up the process and enable autostart — tracking now runs in the background.

Step 4

### Step 5 — Assign sessions

Right-click unassigned sessions in **Dashboard** and map them to the right projects.

Step 5

### Step 6 — Train AI

A few manual assignments in **AI & Model** are enough for the model to start suggesting projects on its own.

Step 6

That's it. TIMEFLOW is running and learns your patterns with every correction.

[Join the beta tests →](../index.html#beta) [Back to home →](../index.html)
