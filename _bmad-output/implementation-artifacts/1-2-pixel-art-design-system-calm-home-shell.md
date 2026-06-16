---
baseline_commit: 02356ae07a4013338d22d86b396298a882242ffb
---

# Story 1.2: Pixel-art design system & calm Home shell

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As Christopher,
I want a warm, dim, pixel-art window with a title bar I can navigate from,
so that opening Kept feels like a calm lit room rather than a productivity dashboard.

## Acceptance Criteria

1. **Given** the DESIGN.md tokens (UX-DR1), **when** the design system is implemented, **then** the renderer's `styles/tokens.css` defines the Candlelit Sage palette, the spacing scale, hard-corner radius, and typography tokens as CSS variables, **and** `styles/global.css` sets `image-rendering: pixelated` and a single-column, centered, reading-width layout. [Source: epics.md#Story-1.2; ux-designs/.../DESIGN.md (colors/spacing/rounded/typography front-matter + Layout & Spacing); architecture.md#Complete-Project-Directory-Structure (`renderer/styles/{tokens,global}.css`)]
2. **Given** the pixel-art depth system (UX-DR3), **then** panels use hard offset pixel shadows (no blur), layered/dithered borders, a subtle checkerboard texture, and a candle-glow vignette, **and** the soft (blurred) glow is reserved for bloom moments only. [Source: epics.md#Story-1.2; DESIGN.md#Elevation-&-Depth, #Shapes]
3. **Given** typography (UX-DR2), **then** Pixelify Sans is the primary display face and Inter is wired as the legibility fallback for longer body copy, **and** both font families are bundled/self-hosted (no network fetch). [Source: epics.md#Story-1.2; DESIGN.md#Typography; NFR2/AR17 no-network]
4. **Given** the title bar (UX-DR4, FR1), **when** Home renders, **then** a pixel title bar shows window dots and the "Kept" wordmark, **and** a top-right nav cluster shows pixel-icon buttons **home · greenhouse · journal · drawer · "+"** with a `growth-deep` selected ring on the current surface, **and** the home and "+" buttons are functional now while greenhouse, journal, and drawer render but become functional in their epics (no forward dependency). [Source: epics.md#Story-1.2; DESIGN.md#Components (Pixel title bar, nav cluster & "+"); sprint-change-proposal-2026-06-16.md (Story 1.2 nav cluster gains the 4th/drawer icon)]
5. **Given** the Design Law (NFR5), **then** no red appears anywhere and no badges or counts appear on the title bar. [Source: epics.md#Story-1.2, #NFR5, #AR17; DESIGN.md#Do's-and-Don'ts]

## Tasks / Subtasks

- [ ] Task 1: Create the token layer `src/renderer/src/styles/tokens.css` (AC: #1)
  - [ ] Define the **Candlelit Sage** palette as CSS custom properties on `:root`, copying values **exactly** from DESIGN.md front-matter (see Design Tokens table in Dev Notes): `--surface-base #16191A`, `--surface-raised #232A28`, `--text-primary #E4E5D8`, `--text-muted #9AA08C`, `--growth #9DBE9A`, `--growth-deep #7BA37F`, `--earth #AD6A38`, `--earth-light #C2814C`, `--partner-voice #E0B27C`, `--partner-voice-bg rgba(224,178,124,0.10)`, `--bloom #E9D08A`, `--wood-light #C2814C`, `--wood-mid #AD694A`, `--wood-shadow #50281D`
  - [ ] Define the spacing scale `--space-1:4px … --space-7:48px` (4/8/12/16/22/32/48)
  - [ ] Define radius tokens (`--radius-sm:7px … --radius-full:9999px`) **but** add a comment that pixel panels resolve corners to 0/hard in practice (DESIGN.md#Shapes); do not round pixel panels
  - [ ] Define typography tokens: font-family vars (`--font-display: "Pixelify Sans", …`; `--font-body: Inter, …`) and the per-role size/weight/line-height/letter-spacing for `app-title`, `app-focus-task`, `app-body`, `app-meta`, `app-eyebrow`, `note-hand` per DESIGN.md
  - [ ] **Add NO red token** — the palette has none by design (NFR5)
- [ ] Task 2: Self-host the two fonts (AC: #3)
  - [ ] `npm install @fontsource/pixelify-sans @fontsource/inter` (self-hosted, Vite-bundled — do **not** add the Google Fonts `<link>` from the mockup; that is a network call and violates NFR2/CSP)
  - [ ] Import the needed weights in the renderer entry (`main.tsx`) or via the stylesheet, e.g. `import '@fontsource/pixelify-sans/400.css'` / `/500.css` / `/600.css` and `import '@fontsource/inter/400.css'`
  - [ ] Confirm fonts load with the existing CSP (`font-src 'self' data:`) and render offline (no request to fonts.googleapis.com / fonts.gstatic.com anywhere)
- [ ] Task 3: Create `src/renderer/src/styles/global.css` — base layout + pixel-art surface (AC: #1, #2)
  - [ ] Set `image-rendering: pixelated` globally (and `shape-rendering: crispEdges` on SVG icons)
  - [ ] Single-column, centered, reading-width layout: a centered window/column, extra width becomes quiet margin (never multiple columns) (DESIGN.md#Layout-&-Spacing)
  - [ ] Warm-dark base: `background: var(--surface-base)` with the candle-glow vignette (a soft warm radial glow top-center + dim outer vignette) and the subtle checkerboard texture (repeating-conic-gradient ~8px, low opacity) — see CSS technique refs in Dev Notes
  - [ ] Set the default body font to `var(--font-display)` (app is full pixel-art); reserve `var(--font-body)` (Inter) for long-copy classes only
  - [ ] Reserve the one true **soft/blurred glow** for bloom moments only — do not use blur for routine elevation
- [ ] Task 4: Establish the reusable pixel-depth primitive(s) (AC: #2)
  - [ ] Create a shared pixel-panel primitive the later stories will reuse (a `.pixel-panel` class in global.css and/or a `PixelPanel` component in `src/renderer/src/components/`): hard offset pixel drop-shadow (no blur), layered borders (lit inner lip + dark outline + faint sage ring), optional dithered bottom edge
  - [ ] Keep it generic — the FocusCard (Story 1.6), NoteCard (Epic 3), day-peek buckets (Epic 4), etc. should compose this primitive, not re-invent the borders/shadows
- [ ] Task 5: Build the pixel title bar + nav cluster shell, replacing the placeholder Home (AC: #4, #5)
  - [ ] Replace the placeholder in `App.tsx` with the Home shell: a pixel title bar (three pixel "window" dots + the "Kept" wordmark in Pixelify Sans), and a right-aligned top-right nav cluster
  - [ ] Nav cluster = five pixel-bordered square buttons with hand-drawn pixel-art SVG icons, in order: **home, greenhouse, journal, drawer**, then a small gap, then the calm green **"+"** capture button (icon specs in Dev Notes; the home.html mockup's SVGs are a starting point but predate the drawer — add a warm-wood drawer/chest icon with a pixel knob)
  - [ ] The current surface (home) shows a `--growth-deep` selected ring; the "+" shows the same ring while the Add-a-task page is active
  - [ ] Make home and "+" interactive **now** (keyboard-operable buttons — focusable, Enter/Space activate, `aria-current`/`aria-label`), driven by **local component state** for the selected surface. Greenhouse/journal/drawer render and are focusable but their destinations are no-ops until their epics — **do not** create the Zustand store (Story 1.4) or the capture page (Story 1.5) here (no forward dependency)
  - [ ] Title bar shows **no** badges, counts, or red; the shell never addresses the user by name
  - [ ] Present the title bar so it can sit on every surface later (keep it a reusable component, e.g. `components/TitleBar.tsx` or a `home/`-local one App composes)
- [ ] Task 6: Rewire the stylesheet entry and retire the placeholder styling (AC: #1, #2, #5)
  - [ ] Update `main.tsx` to import the new `styles/global.css` (which imports `tokens.css`) instead of `./assets/main.css`
  - [ ] Remove/replace the electron-vite template placeholder styling: the light "paper" override in `assets/main.css` and the template defaults in `assets/base.css` (white/black `--ev-c-*` vars, Inter-only stack) must not fight the new warm-dark token system. Delete the placeholder rules; migrate only anything still needed into global.css
  - [ ] Verify the window opens warm/dim/dark (not the old paper placeholder) with the title bar + nav cluster visible
- [ ] Task 7: Verify (AC: #1–5)
  - [ ] `npm run typecheck` and `npm run lint` clean (lint is scoped to the Kept app per Story 1.1)
  - [ ] `npm run build` builds all three processes; production `index.html` keeps the CSP and references only local assets (no remote font/style refs)
  - [ ] Manual/observational (`electron-vite dev`): warm-dark pixel Home shell, pixel title bar + 5-button nav cluster with home selected-ring, hard offset shadows render crisp, no red anywhere, fonts render with no network activity (check DevTools Network is empty of font CDN requests)

## Dev Notes

### ⚠️ Critical: scaffold paths differ from the architecture's idealized tree

The architecture diagram (architecture.md#Complete-Project-Directory-Structure) shows a **flattened** renderer (`src/renderer/main.tsx`, `src/renderer/styles/…`). The **actual electron-vite React-TS scaffold from Story 1.1 nests renderer source under `src/renderer/src/`.** Build within the real scaffold — do **not** restructure it to match the diagram. Concrete mapping:

| Architecture says | Create/edit at (real scaffold) |
|---|---|
| `renderer/styles/tokens.css` | `src/renderer/src/styles/tokens.css` (NEW) |
| `renderer/styles/global.css` | `src/renderer/src/styles/global.css` (NEW) |
| `renderer/components/` | `src/renderer/src/components/` (NEW) |
| `renderer/App.tsx` | `src/renderer/src/App.tsx` (UPDATE — currently the placeholder) |
| `renderer/main.tsx` | `src/renderer/src/main.tsx` (UPDATE — change the CSS import) |

Current renderer files (verified this session): `src/renderer/index.html`, `src/renderer/src/{main.tsx,App.tsx,env.d.ts}`, `src/renderer/src/assets/{main.css,base.css}`. The `assets/*.css` files hold the electron-vite template defaults + the Story 1.1 placeholder — **these are what you retire in Task 6.**

### Architecture patterns and constraints

- **Renderer-only story.** This touches only `src/renderer/` and `package.json` (two font deps). Do **not** add Prisma/IPC/Zustand/Motion/clock — those are Stories 1.3 (data), 1.4 (IPC + Zustand store), 1.7 (clock), Epic 5 (Motion). Pulling them in now creates the forward dependencies the AC forbids. [Source: epics.md#Epic-1; architecture.md#Decision-Impact-Analysis]
- **No utility framework.** The starter was chosen specifically to leave styling open — Kept supplies bespoke pixel-art CSS. Do **not** add Tailwind/shadcn/styled-components/CSS-in-JS. Plain CSS + CSS variables (and CSS Modules `Component.module.css` if you want scoping). [Source: architecture.md#Selected-Starter; Story 1.1 Dev Notes]
- **Naming conventions (establish/continue):** components `PascalCase.tsx`; non-component modules `camelCase.ts`; directories `kebab-case`; CSS modules `Component.module.css`. [Source: architecture.md#Naming-Patterns]
- **DESIGN.md is the single source of truth for token values** (UX-DR1); copy them exactly. The home.html mockup is a **composition reference only** — and it intentionally diverges from production in two ways: (a) it loads fonts from the Google Fonts CDN (forbidden — self-host instead), and (b) its nav cluster predates the drawer (you must include the drawer as the 4th nav icon). Spines (DESIGN.md) win over mockups on conflict. [Source: epics.md#UX-Design-Requirements intro; sprint-change-proposal-2026-06-16.md]
- **Design-Law Guardrails (AR17 / NFR5) — mandatory on this surface:** no red anywhere (no token, none introduced); no badge/count/"X of Y"/percentage/streak/progress meter on the title bar or shell; no finish-to-unlock gating; the app's own chrome never shows Christopher's name (only K's notes may, later); no OS notifications, no network calls, no connectivity UI. [Source: architecture.md#Enforcement-Guidelines; epics.md#NFR5]

### Fonts must be self-hosted (no network — hard constraint)

The mockup's `<link href="https://fonts.googleapis.com/…">` is a **network fetch** and violates NFR2/AR17 and the renderer CSP (`connect-src`/`font-src` allow only `'self'`/`data:`). Bundle the fonts locally instead:

- Install `@fontsource/pixelify-sans` (display) and `@fontsource/inter` (body fallback). These ship the woff2 files in the package; Vite bundles them and serves from the app origin (`'self'`) — fully offline at runtime.
- Import the weights you use (DESIGN.md uses Pixelify Sans 400/500/600; Inter 400). e.g. in `main.tsx`: `import '@fontsource/pixelify-sans/400.css'` (+ `/500.css`, `/600.css`) and `import '@fontsource/inter/400.css'`.
- Keep the CSS family stacks matching DESIGN.md: display `'"Pixelify Sans", "Segoe UI", system-ui, sans-serif'`, body `'Inter, "Segoe UI", system-ui, sans-serif'`.
- After wiring, verify in DevTools that **no** request goes to a font CDN.

### Design Tokens (copy exactly from DESIGN.md front-matter)

Colors — Candlelit Sage (no red token exists):
`surface-base #16191A` · `surface-raised #232A28` · `text-primary #E4E5D8` · `text-muted #9AA08C` · `growth #9DBE9A` · `growth-deep #7BA37F` · `earth #AD6A38` · `earth-light #C2814C` · `partner-voice #E0B27C` · `partner-voice-bg rgba(224,178,124,0.10)` · `bloom #E9D08A` · `wood-light #C2814C` · `wood-mid #AD694A` · `wood-shadow #50281D`.

Spacing: `4 / 8 / 12 / 16 / 22 / 32 / 48` px.
Radius: sm 7 / md 12 / lg 14 / xl 18 / full 9999 — **resolve to 0/hard for pixel panels** (kept only for compatibility).
Typography roles (all Pixelify Sans except app-body): `app-title` 20px/600/lh1.3/ls0.2 · `app-focus-task` 19px/500/lh1.4 · `app-body` **Inter** 15px/400/lh1.55 · `app-meta` 12.5px/400/lh1.4 · `app-eyebrow` 11px/500/lh1.4/ls1.5 · `note-hand` 19px/400/lh1.5.
[Source: DESIGN.md front-matter (colors/spacing/rounded/typography) + #Colors, #Typography, #Layout-&-Spacing]

### Pixel-depth CSS techniques (from the mockup — adapt, don't copy its fonts/nav)

These are proven techniques in `mockups/home.html`; lift the CSS approach (not the CDN link, not the pre-drawer nav):

- **Hard offset shadow (no blur):** stacked solid `box-shadow`, e.g. focus/capture panels `0 0 0 3px #3a463f, 0 0 0 6px #0e1011, inset 0 0 0 3px #2c352f, 10px 10px 0 0 #000000bb`; buttons use smaller offsets `0 0 0 2px #3a463f, 2px 2px 0 #00000088`.
- **Layered borders:** `border:3px solid #0e1011` + the ring shadows above (lit inner lip via a small `::before`, faint sage ring, dark outline).
- **Dithered bottom edge:** `::after` with `repeating-linear-gradient(90deg,#0e1011 0 4px, transparent 4px 8px)`.
- **Checkerboard texture:** `repeating-conic-gradient(#1b201f 0% 25%, transparent 0% 50%)`, `background-size:8px 8px`, `opacity:.18`, behind content (`z-index:0`).
- **Candle-glow vignette:** `radial-gradient(1200px 600px at 50% -10%, #1d2221 0%, var(--surface-base) 60%)` layered over the base.
- **Selected nav ring:** swap the outer ring color to `--growth-deep` (`box-shadow:0 0 0 2px var(--growth-deep), 2px 2px 0 #00000088`).
- **SVG icons:** `shape-rendering:crispEdges; image-rendering:pixelated`, 16×16 viewBox, plain `<rect>`s, no anti-aliasing.

### Nav cluster icons (UX-DR4 / DESIGN.md#Components)

Order: **home · greenhouse · journal · drawer**, gap, **"+"**.
- **home:** terracotta stepped roof (`#C2814C`) + off-white walls (`#E4E5D8`) + carved dark door — selected on Home (`aria-current`, growth-deep ring).
- **greenhouse:** a sage `--growth` potted sprout in a terracotta `--earth` pot.
- **journal:** a muted lined notebook (`--text-muted` with a darker spine).
- **drawer:** a small wooden drawer/chest with a pixel knob in the warm-wood tones (`--wood-*`). **New — not in home.html mockup;** see `mockups/drawer.html` for the drawer surface styling and DESIGN.md#Components line for the drawer.
- **"+":** calm `--growth` plus glyph (two centered bars), `--growth-deep` ring when the Add page is active.
The home.html mockup (lines 415–447) has working SVGs for home/greenhouse/journal/"+" to start from.

### What is OUT of scope for this story (later stories)

Do not build their content now — only the shell + design system: the focus-card *content* and today-scoping (1.6), the clock window + day/night glass (1.7), real plant sprites + windowsill shelf scene (Epic 2), K's note card (Epic 3), the day-peek (Epic 4), completion ritual + Motion (Epic 5). The shell may leave a calm empty stage below the title bar; later stories fill it. [Source: epics.md Epic 1–5 mapping]

### Previous story intelligence (Story 1.1 — status: review)

- Scaffold is **electron-vite React+TS**, three-process, **hardened** (`contextIsolation/sandbox` on, `nodeIntegration` off), with a **CSP set in two places**: the `<meta>` in `src/renderer/index.html` AND `onHeadersReceived` in `src/main/index.ts`. The CSP currently allows `style-src 'self' 'unsafe-inline'` and `font-src 'self' data:` — sufficient for bundled fonts + CSS vars; **you should not need to change the CSP.** If you do, change **both** places. [Source: 1-1 Dev Notes / File List; src/renderer/index.html verified this session]
- ESLint is **scoped to the Kept app** (`eslint.config.mjs` ignores BMAD framework dirs) — keep `lint` clean; new renderer files are linted.
- Story 1.1 stripped all network/auto-update/telemetry to honor local-first. Keep that posture — the font change must stay offline (bundled, not CDN).
- Placeholder to replace: `App.tsx` renders `.home-placeholder` with two `<p>`s; `assets/main.css` defines a **light paper** theme (`--color-background:#f3ece2`) and `assets/base.css` is the electron-vite template default (white/black vars, Inter stack). Both are explicitly temporary "replaced in Story 1.2" — retire them.

### Git intelligence

Only two commits exist (`02356ae BMAD method setup`, `4eaabe7 Initial commit`); Story 1.1's work is **uncommitted** in the working tree (the whole `src/` tree is untracked per the initial git status). There is no prior renderer-CSS pattern to follow beyond the template defaults — you are establishing the design-system conventions here. Co-locate CSS Modules as `Component.module.css` if you scope per-component.

### Testing standards summary

- Framework is **Vitest**, concentrated on `src/main/engine` — **not pre-wired** and not needed here (this is presentational/CSS; no domain logic to unit-test). Do not block the story on adding a Vitest harness. [Source: architecture.md#Testing-Framework; 1-1 Testing notes]
- Meaningful verification is **manual/observational** via `electron-vite dev` (warm-dark shell, title bar + nav, selected ring, crisp pixel shadows, no red, no font network requests) plus `typecheck`/`lint`/`build` clean.

### Project Structure Notes

- New: `src/renderer/src/styles/{tokens.css,global.css}`, `src/renderer/src/components/` (at least the title-bar + pixel-panel primitives). Updated: `src/renderer/src/App.tsx`, `src/renderer/src/main.tsx`, `package.json` (+2 font deps).
- Keep the title bar a reusable component (it appears on every surface in later epics) and the pixel-panel a reusable primitive (the focus card, note card, peek buckets all build on it) — this prevents the later stories from re-inventing the depth system.
- No detected architectural conflicts beyond the scaffold-path nesting reconciled above.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.2-Pixel-art-design-system-calm-Home-shell]
- [Source: _bmad-output/planning-artifacts/epics.md — UX-DR1, UX-DR2, UX-DR3, UX-DR4, FR1, NFR2, NFR5, AR7, AR13, AR17]
- [Source: _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/DESIGN.md — front-matter tokens (colors/spacing/rounded/typography), #Colors, #Typography, #Layout-&-Spacing, #Elevation-&-Depth, #Shapes, #Components, #Do's-and-Don'ts]
- [Source: _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/home.html — composition + pixel-CSS reference (NOT its CDN fonts or pre-drawer nav)]
- [Source: _bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/mockups/drawer.html — drawer nav icon + surface reference]
- [Source: _bmad-output/planning-artifacts/architecture.md#Complete-Project-Directory-Structure, #Naming-Patterns, #Structure-Patterns, #Selected-Starter, #Enforcement-Guidelines]
- [Source: _bmad-output/planning-artifacts/sprint-change-proposal-2026-06-16.md — Story 1.2 nav cluster gains the drawer (4th) icon]
- [Source: _bmad-output/implementation-artifacts/1-1-scaffold-a-runnable-kept-desktop-window.md — scaffold structure, CSP locations, ESLint scoping, placeholder files to retire]

### Latest tech information (version awareness)

- Render stack pinned by architecture (do not change here): **React 19**, **TypeScript**, **electron-vite**. Downstream libs (Zustand 5, Motion 12, Prisma 7, date-fns 4) are **not** installed in this story.
- **Fonts (new deps this story):** `@fontsource/pixelify-sans` and `@fontsource/inter` — self-hosted Google-Font packages; Vite bundles the woff2 into the app (offline-safe, served from `'self'`). A variable variant `@fontsource-variable/pixelify-sans` exists if you prefer one file across weights. Install the latest published versions. [Source: fontsource.org/fonts/pixelify-sans; npmjs.com/package/@fontsource/pixelify-sans]

## Project Context Reference

- Epic file: `_bmad-output/planning-artifacts/epics.md` (Kept — calm, offline pixel-art todo app; Design Law: "The love in Kept is never conditional, never withheld, never earned.")
- UX spines: `_bmad-output/planning-artifacts/ux-designs/ux-todo-app-2026-06-15/{DESIGN.md,EXPERIENCE.md}` (DESIGN.md is the token source of truth for this story).
- Architecture: `_bmad-output/planning-artifacts/architecture.md` (READY FOR IMPLEMENTATION).
- No `project-context.md` present in the repo at story-creation time.

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

- Story created via create-story workflow — comprehensive context engine analysis completed; comprehensive developer guide created.

### File List

## Change Log

| Date       | Change                                                              |
| ---------- | ------------------------------------------------------------------- |
| 2026-06-16 | Story drafted via create-story workflow. Status → ready-for-dev.    |
