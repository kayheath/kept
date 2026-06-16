---
title: "Kept — Product Requirements Document"
status: final
created: 2026-06-15
updated: 2026-06-15
project: todo-app
---

# Kept — Product Requirements Document

## 1. Overview

**Kept** is a calming, offline desktop todo app — an emotional-regulation tool disguised as a task app, built for one person (**Christopher**) by his partner (**Kayla**, "K"). Where ordinary productivity software burns a backlog *down* and punishes the gaps, Kept builds *up*: it celebrates what got done, holds the undone quietly in trust, and threads K's pre-written notes of encouragement through the day.

The problem is not productivity — it's **exposure**. Seeing all his pending tasks at once triggers shutdown; his high standards turn every item into a non-negotiable "must." Kept's job is to let him act on one thing while trusting the rest is handled, to credit what he accomplishes, and to make his partner's care present even when she isn't in the room.

This PRD specifies a single finished product. UX is already designed — see the companion `DESIGN.md` (how it looks) and `EXPERIENCE.md` (how it works); those spines govern visual and interaction detail.

## 2. Vision & The Design Law

Invert the genre — from **burndown** (debt you chip away at) to **build-up** (proof you accumulate). The entire product is checked against one load-bearing principle:

> **The love in Kept is never conditional, never withheld, never earned.**

Notes from K appear *regardless of completion — especially on the bad days*. When any design decision and the Design Law conflict, **the Design Law wins.**

**Cute to look at, calm to use.** Kept's pixel-art, cozy-game styling is the *visual* warmth — welcome and intentional. But the app's *structure and behavior* stay grounded, clear, and uncluttered: one thing at a time, always legible, never busy or chaotic. The playfulness lives in the look and in K's notes — never in how Christopher has to think or work.

## 3. Goals

- Show **one thing in focus** at a time — never the full list — to eliminate overwhelm-by-exposure.
- Make the **windowsill garden the dominant view**, so accomplishments accumulate somewhere and are never reset or taken away.
- Deliver K's encouragement **unconditionally**, surfaced at the right moments, independent of her being reachable.
- Make **capture frictionless** (no required fields, no planning tax) so the app can be trusted to hold the weight.
- Provide grad-school structure (real deadlines) **without daily deadline pressure**.
- Shift tone with the clock — encouraging by day, accepting by night — so Kept is calming, never nagging.

## 4. Success & Definition of Done

Kept serves a sample size of one; success is **felt, not measured** (there is, by design, no analytics). It is **"done" only when the note vault is full of K's actual words** — the content is the soul of the app and a first-class deliverable, not an afterthought.

**Success signals (observed, never interrogated):** Christopher reaches for the app for motivation, not only for K; he credits himself unprompted ("look what I got done"); the overwhelm quiets; he keeps choosing it past the gift novelty and eventually adds his own tasks (a sign he trusts it to hold the weight).

**Counter-signal / failure (Design Law violations):** any moment the love feels conditional, withheld, earned, scheduled, mechanical, or transactional — or that ever makes him feel **judged, scolded, or behind**. Concrete failure markers anywhere in the product: red, counts, streaks, nagging, or finish-to-unlock gating.

## 5. Target Users

- **Christopher — the only user, the only designed surface.** A high-standards grad student who shuts down under task exposure. Uses Kept on the **desktop** (resizable window, click + keyboard; no touch, no haptics). Needs to act on one thing while trusting the rest is held, and to be encouraged rather than judged.
- **Kayla ("K") — the note-author.** She seeds her notes **directly into the data layer**; there is **no in-app authoring UI**. The app only *reads and surfaces* notes — Christopher can never browse, edit, or author them.

## 6. Functional Requirements

FRs are grouped by feature area with globally stable IDs. All FRs are part of the single finished product; see Addendum for non-binding internal build sequencing.

### 6.1 Capture
- **FR1.** The user can open capture from a **"+" affordance at the top-right of the title bar**, available on every surface.
- **FR2.** The user can add a task by **typing a few words and pressing Enter** — keyboard-first, with no step required beyond the words themselves.
- **FR3.** Capture has **no required fields**; the system automatically sorts each new task into a bucket without the user planning it.
- **FR4.** The user *may optionally* attach a **do-date** and/or a **deadline** via muted, clearly-skippable controls below the input; neither is demanded and no date picker is forced up front.
- **FR5.** On save, the task settles in quietly — **no badge, no count, no celebratory interruption**.

### 6.2 Home — Focus, Windowsill & Greenhouse
- **FR6.** Home shows **exactly one task in focus** at a time, with a quiet, glanceable **hint of what's next** in muted text below it — never a list.
- **FR7.** The focus area shows **no checkbox, no count, and no deadline badge**.
- **FR8.** Home displays the **windowsill** — a shelf showing a handful of plants: the one **currently growing** plus a few the user has chosen to feature.
- **FR9.** **Each completed task advances the currently-growing plant by one growth stage** (bulb → sprout → stem → bloom) — finishing a task makes a living thing grow. Stages are conveyed **visually only — never labeled, numbered, or shown as "stage X of Y"** (that would be a count, which is banned).
- **FR9a.** When a plant reaches its final stage it **blooms** (≈3–4 completions, build-tunable) and is gently **moved into the user's collection — "the greenhouse"** — and a **fresh sprout** begins on the windowsill. A bloomed plant therefore represents a stretch of accomplishments earned over time.
- **FR9b.** Plants **never wilt, decay, or die** from inactivity — a plant simply waits for him. Nothing is ever removed or diminished to reflect a slow day.
- **FR9c.** The user can **browse the greenhouse** — a calm gallery of every plant he has bloomed — and **curate which plants display on the windowsill** (limited slots; rearrange any time). The greenhouse is a record of accomplishments, never a set to complete.
- **FR9d.** **Plant variety is random and for warmth only** — never tied to performance, milestones, or achievement, and there are **no rare/legendary tiers**.
- **FR10.** K's notes are **woven into the windowsill** on Home.
- **FR11.** Home and the show-me-my-day peek are **today-scoped only** for *tasks*; no full-backlog or multi-day task view is ever shown on Home or pushed at the user (Horizon Limit). **Two surfaces are exempt, and only because the user opens them deliberately:** the **greenhouse** (it holds *accomplishments*, not pending work) and **the drawer** (the opt-in, closed-by-default task-management surface of FR33 — never a default or auto-surfaced view, and still showing no counts, no red, and no urgency). The Horizon Limit governs what Kept *shows him by default*; it never traps his own data beyond his reach.

### 6.3 Show-Me-My-Day Peek
- **FR12.** The user can summon a **today-scoped peek** of the day from the quiet **"show me my day" affordance on Home** (click or keypress), and dismiss it the same way; it opens and closes calmly. `[ASSUMPTION]` the exact keyboard shortcut is a build/UX detail.
- **FR13.** The peek presents tasks in **small, finishable buckets (Now / Next / Later)** — never a single ranked wall.
- **FR14.** A quietly-held deadline, if present, surfaces in the peek as a **muted, non-red tag** (e.g. *"paper · Fri"*) — never as pressure, never a countdown.

### 6.4 Two-Date Model
- **FR15.** A task may carry up to **two optional dates, both optional**: a **do-date** (when he intends to work on it) and a **deadline** (a real external due date).
- **FR16.** The **do-date organizes the daily view** — it is what pulls a task into "today."
- **FR17.** The **deadline is held quietly as a safety net** — never rendered with urgency (no red, no countdown, no "overdue" alarm), so a real deadline is never silently lost yet never pressures.
- **FR17a.** When a deadline **approaches and the task has no do-date set**, Kept quietly pulls that task into today's buckets on its own so it cannot be silently missed — still with no red, alarm, or countdown. `[ASSUMPTION]` how many days ahead counts as "approaching" is a build detail to tune.

### 6.5 Completion Ritual
- **FR18.** Completing the focus task is a **deliberate, slow gesture** (click-and-drift) — a moment, not a checkbox tick.
- **FR19.** On completion, the task **drifts out of focus toward the windowsill and fades**, the **currently-growing plant advances a stage** (or fully blooms and joins the greenhouse, per FR9a), and **one of K's notes blooms in** — the accomplishment and the encouragement land together.

### 6.6 Note Vault & Timing Engine
- **FR20.** K's notes are **seeded directly into the data layer**; the app is **strictly read-only** over them and provides no authoring, editing, or browsing UI.
- **FR21.** The **unsurfaced note pool is hidden from Christopher** — he can never see the queue. Notes are received **one at a time, as they bloom**, on the engine's timing, never on demand.
- **FR22.** Notes are organized into **three rarity buckets** (no numeric weights): **everyday warmth**, **blue-moon** (rare), and **anchor** (tied to meaningful moments — a hard day, the gym, an anniversary).
- **FR23.** Each note supports **four targeting dials** set by K in the data layer: (1) **time-of-day** (morning/evening/night), (2) **specific-date pinning**, (3) **trigger moment** (first win of the day / finished everything / a day with nothing done / a specific anchor task completed), and (4) **one-time vs. reusable**.
- **FR24.** The timing engine **reads the shape of the day** (the clock, what's been done, which triggers fired) and surfaces a matching note using this priority logic: (1) **specificity wins** — an anchor or date-pinned note beats a generic everyday note when its moment hits; (2) **rarity is respected** — blue-moon notes surface only occasionally even when eligible, keeping their surprise; (3) **reuse cooldown** — a reusable note won't reappear for a while after showing, and one-time notes are retired permanently after one show; (4) **ties resolve by gentle randomness** so it never feels scripted; (5) **always something** — if nothing specific matches, fall back to the everyday-warmth pool so a moment is never empty. `[ASSUMPTION]` exact numbers (blue-moon frequency, cooldown length, "approaching"/threshold values) are left for the build to tune.
- **FR25.** A note **must surface regardless of completion** — including on a day nothing got done (the Design Law's hardest test).

### 6.7 Day / Night Tone & Clock Window
- **FR26.** Kept's tone **shifts with the local clock**: **Loving Coach by Day** (warmer, gently encouraging) → **Soft Landing by Night** (dimmer, softer; pressure dissolves into acceptance; a fresh slate is offered; the night voice never nags about the undone). The night shift is **tonal only** — it never hides or locks his day; Kept suggests calm, never imposes it.
- **FR27.** Home displays a passive **clock window** (upper area) showing the current time, whose **glass color is the day/night indicator**, on these cutovers: **morning 5am–9am (amber) → day 9am–5pm (blue) → dusk 5pm–8pm (mauve) → night 8pm–5am (navy)**. It is never interactive and never a notification.

### 6.8 States
- **FR28.** On **first-ever open**, Home shows an **empty pot waiting to grow** with one gentle invitation to add a first small thing — warm and inviting, never a "0 tasks" void. A **one-time welcome note from K blooms immediately on first open**, before Christopher has done anything — proving from the first second that the love is already there, not earned. `[NOTE FOR KAYLA]` the welcome note text and the exact invitation line are hers to write when the vault is filled; a placeholder (e.g. *"Nothing here yet. When you're ready, plant one small thing."*) stands in until then.
- **FR29.** On a **cleared/empty day**, Kept *optionally offers* a gentle pull-ahead win, phrased as an offer that is never pressure; **declining is a complete, valid answer**.
- **FR30.** On a **day with nothing done**, the garden simply holds what has already grown and **notes still bloom** — with no scolding, no red, and no "you didn't do anything."
- **FR31.** Kept never shows **connectivity or sync UI** of any kind — no banners, no offline state, ever.

### 6.9 Day Journal
- **FR32.** The user can open a **Day Journal** — an **opt-in keepsake, separate from Home** and never auto-surfaced — that stacks **completed tasks paired with the note that appeared, by day**, as a revisitable record. (Already-delivered notes are safe to revisit here; the unsurfaced pool remains hidden.)

### 6.10 The Drawer — Seeing & Editing Held Tasks
- **FR33.** The user can open **the drawer** — a **deliberately-opened, never-auto-surfaced, closed-by-default** surface reached from a quiet title-bar nav icon — that lists his held tasks (today and beyond) in **gentle, generously-spaced groups (Soon / Later / Someday)** with a **search field** so he can confirm what he already captured. The drawer shows **no counts, no red, no overdue, no countdown** — it is a calm place to find and tend tasks, never a backlog wall. `[ASSUMPTION]` the day-window that distinguishes "Soon" from "Later" is a build-tunable detail.
- **FR34.** From the drawer, the user can **edit a single task at a time** — change its words and adjust or clear its do-date and/or deadline (rescheduling when plans change) — via the same muted, optional, never-red date controls as capture. Edits **settle in quietly**: no badge, no count, no celebratory interruption.
- **FR35.** From the drawer, the user can **let go of (delete) a task** with a **calm, non-alarming confirmation** — never a red destructive alarm. A task is the user's own to keep or release; tasks (unlike plants) may be removed because they are pending intentions, not accomplishments. Notes remain strictly read-only and are never editable or deletable from anywhere (FR20 unchanged).

## 7. Non-Functional Requirements

- **NFR1 — Offline / local-first.** All data lives on the device and persists there. The app has **no dependency on connectivity, ever**.
- **NFR2 — No backend, no surveillance.** No accounts, login, cloud, sync, live connection, analytics, tracking, or OS/push notifications of any kind. "Nobody is measuring him." Everything waits *inside* the app until Christopher opens it.
- **NFR3 — Calm responsiveness.** Capture and the peek open and close immediately on click/keypress; the completion drift is intentionally slow. Layout is single-column, centered, reading-width — one calm page, never a dense dashboard. `[ASSUMPTION]` no numeric latency targets are specified.
- **NFR4 — Accessibility floor.** Adopted as principles (not WCAG targets — right altitude for a personal app): (1) **every surface is fully keyboard-operable** (open the peek, complete a task, open the journal, dismiss — not just capture); (2) the **warm-dark theme, including gold note text, meets a comfortable contrast floor**; (3) **pixel text stays legible** at its sizes, with an Inter fallback for longer copy so the pixel aesthetic never costs legibility; (4) a **reduce-motion option** softens or skips the drift/bloom/growth animations while preserving their outcomes (the plant still appears, the note still arrives); (5) a **visible, low-contrast focus indicator** follows reading order.
- **NFR5 — The absolute "no red / no urgency" constraint.** **No red appears anywhere** — not as error, not as due/overdue, not in any sprite frame. **Banned everywhere:** badges, counts, numeric progress, "X of Y," streaks, stats, exclamation-mark urgency, countdowns/timers, required capture fields, and any **finish-to-unlock gating** of notes or features. **No full-backlog view is ever shown on Home or pushed at the user;** the opt-in drawer (FR33) is the single deliberately-opened exception, and even there shows no counts, no red, and no urgency. **Specific to the greenhouse:** no progress-meter toward the next bloom (he simply watches it grow), no collection-completion percentage, no empty/locked plant slots, and no rare/legendary plant tiers — the collection is a calm gallery, never a set to complete.

## 8. Non-Goals / Out of Scope

- Accounts, login, cloud, or sync.
- Social features, sharing, or leaderboards.
- Streaks, badges, counts, stats, or any gamified urgency (the exact mechanics Kept exists to reject).
- A full-backlog, multi-day, or dense-dashboard view **as a default or as Home** (the default horizon is today only). *In scope, narrowly:* an opt-in, deliberately-opened drawer for finding and editing held tasks (FR33–FR35) — calm, grouped, searchable, never auto-surfaced, and still free of counts/red/urgency.
- In-app note authoring, editing, or browsing (K seeds via the data layer; the vault is read-only and hidden).
- Live messaging (K's presence is pre-written and saved by design).
- OS / push notifications of any kind.
- Analytics or tracking.
- Mobile, touch, or haptics — Kept is desktop, click + keyboard only.

## 9. Constraints & Dependencies

- **Local-first, no-server is the one hard architectural constraint.** The data layer must support the note model and the four targeting dials (FR23). Final stack is the architect's call (see Addendum for the expressed expectation).
- **Single designed surface (Christopher's).** K's input arrives only via the data layer.
- **Licensed art dependency.** The build depends on **licensed, gitignored** pixel-art sprite sheets (plants and windows) that must not be committed or redistributed (see Addendum for sources and handling). The visual identity assumes these assets are present.

## 10. Open Questions & Assumptions

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Day/night cutover times (when glass + tone shift) | Kayla | ✅ Resolved — morning 5–9am, day 9am–5pm, dusk 5–8pm, night 8pm–5am; night is tone-only |
| 2 | How an approaching deadline surfaces | Kayla | ✅ Resolved — muted non-red peek tag (FR14) + quiet auto pull-into-today when near & no do-date (FR17a); "approaching" threshold a build detail |
| 3 | Timing-engine selection logic | Kayla | ✅ Resolved — 5 rules in FR24 (specificity > rarity-respect > cooldown > random tie-break > always-fallback); exact numbers build-tuned |
| 4 | First-run welcome note + invitation copy | Kayla | ✅ Resolved — a one-time welcome note blooms on first open (before any task); invitation line + welcome text are Kayla's to write with the vault (placeholder stands in) |
| 5 | Accessibility floor | Kayla | ✅ Resolved — 5 principles adopted (NFR4): full keyboard ops, contrast floor, legible pixel text, reduce-motion option, visible focus indicator |
| 6 | Window sprite sheet source/license URL | Kayla | ✅ Resolved — licensed from https://pixelmia.itch.io/16x16-windows |
| 7 | Final stack (Prisma + SQLite is the expectation, not a decision) | architecture | Deferred |

## 11. Glossary

| Term | Meaning |
|---|---|
| **Windowsill** | The Home shelf: shows the one currently-growing plant plus a few favorites the user curates. |
| **Greenhouse** | The browsable collection of every plant the user has bloomed — a calm gallery of accomplishments, separate from Home. Never a set to complete. |
| **The Drawer** | The opt-in, closed-by-default surface (reached from the title-bar nav) where the user finds, edits, reschedules, and lets go of his held tasks — grouped calmly as Soon / Later / Someday, searchable, with no counts, red, or urgency. The one place tasks appear beyond today; never a default or auto-surfaced view. |
| **Bloom** | A plant reaching its final growth stage (after ≈3–4 completions); it then moves to the greenhouse. Also used for the way a note "blooms in." |
| **Peek** ("show me my day") | The opt-in, today-scoped, bucketed glance at the day, summoned from Home. |
| **Do-date** | The day the user *intends* to work on a task; organizes the daily view. Optional. |
| **Deadline** | A real external due date, held quietly as a safety net. Optional, never shown with urgency. |
| **Anchor** | A note rarity tied to a meaningful recurring moment (a hard day, the gym, an anniversary). |
| **Blue-moon** | The rare note rarity — surfaces only occasionally to keep its surprise. |
| **The Design Law** | "The love in Kept is never conditional, never withheld, never earned." The product's governing principle. |
| **K** | Kayla — the note author; her voice in the app, signed "— K". |
