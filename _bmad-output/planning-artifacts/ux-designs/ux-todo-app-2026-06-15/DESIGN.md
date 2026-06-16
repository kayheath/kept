---
name: Kept
description: A calming, offline, single-user desktop todo app — an emotional-regulation tool disguised as a todo app. Full pixel-art "cozy game UI", warm-dark, plant-grown, celebrates done. No red, no streaks, no pressure.
status: final
updated: 2026-06-15
project: todo-app
colors:
  # "Candlelit Sage" — warm-dark palette. A cool sage base lifted everywhere by
  # warm gold candlelight. Dark-only (the app has no light mode). NO RED anywhere.
  surface-base: '#16191A'
  surface-raised: '#232A28'
  text-primary: '#E4E5D8'
  text-muted: '#9AA08C'
  growth: '#9DBE9A'
  growth-deep: '#7BA37F'
  earth: '#AD6A38'
  earth-light: '#C2814C'
  partner-voice: '#E0B27C'
  partner-voice-bg: 'rgba(224,178,124,0.10)'
  bloom: '#E9D08A'
  # Warm-wood family — the terracotta-toned wood of the wall shelf and the
  # orange-frame clock window. Coordinated with the pots & earth tokens.
  wood-light: '#C2814C'
  wood-mid: '#AD694A'
  wood-shadow: '#50281D'
typography:
  # Two-voice system, but NOT font-vs-font. BOTH the app's own voice and K's
  # note voice are set in Pixelify Sans (the cozy-game pixel display face) —
  # the app is full pixel-art. The voices are distinguished by COLOR and
  # TREATMENT, not typeface: the app voice is off-white/sage
  # (text-primary / growth) in clean pixel panels; K's voice is warm gold
  # (partner-voice) on her dashed, bloom-glowing note card, signed "— K".
  # Inter is only a legibility FALLBACK for longer secondary/body copy where
  # the pixel face would strain at length. Token names are unchanged.
  app-title:
    # Primary display face is now Pixelify Sans (the pixel-art title bar, etc.).
    fontFamily: '"Pixelify Sans", "Segoe UI", system-ui, sans-serif'
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.2px
  app-focus-task:
    fontFamily: '"Pixelify Sans", "Segoe UI", system-ui, sans-serif'
    fontSize: 19px
    fontWeight: '500'
    lineHeight: '1.4'
  app-body:
    # Longer secondary/body copy falls back to Inter where pixel would strain
    # legibility; short body copy may still use Pixelify Sans.
    fontFamily: 'Inter, "Segoe UI", system-ui, sans-serif'
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.55'
  app-meta:
    fontFamily: '"Pixelify Sans", "Segoe UI", system-ui, sans-serif'
    fontSize: 12.5px
    fontWeight: '400'
    lineHeight: '1.4'
  app-eyebrow:
    fontFamily: '"Pixelify Sans", "Segoe UI", system-ui, sans-serif'
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 1.5px
  note-hand:
    # K's voice. Same Pixelify Sans face as the app — set apart by COLOR
    # (warm gold) and TREATMENT (dashed, bloom-glowing card), not by font.
    fontFamily: '"Pixelify Sans", "VT323", monospace'
    fontSize: 19px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 7px
  md: 12px
  lg: 14px
  xl: 18px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 22px
  '6': 32px
  '7': 48px
components:
  focus-card:
    background: '{colors.surface-raised}'
    text: '{colors.text-primary}'
    accent-edge: '{colors.growth}'
    radius: '{rounded.md}'
    label: '{colors.growth}'
  note-card:
    background: '{colors.partner-voice-bg}'
    text: '{colors.partner-voice}'
    border: '1px dashed {colors.partner-voice}'
    font: '{typography.note-hand}'
    radius: '{rounded.md}'
    bloom-glow: '{colors.bloom}'
  done-garden:
    # The windowsill: the Home shelf display. The currently-growing plant plus
    # a few curated favorites, on the wooden wall shelf. Real pixel-plant sprites.
    background: '{colors.surface-base}'
    leaf: '{colors.growth}'
    leaf-deep: '{colors.growth-deep}'
    pot: '{colors.earth}'
    pot-rim: '{colors.earth-light}'
    bloom: '{colors.bloom}'
    shelf-wood: '{colors.wood-mid}'
    shelf-wood-lit: '{colors.wood-light}'
    shelf-wood-shadow: '{colors.wood-shadow}'
  greenhouse:
    # The collection gallery: a browsable, calm record of every bloomed plant.
    # An opt-in surface, separate from Home. No counts, no locked slots, no tiers.
    background: '{colors.surface-base}'
    leaf: '{colors.growth}'
    leaf-deep: '{colors.growth-deep}'
    pot: '{colors.earth}'
    pot-rim: '{colors.earth-light}'
    bloom: '{colors.bloom}'
    shelf-wood: '{colors.wood-mid}'
    shelf-wood-lit: '{colors.wood-light}'
    shelf-wood-shadow: '{colors.wood-shadow}'
  capture-input:
    # Single prominent pixel-bordered field; hard offset shadow, dithered edge.
    background: '{colors.surface-raised}'
    text: '{colors.text-primary}'
    placeholder: '{colors.text-muted}'
    caret: '{colors.growth}'
  capture-button:
    # The "+" in the top-right of the pixel title bar. Calm green plus glyph.
    glyph: '{colors.growth}'
    glyph-active-ring: '{colors.growth-deep}'
  clock-window:
    # Pixel arched-window sprite (orange/terracotta frame); glass color is the
    # day/night indicator. Time label below in gold. Home only.
    frame-wood: '{colors.wood-mid}'
    frame-wood-shadow: '{colors.wood-shadow}'
    time-label: '{colors.partner-voice}'
    # Sampled from the actual orange-frame arched window sprites (no longer inferred).
    glass-morning: '#E5CFAF'
    glass-day: '#96ADB8'
    glass-dusk: '#B691B5'
    glass-night: '#5C4C75'
  day-peek:
    background: '{colors.surface-raised}'
    bucket-label: '{colors.text-muted}'
    radius: '{rounded.lg}'
  drawer:
    # The opt-in held-task surface. Calm Soon/Later/Someday groups + search.
    # No counts, no red, no urgency.
    background: '{colors.surface-base}'
    group-label: '{colors.text-muted}'      # Soon may take {colors.growth}
    deadline-tag: '{colors.partner-voice}'   # muted gold — NEVER red
    search-bg: '{colors.surface-raised}'
    radius: '{rounded.lg}'
  task-editor:
    # Single-task editor opened from the drawer. Edit words + optional date chips.
    background: '{colors.surface-raised}'
    text: '{colors.text-primary}'
    caret: '{colors.growth}'
    radius: '{rounded.md}'
---

## Brand & Style

Kept is a calming, offline desktop app built for one person. It is an emotional-regulation tool wearing the clothes of a todo app. Where ordinary productivity software burns a backlog *down* and punishes the gaps, Kept builds *up* — it celebrates what got done, holds the undone quietly, and weaves in pre-written notes of love from the user's partner. The entire surface is checked against one principle (see EXPERIENCE.md, "The Design Law"): the love here is never conditional, never withheld, never earned.

The mood is **warm, dim, cozy — a low-light room you exhale into.** This is a warm dark theme, never cold or clinical: a cool sage base lifted everywhere by warm gold light, as if a single candle is burning just off-screen.

Kept is a **deliberately full pixel-art, cozy-game-styled desktop app** ("cozy game UI" — Stardew-adjacent calm). The whole surface commits to the aesthetic: **pixel-bordered panels** in the RPG dialog-box style, **hard OFFSET pixel drop-shadows** (no blur), dithered/layered borders, a subtle **checkerboard texture**, a **pixel title bar**, game-style buttons, and a wall-mounted wooden **SHELF scene** that the plant pots rest on. Plants are the ambient warmth *and* the functional metaphor: completing a task advances one living plant by a growth stage, and bloomed plants are kept in a collection — the **greenhouse** (see Components → Growing windowsill / Greenhouse).

This supersedes any earlier framing that called for visual minimalism, "no whimsy in the task structure," or a clean humanist sans for the app's own voice. **The calm is preserved differently now:** through generous whitespace, one-thing-at-a-time focus, the dark warm palette, and unwavering legibility — *not* through visual restraint. The pixel-art is the cozy charm; the calm is the layout and the love, not a stripped-down look.

**Day vs. night.** The surface dims with the clock — daytime is the warmer, slightly brighter "loving coach" register; evening/night settles dimmer and softer toward the "soft landing." This is a tonal shift on the same palette, not a second theme. It is now *also* made visible by the **clock window's glass color** (see Components → Clock window), which shifts amber → blue → mauve → navy across the day.

### Assets

All source sprite sheets below are **licensed paid art and are gitignored** (root `.gitignore`); the extracted frames in `mockups/sprites/` and `.working/sprites/` are gitignored as well. None of it is committed or redistributed; re-download from source if lost.

- **`imports/Plants.png`** (repo root, 1760×2496 px) — pixel-art plants, **licensed from https://umoral.itch.io/plants2024**. Growth frames are **16×32 cells**; the **brown-pot columns** are the ones used for the windowsill and greenhouse plants. The sheet contains multi-frame **bulb → sprout → stem → bloom** growth sequences (these drive the per-completion growth on the windowsill — one stage per task — until a plant blooms and joins the greenhouse), succulents/cacti/leafy greens, terracotta/clay pots, and soft pink/yellow bloom accents. Some sheet frames contain **red flowers — EXCLUDED**; no red sprite frame is imported or rendered (see Do's and Don'ts). A low-res preview lives at `imports/plant-sprite-sheet.png` (also gitignored).
- **`imports/16x16_windows_brown.png`** and **`imports/16x16_windows_orange.png`** (each 560×80 px, 16×16 cells) — pixel-art windows. The **orange-frame arched window** (orange sheet, row 1) is used for the Home clock window; its glass color encodes the time of day. The frame's warm terracotta wood (~`#AD694A` with a `#50281D` dark edge) coordinates with the pots and the shelf. The day/night glass set is extracted to `.working/sprites/window_{morning,day,dusk,night}.png` and mirrored to `mockups/sprites/`. Licensed from **https://pixelmia.itch.io/16x16-windows** — treated as licensed paid art (same handling as `Plants.png`: gitignored, not committed).

## Colors

The palette is "Candlelit Sage": sage greens warmed by gold candlelight on a near-black warm base. Every value below is lifted exactly from the locked theme.

- **Base (`#16191A`)** — the room. A warm near-black; the canvas everything rests on. Low-light by design.
- **Raised surface (`#232A28`)** — cards, the capture input, the focus task, the day-peek. A faintly green-warmed lift off the base; depth comes from tone, not borders.
- **Primary text (`#E4E5D8`)** — warm off-white. Calm, readable, never pure white (which would feel clinical against the dark).
- **Muted text (`#9AA08C`)** — sage-grey. Secondary copy, eyebrows, breath lines, bucket labels, the gentle "next" hint. Quiet by intent.
- **Growth / sage green (`#9DBE9A`)** — the living accent. Focus-card edge and label, leaves, "something grew" copy. This is the color of progress — calm, not alarming.
- **Growth deep (`#7BA37F`)** — stems and shadowed foliage; the darker companion to growth.
- **Earth / terracotta (`#AD6A38`)** — the warm earthy secondary, drawn from the pots. Pot bodies and warm structural accents.
- **Earth light (`#C2814C`)** — pot rims and lit clay edges.
- **Partner's voice (`#E0B27C`)** — warm gold. K's note text. Her voice *is* the candleflame — set apart from the app's own off-white text by warmth (see Typography + note-card).
- **Bloom / completion glow (`#E9D08A`)** — pale gold. The light of a completion: a plant blooming and moving to the greenhouse, the soft glow when a note arrives, the completion-moment dot. Used only for moments of arrival, never as chrome.

**Warm-wood family** — the terracotta-toned wood of the wall shelf and the orange-frame clock window, coordinated with the pots:
- **Wood light (`#C2814C`)** — the lit top lip of the shelf and the window's highlit frame edge.
- **Wood mid (`#AD694A`)** — the main face of the shelf ledge and the window frame.
- **Wood shadow (`#50281D`)** — the dark pixel edge / underside cast of the shelf and frame; the deepest terracotta.

**No red appears anywhere in Kept** — not as an error color, not as a "due/overdue" color, not in any imported sprite frame. The palette has no red token because the product has no use for one.

## Typography

Two voices, deliberately distinct — but **distinguished by color and treatment, not by typeface.** Both the app's own voice and K's note voice are set in **Pixelify Sans**, the cozy-game pixel display face; Kept is full pixel-art, so its own text is pixel too. (This reconciles the earlier "clean sans vs. handwritten/script" framing: the split is no longer font-vs-font.)

**Pixelify Sans is the primary display face** across `app-title`, `app-focus-task`, `app-meta`, `app-eyebrow`, and the focus-task title. **Inter is now only a legibility fallback** (`app-body`) for longer secondary/body copy where the pixel face would strain at length — e.g. the quiet reassurance line beneath a bloomed note. Short body copy may still be pixel.

**The app's own voice** reads in off-white/sage: `{colors.text-primary}` for primary text and `{colors.growth}` for living accents and the focus eyebrow. Eyebrows ("Today", "Things you've grown") are the tracked-out, uppercase treatment. The app never shouts: no exclamation typography, no urgent display.

**K's note voice** (`note-hand`) is the *same Pixelify Sans face*, set apart by **color and treatment**: warm gold `{colors.partner-voice}` text on her dashed, `{colors.bloom}`-glowing note card, signed "— K". It appears *only* inside K's notes and the Day Journal's preserved notes, and is the only place Christopher's name ever appears. This two-voice split is load-bearing: it's how Christopher always knows, at a glance, which words are the software's (off-white/sage, plain panels) and which are hers (gold, on the glowing dashed card).

## Layout & Spacing

Scale: 4 / 8 / 12 / 16 / 22 / 32 / 48 px. The largest gaps (`{spacing.6}`, `{spacing.7}`) separate the major zones — focus, windowsill, capture; the smallest sit inside a single card. The home surface is **single-column and centered**, generously margined; it should feel like one calm page, never a dense dashboard.

This is a desktop application: a resizable window, click + keyboard interaction, no touch targets. Content sits in a comfortable reading-width column centered in the window; extra width becomes quiet margin, not more columns. Only one thing is ever in focus at a time, with the windowsill below it and capture within easy reach.

## Elevation & Depth

Depth is **real and pixel-rendered** — this is a cozy-game UI, so it builds depth the way RPG dialog boxes do: with **hard, offset pixel drop-shadows (no blur)**, layered borders, and a lifted focus card, all on top of the warm tonal base.

- **Hard offset pixel shadows.** Panels cast a solid dark block offset down-and-right (e.g. `10px 10px 0` on the focus card and capture input, smaller offsets on buttons and chips). No Gaussian blur, no soft falloff — the shadow is a crisp pixel slab. This reads as a card physically lifted off the surface.
- **The lifted focus card** is the most elevated element on Home: a stack of layered pixel borders (lit inner lip, dark outline, a faint sage ring) plus the big hard offset shadow and a dithered bottom edge. It is unmistakably *the* one thing in focus.
- **The shelf-on-a-wall scene** gives the windowsill real depth: the wooden ledge has a lit top lip (`{colors.wood-light}`), a main face (`{colors.wood-mid}`), and a dark underside cast (`{colors.wood-shadow}`), with **support brackets/corbels that read as attached to the underside of the shelf** (connected to the ledge, not floating blocks below it). The pots rest *on* the shelf, casting their own small hard contact shadows.
- **Candle-glow vignette.** A soft warm radial glow at the top of the room and a dim outer vignette keep the low-light, exhale-when-you-open-it feeling. The one true *glow* (soft, blurred) is reserved for the **bloom moment** (`{colors.bloom}`) on a completion or an arriving note — never used for routine hierarchy. Everything else uses the hard pixel shadow.

## Shapes

**Hard-edged, pixel-art shapes throughout** — this supersedes the earlier soft-rounded-corner direction. Panels, the focus card, the note card, the capture input, the day-peek buckets, and buttons all use **square pixel corners with layered/dithered pixel borders** (RPG dialog-box style), rendered crisp via `image-rendering: pixelated`. The plant and window sprites likewise keep their hard pixel edges — that blockiness is the cozy-game charm, now consistent across the *entire* surface rather than contrasted against soft cards.

The `rounded` tokens are retained for compatibility but should resolve to **0 / hard corners** in practice for pixel panels; any rounding is incidental, never the visual language. Calm comes from whitespace, the one-thing-at-a-time layout, and the warm dark palette — not from rounded softness.

## Components

- **Pixel title bar, nav cluster & "+" capture button** — `{components.capture-button}`. Home and every surface wear a pixel title bar (three pixel "window" dots, the "Kept" wordmark in Pixelify Sans). At the **top-right of the title bar** sits a right-aligned **nav cluster** of small pixel-bordered square buttons with **hand-drawn pixel-art icons** (crisp SVG rectangles, no anti-aliasing): **home** (terracotta stepped roof + off-white walls + carved door), **greenhouse** (a sage `{colors.growth}` potted sprout in a terracotta pot), **journal** (a muted lined notebook), **drawer** (a small wooden drawer/chest with a pixel knob, in the warm-wood tones), then a small gap and the **"+" capture button** (a calm `{colors.growth}` plus glyph). Every button is a pixel-bordered square with a hard offset shadow. The button for the **current surface** shows a `{colors.growth-deep}` selected ring (e.g. home on Home, greenhouse in the greenhouse); the "+" shows the same selected ring while the Add-a-task page is active. This cluster is the consistent, calm entry into the greenhouse, the Day Journal, and the drawer (all opt-in, separate surfaces) and back to Home. (Behavior in EXPERIENCE.md.)
- **Clock window** — `{components.clock-window}`. **Home only.** A pixel arched-window sprite (orange/terracotta frame, from `imports/16x16_windows_orange.png`, scaled crisp ~7×) sits in the **upper-right gap of Home**, centered in the empty column to the right of the focus card. The **current time** reads below it in `{colors.partner-voice}` gold (Pixelify Sans), time only — no caption. The **glass color is the day/night indicator**: amber morning (`#E5CFAF`) → blue day (`#96ADB8`) → mauve dusk (`#B691B5`) → deep-violet night (`#5C4C75`), sampled from the actual sprites, making the day→night tonal shift visible. The frame casts a hard pixel drop-shadow like the rest of the scene.
- **Focus task card** — `{components.focus-card}`. The single current task, the most lifted element on Home (see Elevation & Depth): a pixel-bordered panel on `{colors.surface-raised}` with layered borders, a hard offset shadow, a dithered bottom edge, and a small `{colors.growth}` eyebrow label ("Your one thing"). Task title in `app-focus-task` (Pixelify Sans); a quiet "breath line" below in `{colors.text-muted}` ("Nothing else is asking for you right now."). No checkbox, no count, no due-badge — completion is a ritual gesture, not a checkbox tick (see EXPERIENCE.md).
- **Growing windowsill** — `{components.done-garden}`. The dominant, build-up view on Home — the **windowsill**: **real pixel-plant sprites** (growth-stage frames from `imports/Plants.png`, brown-pot columns) resting **bottom-aligned on the wooden wall shelf** (`{colors.wood-mid}` face, `{colors.wood-light}` lit lip, `{colors.wood-shadow}` edge, with brackets attached to the underside). It shows the **one currently-growing plant** plus a **few favorites Christopher has curated** from the greenhouse; display slots are limited and rearrangeable any time. Leaves in `{colors.growth}`/`{colors.growth-deep}`, blooms in `{colors.bloom}`. Labeled "Things you've grown" in a muted eyebrow. Each completion **advances the growing plant by one stage** (bulb → sprout → stem → bloom); when it fully **blooms** it is gently moved into the greenhouse and a **fresh sprout** begins. Plants never wilt or are removed to reflect a slow day — a plant simply waits. No numbers, no progress bars, no progress-to-bloom meter — the plant *is* the measure, felt not counted.
- **Greenhouse** — `{components.greenhouse}`. The collection gallery: a calm, browsable record of every plant Christopher has ever bloomed, on an opt-in surface separate from Home (reached via the title-bar nav cluster, like the Day Journal). **Layout:** a centered header — eyebrow "THE GREENHOUSE" in `{colors.partner-voice}`, then the app's plain off-white line "Everything you've grown." with a muted "It all stays here. Nothing ever wilts." — sitting well **above** a vertical wall of **wooden shelves** (same shelf scene as the windowsill: lit lip, terracotta wood face, dark cast, attached corbels), each holding a row of bloomed pixel-plant sprites resting on the ledge. No clock window here (Home only). A gentle closing line ("every one of these was a day you showed up") rests beneath the shelves. **Curation:** Christopher keeps a plant on the windowsill by **favoriting** it — a small `{colors.bloom}` gold **pixel heart** marks a kept plant (with a quiet "♥ on your sill" tag) and gives it the soft bloom glow; selecting a plant raises a calm pixel-bordered popover ("keep this one in view? · ♥ put on the windowsill"). It is a **record of accomplishments, never a set to complete**: no counts, no collection-completion %, no rare/legendary tiers, no empty or locked plant slots, no red. Plants persist here forever; nothing decays or is removed. Mockup: `mockups/greenhouse.html`.
- **K's note card** — `{components.note-card}`. Set apart by **color and treatment, not font**: same Pixelify Sans face, but warm gold `{colors.partner-voice}` text on a faint `{colors.partner-voice-bg}` wash, a **dashed** `{colors.partner-voice}` border, signed "— K". When a note arrives it carries a soft `{colors.bloom}` **bloom glow** (the moment of arrival). This is the only surface that may say Christopher's name; the app chrome never does.
- **Completion bloom** — the completion moment on Home: the finished focus card drifts down toward the windowsill and fades, the **currently-growing plant advances one stage** with a soft pale-gold `{colors.bloom}` halo and a quiet "something grew" marker (and if that stage was its last, it **blooms and moves to the greenhouse** as a fresh sprout takes its place), and **K's note blooms in** on its glowing dashed card. The bloom glow is the one true soft glow in the system (see Elevation & Depth). (Behavior in EXPERIENCE.md.)
- **Day-peek buckets** — `{components.day-peek}`. A calm, today-scoped view summoned on demand (click/keypress), opening on a slightly dimmed scrim. Three pixel-bordered buckets — **Now / Next / Later** — each headed in Pixelify Sans (`{colors.growth}` / `{colors.partner-voice}` / `{colors.text-muted}`), items as plain pixel lines with calm pixel bullets (no checkboxes). A quietly-held **deadline** appears as a muted, **non-red** pixel tag. Today-scoped only; the future stays in the vault. No full backlog, no counts-as-pressure.
- **The Drawer** — `{components.drawer}`. An opt-in surface separate from Home (reached via the title-bar nav, like the greenhouse and journal), **closed by default and never auto-surfaced**. A centered calm header (eyebrow "THE DRAWER" in `{colors.partner-voice}`, the plain off-white line "Everything you're keeping." and a muted "It's all here. Nothing's lost."), a **search field** (pixel-bordered, on `{colors.surface-raised}`, sage caret — same family as the capture input) to confirm what's already captured, then the held tasks in gentle, generously-spaced groups — **Soon / Later / Someday** — each headed in Pixelify Sans as a quiet eyebrow (Soon may take `{colors.growth}`, Later/Someday `{colors.text-muted}`). Items are plain pixel lines with calm pixel bullets — **no checkboxes, no per-group counts**; a quietly-held deadline shows as a muted **non-red** pixel tag. Selecting a line opens the task editor. **No backlog wall, no red, no urgency** — spacious and calm, the way to *find* a task, never to be confronted by all of them. Mockup: `mockups/drawer.html`.
- **Task editor** — `{components.task-editor}`. Opened from the drawer for **one task at a time**: a pixel-bordered panel on `{colors.surface-raised}` (hard offset shadow, layered borders) with the task's words in an editable field (sage caret) and the same two **optional muted dashed date chips** as capture — a do-date (sage dot) and a deadline (gold/`{colors.bloom}` dot, **never red**). Saving settles the task back quietly (no badge, no count). A calm **"let it go"** control deletes the task behind a gentle, **non-alarming** confirmation — never a red destructive button. Tasks only; notes are never editable.
- **Capture input** — `{components.capture-input}`. The star of the Add-a-task page: a **single prominent pixel-bordered text field** on `{colors.surface-raised}` with layered borders and a hard offset shadow, a blinking `{colors.growth}` pixel caret, `{colors.text-muted}` placeholder. Type a few words, press Enter, done. Below it the two dates sit as clearly-**optional muted chips** (dashed pixel border): a **do-date** chip (calm sage dot) and a **deadline** chip (calm gold/`{colors.bloom}` dot — **never red**). No required fields, no date pickers demanded up front. Frictionless by design.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Warm-dark "Candlelit Sage" only — sage greens lifted by gold candlelight | Use **red** anywhere — no error red, no overdue red, no red sprite frames |
| Celebrate done — the growing windowsill plant is the dominant view; bloomed plants are kept in the greenhouse | Show badges, counts, numeric progress, or a "X of Y done" |
| Let the plant *be* the measure of progress (felt, not counted) — he just watches it grow | Add streaks, stats, or any gamified urgency |
| Keep the greenhouse a calm record of accomplishments; let plants persist and curate favorites onto the windowsill | Add rare/legendary plant tiers, a progress-to-bloom meter, a collection-completion %, or empty/locked plant slots |
| Let plants simply wait through slow days | Wilt, decay, remove, or reset any plant to reflect inactivity |
| Two voices by **color + treatment**: off-white/sage app text vs. gold K-notes on the glowing dashed card (both Pixelify Sans) | Distinguish the voices by font, or let K's gold note treatment bleed into app chrome |
| Full pixel-art depth — hard offset pixel shadows, layered borders, the lifted focus card, the shelf-on-a-wall scene; reserve the soft *glow* for bloom moments | Use blurred/soft drop-shadows for routine hierarchy, or break the pixel language with soft elevation |
| Hard-edged pixel panels (RPG dialog-box borders); keep the calm in whitespace, focus, and the warm dark palette | Add exclamation marks, urgent color, countdown/timer pressure, or soft rounded "minimal" surfaces |
| Keep Home single-column, calm, today-scoped; put beyond-today tasks only in the opt-in drawer (calm Soon/Later/Someday groups + search) | Show a full backlog or dense dashboard on Home or push one at him; add counts, red, or urgency to the drawer |
| Frictionless capture — no required fields | Demand fields, due dates, or categories before a task can be saved |
| Let Christopher's name appear only inside K's notes | Address the user by name anywhere in the app's own UI |
