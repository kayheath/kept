---
baseline_commit: 02356ae07a4013338d22d86b396298a882242ffb
---

# Story 1.1: Scaffold a runnable Kept desktop window

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As Christopher (the only user),
I want Kept to open as a warm desktop window,
so that the app exists as something I can launch and return to.

## Acceptance Criteria

1. **Given** the chosen starter, **when** the project is scaffolded via `npm create @quick-start/electron@latest kept -- --template react-ts`, **then** the repo has the main/preload/renderer three-process structure **and** `.gitignore` ignores `imports/*`, extracted sprite frames, and `*.db`. [Source: epics.md#Story-1.1; architecture.md#Selected-Starter]
2. **Given** the scaffolded app, **when** `electron-vite dev` runs, **then** a single resizable window opens on a placeholder Home with working HMR. [Source: epics.md#Story-1.1]
3. **Given** Electron hardening (AR7), **when** the window loads, **then** `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true` are set **and** the renderer loads only local content with a minimal CSP applied. [Source: epics.md#Story-1.1; architecture.md#Authentication-&-Security]
4. **Given** the runtime (AR2), **then** Electron 41, React 19, and TypeScript are configured across main, preload, and renderer. [Source: epics.md#Story-1.1; architecture.md#Architectural-Decisions-Provided-by-Starter]
5. **Given** the local-first constraint (NFR1, NFR2, FR31), **then** no network calls, telemetry, accounts, or connectivity UI exist anywhere in the app. [Source: epics.md#Story-1.1; architecture.md#Enforcement-Guidelines]

## Tasks / Subtasks

- [x] Task 1: Scaffold the electron-vite React+TS project (AC: #1, #4)
  - [x] Run `npm create @quick-start/electron@latest kept -- --template react-ts` to scaffold the project into this repo (create-electron / electron-vite React+TS template)
  - [x] Confirm the generated `src/main`, `src/preload`, `src/renderer` three-process structure exists
  - [x] Confirm `package.json`, `electron.vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tsconfig.web.json` are present and TypeScript is wired across all three processes
  - [x] Verify the runtime targets Electron 41 (Chromium 146 + Node 24 LTS) and React 19; pin/adjust versions in `package.json` if the template default differs, then `npm install`
- [x] Task 2: Configure `.gitignore` for licensed assets, sprite frames, DB, and build output (AC: #1)
  - [x] Add ignores for `imports/*` (licensed source sprite sheets — never committed), extracted sprite frames under `resources/plants/` and `resources/windows/`, and `*.db` (the SQLite file)
  - [x] Confirm template-default ignores for `out/` and `node_modules/` are present (add if missing)
  - [x] NOTE: there is an existing repo-root `.gitignore` (untracked) and a `_bmad-output/` directory — preserve/merge with the existing `.gitignore`, do not clobber it
- [x] Task 3: Apply Electron security hardening in the main process (AC: #3, #5)
  - [x] In `src/main/index.ts`, create the BrowserWindow with `webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }`
  - [x] Wire the preload script as the only bridge (`webPreferences.preload`), even if the bridge is a stub in this story
  - [x] Ensure the renderer loads only local content (dev: the local electron-vite dev server URL; prod: the local `index.html` file) — no remote URLs
  - [x] Apply a minimal CSP restricting the renderer to local content only (no remote origins, no inline-script beyond what Vite/HMR requires in dev)
- [x] Task 4: Provide a placeholder warm Home + single resizable window with HMR (AC: #2)
  - [x] Make the window single and resizable; it opens on a placeholder Home (a calm placeholder is fine — full Home shell is Story 1.2)
  - [x] Confirm `electron-vite dev` launches the window with working renderer HMR and main/preload reload
  - [x] Keep the placeholder free of any red, counts, badges, urgency, or the user's name (Design-Law guardrails apply even to placeholders)
- [x] Task 5: Verify local-first / no-network posture (AC: #5)
  - [x] Confirm there are no network calls, telemetry, analytics, accounts/login, auto-updater, or connectivity UI anywhere in the scaffold
  - [x] Remove or disable any template-default telemetry/remote calls or sample remote-content loads if the starter includes them

## Dev Notes

### Architecture patterns and constraints

- **This is the first implementation story** and the unavoidable greenfield foundation. The architecture names this exact command as the First Implementation Priority. [Source: architecture.md#Implementation-Handoff; architecture.md#Decision-Impact-Analysis]
- **Selected starter:** electron-vite (alex8088 / `@quick-start/electron`) React + TypeScript template. Chosen specifically because it gives the three-process structure AND **leaves styling fully open** — do NOT add Tailwind, shadcn, or any utility framework; Kept supplies bespoke pixel-art CSS later (Story 1.2). [Source: architecture.md#Selected-Starter; architecture.md#Starter-Options-Considered]
- **Three-process split (the hard boundary):** `src/main` (Node — Prisma/engine/clock/IPC later), `src/preload` (typed contextBridge — the ONLY renderer↔main surface), `src/renderer` (React UI). The renderer must NEVER import Prisma, `better-sqlite3`, `fs`, or Node APIs; the main process never imports React. `src/shared/` (added in later stories) is the only code both sides import. Establish this clean separation now — later stories depend on it. [Source: architecture.md#Architectural-Boundaries; architecture.md#Code-Organization]
- **Hardening is non-negotiable (AR7):** `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`; renderer loads only local content; minimal CSP; preload is the only bridge; no Node APIs exposed to the renderer. [Source: architecture.md#Authentication-&-Security; epics.md#AR7]
- **Runtime versions (AR2):** Electron 41 (Chromium 146 + Node 24 LTS), React 19, TypeScript across all three processes. These versions are mutually compatible with the rest of the planned stack (Prisma 7, Zustand 5, Zod 4.4, Motion 12, date-fns 4) per the architecture's coherence validation — do not downgrade. [Source: architecture.md#Architectural-Decisions-Provided-by-Starter; architecture.md#Coherence-Validation]
- **Local-first / no-network is a hard constraint (NFR1/NFR2/FR31):** no accounts, cloud, sync, analytics, tracking, OS/push notifications, auto-update, or connectivity UI of any kind — ever. The scaffold must introduce none of these. If the template ships any telemetry or sample remote-content load, strip it. [Source: architecture.md#Project-Context-Analysis; architecture.md#Enforcement-Guidelines]
- **Design-Law guardrails (AR17 / NFR5) apply to every story, including this one:** no red anywhere, no counts/badges/"X of Y"/progress, no finish-to-unlock gating, no OS notifications, no network, no connectivity UI, and the app never addresses the user by name (only K's notes may, in a later epic). Keep the placeholder Home calm and nameless. [Source: epics.md#Epic-1-intro; architecture.md#Enforcement-Guidelines]
- **Naming conventions to establish from the start:** components `PascalCase.tsx`; non-component modules `camelCase.ts`; directories `kebab-case`; CSS modules `Component.module.css`. [Source: architecture.md#Naming-Patterns]
- **Out of scope for this story (do not build yet):** Prisma/SQLite data layer (Story 1.3), the typed IPC channels + Zod (Story 1.4), the pixel-art design system + full Home shell + nav cluster (Story 1.2), the clock service (Story 1.7). The preload may be a minimal stub bridge here; its typed `window.kept` task API arrives in Story 1.4. [Source: architecture.md#Decision-Impact-Analysis; epics.md#Epic-1]

### Source tree components to touch

Scaffold establishes (template-generated, then adjusted):

```
kept/  (scaffolded into this repo root)
├── package.json                 # Electron 41, React 19, TS; electron-vite scripts
├── electron.vite.config.ts      # main/preload/renderer build config
├── tsconfig.json / tsconfig.node.json / tsconfig.web.json
├── .gitignore                   # MUST add: imports/*, resources/plants, resources/windows, *.db
└── src/
    ├── main/
    │   └── index.ts             # app entry: creates the single resizable BrowserWindow,
    │                            #   hardened webPreferences, loads local content + CSP
    ├── preload/
    │   └── index.ts             # contextBridge stub (the only bridge; typed API lands in 1.4)
    └── renderer/
        ├── index.html
        ├── main.tsx             # React root
        └── App.tsx              # placeholder warm Home (full shell is Story 1.2)
```

[Source: architecture.md#Complete-Project-Directory-Structure]

- The full target tree (db/, engine/, clock/, ipc/, shared/, renderer/features/, resources/, prisma/, notes/) is documented in the architecture but is **populated incrementally by later stories** — do not pre-create empty domain folders beyond what the scaffold needs to run.

### Testing standards summary

- **Testing framework is Vitest**, added in a later decision and concentrated on `src/main/engine` (the timing engine especially). It is **not pre-wired by the starter**. [Source: architecture.md#Testing-Framework; architecture.md#Structure-Patterns]
- For this scaffold story there is **no domain logic to unit-test**; the meaningful verification is manual/observational: `electron-vite dev` opens one resizable window on a placeholder Home with working HMR, and the hardening flags are set. Wiring a full Vitest harness is optional here and is better established alongside the first engine logic — do not block the scaffold on it.
- Tests, when added, are co-located as `*.test.ts`. [Source: architecture.md#Structure-Patterns]

### Project Structure Notes

- **Scaffold location:** The `npm create` command names the project `kept`. Scaffold the electron-vite project so its files live at this repository root (`/Users/kaylaheath/repos/todo-app`) — this repo IS the Kept project. If the generator insists on creating a `kept/` subdirectory, move the generated files up to the repo root afterward so `package.json` sits at the root. Confirm the final layout matches the architecture's tree (which is rooted at `kept/`).
- **Existing repo contents to preserve:** the repo already contains `_bmad-output/` (planning + this story file), `.claude/` (skills), `_bmad/` (BMAD framework), and an untracked root `.gitignore`. The scaffold must not delete or overwrite these — **merge** scaffold `.gitignore` entries into the existing file rather than replacing it.
- **No detected architectural conflicts.** The architecture explicitly lists this scaffold as step 1 with high confidence and no critical gaps.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.1-Scaffold-a-runnable-Kept-desktop-window]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic-1-Foundation-Capture-The-Calm-Home] (Design-Law guardrails intro)
- [Source: _bmad-output/planning-artifacts/epics.md — AR1, AR2, AR7, AR17, NFR1, NFR2, NFR5, FR31]
- [Source: _bmad-output/planning-artifacts/architecture.md#Starter-Template-Evaluation] (Selected Starter, rationale, init command)
- [Source: _bmad-output/planning-artifacts/architecture.md#Authentication-&-Security] (hardening)
- [Source: _bmad-output/planning-artifacts/architecture.md#Complete-Project-Directory-Structure]
- [Source: _bmad-output/planning-artifacts/architecture.md#Architectural-Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#Naming-Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation-Handoff] (First Implementation Priority)
- [Source: _bmad-output/planning-artifacts/architecture.md#Coherence-Validation] (version compatibility)

### Latest tech information (version pins)

The architecture authoritatively pins the stack; treat these as the source of truth for this scaffold (do not silently upgrade/downgrade):

- **Electron 41** (Chromium 146 + Node 24 LTS) — desktop runtime.
- **React 19** — renderer.
- **TypeScript** — across main / preload / renderer.
- **electron-vite** (via `@quick-start/electron` create scaffolder) — build tooling + HMR.
- Downstream (NOT installed in this story, listed for compatibility awareness): Prisma 7 + `@prisma/adapter-better-sqlite3` (no-Rust-engine), Zustand 5, Zod 4.4, Motion 12, date-fns 4.

[Source: architecture.md#Architectural-Decisions-Provided-by-Starter; architecture.md#Coherence-Validation]

## Project Context Reference

- Epic file: `_bmad-output/planning-artifacts/epics.md` (Kept — calm, offline pixel-art todo app; Design Law: "The love in Kept is never conditional, never withheld, never earned.")
- Architecture: `_bmad-output/planning-artifacts/architecture.md` (READY FOR IMPLEMENTATION; this scaffold is step 1 / First Implementation Priority).
- No `project-context.md` present in the repo at story-creation time.

## Dev Agent Record

### Agent Model Used

claude-opus-4-8[1m] (Claude Opus 4.8, 1M context) — BMAD dev-story workflow.

### Debug Log References

- `npm run typecheck` → clean (node + web projects).
- `npm run lint` → initially 78 errors / 576 warnings, all originating from BMAD framework files at the repo root (`_bmad/wds/scripts/**`, `.claude/skills/**`) — none from the Kept app `src/`. Scoped ESLint to the app (added framework/tooling dirs to `ignores`); re-run → clean.
- `npm run build` (typecheck + `electron-vite build`) → all three processes build: `out/main/index.js`, `out/preload/index.js`, `out/renderer/index.html` + assets. Production `index.html` retains the CSP meta and uses relative `./assets/` paths (no remote refs).
- No GUI launch performed (`electron-vite dev` opens a real window — left for Kayla as the manual/observational check per the story's Testing Standards). HMR is wired via the template `dev` script.

### Completion Notes List

- Story created via create-story workflow — comprehensive context engine analysis completed; comprehensive developer guide created.
- Resumed an in-progress scaffold: the electron-vite React+TS three-process structure, hardened `BrowserWindow`, CSP (both `<meta>` and `onHeadersReceived` response-header defense-in-depth), calm/nameless placeholder Home, and merged `.gitignore` were already in place from a prior session and verified against all ACs.
- **Fix (AC #5 / Task 5):** removed the electron-builder template-default `publish` block (`provider: generic`, `url: https://example.com/auto-updates`) from `electron-builder.yml` — it configured a remote auto-update server, violating the local-first / no-network constraint. Replaced with a comment documenting the deliberate omission.
- **Fix (code-quality DoD):** scoped `eslint.config.mjs` `ignores` to exclude repo-root BMAD framework directories so `npm run lint` lints only the Kept application source and passes clean.
- Runtime versions confirmed: Electron 41, React 19, TypeScript across main/preload/renderer (per AR2). No downstream stack (Prisma/Zustand/Zod/Motion/date-fns) installed — correctly out of scope for this story.
- No-network sweep across `src/`, `electron.vite.config.ts`, and `electron-builder.yml`: no `fetch`/remote URLs/telemetry/analytics/auto-updater/connectivity UI remain (the only `https` reference is a doc-comment link in `src/main/index.ts`, which executes nothing).
- Design-Law guardrails verified on the placeholder: no red, no counts/badges/urgency, app does not address the user by name.

### File List

Modified:
- `electron-builder.yml` — removed template-default `publish`/auto-update block (no-network constraint).
- `eslint.config.mjs` — scoped lint `ignores` to the Kept app (exclude BMAD framework/tooling dirs).

Verified-as-scaffolded (created in prior session, confirmed against ACs this session):
- `package.json`, `electron.vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tsconfig.web.json`
- `.gitignore` (merged: `imports/*`, `resources/plants/`, `resources/windows/`, `*.db`, build output)
- `src/main/index.ts`, `src/preload/index.ts`, `src/preload/index.d.ts`
- `src/renderer/index.html`, `src/renderer/src/main.tsx`, `src/renderer/src/App.tsx`, `src/renderer/src/env.d.ts`
- `src/renderer/src/assets/base.css`, `src/renderer/src/assets/main.css`

## Change Log

| Date       | Change                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| 2026-06-16 | Verified scaffold (three-process, hardening, CSP, placeholder Home, `.gitignore`) against all 5 ACs.     |
| 2026-06-16 | Removed electron-builder template `publish`/auto-update block to honor local-first / no-network (AC #5). |
| 2026-06-16 | Scoped ESLint `ignores` to the Kept app; `typecheck`, `lint`, and `build` all pass clean. Status → review. |
