---
title: "Kept — PRD Addendum"
status: final
created: 2026-06-15
updated: 2026-06-15
project: todo-app
---

# Kept — PRD Addendum

Supporting depth that belongs downstream (architecture, build) rather than in the PRD's capability narrative. The PRD owns *what*; this captures *how-ish* and the asset/sequencing detail.

## Expected technical direction (non-binding — architecture decides)

- **Local-first, no server** is the only hard constraint (PRD §9). Everything else here is the expressed expectation, not a decision.
- Kayla anticipates a **JS/TS-friendly local stack** with **Prisma + a local SQLite database** on the device — which satisfies "fully local, no server dependency" and gives her a comfortable way to **seed notes directly into the data layer** (the vault has no authoring UI by design).
- The data layer must model the **note schema** including the four targeting dials (FR23): time-of-day window, specific-date pin, trigger-moment enum (first-win / finished-all / nothing-done / anchor-task-completed), and one-time-vs-reusable flag, plus the rarity bucket (everyday / blue-moon / anchor).
- The **timing engine** is local logic that reads the shape of the day (clock, completions, fired triggers) and selects a matching note. Tie-breaking/cooldown rules are an open question (PRD §10.3).
- Final framework/runtime for a desktop app (e.g. Electron/Tauri or similar) is the architect's call.

## Licensed sprite assets (build dependency)

All source sheets and extracted frames are **gitignored** (root `.gitignore`) — licensed paid art, never committed or redistributed; re-download from source if lost.

- **`imports/Plants.png`** (1760×2496) — licensed from **https://umoral.itch.io/plants2024**. Frames are **16×32 cells**; the **brown-pot columns** drive the windowsill garden + greenhouse, using bulb → sprout → stem → bloom growth sequences (one stage per completed task). **Red flower frames are excluded** (the no-red law).
- **`imports/16x16_windows_orange.png`** (and `_brown.png`) — 560×80, 16×16 cells. The **orange-frame arched window** is used for the Home clock window; its glass color encodes time of day (sampled hexes live in `DESIGN.md`). Licensed from **https://pixelmia.itch.io/16x16-windows**; treated as licensed paid art (gitignored, not committed).
- Extracted frames are mirrored to `mockups/sprites/` and `.working/sprites/` (also gitignored).
- Typography: **Pixelify Sans** is the primary display face (both the app's voice and K's notes); **Inter** is the legibility fallback for longer copy. The two voices are distinguished by **color + treatment, not by font**.

## Internal build sequencing (NOT a delivery plan)

The brief proposed an internal order of construction. **This is sequencing only — Christopher receives one complete, finished app, never a phased rollout.** Recorded here so it doesn't read as scope tiers in the PRD:

1. **Core "calm + you"** — Capture, Home/Focus + windowsill garden + greenhouse, Show-Me-My-Day peek, Note Vault & Timing Engine.
2. **Real-life structure** — Two-Date Model, Day/Night tone shift, Empty-Day invitation.
3. **Moments of delight** — Slow Completion Ritual, Day Journal.

## Source references

- Product brief + addendum: `_bmad-output/planning-artifacts/briefs/brief-todo-app-2026-06-15/`
- Brainstorming session: `_bmad-output/brainstorming/brainstorming-session-2026-06-15.md`
- UX spines (govern visual/interaction detail): `_bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/DESIGN.md`, `EXPERIENCE.md`
- UX mockups: `.../ux-todo-app-2026-06-15/mockups/`
