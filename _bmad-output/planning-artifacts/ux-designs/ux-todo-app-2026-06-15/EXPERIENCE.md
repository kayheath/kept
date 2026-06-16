---
name: Kept
status: final
updated: 2026-06-15
project: todo-app
sources: [brief-todo-app-2026-06-15, brainstorming-session-2026-06-15]
---

# Kept — Experience Spine

> Single-surface desktop application. Offline, local-first, single-user. Built for one person (the protagonist, Christopher) by his partner (Kayla, "K"). An emotional-regulation tool disguised as a todo app. Paired with `DESIGN.md` (Kept). This spine owns *how it works*; `DESIGN.md` owns *how it looks*. Tokens are cross-referenced by name as `{path.to.token}`.

## The Design Law

**The love in Kept is never conditional, never withheld, never earned.**

This is the load-bearing principle. Every feature, every line of copy, every interaction is checked against it. Notes from K appear *regardless of completion* — especially on the bad days. Presence is a constant, not a reward. Nothing in Kept may be gated behind productivity; nothing may make the love feel scheduled, mechanical, or transactional. When a design decision and the Design Law conflict, the Design Law wins.

## Foundation

Kept is a **desktop application** — a resizable window, click + keyboard interaction, no touch and no haptics. It is **fully offline / local-first**: on-device storage only, with **no accounts, no cloud, no sync, no live connection, no analytics, no tracking, and no OS notifications ever**. Kept "stays put": nothing intrudes from outside. Everything — notes, day-coach encouragement, gentle nudges — waits calmly inside the app and is discovered only when Christopher chooses to open it.

There is **one designed surface: Christopher's.** K seeds her notes directly into the data layer (no in-app authoring UI is in scope). The app only *reads and surfaces* notes; it never lets anyone browse, edit, or author them from inside the app. Final stack is TBD in architecture; the local-first, no-server floor implies a JS/TS-friendly local store (e.g. Prisma + local SQLite was the expressed expectation). The window dims with the system/local clock to drive the day-vs-night tonal shift, and that shift is also made **visible** via the clock window's glass color (see Component Patterns → Clock window). [ASSUMPTION] The exact day/night cutover times (when glass and tone move morning → day → dusk → night) are not yet decided.

## Information Architecture

| Surface | Reached from | Purpose |
|---|---|---|
| Home (Today) | App open · home icon in the title-bar nav | The one calm thing in focus → quiet hint of next → the growing **windowsill** on the shelf (the currently-growing plant plus a few curated favorites) with K's notes woven through. Clock window (upper-right) shows the time and the time-of-day. Calm by default. |
| Add a task | Home, via the "+" at the top-right of the title bar | Frictionless capture page: one prominent input — type a few words, **Enter to add**. **No required fields**; do-date and deadline are optional muted chips below (deadline non-red). |
| Show-me-my-day peek | Home, on click/keypress | Today-scoped, bucketed (Now/Next/Later) glance at the day. Control on demand. Opens calmly, closes calmly. |
| Completion ritual | Triggered on the focus task | The slow deliberate gesture that drifts a task away, advances the windowsill plant one growth stage (or blooms it into the greenhouse), and blooms in a note. |
| Greenhouse | Title-bar nav (greenhouse icon), opt-in | Browsable, calm gallery of every plant Christopher has bloomed — a **record of accomplishments**, never a set to complete. From here he curates which favorites display on the windowsill (favorite a plant with a gold heart → "on your sill") and rearranges them. Holds bloomed plants forever; **exempt from the Horizon Limit** because it is *done* work, not pending. Mockup: `mockups/greenhouse.html`. |
| Day Journal | Title-bar nav (journal icon), opt-in | Revisitable keepsake: completed tasks + the note that appeared, stacked by day. Home stays today-scoped. |
| The Drawer | Title-bar nav (drawer icon), opt-in | Closed-by-default, never-auto-surfaced surface to **find, edit, reschedule, and let go of** held tasks beyond today — grouped calmly as **Soon / Later / Someday**, searchable. The only place tasks appear beyond today. No counts, red, or urgency. Mockup: `mockups/drawer.html`. |
| (hidden) Note Vault | Never reachable by Christopher | The pre-written note pool + timing engine. Read-only to the app; invisible to him by design. |

**Horizon Limit:** the default home horizon for *tasks* is **today** — Home and the show-me-my-day peek are today-scoped, and no full-backlog or multi-day view is ever shown on Home or pushed at him. The future stays out of the default view. **Two opt-in surfaces are exempt, and only because he opens them deliberately:** the **greenhouse** (it holds *accomplishments*, not pending work) and **the drawer** (the closed-by-default place to find and tend held tasks — never a default or auto-surfaced view, and still free of counts, red, and urgency). The Limit governs what Kept *shows him by default*; it never traps his own data beyond reach.

→ Composition reference (final pixel-art mockups): `mockups/home.html`, `mockups/add-task.html`, `mockups/show-me-my-day.html`, `mockups/completion.html`, `mockups/greenhouse.html`. Spines win on conflict — where a mockup and these specs disagree, the spec governs.

## Voice and Tone

Microcopy. Brand voice and aesthetic posture live in `DESIGN.md`. Two voices speak in Kept and must never blur — they are set apart by **color and treatment, not by font** (both are Pixelify Sans; see `DESIGN.md` → Typography): **the app's own voice** (calm, plain, never by name) in off-white/sage, and **K's voice** (warm, personal, may use "Christopher") in gold `{typography.note-hand}` on her glowing dashed note card. Encouragement is never guilt.

| Do | Don't |
|---|---|
| "One calm thing." | "Time to be productive!" |
| "No rush. It'll be here when you're ready." | "Don't fall behind." |
| "Toast counts. Soup counts. Anything warm counts." | "You only finished 1 of 5 tasks." |
| "Something quiet took root." | "✓ Task completed successfully" |
| "Rest is allowed. You've done enough today." | Streaks, counts, badges, exclamation marks, countdowns. |
| App speaks plainly and never by name. | App addressing him as "Christopher" (only K's notes may). |
| Night voice: pressure dissolves, fresh slate offered. | Night voice nagging about what's undone. |

## The Note Vault & Timing Engine

K pre-writes notes and seeds them **directly into the data layer** — there is no authoring/editing UI inside Kept. The app is strictly **read-only** over the vault.

**Hidden by design.** Christopher can never browse the unsurfaced pool of pre-written notes. Seeing the queue would make the love feel scheduled and mechanical — a Design Law violation. He receives notes only as they *bloom*, one at a time, in the moment the timing engine chooses. (Nuance: notes that have *already* surfaced may reappear in the **Day Journal** keepsake — once delivered, they are safe to revisit. Only the *future, unsurfaced* pool stays hidden.)

**Three rarity buckets** (no numeric weights): **everyday warmth** (the steady baseline), **blue-moon** (rare surprises), and **anchor** (tied to meaningful moments — a hard work day, the gym, an anniversary).

**Control dials** — per-note tags K can set in the data layer; these define the note data model and the timing engine's selection logic:
1. **Time-of-day targeting** — morning / evening / night windows.
2. **Specific-date notes** — pinned to an exact day (exam, birthday, hard anniversary).
3. **Trigger moment** — first win of the day / finished everything / a day with nothing done / a specific anchor task completed (e.g. gym).
4. **One-time vs. reusable** — show-once-ever vs. can-reappear.

The timing engine reads the *shape of the day* (the clock, what's been done, what triggers fired) and surfaces the right note. [ASSUMPTION] When several eligible notes match at once, the engine prefers the most specific/rarest applicable note and avoids repeating a reusable note too soon — the exact tie-breaking and cooldown rules are inferred, not decided.

## The Two-Date Model

A task may carry up to two optional dates, and **both are optional** (capture never requires either):
- **Do-date** — when Christopher intends to work on it. This *organizes the daily view* — it's what pulls a task into "today."
- **Due date** — a real, hard deadline, held **quietly as a safety net**. Never rendered with urgency: no red, no countdown, no "overdue" alarm. It exists so a real deadline isn't silently lost, but it never pressures.

[ASSUMPTION] How a quietly-held due date surfaces as it approaches (e.g. a gentle, non-red mention inside the day-peek) is inferred — the brief only specifies it is "held quietly," not how it is shown.

## Component Patterns

Behavioral. Visual specs live in `DESIGN.md.Components`.

| Component | Use | Behavioral rules |
|---|---|---|
| Title-bar nav cluster (`{components.capture-button}`) | Title bar, top-right (all surfaces) | Right-aligned cluster of pixel-icon buttons: **home · greenhouse · journal · "+"**. The single, consistent way to move between surfaces and to capture. Click (or keypress) navigates; the button for the current surface shows a selected ring, and the "+" shows it while the Add-a-task page is active. Always reachable, never loud; no notifications, no badges. |
| Clock window (`{components.clock-window}`) | Home only, upper-right | Shows the current time below a pixel arched-window sprite. The **glass color is the day/night indicator** — amber morning → blue day → mauve dusk → navy night — making the day→night tonal shift (Loving Coach → Soft Landing) visible at a glance. Passive; never interactive, never a notification. |
| Focus task card (`{components.focus-card}`) | Home | Shows exactly one task — the current "one calm thing." No checkbox; completion happens via the ritual, not a tick. A quiet hint of what's next sits below in `{colors.text-muted}`, glanceable, not a list. |
| Growing windowsill (`{components.done-garden}`) | Home | The dominant, build-up view: pixel plants resting on the wooden wall shelf — the **one currently-growing plant** plus a **few favorites curated** from the greenhouse, in limited rearrangeable slots. Each completion **advances the growing plant by one stage** (bulb → sprout → stem → bloom, from `imports/Plants.png`); when it fully blooms it gently **moves into the greenhouse** and a **fresh sprout** begins. Plants **never wilt** or get removed/reset to shame a slow day — a plant simply waits. No counts, no progress-to-bloom meter — the plants are the measure, felt not counted. |
| Greenhouse (`{components.greenhouse}`) | Greenhouse (opt-in surface, via title-bar nav) | The collection gallery of every plant Christopher has bloomed, laid out on a wall of wooden shelves below a calm header. **Browse** calmly, **favorite a plant to keep it on the windowsill** (a gold pixel heart marks it → "on your sill"; selecting a plant raises a calm "put on the windowsill" popover), and **rearrange** favorites any time. A record of accomplishments, never a set to complete: no counts, no collection %, no rare/legendary tiers, no empty/locked slots, no red. Plants persist forever; nothing decays. |
| K's note card (`{components.note-card}`) | Home (woven into the windowsill) + Day Journal | Renders an arriving note in gold `{typography.note-hand}` on its dashed card, signed "— K", with a `{colors.bloom}` glow on arrival. Appears on the engine's timing, never on demand. The *only* place Christopher's name may appear. |
| Day-peek buckets (`{components.day-peek}`) | Home, on click/keypress | Opens calmly to a today-scoped glance bucketed **Now / Next / Later**. A quietly-held deadline shows as a muted, **non-red** tag. Closes calmly. No backlog, no counts framed as pressure. Control on demand; calm by default. |
| Capture input (`{components.capture-input}`) | Add-a-task page (via the "+") | Keyboard-first: type a few words, **Enter**, done. **No required fields.** The two dates are optional muted chips below the input — a do-date and a **non-red** deadline; neither is demanded. App auto-sorts the new task into a bucket. |
| Completion bloom (`{components.note-card}` + `{components.done-garden}`) | Home, on completion | The finished focus task drifts away, the **windowsill plant advances one growth stage** with a soft `{colors.bloom}` halo ("something grew") — or, if that was its final stage, it **blooms and joins the greenhouse** as a fresh sprout takes its place — and K's note blooms in with its glow. One quiet moment, not a checkbox tick. |
| Completion ritual | Focus task | A deliberate, slow gesture (click-and-drift on desktop). Task drifts softly out of focus → the windowsill plant grows a stage (or blooms into the greenhouse) → K's note blooms in. Completion is a *moment*, not a checkbox. |
| Day Journal | Opt-in surface | Stacks completed tasks + the note that appeared, by day, as a revisitable keepsake. Separate from Home so Home stays today-scoped. |
| Greenhouse curation | Greenhouse → windowsill | Christopher selects which bloomed plants are favorited onto the windowsill's limited display slots, and rearranges them, any time. A calm, low-stakes act of keeping — never required, never gated. |
| The Drawer (`{components.drawer}`) | Drawer surface, via title-bar nav | Closed by default, never auto-surfaced. Lists held tasks beyond today in gentle **Soon / Later / Someday** groups (Soon/Later by do-date proximity; Someday = no do-date), generously spaced, with a calm **search** field to confirm what's already captured. A quietly-held deadline shows as a muted **non-red** tag. Items are plain pixel lines (no checkboxes, no per-group counts); selecting one opens the task editor. No backlog wall, no red, no urgency. |
| Task editor (`{components.task-editor}`) | Drawer, on selecting a task | Edits **one task at a time**: its words and its optional do-date/deadline chips (same muted, **never-red** controls as capture). Saving settles quietly (no badge/count). A calm **"let it go"** action deletes the task behind a non-alarming confirmation (never a red destructive alarm). Notes are never editable here — tasks only. |

## State Patterns

| State | Surface | Treatment |
|---|---|---|
| First-ever open | Home | An **empty terracotta pot waiting to grow** — warm, inviting, never a "0 tasks" emptiness. One gentle line inviting a first small thing. A note may already be waiting to bloom. [ASSUMPTION] Exact first-run copy and whether a seeded "welcome" note blooms on first open is inferred. |
| Empty / cleared day | Home | **Empty-day invitation:** the windowsill stands with the growing plant and curated favorites as everything already grown; the greenhouse persists untouched. Kept *optionally* offers a gentle pull-ahead win — phrased as an offer, **never pressure**. Declining is a complete, valid answer. |
| A bad day, nothing done | Home | **Notes still bloom.** Presence is constant (Design Law's hardest test). No scolding, no red, no "you didn't do anything." **Plants never wilt** — the windowsill plant simply waits at its current stage and the greenhouse persists; nothing is removed. K's words arrive anyway. |
| Daytime | Home (day-coach tone) | The **Loving Coach by Day** register: warmer, slightly brighter (`DESIGN.md` day/night dimming), the clock window's glass amber-then-blue; gentle encouragement framed as support, never demand. |
| End of day / night | Home (soft landing) | **Soft Landing by Night:** the surface dims, the clock window's glass shifts to mauve dusk then navy night, pressure dissolves into acceptance, a fresh slate is offered for tomorrow. The night voice never nags about the undone. |
| Note arriving | Home | Note card blooms in with a `{colors.bloom}` glow on `{typography.note-hand}`. Quiet, singular, unmissable-but-gentle. |
| Capture saved | Home | Quiet confirmation; the task settles into its bucket. No badge, no toast count. |
| Offline (always) | Global | No connectivity UI exists — there is nothing to be offline *from*. No banners, no sync state, ever. |
| Focus (keyboard) | All surfaces | [ASSUMPTION] A calm, low-contrast focus ring on the focused control, readable against `{colors.surface-base}` — keyboard focus visibility is an inferred accessibility detail, not an explicitly decided one. |

## Interaction Primitives

Desktop: **click + keyboard, no touch/haptics.**

- **Capture** — opened via the **"+" at the top-right of the title bar**, then keyboard-first on the Add-a-task page: type + Enter. The fastest path is never more than a few keystrokes; optional do-date/deadline chips wait below for those who want them.
- **Completion ritual** — a deliberate **click-and-drift** gesture (no haptic): slow enough to feel like a moment, ending in growth + a blooming note.
- **Show me my day** — summoned by click or keypress; dismissed the same way.
- **Day Journal** — opened deliberately, opt-in; never auto-surfaced.
- **Greenhouse** — opened deliberately via the **greenhouse icon in the title-bar nav**, opt-in; browse the bloomed collection and curate/rearrange windowsill favorites (favorite = gold heart) by click or keyboard. Never auto-surfaced, never required.
- **The Drawer** — opened deliberately via the **drawer icon in the title-bar nav**, opt-in, closed by default; find/search held tasks, edit a task (words + dates), reschedule, or let one go — one task at a time, by click or keyboard. Never auto-surfaced.
- **Banned everywhere:** OS/push notifications of any kind; red of any kind; badges, counts, streaks, stats; exclamation marks; countdown/timer pressure; required fields on capture; **a full-backlog view on Home or pushed at him** (the opt-in drawer is the sole deliberately-opened exception, still free of counts/red/urgency); rare/legendary plant tiers, progress-to-bloom meters, collection-completion %, empty/locked plant slots; plant wilting/decay; any finish-to-unlock gating of notes or features.

## Accessibility Floor

Behavioral. Visual contrast lives in `DESIGN.md`.

- [ASSUMPTION] **Keyboard-navigable** end to end — capture, completion ritual, show-me-my-day, the Day Journal, and **the drawer (search, edit, reschedule, let-go)** all reachable and operable without a mouse. (Capture being keyboard-first *is* decided; full keyboard operability of every surface is inferred.)
- [ASSUMPTION] **Readable contrast on the warm-dark theme** — text and interactive elements meet a legible contrast floor against `{colors.surface-base}` / `{colors.surface-raised}`; warm-gold K-note text remains comfortably readable. (Target floor inferred; not explicitly specified.)
- **Pixel text must stay legible at the chosen sizes.** Because the app's own voice is now pixel-art (Pixelify Sans), readability is part of the floor: pixel text is held at sizes large enough to read comfortably, and longer secondary/body copy falls back to Inter (`{typography.app-body}`) where the pixel face would strain. The pixel aesthetic never costs legibility.
- [ASSUMPTION] **Reduce-motion option** — a setting to soften or skip the growth and bloom animations (the completion drift, plant growth, note bloom glow) while preserving the outcome (plant grown, note present). Inferred from the motion-heavy completion ritual; not explicitly decided.
- [ASSUMPTION] Keyboard focus order follows reading order on every surface, and a visible focus indicator is present (see State Patterns). Inferred.

## Key Flows

Named-protagonist journeys for **Christopher**. The app's own UI text is generic and never uses his name; his name appears *only* inside K's notes.

### Flow 1 — A morning with Kept (Christopher, slow Tuesday morning)

1. Christopher opens the Kept window. The room is warm and dim, pixel-art and cozy; the **clock window** in the upper-right glows blue daytime glass beside the time — daytime register.
2. Home greets him with **one calm thing** in the lifted focus card — "Cook something warm for dinner" — and a quiet breath line beneath it. No list, no count.
3. Below, the **windowsill** shows the plant he's currently growing alongside a few favorites he's curated from the greenhouse — pots at different stages, a couple of soft gold blooms.
4. Woven into the windowsill, one of K's notes sits in her pixel voice: *"I left the porch light on for you. Take your time. — K"* — warm gold, set apart.
5. He wants the fuller picture, so he hits the **show-me-my-day** key. The peek opens calmly: today's handful of things, gently bucketed, today-scoped only. The week ahead is nowhere in sight.
6. **Climax:** He closes the peek and the focus card is still there, waiting, unhurried. Nothing has nagged him; nothing has counted at him. The window feels like a lit room that's glad he came in. He exhales and starts on dinner.

### Flow 2 — Finishing a task (Christopher, later that evening)

1. The focus card holds "Cook something warm for dinner." Dinner is made.
2. Christopher begins the **completion ritual** — the slow click-and-drift gesture on the task.
3. The task drifts softly out of focus and settles toward the windowsill — deliberate, a moment, not a tick.
4. On the windowsill, the **growing plant advances a stage**: a stem lifts, a leaf opens — the next growth frame from the sprite sheet, in `{colors.growth}`. (Had this been its final stage, it would **bloom and drift into the greenhouse** as a fresh sprout takes the sill — the long arc of accomplishments earned over time.)
5. **Climax:** As the plant settles, one of K's notes **blooms in** with a soft `{colors.bloom}` glow — *"Christopher, you made the house smell like home tonight. I'm proud of you. — K"* It is the only place his name appears, in her hand, gold against the dim. The finish and the love land together: the build-up metaphor and the emotion do the same work.

### Flow 3 — A day he got nothing done (Christopher, a hard, heavy day)

1. It's late. Christopher hasn't completed a single task. On most apps this is where the red, the "0/5," the guilt would live.
2. He opens Kept. The **windowsill is unchanged** — the growing plant waits exactly where it was, his curated favorites still stand, and the greenhouse behind them holds every plant he's ever bloomed. Nothing wilted, nothing was taken away to punish a slow day; nothing reset.
3. The surface has settled into its **soft-landing** night register: dimmer, quieter, the pressure dissolved. No nagging about the undone.
4. **Climax:** A note from K **blooms anyway** — triggered by the *nothing-done* moment, not withheld for the lack of it: *"Christopher, the hard days count too. You're still doing beautifully. Rest. — K"* The love arrived precisely because nothing was earned. This is the Design Law made literal: presence is a constant. A fresh slate waits for tomorrow, offered, never demanded.
