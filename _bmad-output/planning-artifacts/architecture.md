---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-06-15'
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-todo-app-2026-06-15/prd.md
  - _bmad-output/planning-artifacts/prds/prd-todo-app-2026-06-15/addendum.md
  - _bmad-output/planning-artifacts/briefs/brief-todo-app-2026-06-15/brief.md
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/EXPERIENCE.md
workflowType: 'architecture'
project_name: 'todo-app'
user_name: 'Kayla'
date: '2026-06-15'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
~38 FRs (FR1–FR32 + FR9a–d, FR17a) across 9 feature areas:
- Capture (FR1–5): frictionless, keyboard-first, no required fields, auto-bucketing.
- Home — Focus/Windowsill/Greenhouse (FR6–11): one task in focus; the
  windowsill as dominant build-up view; per-completion plant growth; bloom →
  greenhouse; curated favorites; today-only horizon for tasks.
- Show-Me-My-Day peek (FR12–14): on-demand, today-scoped, Now/Next/Later
  buckets; muted non-red deadline tags.
- Two-Date Model (FR15–17a): optional do-date (organizes today) + optional
  deadline (quiet safety net); auto pull-into-today as a deadline nears.
- Completion Ritual (FR18–19): slow click-and-drift; advances plant; blooms a note.
- Note Vault & Timing Engine (FR20–25): data-seeded read-only note pool; hidden
  queue; 3 rarity buckets; 4 targeting dials; 5-rule selection cascade; note
  always surfaces regardless of completion.
- Day/Night Tone & Clock Window (FR26–27): clock-driven tonal shift + glass color.
- States (FR28–31): first-run, empty/cleared day, nothing-done day, no
  connectivity UI ever.
- Day Journal (FR32): opt-in keepsake of completed tasks + the note that appeared.

Architecturally, the dominant logic is the **Note Vault & Timing Engine**; the
**garden/growth model** is the dominant persistent domain state; the rest is
gentle CRUD + presentation governed by strict UX invariants.

**Non-Functional Requirements:**
- NFR1 Offline / local-first — all data on-device, persists locally, no
  connectivity dependency ever. (Hard constraint.)
- NFR2 No backend / no surveillance — no accounts, cloud, sync, analytics,
  tracking, or OS/push notifications. (Hard constraint.)
- NFR3 Calm responsiveness — instant capture/peek; intentionally slow
  completion drift; single-column reading-width layout.
- NFR4 Accessibility floor — full keyboard operability of every surface;
  contrast floor on warm-dark theme; legible pixel text (+ Inter fallback);
  reduce-motion option; visible focus indicator.
- NFR5 The "no red / no urgency" constraint — no red anywhere; no badges,
  counts, numeric progress, streaks, stats, countdowns, required fields, or
  finish-to-unlock gating; no full-backlog view on Home or pushed at the user
  (the opt-in drawer is the sole deliberately-opened exception, still free of
  counts/red/urgency). (Design-law-level invariant.)

**Scale & Complexity:**
- Primary domain: Offline single-user desktop application (local-first).
- Complexity level: Low–Medium. No network, auth, concurrency, multi-tenancy,
  or compliance. Real complexity is isolated to (a) the timing-engine selection
  logic and (b) pixel-art sprite rendering + animation.
- Estimated architectural components: ~6–8 — UI/runtime shell, local data
  store, note/timing engine, garden/growth domain, daily-view (two-date +
  horizon) logic, clock/time-of-day service, asset/sprite loader, and a
  data-seeding path for the note vault.

### Technical Constraints & Dependencies

- **Hard:** local-first, no server, no network of any kind (NFR1/NFR2).
- **Data layer must be externally seedable** by Kayla outside the app (no
  authoring UI), and read-only to the app for notes (FR20). Expressed (non-
  binding) expectation: JS/TS desktop stack with Prisma + local SQLite.
- **Desktop runtime, click + keyboard only** — no touch/haptics; resizable
  window; pixel-art rendering (crisp scaled sprites).
- **Licensed sprite assets** (Plants.png, 16x16 windows) are gitignored build
  dependencies — loaded from local assets, never committed/redistributed.
- **The Design Law / NFR5 is an architectural invariant**, not just styling:
  no data model, query, or component may introduce counts, red, urgency, or
  finish-to-unlock gating.

### Cross-Cutting Concerns Identified

- Local persistence + human-seedable data path (notes, tasks, plants, journal).
- Clock / time-of-day service feeding both the day/night tone and the timing engine.
- "Shape of the day" state (clock + completions + fired triggers) read by both
  the timing engine and the daily view.
- Animation system + reduce-motion fallback preserving outcomes.
- Keyboard navigation, focus order, and visible focus indicator on every surface.
- The Design Law enforced top-to-bottom (no red, no counts, no gating, presence
  unconditional).

## Starter Template Evaluation

### Primary Technology Domain

Offline single-user **desktop application** — Electron runtime, React UI, local
SQLite via Prisma. (Runtime + framework confirmed with Kayla: Electron + React.)

### Starter Options Considered

- **electron-vite + create-electron (React+TS)** — Vite-based modern Electron
  tooling (alex8088). Clean main/preload/renderer separation, TypeScript, HMR,
  source-code protection. Unopinionated about styling. **Selected.**
- **guasam/electron-react-app** — complete and modern but ships Tailwind +
  shadcn/ui, which conflicts with Kept's bespoke pixel-art design system.
  Rejected.
- **Electron Forge + Vite + React** — official and solid, but heavier packaging
  opinions than needed for a solo gift app. Rejected.
- **Roll-your-own** — unnecessary; electron-vite already encodes the right
  process structure. Rejected.

### Selected Starter: electron-vite (React + TypeScript template)

**Rationale for Selection:**
- Gives the exact three-process structure Kept needs: a **main process** to host
  Prisma + SQLite (and Kayla's note-seed scripts), a **preload bridge** as the
  single typed IPC surface, and a **React renderer** for the pixel-art UI.
- **Leaves styling fully open** — no Tailwind/shadcn to fight Kept's hand-built
  pixel-art tokens (DESIGN.md).
- Vite HMR + TypeScript out of the box; well-maintained and current.

**Initialization Command:**

```bash
npm create @quick-start/electron@latest kept -- --template react-ts
# (create-electron scaffolds the electron-vite React + TypeScript template)
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript across main / preload / renderer.
- Electron 41 (Chromium 146 + Node 24 LTS) as the desktop runtime.

**Styling Solution:**
- Intentionally NOT chosen by the starter. Kept supplies its own pixel-art CSS
  driven by the DESIGN.md tokens (plain CSS / CSS modules; `image-rendering:
  pixelated`). No utility framework imposed.

**Build Tooling:**
- electron-vite (Vite under the hood) — fast HMR, per-process build config,
  optional source-code protection.

**Testing Framework:**
- Not pre-wired by the starter; chosen in a later decision (lean Vitest for the
  timing-engine logic — the one area that genuinely warrants unit tests).

**Code Organization:**
- `src/main` (Node: Prisma client, timing engine, clock service, IPC handlers),
  `src/preload` (typed contextBridge API — the only renderer↔main surface),
  `src/renderer` (React app, components, pixel-art styles, Motion animations).

**Development Experience:**
- Vite dev server + HMR for the renderer; electron-vite reload for main/preload;
  TypeScript throughout; ESLint/Prettier per the template defaults.

**Data Layer (added on top of the starter — confirmed direction):**
- **Prisma ORM 7** with the **`@prisma/adapter-better-sqlite3`** driver adapter
  and **no-Rust-engine** mode — so there is **no query-engine binary to bundle**
  into the packaged app (major Electron packaging simplification).
- SQLite file stored under Electron's `app.getPath('userData')`.
- Kayla seeds the note vault via a Prisma seed script / Prisma Studio / direct
  DB edit — no in-app authoring UI (satisfies FR20).

**Note:** Project initialization using the command above should be the first
implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Domain logic in main process; renderer is pure presentation.
- Data store: Prisma 7 + better-sqlite3 adapter (no-Rust-engine), SQLite in userData.
- IPC contract: typed contextBridge + invoke/handle, Zod-validated, hardened renderer.
- Data model / SQLite schema (Task, Plant, GardenState, Note, NoteDelivery, JournalEntry).
- Packaging: electron-builder NSIS (Windows x64) with native-module rebuild.

**Important Decisions (Shape Architecture):**
- Renderer state: Zustand 5.
- Navigation: state-driven view switching (no URL router).
- Animation: Motion 12 with reducedMotion="user".
- Date/time: date-fns v4, local clock as single source of truth + clock service.
- Build-tunable constants centralized in one config module.

**Deferred / Out of Scope (do NOT re-decide):**
- Auth & authorization — N/A (single user, no network).
- API server (REST/GraphQL), API docs, rate limiting — N/A (replaced by IPC).
- Cloud hosting, CI/CD, monitoring, scaling, caching — N/A (no server, no telemetry).
- Auto-update (electron-updater) — deferred; builds hand-delivered.
- Encryption at rest — out (personal device, no regulated data).

### Data Architecture

- **Store:** SQLite at `app.getPath('userData')/kept.db`. Prisma ORM 7 with the
  `@prisma/adapter-better-sqlite3` driver adapter and **no-Rust-engine** mode →
  no query-engine binary to bundle. `better-sqlite3` is native → rebuilt for
  Electron via `@electron/rebuild`, unpacked via `asarUnpack`.
- **Seeding & ongoing updates:** The note vault is authored by Kayla as a plain
  **`notes.json`** file (FR20 — no in-app authoring; the app is read-only over
  notes). It is consumed two ways: (1) a copy is **bundled with the build** so
  the vault is full on first open (FR28); (2) on **every launch**, a main-process
  **notes-import service** reads `notes.json` from a **configurable path**
  (`NOTES_FILE_PATH`) and **upserts by stable `key`** into local SQLite — adding
  new notes and updating edited ones, while leaving NoteDelivery history and his
  progress untouched. Pointing `NOTES_FILE_PATH` at a **cloud-synced folder**
  (OneDrive/Dropbox) lets Kayla add notes anytime with **no reinstall** on
  Christopher's side. The app itself makes **no network calls** — the file sync
  is handled by an external consumer tool, so NFR1/NFR2 hold. If the file is
  absent/unreachable, the app simply uses the notes it already has (offline-safe).
  *Do NOT sync the SQLite `.db` itself — file-level cloud sync corrupts SQLite;
  sync only the `notes.json` source.*
- **Schema (entities & key fields):**
  - **Task** — id (cuid), title, `doDate?` (date-only, local), `deadline?`
    (date-only, local), bucket (now/next/later, auto-sorted), status,
    createdAt, completedAt?. Tasks are **editable and deletable by the user**
    via the drawer (FR34–35): `taskRepo` exposes `update` (title/doDate/deadline;
    bucket re-derived) and `delete` (a real row delete — tasks are pending
    intentions the user controls, not accomplishments; no soft-delete/archive
    field, to avoid a hidden second backlog). No schema change is required.
  - **Plant** — id, speciesKey (random, warmth-only, no tiers), growthStage,
    state (growing|bloomed), isFavorite, sillOrder?, bloomedAt?.
  - **GardenState** — singleton: currentlyGrowingPlantId, completionsTowardBloom
    (INTERNAL ONLY — never surfaced as a count).
  - **Note** — id (cuid), **`key` (stable, UNIQUE — Kayla-assigned slug; the
    upsert target for re-import)**, body, rarity (everyday|blue_moon|anchor),
    timeOfDay? (morning|evening|night), pinnedDate?, trigger?
    (first_open|first_win|finished_all|nothing_done|anchor_task), anchorKey?,
    reusable.
  - **NoteDelivery** — noteId, surfacedAt. Drives reuse cooldown, one-time
    retirement, and the Day Journal.
  - **JournalEntry** — day + completed-task snapshot + the NoteDelivery shown.
- **Validation:** Zod 4.4 schemas at the IPC boundary (main process).
- **Migrations:** `prisma migrate`.
- **Design-Law invariant:** no user-facing count / "X of Y" / progress field
  anywhere; completionsTowardBloom is internal plumbing only (NFR5).

### Authentication & Security

- **Auth/authz: N/A** — single user, single machine, no accounts or network.
- **Electron hardening:** `contextIsolation: true`, `nodeIntegration: false`,
  `sandbox: true`; renderer loads only local content; minimal CSP. The preload
  is the only bridge; no Node APIs exposed to the renderer.
- **Encryption at rest:** out of scope (personal device, no regulated data).

### API & Communication Patterns

- **No network API.** All renderer↔main communication is **Electron IPC** via a
  typed `contextBridge` preload, request/response (`ipcRenderer.invoke` /
  `ipcMain.handle`), namespaced (e.g. `kept.tasks.*`, `kept.notes.next`,
  `kept.garden.*`, `kept.journal.*`, `kept.clock.phase`).
- **Validation & errors:** every payload Zod-validated in main; errors returned
  as calm typed results (never surfaced as red/urgent UI — NFR5).

### Frontend Architecture

- **Framework:** React 19 (renderer), TypeScript.
- **State:** Zustand 5 store mirroring main-process state (focus task,
  windowsill, current view, day/night phase).
- **Navigation:** state-driven view switching across Home / Add / Greenhouse /
  Journal / **Drawer** (title-bar nav cluster); no URL router. The Drawer is an
  opt-in, closed-by-default view (FR33) reached only from its nav icon — never
  the initial view, never auto-surfaced.
- **Animation:** Motion 12 (`motion/react`) with
  `<MotionConfig reducedMotion="user">` + `useReducedMotion` (NFR4).
- **Styling:** bespoke pixel-art CSS from DESIGN.md tokens; `image-rendering:
  pixelated` for crisp sprite scaling. No utility framework.
- **Time:** date-fns v4; local system clock is the single source of truth; a
  main-process clock/time-of-day service computes day/night phase (cutovers:
  morning 5–9, day 9–17, dusk 17–20, night 20–5) and "start of local day".

### Infrastructure & Deployment

- **Packaging:** electron-builder → **NSIS installer, Windows x64**.
  `npmRebuild: true`, `@electron/rebuild` for `better-sqlite3`, `asarUnpack` its
  `.node` binary. Licensed sprite sheets bundled as build resources (gitignored
  in source).
- **Signing:** optional; unsigned = one-time SmartScreen "More info → Run
  anyway". Can be added later.
- **Updates:** no auto-update server; new builds hand-delivered (deferred).
- **No CI/cloud/monitoring** — a local build script is the entire pipeline.

### Decision Impact Analysis

**Implementation Sequence:**
1. Scaffold (electron-vite React-TS) — the first story.
2. Prisma schema + migration + better-sqlite3 wiring in main; native rebuild.
3. Typed IPC bridge + Zod validation skeleton.
4. Clock/time-of-day service + day/night phase.
5. Capture + Task model + today-scoping (two-date model).
6. Garden/growth domain + windowsill/greenhouse.
7. Note Vault + Timing Engine (selection cascade).
8. Completion ritual (drift + growth + note bloom) with Motion.
9. Show-me-my-day peek, Day Journal, states (first-run / empty / nothing-done).
10. The Drawer — held-task list (Soon/Later/Someday) + search + single-task
    editor (`tasks.list`/`update`/`delete`); the data/IPC primitives can land
    alongside the Task model (step 5).
11. Packaging (NSIS) + seed workflow for Kayla's vault.

**Cross-Component Dependencies:**
- The clock service feeds both day/night tone AND the timing engine.
- The timing engine reads NoteDelivery (cooldown/retirement) + GardenState +
  completions + clock — the "shape of the day".
- Two-date model + clock drive today-scoping and the deadline auto-pull-in.
- Build-tunable constants (one config module) feed timing, growth, deadline pull-in.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

~9 potential AI-agent conflict points resolved: Prisma/DB naming, code & file
naming, IPC channel naming, IPC result/payload format, cross-boundary date
formats, Zustand state-update style, error handling, the timing-engine cascade,
and the Design-Law guardrails.

### Naming Patterns

**Database (Prisma):** models PascalCase singular (`Task`, `Note`, `Plant`);
fields camelCase (`doDate`, `completedAt`); enums as string-literal unions
(`'everyday' | 'blue_moon' | 'anchor'`); Prisma default model→table mapping.

**Code:** components PascalCase (`FocusCard`); hooks `useThing`; functions/vars
camelCase; types/interfaces PascalCase (no `I` prefix).

**Files:** component files `PascalCase.tsx`; non-component modules
`camelCase.ts`; directories `kebab-case`; CSS modules `Component.module.css`.

**IPC channels:** namespaced `domain.verb` dot-notation — `kept.tasks.create`,
`kept.tasks.today`, `kept.tasks.list`, `kept.tasks.complete`,
`kept.tasks.update`, `kept.tasks.delete`, `kept.notes.next`,
`kept.garden.favorite`, `kept.journal.list`, `kept.clock.phase`.
(`kept.tasks.list` = the drawer query: held tasks grouped Soon/Later/Someday,
today + beyond, search-filterable; `kept.tasks.update` edits title/do-date/
deadline with the bucket re-derived; `kept.tasks.delete` lets a task go.)

### Structure Patterns

- Tests co-located as `*.test.ts` (Vitest), focused on `src/main` logic
  (timing engine especially).
- Main by domain: `src/main/{db,ipc,engine,clock,config}`.
- Renderer by feature: `src/renderer/features/{home,capture,greenhouse,journal,peek,drawer}`
  plus `src/renderer/{components,store,styles}`.

### Format Patterns

- **IPC result envelope (every handler):**
  `type Result<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string } }`
- JSON is camelCase. Dates cross the boundary as strings: ISO-8601 for
  timestamps, `'yyyy-MM-dd'` (local) for date-only `doDate`/`deadline`. The
  renderer does no timezone math — the main clock service owns time.

### Communication / State Patterns

- Zustand: immutable updates via `set`; verb-named actions (`setFocusTask`,
  `applyCompletion`); small named selectors.
- One-way flow: renderer calls IPC → on `ok`, updates store from returned data;
  never optimistically mutates domain state it doesn't own.

### Process Patterns

- **Errors:** Zod-validate at the boundary → `{ ok:false, error }`. Renderer
  shows calm copy only — never red, never alarm, never a count. Dev-only console
  logging; no telemetry/remote logging ever.
- **Loading/timing:** capture & peek instant; completion ritual deliberately
  slow (by design, not a loading state); no shouting spinners; all motion
  respects `useReducedMotion`.

### Enforcement Guidelines — Design-Law Guardrails (MANDATORY)

All AI agents MUST honor these as hard rules:
1. **No red** — no red token; none introduced anywhere, including sprites.
2. **No counts** — no badge/number/"X of Y"/percentage/streak/progress meter
   ever rendered; `completionsTowardBloom` is internal-only, never sent to the
   renderer.
3. **No gating** — nothing locked behind completion; no finish-to-unlock.
4. **Notes surface regardless of completion** (FR25), including nothing-done days.
5. **Plants never wilt/decay/reset** (FR9b).
6. **App never addresses the user by name** — only K's notes may.
7. **No OS notifications, no network calls, no connectivity UI** — ever.

### Timing-Engine Selection Cascade (deterministic — implement exactly)

`kept.notes.next`, given the shape of the day (time + phase, today's
NoteDelivery rows, completions today, triggers fired now):

1. **Eligible pool** — exclude delivered one-time notes (retired) and reusable
   notes within `COOLDOWN_DAYS`.
2. **Match filter** — eligible if `timeOfDay` is null or equals current phase;
   AND `pinnedDate` is null or equals today; AND `trigger` is null (ambient) or
   matches a trigger fired this moment.
3. **Specificity tier** — T3: matched trigger (anchor) or matched pinnedDate;
   T2: timeOfDay-targeted; T1: everyday ambient.
4. **Rarity respect** — a `blue_moon` note remains a candidate only with
   probability `BLUE_MOON_CHANCE`; else set aside.
5. **Select** — highest tier with candidates; random tie-break within tier.
6. **Always-fallback** — if none survive, draw from the `everyday` pool.
7. **Record** — write NoteDelivery; reusable → cooldown, one-time → retired.

Tunables in `src/main/config`: `COOLDOWN_DAYS`, `BLUE_MOON_CHANCE`,
`APPROACHING_DEADLINE_DAYS` (FR17a), `COMPLETIONS_PER_BLOOM` (FR9a),
`DRAWER_SOON_DAYS` (FR33 — the day-window separating "Soon" from "Later").

### Pattern Examples

**Good:** `await window.kept.tasks.complete(id)` → returns
`{ ok: true, data: { plant, note } }`; renderer animates drift + growth + note
bloom, updates store from `data`.

**Anti-patterns to avoid:** rendering "2/4 to bloom"; a red "overdue" tag;
locking the journal until a task is done; the renderer importing Prisma or `fs`;
the renderer computing day/night from `new Date()` instead of `kept.clock.phase`.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
kept/
├── README.md
├── package.json
├── electron.vite.config.ts        # electron-vite: main/preload/renderer build
├── electron-builder.yml           # NSIS Windows x64 packaging config
├── tsconfig.json
├── tsconfig.node.json             # main/preload (Node) TS config
├── tsconfig.web.json              # renderer (DOM) TS config
├── vitest.config.ts               # unit tests (timing engine, domain logic)
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore                     # ignores imports/*, sprite frames, *.db
├── .env                           # DATABASE_URL for prisma CLI (dev)
├── prisma/
│   ├── schema.prisma              # Task, Plant, GardenState, Note, NoteDelivery, JournalEntry
│   ├── migrations/
│   └── seed.ts                    # Kayla's note-vault seed entry point
├── notes/                         # Kayla's note source (authoring; gitignored if private)
│   └── notes.json                 # the actual note content (stable `key` per note);
│                                  # bundled into build AND re-read at launch from NOTES_FILE_PATH
├── imports/                       # LICENSED, GITIGNORED sprite sheets (Plants.png, windows)
├── resources/                     # extracted sprite frames bundled into the build
│   ├── plants/                    # bulb→sprout→stem→bloom frames per species
│   └── windows/                   # glass-morning/day/dusk/night frames
├── build/                         # icons etc. for electron-builder
├── src/
│   ├── main/                      # ── MAIN PROCESS (Node) ──
│   │   ├── index.ts               # app entry: window, lifecycle, registers IPC
│   │   ├── db/
│   │   │   ├── client.ts          # PrismaClient + better-sqlite3 adapter (userData path)
│   │   │   └── repositories/      # taskRepo, plantRepo, noteRepo, journalRepo
│   │   ├── engine/
│   │   │   ├── timingEngine.ts    # the deterministic selection cascade
│   │   │   ├── triggers.ts        # detect fired triggers (first_win/finished_all/…)
│   │   │   └── garden.ts          # growth-stage advance + bloom→greenhouse logic
│   │   ├── clock/
│   │   │   └── clockService.ts    # local time → phase (morning/day/dusk/night) + start-of-day
│   │   ├── import/
│   │   │   └── notesImport.ts     # on launch: read notes.json from NOTES_FILE_PATH → upsert by `key`
│   │   ├── ipc/
│   │   │   ├── index.ts           # registers all handlers
│   │   │   ├── tasks.ts           # kept.tasks.* (create/today/list/complete/update/delete)
│   │   │   ├── notes.ts           # kept.notes.next
│   │   │   ├── garden.ts          # kept.garden.* (favorite/reorder/list)
│   │   │   ├── journal.ts         # kept.journal.list
│   │   │   └── clock.ts           # kept.clock.phase
│   │   └── config/
│   │       └── tunables.ts        # COOLDOWN_DAYS, BLUE_MOON_CHANCE, APPROACHING_DEADLINE_DAYS, COMPLETIONS_PER_BLOOM, DRAWER_SOON_DAYS, NOTES_FILE_PATH
│   ├── preload/                   # ── PRELOAD BRIDGE ──
│   │   └── index.ts               # contextBridge → window.kept typed API (only surface)
│   ├── shared/                    # ── SHARED (main ⇄ renderer) ──
│   │   ├── ipc-contract.ts        # channel names + Result<T> envelope type
│   │   ├── schemas.ts             # Zod schemas (validated in main, types in renderer)
│   │   └── types.ts               # DTOs: TaskDTO, PlantDTO, NoteDTO, …
│   └── renderer/                  # ── RENDERER (React) ──
│       ├── index.html
│       ├── main.tsx               # React root + <MotionConfig reducedMotion="user">
│       ├── App.tsx                # title-bar nav + state-driven view switch
│       ├── store/
│       │   └── useKeptStore.ts    # Zustand: focusTask, windowsill, currentView, phase
│       ├── features/
│       │   ├── home/              # FR6–11: FocusCard, Windowsill, ClockWindow, note weave
│       │   ├── capture/           # FR1–5: Add-a-task page, CaptureInput, date chips
│       │   ├── peek/              # FR12–14: Show-me-my-day buckets (Now/Next/Later)
│       │   ├── greenhouse/        # FR9c, FR9d: gallery + favorite/curate
│       │   ├── journal/           # FR32: Day Journal keepsake
│       │   └── drawer/            # FR33–35: held-task list (Soon/Later/Someday) + search + single-task editor
│       ├── components/            # shared pixel-art primitives (PixelPanel, NoteCard, PlantSprite)
│       └── styles/
│           ├── tokens.css         # DESIGN.md tokens (colors, spacing, type) as CSS vars
│           └── global.css         # image-rendering: pixelated, base layout
└── out/                           # electron-vite build output (gitignored)
```

### Architectural Boundaries

**Process boundary (the hard line):** renderer ⇄ main only through the preload
`window.kept` API. The renderer never imports Prisma, `better-sqlite3`, `fs`, or
Node APIs; the main process never imports React. `src/shared/` is the only code
both sides import (pure types + Zod schemas, no runtime side effects).

**Data boundary:** all DB access is inside `src/main/db`. Repositories are the
only callers of the Prisma client; IPC handlers and the engine call
repositories, never Prisma directly. The SQLite file lives in
`app.getPath('userData')`; the seed path (`prisma/seed.ts` + `notes/`) is the
ONLY writer of notes.

**Engine boundary:** `src/main/engine` is pure domain logic (timing, triggers,
growth) — no IPC, no Electron imports — so it is unit-testable in isolation
with Vitest. IPC handlers orchestrate engine + repositories.

**State boundary:** main process owns truth; the Zustand store is a renderer-side
mirror updated only from IPC `ok` results.

### Requirements to Structure Mapping

| FR area | Lives in |
|---|---|
| Capture (FR1–5) | `renderer/features/capture` + `ipc/tasks.ts` + `db/repositories/taskRepo` |
| Home: focus/windowsill/greenhouse (FR6–11) | `renderer/features/home` + `engine/garden.ts` |
| Show-me-my-day peek (FR12–14) | `renderer/features/peek` + `ipc/tasks.ts` (today query) |
| Two-date model (FR15–17a) | `db` schema + `clock/clockService` + `engine/triggers` (deadline pull-in) |
| Completion ritual (FR18–19) | `renderer/features/home` (Motion) + `ipc/tasks.complete` + `engine/garden` |
| Note Vault & Timing Engine (FR20–25) | `engine/timingEngine.ts` + `ipc/notes.ts` + `import/notesImport.ts` + `notes/notes.json` |
| Day/Night tone & clock window (FR26–27) | `clock/clockService` + `renderer/features/home/ClockWindow` |
| States (FR28–31) | `renderer/features/home` (first-run / empty / nothing-done) |
| Day Journal (FR32) | `renderer/features/journal` + `ipc/journal.ts` + `journalRepo` |
| The Drawer — see/edit/delete tasks (FR33–35) | `renderer/features/drawer` + `ipc/tasks.ts` (list/update/delete) + `db/repositories/taskRepo` |

**Cross-cutting concerns:**
- Clock/time-of-day → `src/main/clock` (feeds both day/night tone and the engine).
- Design-Law guardrails → enforced in every layer; DTOs in `shared/types.ts`
  deliberately omit any count field.
- Tunables → `src/main/config/tunables.ts` (single source).
- Pixel-art tokens → `renderer/styles/tokens.css` (single source from DESIGN.md).

### Integration Points

**Internal communication:** renderer → `window.kept.<domain>.<verb>()` →
`ipcRenderer.invoke` → `ipcMain.handle` (Zod-validate) → engine/repositories →
`Result<T>` back. No event bus needed; request/response only.

**External integrations:** none — by design (NFR2). The only "external" inputs
are the local system clock and the bundled licensed sprite assets.

**Data flow (completion example):** UI completion gesture → `kept.tasks.complete`
→ taskRepo marks done → garden advances stage (or blooms) → triggers re-evaluated
→ timingEngine selects a note → NoteDelivery written → `{ plant, note }` returned
→ renderer animates drift + growth + note bloom and updates the store.

### File Organization Patterns

- **Config:** root-level tool configs; runtime tunables in `src/main/config`.
- **Source:** strict main / preload / shared / renderer split; main by domain,
  renderer by feature.
- **Tests:** co-located `*.test.ts`, concentrated on `src/main/engine`.
- **Assets:** licensed source sheets in `imports/` (gitignored); extracted
  frames in `resources/` (bundled by electron-builder).

### Development Workflow Integration

- **Dev:** `electron-vite dev` — HMR renderer, reload main/preload; `prisma
  migrate dev` for schema; `prisma db seed` to load Kayla's vault; `prisma
  studio` to edit notes directly.
- **Build:** `electron-vite build` → `out/`, then `electron-builder` →
  NSIS installer (`@electron/rebuild` for `better-sqlite3`, `asarUnpack` its
  `.node`).
- **Deploy:** hand-deliver the installer; DB auto-creates in `userData` on first
  run; `notes.json` shipped with the build so the vault is full on first open
  (FR28). **Ongoing note updates:** Kayla edits `notes.json` in a cloud-synced
  folder; the launch-time import service upserts new/edited notes by `key` — no
  reinstall, no app network calls. Set `NOTES_FILE_PATH` to that synced location
  (falls back to the bundled copy if unset/unreachable).

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** All chosen versions are mutually compatible —
Electron 41 (Node 24, Chromium 146), React 19, Prisma 7 + better-sqlite3 adapter
(no-Rust-engine), Zustand 5, Zod 4.4, Motion 12, date-fns 4. The only native
module (better-sqlite3) is handled by the packaging decision (@electron/rebuild
+ asarUnpack). No contradictory decisions.

**Pattern Consistency:** IPC result envelope, naming conventions, one-way state
flow, and the Design-Law guardrails are consistent with the main/preload/renderer
split and the local-first constraints. Date-format and timezone rules align with
the clock service owning time.

**Structure Alignment:** The directory tree physically enforces every boundary
(renderer never imports Prisma/fs; engine has no Electron deps and is unit-
testable; shared/ holds only types + Zod schemas). Structure enables the chosen
patterns directly.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:** All FR areas (FR1–FR32 + FR9a–d, FR17a)
map to specific locations (see Requirements→Structure mapping). Timing engine
(FR20–25) specified as a deterministic cascade. Two notes:
- **FR28 (welcome note)** — resolved by adding a `first_open` trigger (see
  Validation Issues Addressed).
- **FR3 (auto-bucketing)** — location defined (taskRepo/engine); the bucketing
  heuristic is an intentional build-tunable per the PRD.

**Non-Functional Requirements Coverage:**
- NFR1/NFR2 (offline / no backend) — structurally guaranteed (no network code,
  no telemetry, local SQLite only).
- NFR3 (calm responsiveness) — instant capture/peek; deliberately slow completion
  ritual; single-column layout.
- NFR4 (accessibility floor) — reduce-motion (MotionConfig), pixel legibility
  (Inter fallback), contrast (DESIGN.md) covered; full keyboard-nav/focus-
  management pattern is a noted refinement (see Gap Analysis).
- NFR5 (no red / no urgency) — elevated to mandatory Design-Law guardrails.

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions documented with verified
versions and rationale; deferred/out-of-scope items explicitly marked.

**Structure Completeness:** Complete, specific directory tree with boundaries,
integration points, and FR-to-location mapping.

**Pattern Completeness:** Naming, structure, format, communication, and process
patterns defined with examples; the timing-engine cascade and guardrails are
deterministic and enforceable.

### Gap Analysis Results

**Critical Gaps:** None.

**Important Gaps:**
- Full keyboard-navigation / focus-management pattern (NFR4) — e.g. focus-trap
  for the peek modal, roving tab order, restore-focus on close. Recommend
  specifying during the Home/peek stories; non-blocking.

**Nice-to-Have Gaps:**
- Sprite-frame extraction tooling/step (licensed sheets → `resources/`) is
  undefined; a small one-off extraction script is implied.
- Auto-bucketing heuristic (FR3) intentionally left build-tunable.

### Validation Issues Addressed

- **FR28 welcome note (resolved):** added `first_open` to the Note `trigger`
  enum. A first-run flag in `GardenState` lets the timing engine fire a one-time
  `first_open` welcome note immediately on first launch, before any completion —
  proving the love is present from the first second (Design Law). The placeholder
  invitation copy stands in until Kayla writes the real welcome note.

- **Ongoing note-vault updates without reinstall (resolved):** original design
  seeded the vault at build time only. Revised so the vault is authored as
  `notes.json` and re-imported on every launch from a configurable
  `NOTES_FILE_PATH` (upsert by stable `key`), with NoteDelivery history
  preserved. Pointing that path at a cloud-synced folder lets Kayla add notes
  anytime with no reinstall. The app makes **no network calls** (external sync
  tool moves the file), so NFR1/NFR2 are preserved; the welcome/first-open vault
  still ships in the build for offline first-run. Considered and rejected a
  cloud DB (Supabase/Turso): it would require an account, a live connection, and
  a backend the app calls out to — contradicting NFR2 and the "nobody is
  measuring him" premise, and adding a failure mode if the service/billing lapses.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — small, well-scoped surface; one hard constraint
(local-first) cleanly satisfied; the only real complexity (timing engine) is
specified deterministically. No critical gaps; remaining items are refinements
to settle inside their stories.

**Key Strengths:**
- The Design Law is encoded as enforceable engineering guardrails, not just copy.
- Hard process boundary keeps the renderer dumb and the domain logic testable.
- Note-seeding path (notes/ + prisma/seed.ts) makes Kayla's vault a first-class,
  easy-to-edit deliverable.
- Prisma 7 no-Rust-engine removes the historic Electron+Prisma packaging pain.

**Areas for Future Enhancement:**
- Keyboard-nav/focus-management spec (settle during Home/peek stories).
- Optional code-signing for a warning-free install.
- Sprite-frame extraction script.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented.
- Honor the Design-Law guardrails as hard rules in every layer.
- Implement the timing-engine cascade exactly as specified.
- Respect the process/data/engine/state boundaries; renderer stays presentation-only.
- Refer to this document for all architectural questions.

**First Implementation Priority:**
`npm create @quick-start/electron@latest kept -- --template react-ts`
(scaffold the electron-vite React+TS project), then wire Prisma + better-sqlite3
in the main process.
