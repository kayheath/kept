---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-todo-app-2026-06-15/prd.md
  - _bmad-output/planning-artifacts/prds/prd-todo-app-2026-06-15/addendum.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/EXPERIENCE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/home.html
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/add-task.html
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/show-me-my-day.html
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/completion.html
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/greenhouse.html
  - _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/palette-candlelit-sage.html
---

# Kept (todo-app) - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for **Kept**, decomposing the requirements from the PRD, the UX Design spines (DESIGN.md + EXPERIENCE.md), and the Architecture decisions into implementable stories.

**The Design Law governs everything:** *The love in Kept is never conditional, never withheld, never earned.* Every story is checked against it. The "no red / no urgency" constraint (NFR5) and the architecture's Design-Law Guardrails are hard, cross-cutting acceptance criteria on every relevant story.

## Requirements Inventory

### Functional Requirements

**Capture (6.1)**
- **FR1:** The user can open capture from a "+" affordance at the top-right of the title bar, available on every surface.
- **FR2:** The user can add a task by typing a few words and pressing Enter — keyboard-first, no step required beyond the words themselves.
- **FR3:** Capture has no required fields; the system automatically sorts each new task into a bucket (now/next/later) without the user planning it.
- **FR4:** The user may optionally attach a do-date and/or a deadline via muted, clearly-skippable controls below the input; neither is demanded and no date picker is forced up front.
- **FR5:** On save, the task settles in quietly — no badge, no count, no celebratory interruption.

**Home — Focus, Windowsill & Greenhouse (6.2)**
- **FR6:** Home shows exactly one task in focus at a time, with a quiet, glanceable hint of what's next in muted text below it — never a list.
- **FR7:** The focus area shows no checkbox, no count, and no deadline badge.
- **FR8:** Home displays the windowsill — a shelf showing the currently-growing plant plus a few plants the user has chosen to feature.
- **FR9:** Each completed task advances the currently-growing plant by one growth stage (bulb → sprout → stem → bloom). Stages are conveyed visually only — never labeled, numbered, or shown as "stage X of Y".
- **FR9a:** When a plant reaches its final stage it blooms (≈3–4 completions, build-tunable) and is gently moved into the greenhouse, and a fresh sprout begins on the windowsill.
- **FR9b:** Plants never wilt, decay, or die from inactivity — a plant simply waits. Nothing is ever removed or diminished to reflect a slow day.
- **FR9c:** The user can browse the greenhouse — a calm gallery of every plant he has bloomed — and curate which plants display on the windowsill (limited slots; rearrange any time).
- **FR9d:** Plant variety is random and for warmth only — never tied to performance, milestones, or achievement; no rare/legendary tiers.
- **FR10:** K's notes are woven into the windowsill on Home.
- **FR11:** Home and the peek are today-scoped only for tasks; no full-backlog or multi-day view is shown on Home or pushed at the user (Horizon Limit). Two deliberately-opened surfaces are exempt: the greenhouse (accomplishments, not pending work) and the drawer (the opt-in, closed-by-default task-management surface, FR33). The Limit governs the default view; it never traps his own data beyond reach.

**Show-Me-My-Day Peek (6.3)**
- **FR12:** The user can summon a today-scoped peek of the day from a quiet "show me my day" affordance on Home (click or keypress), and dismiss it the same way; it opens and closes calmly.
- **FR13:** The peek presents tasks in small, finishable buckets (Now / Next / Later) — never a single ranked wall.
- **FR14:** A quietly-held deadline, if present, surfaces in the peek as a muted, non-red tag (e.g. "paper · Fri") — never as pressure, never a countdown.

**Two-Date Model (6.4)**
- **FR15:** A task may carry up to two optional dates, both optional: a do-date (intent to work on it) and a deadline (a real external due date).
- **FR16:** The do-date organizes the daily view — it is what pulls a task into "today."
- **FR17:** The deadline is held quietly as a safety net — never rendered with urgency (no red, no countdown, no "overdue" alarm).
- **FR17a:** When a deadline approaches and the task has no do-date set, Kept quietly pulls that task into today's buckets on its own — still with no red, alarm, or countdown.

**Completion Ritual (6.5)**
- **FR18:** Completing the focus task is a deliberate, slow gesture (click-and-drift) — a moment, not a checkbox tick.
- **FR19:** On completion, the task drifts out of focus toward the windowsill and fades, the currently-growing plant advances a stage (or fully blooms and joins the greenhouse per FR9a), and one of K's notes blooms in — accomplishment and encouragement land together.

**Note Vault & Timing Engine (6.6)**
- **FR20:** K's notes are seeded directly into the data layer; the app is strictly read-only over them and provides no authoring, editing, or browsing UI.
- **FR21:** The unsurfaced note pool is hidden from Christopher — he can never see the queue. Notes are received one at a time, as they bloom, on the engine's timing, never on demand.
- **FR22:** Notes are organized into three rarity buckets (no numeric weights): everyday warmth, blue-moon (rare), and anchor (tied to meaningful moments).
- **FR23:** Each note supports four targeting dials set by K in the data layer: (1) time-of-day (morning/evening/night), (2) specific-date pinning, (3) trigger moment (first win of the day / finished everything / nothing-done day / a specific anchor task completed), and (4) one-time vs. reusable.
- **FR24:** The timing engine reads the shape of the day and surfaces a matching note using the priority logic: (1) specificity wins, (2) rarity respected, (3) reuse cooldown, (4) ties resolve by gentle randomness, (5) always something (fall back to everyday-warmth pool).
- **FR25:** A note must surface regardless of completion — including on a day nothing got done (the Design Law's hardest test).

**Day / Night Tone & Clock Window (6.7)**
- **FR26:** Kept's tone shifts with the local clock: Loving Coach by Day → Soft Landing by Night (dimmer, softer; pressure dissolves; fresh slate offered; night voice never nags). The shift is tonal only — it never hides or locks the day.
- **FR27:** Home displays a passive clock window (upper area) showing the current time, whose glass color is the day/night indicator: morning 5–9am (amber) → day 9am–5pm (blue) → dusk 5–8pm (mauve) → night 8pm–5am (navy). Never interactive, never a notification.

**States (6.8)**
- **FR28:** On first-ever open, Home shows an empty pot waiting to grow with one gentle invitation to add a first small thing — never a "0 tasks" void. A one-time welcome note from K blooms immediately on first open, before any task is done.
- **FR29:** On a cleared/empty day, Kept optionally offers a gentle pull-ahead win, phrased as an offer that is never pressure; declining is a complete, valid answer.
- **FR30:** On a day with nothing done, the garden simply holds what has already grown and notes still bloom — no scolding, no red, no "you didn't do anything."
- **FR31:** Kept never shows connectivity or sync UI of any kind — no banners, no offline state, ever.

**Day Journal (6.9)**
- **FR32:** The user can open a Day Journal — an opt-in keepsake, separate from Home and never auto-surfaced — that stacks completed tasks paired with the note that appeared, by day, as a revisitable record.

**The Drawer — Seeing & Editing Held Tasks (6.10)**
- **FR33:** Opt-in, never-auto-surfaced, closed-by-default surface (quiet title-bar nav icon) listing held tasks (today + beyond) in gentle groups (Soon / Later / Someday) with search. No counts, no red, no overdue, no countdown.
- **FR34:** Edit a single task at a time — words + adjust/clear do-date/deadline (reschedule) — via the same muted never-red controls as capture; settles quietly.
- **FR35:** Let go of (delete) a task with a calm, non-alarming confirmation — never red. Notes remain read-only, never editable/deletable (FR20 unchanged).

### NonFunctional Requirements

- **NFR1 — Offline / local-first:** All data lives on the device and persists there. No dependency on connectivity, ever.
- **NFR2 — No backend, no surveillance:** No accounts, login, cloud, sync, live connection, analytics, tracking, or OS/push notifications of any kind. Everything waits inside the app until Christopher opens it.
- **NFR3 — Calm responsiveness:** Capture and the peek open/close immediately on click/keypress; the completion drift is intentionally slow. Layout is single-column, centered, reading-width — never a dense dashboard.
- **NFR4 — Accessibility floor (principles, not WCAG targets):** (1) every surface fully keyboard-operable; (2) warm-dark theme incl. gold note text meets a comfortable contrast floor; (3) pixel text stays legible at its sizes, with an Inter fallback for longer copy; (4) a reduce-motion option softens/skips drift/bloom/growth animations while preserving outcomes; (5) a visible, low-contrast focus indicator follows reading order.
- **NFR5 — The absolute "no red / no urgency" constraint:** No red appears anywhere (not error, not due/overdue, not in any sprite frame). Banned everywhere: badges, counts, numeric progress, "X of Y," streaks, stats, exclamation urgency, countdowns/timers, required capture fields, full-backlog views, finish-to-unlock gating. Greenhouse-specific bans: no progress-to-bloom meter, no collection-completion %, no empty/locked plant slots, no rare/legendary tiers.

### Additional Requirements

_Technical requirements extracted from Architecture that impact epic/story creation._

**Starter & Scaffold (impacts Epic 1, Story 1):**
- **AR1 — Starter template:** Scaffold with electron-vite (React + TypeScript template) via `npm create @quick-start/electron@latest kept -- --template react-ts`. This is the first implementation story. Gives the main/preload/renderer three-process structure; styling intentionally left open (no Tailwind/shadcn).
- **AR2 — Runtime versions:** Electron 41 (Chromium 146 + Node 24 LTS), React 19, TypeScript across all three processes.

**Data Layer:**
- **AR3 — ORM + DB:** Prisma ORM 7 with `@prisma/adapter-better-sqlite3` driver adapter in no-Rust-engine mode (no query-engine binary to bundle). SQLite file at `app.getPath('userData')/kept.db`. better-sqlite3 native module rebuilt via `@electron/rebuild`, unpacked via `asarUnpack`.
- **AR4 — Schema:** Entities Task, Plant, GardenState (singleton, incl. internal-only `completionsTowardBloom`), Note (with stable UNIQUE `key`), NoteDelivery, JournalEntry — per the architecture field spec. Cross-boundary dates as strings (ISO-8601 timestamps; `yyyy-MM-dd` for date-only do-date/deadline).
- **AR5 — Note seeding & launch import:** Vault authored by Kayla as `notes.json` (no in-app authoring). A copy bundled with the build (full vault on first open, FR28); on every launch a main-process notes-import service reads `notes.json` from a configurable `NOTES_FILE_PATH` and upserts by stable `key`, preserving NoteDelivery history. App makes no network calls; absent/unreachable file → use existing notes. Never sync the SQLite `.db` itself.

**IPC & Boundaries:**
- **AR6 — IPC contract:** Typed `contextBridge` preload exposing `window.kept`, request/response via `ipcRenderer.invoke` / `ipcMain.handle`, namespaced `domain.verb` (e.g. `kept.tasks.create/today/complete`, `kept.notes.next`, `kept.garden.*`, `kept.journal.list`, `kept.clock.phase`). Every payload Zod-validated in main. Result envelope: `Result<T> = { ok: true; data: T } | { ok: false; error: { code; message } }`.
- **AR7 — Electron hardening:** `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`; renderer loads only local content; minimal CSP; preload is the only bridge; renderer never imports Prisma/`better-sqlite3`/`fs`/Node APIs; main never imports React.
- **AR8 — Boundaries:** DB access only inside `src/main/db` (repositories are the only Prisma callers); `src/main/engine` is pure domain logic with no IPC/Electron imports (Vitest-unit-testable); `src/shared` holds only types + Zod schemas; main owns truth, Zustand store is a renderer-side mirror updated only from IPC `ok` results.

**Engine & Services:**
- **AR9 — Timing-engine cascade (deterministic, implement exactly):** eligible pool → match filter → specificity tier (T3 trigger/pinnedDate, T2 timeOfDay, T1 everyday) → rarity respect (`BLUE_MOON_CHANCE`) → select (random tie-break within tier) → always-fallback (everyday pool) → record NoteDelivery (reusable→cooldown, one-time→retired). Includes `first_open` trigger for the welcome note (FR28).
- **AR10 — Clock / time-of-day service:** main-process service; local system clock is the single source of truth; computes day/night phase (cutovers morning 5–9, day 9–17, dusk 17–20, night 20–5) and start-of-local-day. Feeds both day/night tone and the timing engine. Renderer never computes time from `new Date()`.
- **AR11 — Triggers + garden domain:** `engine/triggers.ts` detects fired triggers (first_open / first_win / finished_all / nothing_done / anchor_task); `engine/garden.ts` advances growth stage and handles bloom→greenhouse + fresh sprout.
- **AR12 — Tunables config:** single `src/main/config/tunables.ts` source for `COOLDOWN_DAYS`, `BLUE_MOON_CHANCE`, `APPROACHING_DEADLINE_DAYS` (FR17a), `COMPLETIONS_PER_BLOOM` (FR9a), `NOTES_FILE_PATH`.

**Frontend stack:**
- **AR13 — Renderer libs:** Zustand 5 (immutable `set`, verb-named actions, small selectors); state-driven view switching across Home / Add / Greenhouse / Journal (no URL router); Motion 12 (`motion/react`) with `<MotionConfig reducedMotion="user">`; date-fns v4.

**Packaging & assets:**
- **AR14 — Packaging:** electron-builder → NSIS installer, Windows x64. `npmRebuild: true`, `@electron/rebuild` for better-sqlite3, `asarUnpack` its `.node`. Licensed sprite sheets bundled as build resources (gitignored in source). Signing optional; no auto-update server (builds hand-delivered).
- **AR15 — Sprite-frame extraction:** a one-off extraction step turns licensed source sheets (`imports/Plants.png` 16×32 brown-pot columns; `imports/16x16_windows_orange.png` 16×16) into bundled frames under `resources/plants/` (bulb→sprout→stem→bloom per species, red frames excluded) and `resources/windows/` (glass morning/day/dusk/night). Source sheets gitignored.
- **AR16 — Testing:** Vitest, co-located `*.test.ts`, concentrated on `src/main/engine` (timing engine especially).

**Mandatory cross-cutting (Design-Law Guardrails — apply to every relevant story):**
- **AR17:** No red token anywhere (incl. sprites); no counts/badges/"X of Y"/percentage/streak/progress meter ever rendered (`completionsTowardBloom` internal-only, never sent to renderer); no finish-to-unlock gating; notes surface regardless of completion (incl. nothing-done days); plants never wilt/decay/reset; the app never addresses the user by name (only K's notes may); no OS notifications, no network calls, no connectivity UI ever.

### UX Design Requirements

_Actionable UX work items from DESIGN.md + EXPERIENCE.md, with final mockups as composition references. Spines win over mockups on conflict._

**Design tokens & foundation:**
- **UX-DR1 — Design tokens:** Implement the "Candlelit Sage" warm-dark palette, spacing scale (4/8/12/16/22/32/48), radius tokens (resolve to hard/0 corners in practice), and typography tokens as CSS variables in `renderer/styles/tokens.css` (single source from DESIGN.md). No utility framework.
- **UX-DR2 — Two-voice typography:** Pixelify Sans as the primary display face across app-title/focus-task/meta/eyebrow and K's note voice; Inter as the legibility fallback for longer body copy. Voices distinguished by **color + treatment, not font** (app voice off-white/sage in plain pixel panels; K's voice warm gold on a dashed bloom-glowing card signed "— K").
- **UX-DR3 — Pixel-art depth system:** Full pixel-art surface — hard offset pixel drop-shadows (no blur), layered/dithered borders (RPG dialog-box style), subtle checkerboard texture, `image-rendering: pixelated`, candle-glow vignette. The one true soft glow is reserved for bloom moments only. Global layout: single-column, centered, reading-width.

**Components (each is a discrete buildable surface/primitive):**
- **UX-DR4 — Pixel title bar + nav cluster + "+" button:** Pixel title bar (window dots + "Kept" wordmark); top-right right-aligned nav cluster of pixel-bordered square buttons with hand-drawn pixel-art SVG icons — home, greenhouse, journal — then a gap and the calm green "+" capture button. Current surface shows a `growth-deep` selected ring. Present on every surface.
- **UX-DR5 — Clock window (Home only):** Pixel arched-window sprite (orange/terracotta frame, scaled crisp ~7×) in Home's upper-right; current time below in gold (Pixelify Sans, time only, no caption). Glass color encodes phase: amber `#E5CFAF` → blue `#96ADB8` → mauve `#B691B5` → navy `#5C4C75`. Passive, never interactive.
- **UX-DR6 — Focus task card:** The most lifted element on Home — pixel-bordered panel on `surface-raised`, layered borders, hard offset shadow, dithered bottom edge, small `growth` eyebrow ("Your one thing"), task title in `app-focus-task`, quiet muted "breath line" below. No checkbox, no count, no due-badge.
- **UX-DR7 — Growing windowsill + shelf scene:** The dominant Home view — real pixel-plant sprites bottom-aligned on a wooden wall shelf (lit lip `wood-light`, face `wood-mid`, shadow `wood-shadow`, attached corbels/brackets, pots cast contact shadows). Shows the one currently-growing plant + a few curated favorites in limited rearrangeable slots. Muted eyebrow "Things you've grown." No numbers, no progress bars, no progress-to-bloom meter.
- **UX-DR8 — Greenhouse gallery + curation:** Opt-in surface separate from Home (reached via nav). Centered header (eyebrow "THE GREENHOUSE" gold + off-white "Everything you've grown." + muted "It all stays here. Nothing ever wilts.") above a vertical wall of wooden shelves holding rows of bloomed plant sprites; closing line beneath. Curation: favorite a plant via a gold pixel heart ("♥ on your sill") with soft bloom glow; selecting a plant raises a calm "keep this one in view? · ♥ put on the windowsill" popover. No counts, no completion %, no rare/legendary tiers, no empty/locked slots, no red. Mockup: `mockups/greenhouse.html`.
- **UX-DR9 — K's note card:** Same Pixelify Sans face set apart by warm gold `partner-voice` text on a faint `partner-voice-bg` wash, dashed `partner-voice` border, signed "— K"; soft `bloom` glow on arrival. The only surface that may show Christopher's name. Appears on Home (woven into windowsill) and in the Day Journal.
- **UX-DR10 — Day-peek buckets:** Today-scoped view summoned on click/keypress, opening on a slightly dimmed scrim. Three pixel-bordered buckets Now / Next / Later, each headed in Pixelify Sans (`growth` / `partner-voice` / `text-muted`), items as plain pixel lines with calm pixel bullets (no checkboxes). Quietly-held deadline as a muted non-red pixel tag. Today-scoped only. Mockup: `mockups/show-me-my-day.html`.
- **UX-DR11 — Capture input + optional date chips:** Single prominent pixel-bordered text field on `surface-raised`, layered borders, hard offset shadow, blinking green pixel caret, muted placeholder. Below: two clearly-optional muted dashed-border chips — a do-date chip (sage dot) and a deadline chip (gold/`bloom` dot, never red). No required fields, no forced date pickers. Mockup: `mockups/add-task.html`.
- **UX-DR12 — Completion bloom animation:** On completion the finished focus card drifts down toward the windowsill and fades; the growing plant advances one stage with a soft pale-gold `bloom` halo and a quiet "something grew" marker (or blooms and moves to greenhouse, fresh sprout taking its place); K's note blooms in on its glowing dashed card. The one true soft glow in the system. Mockup: `mockups/completion.html`.

**Day/night, states & accessibility:**
- **UX-DR13 — Day/night tonal shift:** Same-palette tonal dimming driven by the clock — Loving Coach by Day (warmer/brighter) → Soft Landing by Night (dimmer/softer); made visible via the clock-window glass color. Not a second theme.
- **UX-DR14 — State treatments:** First-ever open (empty terracotta pot + gentle invitation, welcome note blooms; never "0 tasks"); empty/cleared day (windowsill stands, optional never-pressure pull-ahead offer); nothing-done day (notes still bloom, plants wait, no scolding/red); capture-saved (quiet settle, no toast/badge); note-arriving (bloom glow); offline always (no connectivity UI).
- **UX-DR15 — Voice & microcopy:** App's own voice calm/plain/never-by-name in off-white/sage; K's voice warm/personal in gold. Encouragement never guilt; night voice never nags. Follow the Do/Don't microcopy table (e.g. "One calm thing.", "Toast counts. Soup counts.").
- **UX-DR16 — Accessibility floor (UX behaviors):** Full keyboard operability of every surface (open peek, complete a task, open journal, dismiss — not just capture); focus order follows reading order; visible low-contrast focus indicator readable on the warm-dark surfaces; contrast floor incl. gold note text; pixel-text legibility with Inter fallback for long copy; reduce-motion setting that preserves outcomes. (Architecture flags focus-trap/roving-tab-order/restore-focus for the peek modal as a refinement to settle in the Home/peek stories.)

### FR Coverage Map

- **FR1:** Epic 1 — "+" capture affordance in title bar, every surface
- **FR2:** Epic 1 — type a few words + Enter to add
- **FR3:** Epic 1 — no required fields; auto-sort into a bucket
- **FR4:** Epic 1 — optional, skippable do-date/deadline controls
- **FR5:** Epic 1 — quiet save, no badge/count/celebration
- **FR6:** Epic 1 — exactly one focus task + muted next-hint
- **FR7:** Epic 1 — focus area: no checkbox, count, or deadline badge
- **FR8:** Epic 2 — windowsill shows growing plant + curated favorites
- **FR9:** Epic 2 — each completion advances the growing plant one stage (visual only)
- **FR9a:** Epic 2 — bloom (≈3–4 completions) → greenhouse + fresh sprout
- **FR9b:** Epic 2 — plants never wilt/decay/die; a plant simply waits
- **FR9c:** Epic 2 — browse greenhouse + curate windowsill favorites
- **FR9d:** Epic 2 — random, warmth-only variety; no rare/legendary tiers
- **FR10:** Epic 3 — K's notes woven into the windowsill
- **FR11:** Epic 1 — today-scoped default (Home & peek); beyond-today tasks only in the opt-in drawer (Epic 7)
- **FR12:** Epic 4 — summon/dismiss the today-scoped peek calmly
- **FR13:** Epic 4 — peek buckets Now / Next / Later
- **FR14:** Epic 4 — quietly-held deadline as muted, non-red peek tag
- **FR15:** Epic 1 — task carries up to two optional dates
- **FR16:** Epic 1 — do-date organizes the daily/today view
- **FR17:** Epic 4 — deadline held quietly as a safety net (no urgency)
- **FR17a:** Epic 4 — approaching deadline w/ no do-date auto-pulls into today
- **FR18:** Epic 5 — completion is a deliberate, slow click-and-drift gesture
- **FR19:** Epic 5 — on completion: drift away + plant advances/blooms + note blooms in
- **FR20:** Epic 3 — notes data-seeded; app strictly read-only, no authoring UI
- **FR21:** Epic 3 — unsurfaced pool hidden; notes received one at a time on engine timing
- **FR22:** Epic 3 — three rarity buckets (everyday / blue-moon / anchor)
- **FR23:** Epic 3 — four targeting dials per note
- **FR24:** Epic 3 — timing engine 5-rule selection priority (deterministic cascade)
- **FR25:** Epic 3 — a note surfaces regardless of completion (incl. nothing-done days)
- **FR26:** Epic 6 — day/night tonal shift (Loving Coach → Soft Landing)
- **FR27:** Epic 1 — passive clock window; glass color is the day/night indicator
- **FR28:** Epic 6 — first-run empty pot + invitation + welcome note (uses Epic 3 `first_open` trigger)
- **FR29:** Epic 6 — empty/cleared day: optional, never-pressure pull-ahead offer
- **FR30:** Epic 6 — nothing-done day: garden holds, notes still bloom, no scolding
- **FR31:** Epic 6 — no connectivity/sync UI of any kind, ever
- **FR32:** Epic 6 — opt-in Day Journal: completed tasks + the note that appeared, by day
- **FR33:** Epic 7 — the drawer: opt-in held-task surface, Soon/Later/Someday + search
- **FR34:** Epic 7 — edit/reschedule a single task from the drawer
- **FR35:** Epic 7 — let go of (delete) a task, calm confirmation

**NFRs (cross-cutting):** NFR1/NFR2 structurally guaranteed by the foundation (Epic 1) and enforced everywhere; NFR3 in Epics 1 (instant capture/peek) + 5 (deliberately slow ritual); NFR4 anchored per-surface as built, with the reduce-motion option in Epic 5; **NFR5 / the Design-Law Guardrails (AR17) apply as mandatory acceptance criteria on every epic.**

## Epic List

### Epic 1: Foundation, Capture & The Calm Home
The greenfield base plus the minimum usable loop. Scaffold (electron-vite React-TS), Prisma + SQLite 6-entity schema, typed `window.kept` IPC + Zod, Zustand store, clock/time-of-day service, sprite-frame extraction, design tokens + pixel-art depth system, and the title bar + nav cluster. Then frictionless Capture, the Focus card (one thing + muted next-hint), today-scoping via the do-date, and the passive clock window whose glass tracks the time of day. After this epic Christopher can open a warm pixel-art Home, add a task with zero friction, and see exactly one calm thing in focus.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR11, FR15, FR16, FR27

### Epic 2: The Growing Garden — Windowsill & Greenhouse
The build-up metaphor made real. The garden domain (growth-stage advance, bloom → greenhouse, fresh sprout begins), the windowsill shelf scene on Home, the browsable greenhouse gallery, and favorite/curate of windowsill plants. Growth is exercised via a basic complete action here; the full completion ritual arrives in Epic 5. After this epic, completing a task grows a living plant, and bloomed plants persist forever in a greenhouse he curates — nothing ever wilts.
**FRs covered:** FR8, FR9, FR9a, FR9b, FR9c, FR9d

### Epic 3: K's Notes — Vault & Timing Engine
The soul of Kept. The Note schema, `notes.json` seeding + launch-time import (upsert by stable `key`, history preserved), the hidden unsurfaced pool, three rarity buckets, four targeting dials, the deterministic 7-step timing cascade, the `first_open` trigger, and K's note card woven into the windowsill — surfacing regardless of completion. After this epic, K's notes bloom on Home on the engine's timing, seedable by Kayla with no in-app UI and invisible as a queue to Christopher.
**FRs covered:** FR10, FR20, FR21, FR22, FR23, FR24, FR25

### Epic 4: The Two-Date Safety Net & Show-Me-My-Day
Real-life structure without pressure. The quietly-held deadline (never red, no countdown), the approaching-deadline auto-pull-into-today when no do-date is set, and the today-scoped Now/Next/Later peek. After this epic, Christopher can glance at his whole day in calm finishable buckets and trust a real deadline won't be silently lost — with no urgency anywhere.
**FRs covered:** FR12, FR13, FR14, FR17, FR17a

### Epic 5: The Completion Ritual
The emotional climax that ties task → plant → note together. The slow, deliberate click-and-drift gesture that drifts the finished task away and fades it, advances (or blooms) the windowsill plant with a soft gold halo, and blooms K's note in at the same moment — plus the reduce-motion fallback that preserves outcomes. Builds on Epics 2 + 3. After this epic, finishing a task is a moment where accomplishment and love land together, never a checkbox tick.
**FRs covered:** FR18, FR19

### Epic 6: Caring States, Day/Night Tone, Journal & Delivery
The finishing emotional layer and shipping. First-run empty pot + gentle invitation + immediate welcome note, the empty/cleared-day gentle pull-ahead offer (declining is valid), the nothing-done day (garden holds, notes still bloom, no scolding/red), the no-connectivity-ever guarantee, the day/night tonal shift (Loving Coach → Soft Landing), the opt-in Day Journal keepsake, and NSIS packaging + Kayla's note-seed workflow. After this epic, Kept handles every emotional state with care — especially the hard days — and ships as one complete, finished, installable app.
**FRs covered:** FR26, FR28, FR29, FR30, FR31, FR32

### Epic 7: The Drawer — Seeing & Editing Held Tasks
Control over his own data without breaking the calm. A deliberately-opened, closed-by-default surface (4th title-bar nav icon) that lists held tasks beyond today in gentle Soon/Later/Someday groups with search — so Christopher can confirm what he already captured, fix mis-captures, reschedule when plans change, and let go of what he no longer needs, editing one task at a time. Home and the peek stay today-scoped; the drawer is the single never-auto-surfaced exception, still free of counts, red, and urgency. Builds on the Task model (Epic 1) and the two-date controls (Epics 1, 4).
**FRs covered:** FR33, FR34, FR35

---

## Epic 1: Foundation, Capture & The Calm Home

The greenfield base plus the minimum usable loop: open Kept, add a task with zero friction, and see exactly one calm thing in focus on a warm pixel-art Home with a time-of-day clock window. Stories 1.1–1.4 are the unavoidable greenfield foundation (each framed by the value it unlocks); 1.5–1.7 deliver the visible user value. **Design-Law Guardrails (AR17 / NFR5) apply to every story: no red, no counts/badges/progress, no gating, no OS notifications, no network, no connectivity UI, and the app never addresses the user by name.**

### Story 1.1: Scaffold a runnable Kept desktop window

As Christopher (the only user),
I want Kept to open as a warm desktop window,
So that the app exists as something I can launch and return to.

**Acceptance Criteria:**

**Given** the chosen starter
**When** the project is scaffolded via `npm create @quick-start/electron@latest kept -- --template react-ts`
**Then** the repo has the main/preload/renderer three-process structure
**And** `.gitignore` ignores `imports/*`, extracted sprite frames, and `*.db`

**Given** the scaffolded app
**When** `electron-vite dev` runs
**Then** a single resizable window opens on a placeholder Home with working HMR

**Given** Electron hardening (AR7)
**When** the window loads
**Then** `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true` are set
**And** the renderer loads only local content with a minimal CSP applied

**Given** the runtime (AR2)
**Then** Electron 41, React 19, and TypeScript are configured across main, preload, and renderer

**Given** the local-first constraint (NFR1, NFR2, FR31)
**Then** no network calls, telemetry, accounts, or connectivity UI exist anywhere in the app

### Story 1.2: Pixel-art design system & calm Home shell

As Christopher,
I want a warm, dim, pixel-art window with a title bar I can navigate from,
So that opening Kept feels like a calm lit room rather than a productivity dashboard.

**Acceptance Criteria:**

**Given** the DESIGN.md tokens (UX-DR1)
**When** the design system is implemented
**Then** `renderer/styles/tokens.css` defines the Candlelit Sage palette, the spacing scale, hard-corner radius, and typography tokens as CSS variables
**And** `global.css` sets `image-rendering: pixelated` and a single-column, centered, reading-width layout

**Given** the pixel-art depth system (UX-DR3)
**Then** panels use hard offset pixel shadows (no blur), layered/dithered borders, a subtle checkerboard texture, and a candle-glow vignette
**And** the soft glow is reserved for bloom moments only

**Given** typography (UX-DR2)
**Then** Pixelify Sans is the primary display face and Inter is wired as the legibility fallback for longer body copy

**Given** the title bar (UX-DR4, FR1)
**When** Home renders
**Then** a pixel title bar shows window dots and the "Kept" wordmark
**And** a top-right nav cluster shows pixel-icon buttons home · greenhouse · journal · drawer · "+", with a growth-deep selected ring on the current surface
**And** the home and "+" buttons are functional now; the greenhouse, journal, and drawer buttons render and become functional in their epics (no forward dependency)

**Given** the Design Law (NFR5)
**Then** no red appears anywhere and no badges or counts appear on the title bar

### Story 1.3: Local-first data layer with the Task model

As Christopher,
I want my tasks stored privately on my own device,
So that nothing I add ever leaves my machine and it is all here when I come back.

**Acceptance Criteria:**

**Given** Prisma 7 with the `@prisma/adapter-better-sqlite3` adapter in no-Rust-engine mode (AR3)
**When** the data layer is wired in the main process
**Then** the SQLite file is created at `app.getPath('userData')/kept.db`
**And** no query-engine binary is bundled into the app

**Given** the native better-sqlite3 module
**Then** it is rebuilt for Electron via `@electron/rebuild` and unpacked via `asarUnpack`

**Given** the schema (AR4)
**When** `prisma migrate` runs
**Then** a **Task** model exists with id (cuid), title, doDate? (date-only), deadline? (date-only), bucket (now|next|later), status, createdAt, and completedAt?
**And** only the Task entity is created in this story (other entities are added in their epics)

**Given** data access (AR8)
**Then** a `taskRepo` in `src/main/db/repositories` is the only caller of the Prisma client for tasks

**Given** cross-boundary dates
**Then** date-only fields are stored and handled as `yyyy-MM-dd` local strings, with no timezone math in the renderer

### Story 1.4: Typed IPC bridge for tasks

As Christopher,
I want the app's screen and its private data to talk to each other safely,
So that the app works without ever exposing my data or the system.

**Acceptance Criteria:**

**Given** the preload bridge (AR6, AR7)
**When** it loads
**Then** it exposes a typed `window.kept` API via contextBridge as the only renderer↔main surface
**And** the renderer never imports Prisma, better-sqlite3, fs, or Node APIs

**Given** IPC
**Then** communication is request/response via `ipcRenderer.invoke` / `ipcMain.handle`, with channels `kept.tasks.create` and `kept.tasks.today`

**Given** every handler (AR6, AR8)
**Then** payloads are Zod-validated in main and responses use `Result<T> = { ok: true; data } | { ok: false; error: { code; message } }`
**And** shared types and Zod schemas live in `src/shared`

**Given** a failed or invalid call (NFR5)
**Then** the error returns as a calm typed result, never surfaced as red or alarm in the UI

**Given** renderer state (AR13)
**Then** a Zustand store is established as a renderer-side mirror updated only from IPC `ok` results

### Story 1.5: Frictionless capture

As Christopher,
I want to add a task by typing a few words and pressing Enter,
So that capturing never costs me planning effort or pressure.

**Acceptance Criteria:**

**Given** any surface (FR1)
**When** I click the "+" at the top-right of the title bar (or use its keypress)
**Then** the Add-a-task page opens with the capture input focused

**Given** the capture input (FR2)
**When** I type a few words and press Enter
**Then** the task is saved and I return to a calm Home, keyboard-first, with no extra required step

**Given** capture (FR3)
**Then** there are no required fields
**And** the system automatically sorts the new task into a bucket (now/next/later) without me planning it

**Given** the optional dates (FR4, FR15, UX-DR11)
**When** I choose to add them
**Then** I can attach a do-date and/or a deadline via muted, clearly-skippable dashed chips below the input (do-date sage dot, deadline gold/bloom dot — never red)
**And** neither is demanded and no date picker is forced up front

**Given** a save (FR5)
**Then** the task settles in quietly — no badge, no count, no toast, no celebratory interruption

**Given** calm responsiveness (NFR3)
**Then** capture and its return are immediate, and the input matches UX-DR11 (prominent pixel-bordered field, green pixel caret, muted placeholder, hard offset shadow)

### Story 1.6: The focus card & today-scoping

As Christopher,
I want Home to show exactly one calm thing with a quiet hint of what's next,
So that I can act on one task while trusting the rest is held — never exposed to the whole list.

**Acceptance Criteria:**

**Given** today's tasks (FR6, UX-DR6)
**When** Home renders
**Then** exactly one task shows in the lifted focus card with a small growth eyebrow ("Your one thing"), the title in app-focus-task, and a quiet muted breath line below it

**Given** the focus area (FR7)
**Then** it shows no checkbox, no count, and no deadline badge

**Given** what's next (FR6)
**Then** a single muted next-hint line appears below the focus — glanceable, never a list

**Given** the Horizon Limit (FR11)
**Then** Home is today-scoped only for tasks
**And** no full-backlog or multi-day task view exists anywhere

**Given** the do-date (FR16)
**Then** a task is pulled into "today" by its do-date (deadline auto-pull arrives in Epic 4)

**Given** the depth system (UX-DR3, UX-DR6)
**Then** the focus card is the most elevated element on Home

### Story 1.7: Clock window & day/night phase

As Christopher,
I want a passive window on Home whose glass color shows the time of day,
So that the room quietly shifts with the clock without any clock ever nagging me.

**Acceptance Criteria:**

**Given** the clock service in main (AR10)
**When** the app runs
**Then** the local system clock is the single source of truth and `kept.clock.phase` computes the phase (morning 5–9, day 9–17, dusk 17–20, night 20–5) and start-of-local-day
**And** the renderer never computes time from `new Date()`

**Given** the window sprite frames (AR15)
**When** extraction runs
**Then** the orange-frame arched-window glass frames are extracted from `imports/16x16_windows_orange.png` to `resources/windows/` (morning/day/dusk/night)
**And** the source sheets stay gitignored

**Given** Home's upper-right (FR27, UX-DR5)
**When** it renders
**Then** the pixel arched-window sprite shows with the current time below it in gold (Pixelify Sans, time only, no caption)

**Given** the phase
**Then** the glass color is the indicator: amber `#E5CFAF` (morning) → blue `#96ADB8` (day) → mauve `#B691B5` (dusk) → navy `#5C4C75` (night)

**Given** the clock window
**Then** it is never interactive and never a notification, and it casts a hard pixel drop-shadow like the rest of the scene

---

## Epic 2: The Growing Garden — Windowsill & Greenhouse

The build-up metaphor made real: completing a task grows a living plant, and bloomed plants persist forever in a browsable greenhouse the user curates onto the windowsill — nothing ever wilts. Growth is exercised here via a basic complete action; the full completion ritual (slow drift + note bloom) is layered on in Epic 5. **Design-Law Guardrails (AR17 / NFR5) apply to every story: no counts, no progress-to-bloom meter, no rare/legendary tiers, no empty/locked slots, no red, no gating; plants never wilt/decay/reset.**

### Story 2.1: Plant & garden data + plant sprites

As Christopher,
I want the app to hold a growing plant and a collection of what I've bloomed,
So that my accomplishments have somewhere to accumulate and stay.

**Acceptance Criteria:**

**Given** the schema (AR4)
**When** `prisma migrate` runs
**Then** a **Plant** model exists (id, speciesKey, growthStage, state growing|bloomed, isFavorite, sillOrder?, bloomedAt?) and a **GardenState** singleton exists (currentlyGrowingPlantId, completionsTowardBloom)
**And** only these entities are added in this story

**Given** completionsTowardBloom (NFR5, AR17)
**Then** it is internal-only plumbing, never included in any DTO or sent to the renderer

**Given** plant sprite frames (AR15)
**When** extraction runs
**Then** bulb→sprout→stem→bloom growth frames are extracted from the brown-pot columns of `imports/Plants.png` (16×32 cells) to `resources/plants/` per species
**And** red flower frames are excluded and the source sheet stays gitignored

**Given** data access (AR8)
**Then** a plantRepo and gardenRepo are the only callers of the Prisma client for plants and garden state

**Given** the species model (FR9d)
**Then** no rare or legendary tiers exist

### Story 2.2: A plant grows with each completion

As Christopher,
I want each task I finish to make my plant grow a stage, and eventually bloom into my collection,
So that finishing something makes a living thing grow.

**Acceptance Criteria:**

**Given** `engine/garden.ts` pure domain logic (AR8, AR11)
**When** a task is completed via `kept.tasks.complete`
**Then** the currently-growing plant advances one growth stage (bulb→sprout→stem→bloom) and the completion is recorded internally, never surfaced as a count (FR9, NFR5)

**Given** the plant reaches its final stage after `COMPLETIONS_PER_BLOOM` completions (≈3–4, tunable in config) (FR9a, AR12)
**When** it blooms
**Then** it is moved to state=bloomed (joining the greenhouse) and a fresh sprout begins as the new growing plant on the windowsill

**Given** a fresh sprout (FR9d)
**Then** its species is random and warmth-only — not tied to performance, milestones, or achievement — with no rare/legendary tiers

**Given** a slow day or inactivity (FR9b)
**Then** plants never wilt, decay, die, or reset — a plant simply waits at its current stage and nothing is removed or diminished

**Given** growth stages (FR9)
**Then** they are conveyed visually only — never labeled, numbered, or shown as "stage X of Y"

**Given** the engine boundary (AR8, AR16)
**Then** `engine/garden.ts` has no IPC or Electron imports and is unit-tested with Vitest

### Story 2.3: The growing windowsill on Home

As Christopher,
I want a windowsill shelf on Home showing my growing plant and a few favorites,
So that the build-up of what I've grown is the dominant thing I see.

**Acceptance Criteria:**

**Given** Home (FR8, UX-DR7)
**When** it renders
**Then** the windowsill shows real pixel-plant sprites bottom-aligned on a wooden wall shelf (lit lip wood-light, face wood-mid, shadow wood-shadow, attached corbels; pots cast contact shadows)

**Given** the windowsill
**Then** it displays the one currently-growing plant plus a few curated favorites in limited, rearrangeable slots, under a muted eyebrow "Things you've grown."

**Given** growth
**Then** the growing plant renders at its current stage frame, and a completion shows the new stage frame (the slow ritual animation comes in Epic 5)

**Given** the Design Law (NFR5)
**Then** there are no numbers, no progress bars, and no progress-to-bloom meter — the plant is the measure, felt not counted

**Given** a slow day (FR9b)
**Then** windowsill plants never wilt or get removed

### Story 2.4: Browse the greenhouse

As Christopher,
I want a separate, calm gallery of every plant I've bloomed,
So that I can see the whole record of what I've grown over time.

**Acceptance Criteria:**

**Given** the greenhouse nav button (UX-DR8, FR9c)
**When** I select it
**Then** a greenhouse surface opens separate from Home via the state-driven view switch, and the greenhouse nav button shows the selected ring

**Given** the greenhouse layout
**Then** a centered header shows the eyebrow "THE GREENHOUSE" in gold, the off-white line "Everything you've grown.", and a muted "It all stays here. Nothing ever wilts.", above a vertical wall of wooden shelves holding rows of bloomed plant sprites, with a gentle closing line beneath

**Given** the collection (FR9c, FR11)
**Then** every bloomed plant persists here forever and is browsable, and the greenhouse is exempt from the today-only Horizon Limit because it holds accomplishments, not pending work

**Given** the Design Law (NFR5, FR9d)
**Then** there are no counts, no collection-completion %, no rare/legendary tiers, no empty or locked plant slots, and no red

**Given** the surface
**Then** no clock window appears here (Home only)

### Story 2.5: Curate favorites onto the windowsill

As Christopher,
I want to choose which bloomed plants sit on my windowsill and rearrange them,
So that I can keep my favorites in view any time.

**Acceptance Criteria:**

**Given** a plant in the greenhouse (UX-DR8, FR9c)
**When** I select it
**Then** a calm pixel-bordered popover offers "keep this one in view? · ♥ put on the windowsill"

**Given** I favorite a plant (`kept.garden.favorite`)
**Then** a small gold pixel heart marks it with a quiet "♥ on your sill" tag and a soft bloom glow
**And** it appears on the windowsill's limited display slots

**Given** favorited plants (`kept.garden.reorder`)
**When** I rearrange them
**Then** their windowsill order (sillOrder) updates and persists, any time

**Given** curation (NFR5)
**Then** it is never required and never gated — a calm, low-stakes act of keeping

**Given** the windowsill slots
**Then** they are limited, with no empty or locked slots shown and no count of the collection

---

## Epic 3: K's Notes — Vault & Timing Engine

The soul of Kept: K's notes are seeded by Kayla as plain data, hidden as a queue from Christopher, and surfaced one at a time on the engine's timing — including regardless of completion. **Design-Law Guardrails (AR17 / NFR5) apply to every story: the unsurfaced pool stays hidden; notes surface regardless of completion; only K's notes may use Christopher's name; no in-app authoring/editing; no network calls.**

### Story 3.1: The note data model

As Kayla,
I want a note model that captures rarity and all four targeting dials,
So that I can seed expressive notes the engine can later surface at the right moments.

**Acceptance Criteria:**

**Given** the schema (AR4)
**When** `prisma migrate` runs
**Then** a **Note** model exists with id (cuid), key (stable, UNIQUE — the upsert target), body, rarity (everyday|blue_moon|anchor), timeOfDay? (morning|evening|night), pinnedDate?, trigger? (first_open|first_win|finished_all|nothing_done|anchor_task), anchorKey?, and reusable
**And** a **NoteDelivery** model exists (noteId, surfacedAt)
**And** only these entities are added in this story

**Given** rarity (FR22)
**Then** it is one of three buckets with no numeric weights: everyday warmth, blue_moon, anchor

**Given** the four targeting dials (FR23)
**Then** the model encodes (1) time-of-day, (2) specific-date pin, (3) trigger moment, and (4) one-time vs. reusable

**Given** the app's read-only relationship to notes (FR20)
**Then** the schema is read-only to the app — no fields or handlers exist for in-app authoring or editing

**Given** validation (AR6, AR8)
**Then** note and delivery Zod schemas live in `src/shared`, and a noteRepo is the only caller of the Prisma client for notes and deliveries

### Story 3.2: Kayla's note vault — seeding & launch import

As Kayla,
I want to author notes as a plain `notes.json` file that loads into the app and updates without a reinstall,
So that I can keep adding encouragement over time with no in-app UI.

**Acceptance Criteria:**

**Given** `notes.json` (AR5, FR20)
**Then** K authors notes as a plain JSON file (one stable `key` per note), `prisma/seed.ts` loads it, and a copy is bundled with the build so the vault is full on first open

**Given** app launch (AR5)
**When** the notes-import service runs
**Then** it reads `notes.json` from a configurable `NOTES_FILE_PATH` and upserts by stable `key` — adding new notes and updating edited ones — while leaving NoteDelivery history and progress untouched

**Given** `NOTES_FILE_PATH` points at a cloud-synced folder (NFR1, NFR2)
**Then** Kayla can add notes anytime with no reinstall, and the app itself makes no network calls (an external sync tool moves the file)

**Given** the file is absent or unreachable (FR31)
**Then** the app uses the notes it already has (offline-safe) and shows no error or connectivity UI

**Given** local storage
**Then** the SQLite `.db` is never synced — only `notes.json` is the synced source

### Story 3.3: The timing engine selection cascade

As Christopher,
I want the app to choose the right note for the shape of my day,
So that K's words feel like they arrive in the moment rather than on a schedule.

**Acceptance Criteria:**

**Given** `engine/timingEngine.ts` and `triggers.ts` pure domain logic (AR8, AR9, AR11)
**When** `kept.notes.next` is called with the shape of the day (time + phase, today's NoteDelivery rows, completions today, triggers fired now)
**Then** the deterministic cascade runs exactly: eligible pool → match filter → specificity tier → rarity respect → select → always-fallback → record

**Given** the eligible pool (FR24, AR12)
**Then** delivered one-time notes are retired and reusable notes within `COOLDOWN_DAYS` are excluded

**Given** the match filter (FR23, FR24)
**Then** a note is eligible if timeOfDay is null or equals the current phase, AND pinnedDate is null or equals today, AND trigger is null (ambient) or matches a trigger fired this moment

**Given** specificity (FR24)
**Then** tiers are T3 (matched trigger or pinnedDate), T2 (timeOfDay-targeted), T1 (everyday ambient); the highest tier with candidates wins, with ties broken by gentle randomness

**Given** rarity respect (FR22, FR24)
**Then** a blue_moon note remains a candidate only with probability `BLUE_MOON_CHANCE`; otherwise it is set aside

**Given** no candidates survive (FR24, FR25)
**Then** the engine always falls back to the everyday pool so a moment is never empty

**Given** a selection (FR24)
**Then** NoteDelivery is written; a reusable note goes to cooldown and a one-time note is retired

**Given** the engine boundary (AR16)
**Then** the engine is unit-tested with Vitest across each cascade rule, and detects triggers including first_open/first_win/finished_all/nothing_done/anchor_task

### Story 3.4: K's notes bloom on Home

As Christopher,
I want K's notes to appear woven into my windowsill, one at a time on the app's timing,
So that her care is present without my ever seeing a queue or asking for it.

**Acceptance Criteria:**

**Given** Home (FR10, UX-DR9)
**When** a note surfaces
**Then** it renders on K's note card woven into the windowsill — warm gold partner-voice text on a faint wash, a dashed partner-voice border, signed "— K", with a soft bloom glow on arrival

**Given** the note card (AR17)
**Then** it is the only surface that may show Christopher's name; the app's own chrome never does

**Given** the hidden vault (FR21)
**Then** Christopher can never see the unsurfaced pool or the queue; notes are received one at a time, as they bloom, on the engine's timing — never on demand

**Given** surfacing (FR25)
**Then** a note can surface regardless of completion (the nothing-done-day state is handled in Epic 6 using this capability)

**Given** the two voices (UX-DR9)
**Then** the note voice is set apart by color and treatment, not font (both Pixelify Sans)

---

## Epic 4: The Two-Date Safety Net & Show-Me-My-Day

Real-life structure without pressure: a real deadline is held quietly and surfaces on its own only when near, and the today-scoped Now/Next/Later peek lets Christopher glance at his whole day on demand. **Design-Law Guardrails (AR17 / NFR5) apply to every story: no red, no countdown/timer, no "overdue" alarm, no full-backlog view, no counts framed as pressure.**

### Story 4.1: The quietly-held deadline & auto-pull-in

As Christopher,
I want a real deadline to be held quietly and surface on its own only when it's near,
So that a real due date is never silently lost yet never pressures me.

**Acceptance Criteria:**

**Given** a task with a deadline (FR17)
**Then** the deadline is held quietly as a safety net and is never rendered with urgency anywhere — no red, no countdown, no "overdue" alarm

**Given** the clock service and the `APPROACHING_DEADLINE_DAYS` tunable (AR10, AR12)
**When** a deadline approaches and the task has no do-date set (FR17a)
**Then** Kept quietly pulls that task into today's buckets on its own

**Given** the auto-pull (FR17a)
**Then** it happens with no red, alarm, or countdown — the task simply appears in today

**Given** the pull-in logic (AR8, AR11)
**Then** it lives in the engine/triggers and the today query (no Electron imports) and is unit-testable

**Given** a task that already has a do-date (FR16)
**Then** it organizes by its do-date, and the auto-pull applies only when no do-date is set

### Story 4.2: Show-me-my-day peek

As Christopher,
I want to summon a calm, today-scoped glance of my day in small buckets,
So that I can see the fuller picture on demand without ever facing the whole backlog.

**Acceptance Criteria:**

**Given** Home (FR12)
**When** I use the quiet "show me my day" affordance (click or keypress)
**Then** the peek opens calmly on a slightly dimmed scrim
**And** using it again dismisses it the same way, calmly

**Given** the peek (FR13, UX-DR10)
**Then** it presents today's tasks in small, finishable buckets — Now / Next / Later — never a single ranked wall
**And** each bucket is headed in Pixelify Sans (growth / partner-voice / text-muted) with items as plain pixel lines and calm pixel bullets (no checkboxes)

**Given** a quietly-held deadline in view (FR14)
**Then** it appears as a muted, non-red pixel tag (e.g. "paper · Fri") — never as pressure, never a countdown

**Given** the Horizon Limit (FR11)
**Then** the peek is today-scoped only — no full backlog, no future, no counts framed as pressure

**Given** calm responsiveness and the accessibility floor (NFR3, NFR4)
**Then** the peek opens and closes immediately and is fully keyboard-operable to open and dismiss

---

## Epic 5: The Completion Ritual

The emotional climax that ties task → plant → note together: a slow, deliberate gesture drifts the finished task away, advances or blooms the windowsill plant with a gold halo, and blooms K's note in at the same moment — with a reduce-motion fallback that preserves every outcome. Builds on Epics 2 + 3. **Design-Law Guardrails (AR17 / NFR5) apply to every story: no count, no badge, no "task completed ✓" confirmation; the growth and the note are the only acknowledgment.**

### Story 5.1: The slow completion gesture

As Christopher,
I want completing my focus task to be a deliberate, slow gesture,
So that finishing feels like a moment I chose, not a checkbox I ticked.

**Acceptance Criteria:**

**Given** Motion 12 (AR13)
**When** the renderer root mounts
**Then** it wraps the app in `<MotionConfig reducedMotion="user">` and exposes `useReducedMotion` for ritual animations

**Given** the focus task (FR18)
**When** I complete it
**Then** completion is a deliberate, slow click-and-drift gesture — never a checkbox tick (there is no checkbox)

**Given** the gesture (FR18, NFR3)
**Then** it is intentionally slow (not a loading state), slow enough to feel like a moment

**Given** the drift (FR19)
**Then** the finished focus card drifts softly out of focus and settles toward the windowsill, fading

**Given** the accessibility floor (NFR4)
**Then** the gesture is keyboard-operable — completion can be triggered without a mouse

### Story 5.2: The completion bloom — growth and a note land together

As Christopher,
I want my plant to grow and one of K's notes to bloom in at the moment I finish,
So that the accomplishment and the encouragement arrive together.

**Acceptance Criteria:**

**Given** a completion (FR19)
**When** the task finishes drifting away
**Then** the currently-growing windowsill plant advances one stage with a soft pale-gold bloom halo and a quiet "something grew" marker (using the Epic 2 garden mechanic)

**Given** the plant was at its final stage (FR19, FR9a)
**When** it advances
**Then** it blooms and drifts into the greenhouse as a fresh sprout takes its place on the windowsill

**Given** the same moment (FR19)
**Then** one of K's notes blooms in on its glowing dashed card (via `kept.notes.next`) — the accomplishment and the encouragement land together

**Given** the data flow (UX-DR12)
**Then** `kept.tasks.complete` returns `{ plant, note }` and the renderer animates drift + growth + note bloom from that single result, updating the store from `data`

**Given** the bloom glow (UX-DR3)
**Then** it is the one true soft glow in the system — reserved for this arrival moment, never routine chrome

**Given** the Design Law (NFR5)
**Then** no count, badge, or "task completed ✓" confirmation appears — the growth and the note are the acknowledgment

### Story 5.3: Reduce-motion that preserves outcomes

As Christopher,
I want a reduce-motion option that softens or skips the animations,
So that I can keep the calm without the movement when I need to — and still get the plant and the note.

**Acceptance Criteria:**

**Given** the reduce-motion option (NFR4, UX-DR16)
**When** the OS "reduce motion" preference is set (`reducedMotion="user"`) or the in-app setting is on
**Then** the completion drift, plant growth, and note bloom glow are softened or skipped

**Given** reduced motion (NFR4)
**Then** the outcomes are preserved — the plant still appears at its new stage (or in the greenhouse) and K's note still arrives and is present

**Given** all motion (AR13)
**Then** every ritual animation respects `useReducedMotion`, and no animation is mandatory to reach an outcome

**Given** the setting
**Then** reduce-motion never changes what happens, only how it is shown

---

## Epic 6: Caring States, Day/Night Tone, Journal & Delivery

The finishing emotional layer and shipping: the day/night tonal shift, the first-run welcome, the caring empty / nothing-done / always-offline states, the opt-in Day Journal keepsake, and NSIS packaging plus Kayla's note-seed workflow — so Kept handles every emotional state with care (especially the hard days) and ships as one complete, finished, installable app. **Design-Law Guardrails (AR17 / NFR5) apply to every story: presence is constant (notes still bloom on nothing-done days); no red, no count, no urgency, no scolding, no connectivity UI; the app never addresses the user by name.**

### Story 6.1: Day/night tone — Loving Coach to Soft Landing

As Christopher,
I want the app's warmth to shift gently with the clock,
So that it encourages me by day and lets me land softly at night, never nagging.

**Acceptance Criteria:**

**Given** the clock phase (FR26, UX-DR13, AR10)
**When** the local clock moves through the day
**Then** the surface dims on the same palette — Loving Coach by Day (warmer, slightly brighter) → Soft Landing by Night (dimmer, softer) — coordinated with the clock-window glass shift
**And** it is a tonal shift, not a second theme

**Given** the night register (FR26)
**Then** pressure dissolves into acceptance and a fresh slate is offered, and the night voice never nags about the undone

**Given** the tonal shift (FR26)
**Then** it is tonal only — it never hides or locks his day; Kept suggests calm, never imposes it

**Given** the two voices (UX-DR15)
**Then** the app's own voice stays calm, plain, and never by name, encouragement is never guilt, and the copy follows the Voice & Tone Do/Don't (e.g. "One calm thing.", "Rest is allowed.")

**Given** the Design Law (NFR5)
**Then** no countdown, urgency, or red appears in any register

### Story 6.2: First-ever open — the welcome

As Christopher,
I want my first open to feel warm and already-cared-for,
So that I know from the first second the love is here and not something I have to earn.

**Acceptance Criteria:**

**Given** first-ever open (FR28, UX-DR14)
**When** Home first renders with no tasks
**Then** it shows an empty terracotta pot waiting to grow with one gentle invitation to add a first small thing — warm and inviting, never a "0 tasks" void

**Given** the welcome note (FR28, AR9)
**When** the app opens for the first time
**Then** a one-time welcome note from K blooms immediately — before any task is completed — via the `first_open` trigger and a first-run flag in GardenState

**Given** placeholder copy (FR28)
**Then** the invitation line and welcome note text are Kayla's to write, and a gentle placeholder stands in until the vault is filled (e.g. "Nothing here yet. When you're ready, plant one small thing.")

**Given** the Design Law (NFR5)
**Then** no count, no "0", and no empty-void framing appears

### Story 6.3: Caring empty, nothing-done & offline states

As Christopher,
I want the app to hold me gently on empty and hard days,
So that a slow day is never met with guilt, red, or a sense of falling behind.

**Acceptance Criteria:**

**Given** an empty/cleared day (FR29, UX-DR14)
**When** everything is done
**Then** the windowsill stands with the growing plant and curated favorites and the greenhouse persists
**And** Kept optionally offers a gentle pull-ahead win, phrased as an offer that is never pressure, and declining is a complete, valid answer

**Given** a day with nothing done (FR30)
**Then** the garden simply holds what has already grown, plants never wilt, and K's notes still bloom (via the nothing_done trigger) — with no scolding, no red, and no "you didn't do anything"

**Given** the always-offline reality (FR31, NFR2)
**Then** Kept never shows connectivity or sync UI of any kind — no banners, no offline state, ever

**Given** the Design Law (NFR5)
**Then** no red, count, or urgency appears in any of these states

### Story 6.4: The Day Journal keepsake

As Christopher,
I want an opt-in journal of what I finished and the note that came with it,
So that I can revisit the record of good days when I choose to.

**Acceptance Criteria:**

**Given** the JournalEntry entity (AR4, AR8)
**When** `prisma migrate` runs
**Then** a **JournalEntry** model exists (day + completed-task snapshot + the NoteDelivery shown)
**And** only this entity is added in this story, with a journalRepo as the only Prisma caller

**Given** the journal nav button (FR32)
**When** I select it
**Then** the Day Journal opens as an opt-in surface separate from Home (never auto-surfaced) via the state-driven view switch

**Given** the journal (FR32)
**Then** it stacks completed tasks paired with the note that appeared, by day, as a revisitable record (`kept.journal.list`)

**Given** already-delivered notes (FR21, FR32, UX-DR9)
**Then** they are safe to revisit here in K's note card voice, while the unsurfaced pool remains hidden

**Given** the Horizon Limit (FR11)
**Then** Home stays today-scoped — the journal does not bring a backlog onto Home

### Story 6.5: Package & deliver Kept (with Kayla's seed workflow)

As Kayla,
I want to build Kept into an installer and keep adding notes after delivery,
So that Christopher receives one complete, finished app and her vault can grow over time.

**Acceptance Criteria:**

**Given** electron-builder (AR14)
**When** the build runs
**Then** it produces an NSIS installer for Windows x64 with `npmRebuild` plus `@electron/rebuild` for better-sqlite3 and `asarUnpack` of its `.node` binary

**Given** licensed assets (AR14, AR15)
**Then** extracted sprite frames in `resources/` are bundled while source sheets stay gitignored (never committed or redistributed)

**Given** first run (FR28, AR5)
**When** the installed app launches
**Then** the SQLite DB auto-creates in userData and the bundled `notes.json` seeds a full vault so the first open is complete and offline

**Given** ongoing updates (AR5)
**Then** Kayla edits `notes.json` in a cloud-synced folder and the launch-time import upserts new/edited notes by `key` with no reinstall and no app network calls
**And** `NOTES_FILE_PATH` points at that location, falling back to the bundled copy if unset or unreachable

**Given** the local-first constraint (NFR1, NFR2)
**Then** the app makes no network calls and needs no account, server, or auto-update service; signing is optional (unsigned = a one-time SmartScreen "Run anyway")

---

## Epic 7: The Drawer — Seeing & Editing Held Tasks

Control over his own data without breaking the calm: a deliberately-opened, closed-by-default surface (the 4th title-bar nav icon) where Christopher finds, edits, reschedules, and lets go of held tasks beyond today — in gentle Soon/Later/Someday groups with search, one task at a time. Home and the peek stay today-scoped; the drawer is the single never-auto-surfaced exception. Builds on the Task model (Epic 1) and the two-date controls (Epics 1, 4). **Design-Law Guardrails (AR17 / NFR5) apply to every story: no counts, no red, no overdue, no countdown, no dense ranked wall, no scolding; deleting a task never touches plants/greenhouse or notes; notes stay strictly read-only.** Reference mockup: `mockups/drawer.html` (the edit affordance appears on hover/focus only).

### Story 7.1: The drawer — find what you're keeping

As Christopher,
I want a calm, opt-in surface that shows the tasks I'm keeping beyond today, grouped gently and searchable,
So that I can trust nothing's lost and find something without facing a backlog wall.

**Acceptance Criteria:**

**Given** the drawer nav button (FR33, UX-DR4, UX-DR17)
**When** I select it
**Then** the drawer opens as a surface separate from Home via the state-driven view switch — closed by default, never auto-surfaced, never the initial view — and the drawer nav button shows the selected ring

**Given** my held tasks (FR33, AR12)
**Then** they appear in gentle, generously-spaced groups **Soon / Later / Someday** — Soon/Later derived from do-date proximity (`DRAWER_SOON_DAYS` tunable), Someday = no do-date set — with **no per-group counts**

**Given** a quietly-held deadline (FR17)
**Then** it shows as a muted, non-red tag (e.g. "paper · Fri") — never red, never a countdown or "overdue"

**Given** search (FR33)
**Then** a calm search field filters the list by title so I can confirm whether I already added something

**Given** the data path (AR6, AR8)
**Then** `kept.tasks.list` returns the grouped held tasks, Zod-validated, with `taskRepo` the only Prisma caller

**Given** the Design Law (NFR5)
**Then** no counts, no red, no overdue, no urgency, and no dense ranked wall — the surface is calm and spacious

**Given** the Horizon Limit (FR11)
**Then** Home and the peek remain today-scoped, and the drawer never becomes a default or auto-surfaced view

**Given** the accessibility floor (NFR4)
**Then** the drawer and its search are fully keyboard-operable

### Story 7.2: Edit & reschedule a task

As Christopher,
I want to fix a task's words and move its dates when plans change,
So that the app stays accurate without my having to delete and re-add things.

**Acceptance Criteria:**

**Given** a task in the drawer (FR34)
**When** I select it
**Then** a calm single-task editor opens for that one task — one at a time, never a bulk grid

**Given** the editor (FR34, UX-DR11, UX-DR17)
**Then** I can change the title and adjust or clear the do-date and/or deadline via the same muted, optional, never-red dashed chips as capture

**Given** a save (FR34, FR5)
**Then** `kept.tasks.update` persists the change, the bucket is re-derived automatically (no manual bucketing), and it settles quietly — no badge, count, or celebratory interruption

**Given** rescheduling (FR16, FR34)
**Then** changing the do-date re-files the task into today/Soon/Later accordingly, and clearing it moves the task to Someday

**Given** the Design Law (NFR5)
**Then** editing shows no urgency, no red, and no count

**Given** the accessibility floor (NFR4)
**Then** the editor is fully keyboard-operable (open, edit, save, cancel)

### Story 7.3: Let go of a task

As Christopher,
I want to delete a task I no longer need, gently,
So that my drawer reflects what's actually true without guilt or alarm.

**Acceptance Criteria:**

**Given** a task in the editor/drawer (FR35)
**When** I choose to let it go
**Then** a calm, non-alarming confirmation appears — never a red destructive alarm

**Given** confirmation (FR35, AR8)
**Then** `kept.tasks.delete` removes the task (a real row delete; no archive/soft-delete) and the drawer updates quietly

**Given** the garden (FR9b)
**Then** deleting a task never affects grown plants or the greenhouse — accomplishments already earned are untouched

**Given** notes (FR20)
**Then** notes remain strictly read-only — nothing here edits or deletes notes

**Given** the Design Law (NFR5)
**Then** no red, no count, and no scolding — letting go is a calm, low-stakes act
