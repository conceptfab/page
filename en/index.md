# TIMEFLOW | Desktop time tracker for freelancers (beta)

> Desktop time tracker for freelancers. Background tracking, local AI, LAN and online sync, manual sessions, estimates and reports — your data stays on your machine. Join the beta.

Source: https://timeflow.conceptfab.com/en/

Desktop tracker for freelancers — **you focus on creating, we'll handle the time.**

# Work and see what you earn.

TIMEFLOW tracks your activity in the background with the **Fair Time Algorithm** — it deduplicates multitasking and fairly allocates seconds between projects. See the real value of your work, without inflated stats.

TIMEFLOW Interface

### Dashboard, projects, sessions and analytics in one workflow

Dashboard *main view*

The main view shows the workload dashboard. Below are the key modules that build a freelancer's daily workflow: Projects, Sessions, Analysis, Estimates, and AI.

Dashboard *main view*

Projects *folders + statuses*

Sessions *sessions + assignments*

Time Analysis *charts + heatmap*

Estimates *rates + multipliers + valuation*

AI & Model *suggestions + model*

Works best for: designers

Request beta access

App modules

10 +

Dashboard, projects, sessions, AI, analytics, estimates, background process and more

Desktop platforms (now)

2

Windows and macOS • Linux and mobile app planned

AI working modes

3

you decide how much AI gets involved — with rollbacks in case of mistakes

See what it does ↓

Beta

TIMEFLOW is in beta. We're inviting freelancers who want to shape the product; your feedback goes straight to the roadmap.

Offline

Works entirely offline. Local data storage, JSON export and USB transfer mean no connection is required.

Open source

The code will be shared. We're preparing a project manager with custom folder structures and file archiving.

Tech Stack

## Native app, not a web-app in a window.

Lightweight footprint and minimal requirements are by design, not accident. Rust on the backend, a separate daemon, and local SQLite — fast start and full control over files, without a heavy runtime in the background.

Core Desktop

### Rust + Tauri 2

Lightweight desktop runtime, fast start, and native control over files and processes — without the heavy overhead you know from Electron.
- better performance for monitoring and background work
- native integration with the system, files and processes
- strong base for Windows and macOS now, more desktop platforms on the way

Data Layer

### Local SQLite (rusqlite, bundled)

Local **SQLite** database works right after installation (`bundled`) — zero extra setup, ready workflow from the first launch.
- local-first: data and dashboard available instantly
- fast reading of sessions, projects and analytics
- backup and data import/export without complexity

UI Dashboard

### React 19 + TypeScript + Vite

Dashboard developed independently of the backend — new views, analytics, and panels iterated fast.
- fast iteration of dashboard features and screens
- clear charts and analytics (Recharts)
- stable UI stack (Zustand / Radix / Tailwind)

Daemon

### Monitoring in a separate process

A **Rust** daemon runs the data pipeline independently of the UI — the dashboard is your work interface, activity collection runs in the background.

low overhead background work separate from UI
- start / stop / restart control from UI
- logs and process status
- file archiving and auto-import workflow
- autostart and background monitoring with low overhead

Stability Engine

### Stable data, time and background tasks

Three libraries making sure the numbers add up — correct timestamps, stable import/export, and predictable background tasks.
- Serde / serde_json: stable import/export and data contracts
- Chrono: correct date ranges, sessions and time accounting
- Tokio: timers, cyclic tasks and background operations

Sync / Web

### Sync server — already running

A **Next.js** server coordinates sync between devices — local-first remains the foundation.
- delta sync and full synchronization between devices
- API push / pull / ack / status
- foundation for mobile and sharing features

What TIMEFLOW does right now

## Real features, not a wish list.

Everything below actually works in the app — auto-import, sessions, AI suggestions, online sync and daemon control. Not a wish list, but shipping software.

Tracking Core

### Time monitoring + Fair Time Algorithm

The daemon collects data in the background and mathematically deduplicates activity — multitasking doesn't inflate hours for your client.
- zero "double counting" (Unique Time)
- Fair Share principle — distributing seconds between projects
- auto refresh + file change detection
- import status and automatic archiving

Dashboard

### Day, week, month and all-time views

Metrics, top projects, top apps, timeline, and a heads-up if something is unassigned.
- metrics: total, avg daily, apps, projects
- project timeline + project day timeline
- manual sessions from the timeline level

Projects

### Projects based on folders and auto-detection

Project = folder. Auto-detection of candidates from activity and subfolder sync — no need to configure anything for each new job.
- Project Folders (roots) + browse folder
- Freezing and auto-freezing of unused tasks
- Folder Project Candidates + quick Create
- Detected Projects and Exclude (hiding projects)

Sessions

### Manual session organization without chaos

Sessions grouped by projects, daily or weekly range — with a right-click you assign, unpin or delete an entry without leaving the view.
- project filters + focus from dashboard
- right-click to assign / unpin / notes
- rate multipliers (x2 and custom)
- manual session entry (meetings, calls)
- Detailed (files) vs Compact (sessions) views

AI & Model

### AI assignment suggestions + auto_safe mode

Local ML engine in Rust reads app context, time of day, and tokens from file and window names (strongest signal). 100% offline — no external APIs, no ChatGPT.
- Learning Center: the model learns from your corrections
- modes: Suggest and Auto-Safe (automation)
- Confidence Policy: Confidence, Evidence and Margin parameters
- Training reminder after collecting new knowledge

Analysis

### Analytics and Proof of Work

Stats aren't just numbers — every second is backed by concrete file history. You've got proof of work if the client asks for details.
- precise session and file preview
- activity heatmap (hourly and daily)
- intensity analysis and peak hours
- CSV export for external spreadsheets

Estimates

### Work value estimations for freelancers

Set a global rate, override it per project, or slap a multiplier on a specific session — work value for the selected range shows up instantly.
- global hourly rate + project overrides
- rate multiplier for selected session and manual valuations
- project profitability analysis (monthly/yearly view)
- estimated value per project + daily earnings
- preview of time value spent on task groups

Data & Sync

### Data import/export and online sync

JSON export of the whole DB or a single project, import with validation and conflict preview, online delta sync or USB transfer — your data, your control.
- ZIP Export of the entire database or selected projects
- Maintenance: cleaning and optimizing the SQLite database
- validate import + summary after import
- backup/export all or single project
- startup sync + interval sync + status/ACK

Daemon & Ops

### Daemon control, logs and autostart

Start, stop, and restart the daemon straight from the app, check logs and monitor collection status. Minimal system footprint — doesn't slow down your machine during daily work.
- start / stop / restart daemon
- logs with auto-refresh and PID status
- Working Hours and Session Management (Gap Fill) configuration
- autostart + low requirements for background monitoring

Product updates

## TIMEFLOW 0.1.6 is live.

Big update across Dashboard, Sessions, Projects, AI, Settings, Daemon, and more. Full changelog (including archived 0.1.5) lives on a dedicated page.

Release highlight

New features Improvements Bug fixes

### The complete 0.1.6 changelog is on a dedicated page.

Complete module-by-module list with icons in the Help-style layout, plus an archived 0.1.5 section.
[Open full changelog 0.1.6](./updates.html)

Who it works best for

## Not just timing — helping you get time back.

Designers jump between Figma, Photoshop, browser, and chat dozens of times a day. TIMEFLOW sorts out the chaos and recovers context you'd never reconstruct yourself.

### Graphic / Brand Designer

Bill time across client projects without typing anything — even when you're bouncing between several apps and folders at once.

projects by folders unassigned sessions value estimations

### UI/UX / Product Designer

See what's eating time each week — research, mockups, iterations, or consultations — heatmap and trends ready without clicking around.

dashboard + analysis CSV export manual sessions

### Freelancer beyond design

TIMEFLOW works everywhere you bill time to clients — in development, editing, consulting, writing.

AI suggests assignments backup and import online sync

How it works

## From raw sessions to ready accounting.

Automatic tracking + manual control where needed. Accuracy without clicking all day long.

01

### Data Collection

The daemon collects data in the background; the dashboard pulls it at startup and refreshes daily sessions.
- daemon status + autostart
- auto-import at start
- file archive from import

02

### Organization and Assignments

Create projects, assign apps, accept or reject AI suggestions — manual fixes only where things need fixing.
- projects + folders + candidates
- AI suggest / auto_safe / rollback
- session merge based on set gap

03

### Analysis, Valuation and Backup

End result: a dashboard with metrics, work valuation, and tools for exporting, importing, and syncing between machines.
- heatmap + charts
- estimated value per project + session multiplier
- JSON export/import + online sync

Fair Time Algorithm (Unique Project Time)

## Your efficiency is not a cost for the client.

Most trackers make the same mistake — they count every open app separately, artificially inflating stats. TIMEFLOW deduplicates activity and splits seconds fairly between projects. Your client gets real numbers, and you get a clean conscience when invoicing.

Overbilling protection

### Zero "double counting"

Other trackers count multitasking separately (3h of work in 1 clock hour). TIMEFLOW deduplicates.
- Automatic multitasking deduplication
- Counts only unique minutes on a project
- The most "fair" approach on the market

Fair distribution

### Mathematical precision of division

The Rust backend splits seconds fairly between projects when you're using multiple tools at once.
- Fair division of every second of attention
- Sum of times never exceeds real time
- Client pays for time, not for open windows

Proof of work

### Evidence Transparency

Every second is backed by file history — if the client asks for details, you've got proof.
- Precise session and file preview
- Excludes accidental time counting
- No counting of social media outside projects

Local credibility

### Privacy and Local Credibility

Data processed locally in SQLite — no one manipulates stats "in the cloud".
- 100% local data processing
- You control access to reports

Client value

### Real engagement

Unique time, not app "processor" time.
- Work time is measured fairly
- No timing for open windows

Transparency

### Full transparency

End the hourly rate debate — hard data speaks for itself.
- Accurate work time data
- No manipulation of statistics

Platforms and status

## Desktop-first today. More tools tomorrow.

The current version is a stable desktop workflow and beta tests with real users. New platforms ship only when they're done right.

Available

### Windows

Desktop app + background process + dashboard + import and log management.

Available

### macOS

Full desktop support for Apple users — with daemon, dashboard and native activity monitoring.

Planned

### Linux

Desktop tracking for users of custom environments — no compromises.

Planned

### Mobile App

Access to data and sessions from your phone — TIMEFLOW always at hand.

Next Version Roadmap

## Project manager as the next big step.

The foundation is in place — projects, folders, candidates, sync, and time monitoring. The next version expands this into a full project management tool, from structure to archiving.

Now / Beta

### Tracking + analysis + data organization

TIMEFLOW already supports time monitoring, folder-based projects, manual sessions, estimates, AI suggestions, import/export and online sync.
- tracking and sessions
- projects + folder roots
- AI suggestion / auto-safe
- export/import + online sync

Next Version / Direction

### Project manager with custom folder tree

Dedicated project folders and a consistent directory tree tailored to each project type, client, or pipeline.
- dedicated project folders
- custom folder tree (templates/presets)
- faster project setup and organization

Future Extensions

### Archiving, sharing and deeper integration

Project file archiving, sharing, and a tighter connection between project structure and work time data.
- report generation with sessions (PDF / CSV for invoices)
- project file archiving
- sharing / collaboration
- deeper integration with time monitoring

Trust and Contact

## Who is behind TIMEFLOW and what the beta looks like.

Early version by CONCEPTFAB. The beta is here to iterate on real freelancer and small studio workflows — not to collect emails and never follow up.

### About the project

TIMEFLOW is a desktop-first time tracker for client-billed work. Priority: lightness, local data, and a fast workflow without manual time entry.
- created by CONCEPTFAB
- beta feedback directly affects the roadmap
- communication via form and email follow-up

### How beta access works

After you apply, we ask about your work context (industry, needs) and get back to you with build info and next steps. We prioritize people who actually bill time to clients.
- short form instead of long onboarding
- confirmation after sending the application
- access to the build based on order and fit

FAQ

## Most common questions before applying for beta.

Short answers to the most important issues: platforms, data, cost and test process.

How does the Fair Time Algorithm work?

Other programs typically count every open app separately (e.g., 3h of work logged inside a single clock hour). TIMEFLOW deduplicates multitasking and fairly divides seconds between projects (Fair Share). That way, statistics stay 100% fair for both you and your client.
Does TIMEFLOW work offline?

Yes. Data is stored locally on the device, and online sync is optional.
Who is prioritized in beta tests?

Mostly freelancers and small studios who bill time to clients, but the form is open to other industries as well.
On which platform does the current beta run?

The beta runs on Windows and macOS. The roadmap includes Linux and a mobile app.
Is the beta paid?

No. Current beta tests are free and serve to collect feedback for future iterations.

Apply for beta tests

## Help build TIMEFLOW for real freelancer workflows.

Mainly looking for designers — but the door is open to anyone billing time to clients. Your feedback shapes the roadmap: what blocks you, what speeds things up, what's missing.

**What we care about** real use cases, project mess, client billing

**What you get** early access, real impact on the roadmap, fast iterations based on your feedback

**Product status** beta — features work, we set priorities together with testers
