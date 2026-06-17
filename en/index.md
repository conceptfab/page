# TIMEFLOW | Desktop time tracker for freelancers (beta)

> Desktop time tracker for freelancers. Background tracking, local AI, LAN and online sync, manual sessions, estimates and reports — your data stays on your machine. Join the beta.

Source: https://timeflow.conceptfab.com/en/

Fair Time Algorithm

# Time counted
*fairly.*

You work across several apps at once. TIMEFLOW deduplicates multitasking and splits every second fairly between projects — your real time, not inflated stats.

Figma Photoshop Blender →1 real hour · split 42 / 35 / 23
Request beta access →

Who it works best for

## Not just timing — helping you *get time back.*

Designers jump between Figma, Photoshop, browser, and chat dozens of times a day. TIMEFLOW sorts out the chaos and recovers context you'd never reconstruct yourself.

01

### Graphic / Brand Designer

Bill time across client projects without typing anything — even when you're bouncing between several apps and folders at once.

projects by folders unassigned sessions value estimations

02

### UI/UX / Product Designer

See what's eating time each week — research, mockups, iterations, or consultations — heatmap and trends ready without clicking around.

dashboard + analysis CSV export manual sessions

03

### Freelancer beyond design

TIMEFLOW works everywhere you bill time to clients — in development, editing, consulting, writing.

AI suggests assignments backup and import online sync

How it works

## From raw sessions to ready *accounting.*

Automatic tracking + manual control where needed. Accuracy without clicking all day long.

1

### Data Collection

The daemon collects data in the background; the dashboard pulls it at startup and refreshes daily sessions.
- daemon status + autostart
- auto-import at start
- file archive from import

2

### Organization and Assignments

Create projects, assign apps, accept or reject AI suggestions — manual fixes only where things need fixing.
- projects + folders + candidates
- AI suggest / auto_safe / rollback
- session merge based on set gap

3

### Analysis, Valuation and Backup

End result: a dashboard with metrics, work valuation, and tools for exporting, importing, and syncing between machines.
- heatmap + charts
- estimated value per project + session multiplier
- JSON export/import + online sync

What TIMEFLOW does right now

## Real features, *not a wish list.*

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
- custom date range alongside day/week/month
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
- custom date range on the heatmap and charts
- CSV export for external spreadsheets

Estimates

### Work value estimations for freelancers

Set a global rate, override it per project, or slap a multiplier on a specific session — work value for the selected range shows up instantly.
- global hourly rate + project overrides
- rate multiplier for selected session and manual valuations
- project profitability analysis (monthly/yearly view)
- estimated value per project + daily earnings
- valuation for any custom date range
- time rounding (5–60 min intervals, report variants)
- preview of time value spent on task groups

Data & Sync

### Data import/export, LAN and online sync

JSON export of the whole DB or a single project, import with validation and conflict preview, peer-to-peer sync on your local network, online delta sync or USB transfer — your data, your control.
- ZIP Export of the entire database or selected projects
- Maintenance: cleaning and optimizing the SQLite database
- peer-to-peer LAN sync (no cloud, no accounts) + code pairing
- WebUI: the whole dashboard in your phone's browser (local network)
- import with validation and conflict preview
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

Project Manager

### Projects with budget, deadline and folder structure

A dedicated PM module alongside automatic tracking — create projects with a budget and deadline, generate a folder tree from a template, and link them to tracked time.
- auto-numbering, status (active/inactive/archived), budget and deadline
- on-disk folder tree from templates ({name}) + template manager
- TF Match — budget and deadline next to actual measured time
- filters (year, client, status), sorting and a saved view

Clients

### Time and value per client

The clients panel aggregates time and estimated value for each client, and in Estimates you filter the report by selected clients.
- client cards: value, project count, tracked time
- manage the list (add / edit / archive) + assign to projects
- auto-build clients from project names
- client filter in Estimates (multi-select)

WebUI / phone access

### The whole dashboard in a browser

Headless mode serves the full TIMEFLOW interface in a browser — open the same dashboard from your phone or another device on the local network, without the app window.
- practically the whole dashboard from your phone (browse and edit)
- responsive mobile layout + settings shared with the desktop
- localhost with no password, LAN via a 6-digit code (port 47892)
- trusted local network only (unencrypted HTTP)

Fair Time Algorithm (Unique Project Time)

## Your real time is not *inflated stats.*

Most trackers make the same mistake — they count every open app separately, artificially inflating stats (3 hours of "work" inside one clock hour). TIMEFLOW deduplicates multitasking and shows your real time.

✕ Other trackers

1 hour of work, 3 apps open at once. Each counted separately for that same hour:

Figma · +1h

Photoshop · +1h

Blender · +1h

3h 00m

billed for 1 clock hour of work

→

✓ TIMEFLOW

42%

35%

23%

Every second of attention split proportionally. The sum never exceeds the real time.

1h 00m

real time: 1h, split 42 / 35 / 23 between projects

This is **your real data** — for estimates, invoices and your own control. What you tell the client is up to you.

### Zero "double counting"

Other trackers count multitasking separately (3h of work in 1 clock hour). TIMEFLOW deduplicates.
- Automatic multitasking deduplication
- Counts only unique minutes on a project
- The most "fair" approach on the market

Overbilling protection

### Mathematical precision of division

The Rust backend splits seconds fairly between projects when you're using multiple tools at once.
- Fair division of every second of attention
- Sum of times never exceeds real time
- Client pays for time, not for open windows

Fair distribution

### A time algorithm you choose

You pick how time is computed — today it's the Fair Time Algorithm (wall-clock with deduplication). The architecture is ready for more methods, and switching recomputes from the raw sessions without overwriting anything.
- choose the time-computation method in Settings
- pluggable architecture — ready for more algorithms
- switching the method doesn't change your data (recomputes from raw sessions)

Time method choice

### Evidence Transparency

Every second is backed by file history — if the client asks for details, you've got proof.
- Precise session and file preview
- Excludes accidental time counting
- No counting of social media outside projects

Proof of work

### Privacy and Local Credibility

Data processed locally in SQLite — no one manipulates stats "in the cloud".
- 100% local data processing
- You control access to reports

Local credibility

### Real engagement

Unique time, not app "processor" time.
- Work time is measured fairly
- No timing for open windows

Client value

### Full transparency

End the hourly rate debate — hard data speaks for itself.
- Accurate work time data
- No manipulation of statistics

Transparency

TIMEFLOW Interface

## Dashboard, projects, sessions and analytics in one *workflow.*

The main view shows the workload dashboard. Below are the key modules that build a freelancer's daily workflow: Projects, Sessions, Analysis, Estimates, and AI.

Projects · folders + statuses

Sessions · sessions + assignments

Time Analysis · charts + heatmap

Estimates · rates + multipliers + valuation

AI & Model · suggestions + model

Platforms and status

## Desktop-first today. More *tomorrow.*

The current version is a stable desktop workflow and beta tests with real users. New platforms ship only when they're done right.

### Windows

Desktop app + background process + dashboard + import and log management.
Available

### macOS

Full desktop support for Apple users — with daemon, dashboard and native activity monitoring.
Available

### Linux

Desktop tracking for users of custom environments — no compromises.
Planned

### Mobile App

A native mobile app is planned — but you can already open the whole dashboard from your phone via the WebUI (browser, local network).
Planned

Tech Stack

## Native app, not a web-app *in a window.*

Lightweight footprint and minimal requirements are by design, not accident. Rust on the backend, a separate daemon, and local SQLite — fast start and full control over files, without a heavy runtime in the background.

### Rust + Tauri 2

Lightweight desktop runtime, fast start, and native control over files and processes — without the heavy overhead you know from Electron.
- better performance for monitoring and background work
- native integration with the system, files and processes
- strong base for Windows and macOS now, more desktop platforms on the way

Core

### Local SQLite (rusqlite, bundled)

Local **SQLite** database works right after installation (`bundled`) — zero extra setup, ready workflow from the first launch.
- local-first: data and dashboard available instantly
- fast reading of sessions, projects and analytics
- backup and data import/export without complexity

Data

### React 19 + TypeScript + Vite

Dashboard developed independently of the backend — new views, analytics, and panels iterated fast.
- fast iteration of dashboard features and screens
- clear charts and analytics (Recharts)
- stable UI stack (Zustand / Radix / Tailwind)

UI

### Rust Daemon

A **Rust** daemon runs the data pipeline independently of the UI — the dashboard is your work interface, activity collection runs in the background.
- start / stop / restart control from UI
- logs and process status
- file archiving and auto-import workflow
- autostart and background monitoring with low overhead

Process

### Stability Engine

Three libraries making sure the numbers add up — correct timestamps, stable import/export, and predictable background tasks.
- Serde / serde_json: stable import/export and data contracts
- Chrono: correct date ranges, sessions and time accounting
- Tokio: timers, cyclic tasks and background operations

Stability

### Next.js sync server

A **Next.js** server coordinates sync between devices — local-first remains the foundation.
- delta sync and full synchronization between devices
- API push / pull / ack / status
- foundation for mobile and sharing features

Sync

Roadmap

## The project manager already ships — *what's next.*

The foundation and the project manager are in place: projects with budgets, clients, folders, sync, and time monitoring. Next come report attachments, file archiving, and collaboration.

Now / Beta

### Tracking, project manager and clients

TIMEFLOW supports time monitoring, folder-based projects, a project manager (PM) with budgets and clients, manual sessions, estimates, AI suggestions, import/export and LAN/online sync.
- tracking, sessions and analysis
- tracking and sessions
- project manager (budget, status, folders) + clients
- projects + folder roots
- AI suggestion / auto-safe
- export/import + LAN and online sync
- export/import + online sync

Next Version / Direction

### Report attachments and project archiving

Report generation with sessions as an invoice attachment, and project file archiving — closing the loop from time to billing.
- reports with sessions (PDF / CSV for invoices)
- project file archiving
- folder-tree presets per pipeline
- dedicated project folders
- custom folder tree (templates/presets)
- faster project setup and organization

Future Extensions

### Sharing, collaboration and new platforms

Sharing data and reports, team collaboration, and additional desktop and mobile platforms.
- more time-computation methods (pluggable architecture)
- sharing / team collaboration
- sharing / collaboration
- deeper integration of project structure with time
- deeper integration with time monitoring
- Linux and a mobile app (roadmap)

Trust and Contact

## Who is behind TIMEFLOW and what the *beta looks like.*

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

Product updates

## TIMEFLOW 0.1.6 *is live.*

The latest build adds a custom date range, mobile access via WebUI, and hardened sync security — alongside changes across Sessions, AI, Daemon and Settings. Full changelog (including archived 0.1.5) lives on a dedicated page.

New features Improvements Bug fixes

### The complete 0.1.6 changelog (with archived 0.1.5)

Complete module-by-module list with icons in the Help-style layout, plus an archived 0.1.5 section.
[Open full changelog 0.1.6 →](./updates.html)

FAQ

## Most common questions before applying for *beta.*

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

## Help build TIMEFLOW for real freelancer *workflows.*

Mainly looking for designers — but the door is open to anyone billing time to clients. Your feedback shapes the roadmap: what blocks you, what speeds things up, what's missing.

**What we care about** real use cases, project mess, client billing

**What you get** early access, real impact on the roadmap, fast iterations based on your feedback

**Product status** beta — features work, we set priorities together with testers

> "Finally I know how much I really earn on a project. I stopped guessing."— Martha, freelance UI designer
