---
title: "Sprint Change Proposal — The Drawer (task viewing & editing)"
project: todo-app (Kept)
date: 2026-06-16
author: Kayla
mode: Incremental
status: proposed
scope_classification: Moderate
artifacts_touched: [PRD, Architecture, Epics, UX (EXPERIENCE.md + DESIGN.md), mockups]
---

# Sprint Change Proposal — "The Drawer"

## 1. Issue Summary

**Problem statement.** Kept currently provides **no way to edit, reschedule, or delete a task after capture** (capture FR1–FR5 is strictly one-way), and **no way to see any task beyond today** (the only task surfaces are the Home focus card, the today-scoped peek, and the completed-only Day Journal). The Horizon Limit (FR11) — designed to prevent overwhelm-by-exposure — has the unintended side effect of **trapping Christopher's own data with no management affordance**, and gives him **no way to confirm he already captured something** (duplicate/"did it save?" anxiety).

**How it surfaced.** Raised by Kayla (product owner) during planning review, before any implementation. Issue type: **new requirement + a gap in the original spec** (no FR, story, IPC channel, or repository method ever covered task update/delete or a beyond-today view).

**Why it matters / the tension.** The literal request — "view/edit tasks past today" — collides head-on with Kept's thesis (*"Seeing all his pending tasks at once triggers shutdown"*; FR11, NFR5, §8 Non-Goals). The resolution distinguishes two needs with very different Design-Law risk:
- **Edit / reschedule / delete / confirm-already-captured** — control over his own data and trust that nothing is lost. **Low risk**; a genuine gap.
- **A default multi-day planning wall** — the shutdown trigger. **Out of scope.**

Kayla set the safe boundary herself: *"this shouldn't be a main screen by any means — but he does need to be able to see an editor screen."* The change delivers the first need while preserving the thesis.

**Evidence.** Repo is greenfield (only `Initial commit` + `BMAD method setup`); nothing is implemented, so this is a planning-artifact change, not a code rollback. Across PRD/Epics/Architecture/UX, no artifact provides task update/delete or a beyond-today read path. Confirmed gap.

## 2. Impact Analysis

### Epic Impact
- **Epic 1 (Foundation/Capture/Home):** Story 1.2 nav cluster gains a 4th icon (the drawer); no other Epic 1 story changes (the Drawer's data/IPC primitives live in the new epic's stories, consistent with how every epic carries its own data+IPC+UI slice).
- **New Epic 7 (The Drawer):** a small, cohesive epic for the surface + single-task editor + delete. Most analogous to the Greenhouse/Journal (opt-in, nav-reached, never auto-surfaced).
- **Epics 2–6:** none invalidated; no resequencing required. Epic 7 slots after Epic 4 (shares the two-date controls) and before packaging (6.5).

### Artifact Conflicts
- **PRD:** amend FR11 (Horizon Limit), NFR5 (drop/qualify the "full-backlog views" ban), §8 Non-Goals; add §6.10 + FR33–FR35; add a glossary entry. (Notes stay strictly read-only — that ban is untouched; only *tasks* become editable.)
- **Architecture:** add IPC verbs `kept.tasks.list / update / delete` (AR6); `taskRepo` gains `update`/`delete` (AR8); add the Drawer view to the state-driven switch (AR13); add `DRAWER_SOON_DAYS` tunable (AR12). **No schema change** — Task already carries `title/doDate/deadline/bucket/status`. Delete is a real row delete (no soft-delete/archive field, to avoid a hidden second backlog).
- **UX:** EXPERIENCE.md IA table, Horizon-Limit paragraph, Component Patterns (+2 rows), Interaction Primitives (+ refine the banned line), Accessibility Floor; DESIGN.md component tokens + two component specs + the nav-cluster icon + the Do/Don't row. New mockup `mockups/drawer.html`.
- **Secondary artifacts:** addendum / review-rubric / decision-logs are minor, non-blocking touch-ups. No CI/IaC/deploy impact.

### Technical Impact
Contained: three new IPC handlers + Zod schemas, two new `taskRepo` methods, one new renderer feature (`features/drawer`) + its editor, one new tunable. No new entity, no migration beyond what Epic 1 already creates, no change to the timing engine, garden, or clock services.

## 3. Recommended Approach

**Selected: HYBRID — Direct Adjustment + a targeted PRD amendment.**

- **Option 1 — Direct Adjustment:** *Viable.* Add FRs + stories within the existing structure (+ one small epic). **Effort: Medium · Risk: Medium** (the only real risk is Design-Law fidelity, mitigated by the calm-surface rules below).
- **Option 2 — Rollback:** *Not applicable* — nothing is built.
- **Option 3 — MVP review:** *Partial* — not a reduction, a surgical amendment to the Horizon Limit's wording plus a small, fenced scope addition.

**Rationale.** Because nothing is implemented, this is the ideal moment: cost is confined to planning artifacts + future stories. The thesis is preserved exactly where it matters — **Home and the peek stay today-scoped** — while one precise exemption (parallel to the existing greenhouse exemption) lets Christopher tend his own data.

**The calm-surface rules that keep it inside the Design Law (acceptance-level):**
1. **Opt-in, closed by default, never auto-surfaced** — reached only from its title-bar nav icon; never the initial view.
2. **Gentle grouping** — Soon / Later / Someday; **no per-group counts**, no dates-as-pressure, no overdue, **no red**, no countdown.
3. **Search** to confirm what's already captured.
4. **Edit one task at a time** (never a bulk grid); same muted, optional, never-red date chips as capture.
5. **Delete is "let it go"** — a calm, non-alarming confirmation, never a red destructive alarm.
6. Plants/greenhouse untouched by task deletion; **notes remain strictly read-only** everywhere.

## 4. Detailed Change Proposals

> All edits below were reviewed and **approved by Kayla** in Incremental mode.

### 4.1 PRD — `prds/prd-todo-app-2026-06-15/prd.md`

**P1 · §3 Goals — unchanged (deliberate).** The "one thing in focus… never the full list" goal governs Home and remains true; reviewed and intentionally left intact to keep the amendment surgical.

**P2 · FR11 (Horizon Limit) — amend.**
```
OLD: FR11. Home is today-scoped only for tasks; there is no full-backlog or
     multi-day task view anywhere (Horizon Limit). The greenhouse is exempt — it
     holds accomplishments (done), which Kept celebrates, not pending work.
NEW: FR11. Home and the show-me-my-day peek are today-scoped only for tasks; no
     full-backlog or multi-day task view is ever shown on Home or pushed at the
     user (Horizon Limit). Two surfaces are exempt, and only because the user
     opens them deliberately: the greenhouse (it holds accomplishments, not
     pending work) and the drawer (the opt-in, closed-by-default task-management
     surface of FR33 — never a default or auto-surfaced view, and still showing
     no counts, no red, and no urgency). The Horizon Limit governs what Kept
     shows him by default; it never traps his own data beyond his reach.
```

**P3 · new §6.10 with FR33–FR35 — add** (after §6.9 Day Journal).
```
### 6.10 The Drawer — Seeing & Editing Held Tasks
FR33. The user can open the drawer — a deliberately-opened, never-auto-surfaced,
closed-by-default surface reached from a quiet title-bar nav icon — listing his
held tasks (today and beyond) in gentle, generously-spaced groups (Soon / Later /
Someday) with a search field so he can confirm what he already captured. The
drawer shows no counts, no red, no overdue, no countdown — a calm place to find
and tend tasks, never a backlog wall. [ASSUMPTION] the day-window separating
"Soon" from "Later" is a build-tunable detail.

FR34. From the drawer, the user can edit a single task at a time — change its
words and adjust or clear its do-date and/or deadline (rescheduling when plans
change) — via the same muted, optional, never-red date controls as capture.
Edits settle in quietly: no badge, no count, no celebratory interruption.

FR35. From the drawer, the user can let go of (delete) a task with a calm,
non-alarming confirmation — never a red destructive alarm. A task is the user's
own to keep or release; tasks, unlike plants, may be removed because they are
pending intentions, not accomplishments. Notes remain strictly read-only and are
never editable or deletable from anywhere (FR20 unchanged).
```

**P4 · NFR5 banned-list — amend.**
```
OLD: ...countdowns/timers, required capture fields, full-backlog views, and any
     finish-to-unlock gating of notes or features.
NEW: ...countdowns/timers, required capture fields, and any finish-to-unlock
     gating of notes or features. No full-backlog view is ever shown on Home or
     pushed at the user; the opt-in drawer (FR33) is the single deliberately-
     opened exception, and even there shows no counts, no red, and no urgency.
```

**P5 · §8 Non-Goals — amend.**
```
OLD: - Full-backlog, multi-day, or dense-dashboard views (horizon is today only).
NEW: - A full-backlog, multi-day, or dense-dashboard view as a default or as Home
       (the default horizon is today only). In scope, narrowly: an opt-in,
       deliberately-opened drawer for finding and editing held tasks (FR33–FR35)
       — calm, grouped, searchable, never auto-surfaced, still free of
       counts/red/urgency.
```
*(The separate "In-app note authoring/editing/browsing" non-goal stays untouched — notes ≠ tasks.)*

**P6 · §11 Glossary — add row.**
```
| The Drawer | The opt-in, closed-by-default surface (reached from the title-bar
nav) where the user finds, edits, reschedules, and lets go of his held tasks —
grouped calmly as Soon / Later / Someday, searchable, with no counts, red, or
urgency. The one place tasks appear beyond today; never a default or
auto-surfaced view. |
```

### 4.2 Architecture — `architecture.md`

**A1 · IPC channel list (Naming Patterns) — amend.** Add `kept.tasks.list` (drawer query: held tasks grouped Soon/Later/Someday, today + beyond, search-filterable), `kept.tasks.update` (edit title/do-date/deadline; bucket re-derived), `kept.tasks.delete` (let-go). All Zod-validated in main, same `Result<T>` envelope. Directory-tree comment for `ipc/tasks.ts` → `(create/today/list/complete/update/delete)`.

**A2 · Data Architecture, Task entity — amend (no schema change).** Append: *"Tasks are editable and deletable by the user via the drawer (FR34–35): `taskRepo` exposes `update` (title/doDate/deadline; bucket re-derived) and `delete` (a real row delete — tasks are pending intentions the user controls, not accomplishments; no soft-delete/archive field, to avoid a hidden second backlog). No schema change is required."*

**A3 · Frontend Navigation — amend.** `...Home / Add / Greenhouse / Journal / Drawer (title-bar nav cluster); no URL router. The Drawer is an opt-in, closed-by-default view (FR33) reached only from its nav icon — never the initial view, never auto-surfaced.` Mirror in the two structure lists: `renderer/features/{…,drawer}` with `drawer/` commented `# FR33–35: held-task list (Soon/Later/Someday) + search + single-task editor`.

**A4 · Tunables — amend.** Add `DRAWER_SOON_DAYS` (FR33) to `src/main/config/tunables.ts` (the day-window separating "Soon" from "Later"), in both the cascade note and the tree comment.

**A5 · Requirements→Structure Mapping — add row.**
```
| The Drawer — see/edit/delete tasks (FR33–35) | renderer/features/drawer +
ipc/tasks.ts (list/update/delete) + db/repositories/taskRepo |
```

**A6 · Implementation Sequence — insert (before packaging).**
```
10. The Drawer — held-task list (Soon/Later/Someday) + search + single-task
    editor (tasks.list/update/delete); data/IPC primitives can land alongside
    the Task model (step 5).
11. Packaging (NSIS) + seed workflow for Kayla's vault.   (was step 10)
```

**A7 · NFR5 restatement (Requirements Overview) — amend** to match the PRD: `...required fields, or finish-to-unlock gating; no full-backlog view on Home or pushed at the user (the opt-in drawer is the sole deliberately-opened exception, still free of counts/red/urgency). (Design-law-level invariant.)`

*(The existing Design-Law Guardrails bind the drawer with no edit — they apply to every surface.)*

### 4.3 Epics — `epics.md`

**E1 · Requirements Inventory — add §6.10 (FR33–35) + amend the FR11 inventory line** (today-scoped default on Home & peek; two deliberately-opened exempt surfaces — greenhouse + drawer).

**E2 · FR Coverage Map — amend FR11 + add FR33–35.**
```
FR11: Epic 1 — today-scoped default (Home & peek); beyond-today tasks only in the
      opt-in drawer (Epic 7)
FR33: Epic 7 — the drawer: opt-in held-task surface, Soon/Later/Someday + search
FR34: Epic 7 — edit/reschedule a single task from the drawer
FR35: Epic 7 — let go of (delete) a task, calm confirmation
```

**E3 · Epic List — add Epic 7.**
```
### Epic 7: The Drawer — Seeing & Editing Held Tasks
Control over his own data without breaking the calm. A deliberately-opened,
closed-by-default surface (4th title-bar nav icon) listing held tasks beyond
today in gentle Soon/Later/Someday groups with search — so Christopher can
confirm what he already captured, fix mis-captures, reschedule when plans change,
and let go of what he no longer needs, editing one task at a time. Home and the
peek stay today-scoped; the drawer is the single never-auto-surfaced exception,
still free of counts, red, and urgency. Builds on the Task model (Epic 1) and the
two-date controls (Epics 1, 4).
FRs covered: FR33, FR34, FR35
```

**E4 · Epic 1 · Story 1.2 (nav cluster) — amend.** Nav cluster becomes `home · greenhouse · journal · drawer · "+"`; "the greenhouse, journal, and drawer buttons render and become functional in their epics (no forward dependency)."

**E5 · New Epic 7 section — add three stories** (each also carrying the standard Design-Law Guardrails / AR17 as mandatory ACs):

*Story 7.1 — The drawer: find what you're keeping*
- drawer nav button opens a surface separate from Home via the state-driven view switch (closed by default, never auto-surfaced, never the initial view); selected ring shown
- held tasks in gentle, generously-spaced Soon / Later / Someday groups (Soon/Later by do-date proximity via `DRAWER_SOON_DAYS`; Someday = no do-date); **no per-group counts**
- quietly-held deadlines as muted non-red tags ("paper · Fri") — no red/overdue/countdown
- a calm search field filters by title ("did I already add this?")
- `kept.tasks.list` returns the grouped held tasks, Zod-validated; `taskRepo` the only Prisma caller
- NFR5: no counts/red/overdue/urgency, no dense ranked wall — calm & spacious
- FR11: Home & peek stay today-scoped; the drawer never becomes a default view
- NFR4: drawer + search fully keyboard-operable
- reference mockup: `mockups/drawer.html` (edit affordance appears on hover/focus only)

*Story 7.2 — Edit & reschedule a task*
- selecting a task opens a calm single-task editor (one at a time, never a bulk grid)
- change the title and adjust/clear do-date &/or deadline via the same muted, optional, never-red dashed chips as capture
- `kept.tasks.update` persists; bucket re-derived automatically; settles quietly (no badge/count/celebration)
- changing the do-date re-files into today/Soon/Later; clearing it → Someday
- NFR5: no urgency/red/count; NFR4: fully keyboard-operable (open/edit/save/cancel)

*Story 7.3 — Let go of a task*
- choosing to let go shows a calm, non-alarming confirmation (never a red destructive alarm)
- `kept.tasks.delete` removes the task (real row delete; no archive/soft-delete); drawer updates quietly
- FR9b: deleting a task never affects grown plants or the greenhouse
- FR20: notes stay strictly read-only — nothing here touches notes
- NFR5: no red/count/scolding — letting go is calm and low-stakes

### 4.4 UX — `EXPERIENCE.md` + `DESIGN.md`

**U1 · EXPERIENCE.md IA table — add a "The Drawer" row** (title-bar nav, opt-in; find/edit/reschedule/let-go of held tasks beyond today; Soon/Later/Someday + search; the only place tasks appear beyond today; no counts/red/urgency).

**U2 · EXPERIENCE.md Horizon Limit paragraph — amend** (today-scoped default on Home & peek; two deliberately-opened exempt surfaces — greenhouse + drawer; the Limit governs the default view, never traps his data).

**U3 · EXPERIENCE.md Component Patterns — add two rows:** *The Drawer* (`{components.drawer}`) and *Task editor* (`{components.task-editor}`), per the behavior approved above.

**U4 · EXPERIENCE.md Interaction Primitives — add a "The Drawer" bullet + refine the banned line** to `...a full-backlog view on Home or pushed at him (the opt-in drawer is the sole deliberately-opened exception, still free of counts/red/urgency)...`.

**U5 · EXPERIENCE.md Accessibility Floor — amend** the keyboard-navigable list to include the drawer (search, edit, reschedule, let-go).

**U6 · DESIGN.md frontmatter `components:` — add tokens** `drawer` (background, group-label [Soon may take growth], deadline-tag [muted gold, never red], search-bg, radius) and `task-editor` (background, text, caret, radius).

**U7 · DESIGN.md — amend** the nav-cluster component (add the wooden-drawer icon; drawer joins greenhouse + journal as opt-in surfaces), **add two component specs** (The Drawer; Task editor), and **amend the Do/Don't row** to: *"Keep Home single-column, calm, today-scoped; put beyond-today tasks only in the opt-in drawer (calm Soon/Later/Someday + search) | Show a full backlog or dense dashboard on Home or push one at him; add counts, red, or urgency to the drawer."*

**Mockup — `mockups/drawer.html` (created).** Matches the existing pixel-art system (window frame, nav cluster with the selected drawer icon, checkerboard, header, search field, Soon/Later/Someday groups, muted non-red deadline tags, the open single-task editor, and the calm "let it go" confirm). Edit affordance appears on hover/focus only.

## 5. Implementation Handoff

**Scope classification: MODERATE** — touches four planning artifacts + adds one epic, but no fundamental replan (the thesis is preserved with a precise carve-out) and no built code to unwind.

**Handoff plan:**
- **Developer agent (planning-artifact edits):** apply §4.1–§4.4 to the PRD, Architecture, Epics, and both UX spines exactly as specified; the mockup is already in place.
- **Product Owner / backlog:** register **Epic 7** and Stories 7.1–7.3 in the sprint backlog (status: backlog); apply the Story 1.2 nav-cluster edit (E4). Sequence Epic 7 after Epic 4, before packaging (6.5).
- **Developer agent (build, later):** implement Epic 7 per its stories and the calm-surface rules in §3, with the Design-Law Guardrails (AR17) as mandatory acceptance criteria.

**Success criteria:**
- Home and the peek remain strictly today-scoped; the drawer is reachable only via its nav icon, closed by default, never auto-surfaced.
- Christopher can find a task (search), confirm what he already captured, edit a task's words, reschedule/clear its dates, and let go of a task — one at a time.
- No counts, no red, no overdue, no urgency anywhere in the drawer; deletion is calm and non-alarming; plants/greenhouse and the note vault are unaffected; notes stay read-only.

**Open / tunable:** `DRAWER_SOON_DAYS` (the Soon↔Later window) is a build-tunable to settle during Story 7.1. A `mockups/drawer.html` already stands; refine alongside the build if desired.
