# PRD Quality Review — Kept (todo-app)

**Gate verdict: PASS-WITH-NITS**

## Overall verdict

This is a genuinely strong personal-product PRD: it has a real thesis (invert burndown → build-up), a load-bearing Design Law that the FRs and NFRs are visibly disciplined against, and an unusually honest scope. Most "requirements" are testable because they're framed as observable behaviors with explicit bans rather than adjectives. What's at risk is small and downstream-facing: the plant-growth mechanic sits right on the edge of the very "progress" the app bans and is never fully reconciled or quantified; a couple of FRs ("by click or keypress," the per-bloom completion count) leave a builder guessing; and there is no glossary for a vocabulary-heavy app, with one term ("done-garden" vs "greenhouse") drifting. None of these threaten the gate — they're tuning, not rework.

## Decision-readiness — strong

Decisions are stated as decisions, and trade-offs are named rather than smoothed. §4 explicitly chooses "felt, not measured" and owns the consequence (no analytics, no dashboard). §2 states the conflict-resolution rule outright ("When any design decision and the Design Law conflict, the Design Law wins"). The Open Questions table (§10) is real: six items resolved with the resolution recorded, one (final stack) honestly deferred to architecture. `[NOTE FOR KAYLA]` at FR28 sits at a true open seam (who writes the copy), not a safe checkpoint. No findings.

## Substance over theater — strong

No furniture. There are exactly two "personas" (§5) and both do work: Christopher defines the only designed surface; Kayla defines the data-layer-only authoring constraint that drives FR20/FR21. The Vision (§2) could not be swapped into another todo-app PRD — it is specific to this product's emotional thesis. NFRs carry product-specific bans (NFR5's enumerated list), not boilerplate. No findings.

## Strategic coherence — strong

The PRD has one thesis and the features serve it. Build-up-not-burndown drives the garden/greenhouse being the dominant view (Goals §3, FR8–FR9c), the Horizon Limit (FR11), and the unconditional-notes engine (FR25). Success signals (§4) validate the thesis (he credits himself, he adds his own tasks) rather than measuring activity — and counter-signals are explicitly the Design-Law violations, which is the right counter-metric for this product. The addendum correctly quarantines build sequencing so it does not read as scope tiers. No findings.

## Done-ness clarity — adequate

Most FRs carry a testable consequence, often as an explicit ban that is trivially checkable (FR5 "no badge, no count, no celebratory interruption"; FR7; FR17 "no red, no countdown"). This is the PRD's strongest engineering surface. The gaps are localized:

### Findings
- **medium** Per-bloom completion count is undefined (§6.2 FR9 / FR9a) — FR9 names a 4-stage sequence (bulb → sprout → stem → bloom) implying 3 advances, but FR9a says bloom happens "after several completions" and FR19 says a completion may advance "or fully bloom." A builder cannot tell whether one plant = 3 completions or N. *Fix:* state the completions-per-bloom (or that it equals the named stages, i.e. 3 advances to bloom), or tag it `[ASSUMPTION]` build-tunable like the timing thresholds already are.
- **medium** FR12 "summon by click or keypress" is unspecified (§6.3) — which affordance, which key? FR18's completion is also "click-and-drift" without the activation surface defined. For most FRs the DESIGN.md/EXPERIENCE.md spines cover this, but the peek's trigger is a primary interaction. *Fix:* either name the affordance/keybinding or add one line stating these activation details are owned by EXPERIENCE.md (the PRD already defers visual/interaction detail to the spines — make that delegation explicit for inputs).
- **low** NFR3 has no latency bound, self-flagged (§7) — "open and close immediately" with `[ASSUMPTION] no numeric latency targets.` Honest and appropriate for a personal app; noting only so story creation doesn't invent a number. *Fix:* none required; leave as-is.

## Scope honesty — strong

Omissions are explicit, not inferred. §8 Non-Goals does real work and mirrors the bans rather than restating generic exclusions. Inferences are tagged `[ASSUMPTION]` (FR17a, FR24, NFR3) and the deferred decision is tagged `[NOTE FOR KAYLA]` (FR28). Open-items density is low and entirely appropriate for the stakes. One observation rather than a fault: the Assumptions are inline but not collected into a single index — fine at this size, noted under Mechanical.

## Downstream usability — adequate

This PRD does feed a build (and existing UX spines), so the dimension applies. FR/NFR IDs are unique and the sub-lettered IDs (FR9a–d, FR17a) are a sensible way to attach detail without renumbering. The weak spot is vocabulary control for an unusually term-dense app.

### Findings
- **medium** No glossary for a heavily coined vocabulary (whole PRD) — "windowsill," "greenhouse," "done-garden," "the peek," "anchor," "blue-moon," "Now/Next/Later buckets," "do-date," "clock window" are all load-bearing domain nouns used across FRs, NFRs, and the addendum with no definitions block. Downstream (architecture, stories) will have to reverse-engineer them. *Fix:* add a short Glossary section defining the coined terms once; let FRs reference them.
- **low** "done-garden" vs "greenhouse" drift (§3 Goals + addendum vs §6.2) — Goals §3 and the addendum say "done-garden"; FR8–FR9c name the collection "the greenhouse" (with "windowsill" as the staging shelf). These read as the same concept under two names. *Fix:* pick one canonical term (or define done-garden = windowsill + greenhouse) in the glossary and use it consistently.

## Shape fit — strong

The PRD is correctly shaped for a hobby/solo, single-user product. Rigor is light where it should be (no metrics dashboard, no GTM, no multi-user) and the substance bar is still met. It is not over-formalized: there are no ceremonial user-journey blocks for a single operator, and the two "personas" earn their place by encoding constraints. The decision to push visual/interaction detail to DESIGN.md/EXPERIENCE.md keeps the PRD at the right altitude (~2 pages of capability narrative). One borderline item worth a builder's eye, raised here because it touches the product's core promise:

### Findings
- **medium** The plant-growth mechanic rides the edge of the banned "progress" (§6.2 FR9/FR9a/FR9c vs §7 NFR5) — NFR5 bans "numeric progress, 'X of Y,' streaks" and, for the greenhouse specifically, "no progress-meter toward the next bloom (he simply watches it grow)." But FR9 ("each completed task advances the plant by one growth stage") is, structurally, a visible discrete progress bar toward a bloom — the user can see stage 2 of 4 and infer "2 of 4 done." The PRD is aware of this tension and threads it ("he simply watches it grow," FR9d removes rare tiers, FR9b removes wilting), which is why this is a nit and not a contradiction. The unaddressed risk is that a literal stage indicator reads as a count. *Fix:* add one sentence making the intent explicit for the builder — the growth stages are organic/illustrative, never labeled or numbered, and no "stage N of 4" or fill-meter is ever shown — so the implementation can't accidentally render the very progress NFR5 forbids.

## Mechanical notes

- **Glossary:** absent; recommended given term density (see Downstream finding).
- **Glossary drift:** "done-garden" (§3, addendum) vs "greenhouse"/"windowsill" (§6.2) — reconcile.
- **ID continuity:** FR1–FR32 with sub-IDs FR9a–FR9d and FR17a are unique and resolve; NFR1–NFR5 clean; no gaps or duplicates found.
- **Assumptions index:** `[ASSUMPTION]` tags (FR17a, FR24, NFR3) are inline only — no collected index. Acceptable at this size; an index would help if the PRD grows.
- **Cross-references:** internal refs resolve (FR9a from FR9/FR19; FR23 dials referenced consistently in addendum). External refs to DESIGN.md/EXPERIENCE.md and the brief are stated; not verified against those files in this pass.
- **Required sections:** all expected sections for a personal-product PRD are present (Overview, Vision, Goals, Success/DoD, Users, FRs, NFRs, Non-Goals, Constraints, Open Questions).
