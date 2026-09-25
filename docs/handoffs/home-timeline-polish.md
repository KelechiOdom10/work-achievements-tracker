# Home and Timeline polish handoff

## Mission

Turn the selected company Home and Timeline into a cohesive, production-quality
experience inside the existing application shell. Preserve the product thinking
and code already in place. This is a focused design-engineering pass, not a new
prototype contest and not permission to replace the design system.

The outcome should feel **calm, warm, playful, fast, and considered**. It should
make the user proud of their real work without resembling LinkedIn, corporate HR
software, a metrics dashboard, a childish game, or a guilt machine.

Home is the selected **Joyful desk** direction. Timeline is a separate top-level
company page reached from the left sidebar. Timeline needs the deeper pass, but
both pages and their shared shell must be reviewed together.

**Timeline spacing and layout are primary design problems in this pass.** Treat
them as core usability and hierarchy work, not final visual cleanup. The page
must establish a deliberate reading width, chronological cadence, date/event
alignment, vertical rhythm, evidence density, and useful allocation of desktop
space, then collapse cleanly on narrow screens.

## Start here

Before editing:

1. Read this file, then read:
   - `docs/product-direction.md`
   - `docs/domain-model.md`
   - `docs/frontend-design-brief.md`
   - `docs/roadmap.md`
2. Inspect `git status` and the current diff. The working tree intentionally
   contains substantial uncommitted product work. Preserve it and do not reset,
   revert, or rebuild the feature from an old commit.
3. Run the app, authenticate through a legitimate development or seeded flow,
   and inspect the real Home and Timeline in the existing shell before forming
   conclusions or editing styles.
4. Capture evidence at approximately 360 px, 768 px, and 1280 px. Inspect both
   pages, the sidebar/shell, and the transitions between them.

The discovery phase is complete only when every proposed change is tied to an
observed screen, state, or interaction rather than taste alone.

## Settled product and information architecture

These decisions are inputs, not questions to reopen:

- The user account is the tenant. Company workspaces are private contexts within
  one person's career record, not shared employer tenants.
- The daily product experience is a meaningful work history. The first concrete
  payoff is performance-review preparation.
- Raw source activity and curated achievements are separate layers.
- GitHub and Linear are the primary future sources. Selected Notion pages may
  supply architectural or other supporting evidence.
- A company can contain multiple role periods. The future personal career home
  spans companies.
- Capture starts small and enrichment is progressive.
- Projects can contain achievements and evidence; standalone achievements also
  exist.
- Goals remain forward-looking and appear as current focus. Milestones are dated
  project or goal checkpoints that become Timeline moments when reached.
- Calendar is a date lens over the record, not its own content type or page.
- AI is user-invoked, receives only selected relevant content, and never invents
  contribution, outcomes, or metrics.
- Sharing and export are private and explicit.
- Every page must remain usable on mobile.

### Home's job

Home is the warm, useful starting point for:

- immediate capture;
- recent meaningful work;
- current focus and the latest relevant checkpoint;
- source material awaiting reflection; and
- review preparation when a review is active or approaching.

It is not a configurable widget dashboard. A module earns space only if it helps
the user remember, reflect, or take a useful next step.

### Timeline's job

Timeline is the factual chronological record for returning to and finding
meaningful work. Peer events are:

- achievements;
- important project checkpoints;
- decisions;
- learning;
- concrete goal progress; and
- role changes.

Pull requests, tickets, Notion pages, feedback, and metrics normally appear as
nested supporting evidence, not as equal timeline events. Raw imported activity
remains recoverable in the future “From your tools”/activity history.

Timeline retrieval starts with **Search, Date, and Project**. Search includes the
meaningful entry, project/goal context, and attached evidence. Home may deep-link
to a selected month or project on Timeline.

## Current implementation

Primary files:

- `frontend/src/components/career/CompanyHome.tsx`
- `frontend/src/components/career/CompanyTimeline.tsx`
- `frontend/src/components/layouts/app-layout/AppLayout.tsx`
- `frontend/src/routes/app/companies/$companySlug/index.tsx`
- `frontend/src/routes/app/companies/$companySlug/timeline.tsx`
- `frontend/src/index.css`
- `frontend/tailwind.config.ts`

The current pages are selected structural prototypes promoted to real routes.
They still use fixture content and are not the production data implementation.
Issue #7 owns real Home data and issue #8 owns real Timeline data/retrieval. Keep
this pass focused on visual hierarchy, interaction quality, responsive behaviour,
accessibility, and the component/design-system work needed for those outcomes.
Do not manufacture backend behaviour to make the mock content look complete.

The existing warm ivory/charcoal token system, company creation, onboarding,
company switcher, application shell, Radix/shadcn primitives, and achievement
editor work are valuable and should be evolved rather than replaced. Semantic
tokens are the implementation contract; avoid scattering a new palette through
one-off utility values.

Likely audit questions—not predetermined findings—include:

- Does the shell's bordered, rounded, elevated main container help or compete
  with the page surfaces?
- Does Home read as a purposeful composition or a set of equally loud cards?
- Does Timeline's large card-inside-card treatment obscure its chronological
  structure?
- Does the desktop filter rail justify its permanent width, and does it avoid a
  dead right-hand zone at common widths?
- Does the relationship between page header, filter controls, month grouping,
  date rail, timeline line, event marker, event content, and nested evidence
  create one readable spatial system?
- Are event spacing and content width calm enough for reading while still dense
  enough to scan several months of work efficiently?
- Are event type, title, context, evidence, and action visually distinct without
  turning the record into metadata soup?
- Do colour, rounding, elevation, density, and motion feel like one product
  across Home, Timeline, and the shell?

Verify these in the browser before acting on them.

## Reference synthesis

The references are ingredients, not replacement token files. Extract principles
and apply them through this product's semantic system.

### Aboard — Joyful HR

Source reference supplied by the user:
`/Users/kelechiodom/.codex/attachments/1a8f5989-194b-41db-93bb-064e4cbb49ab/pasted-text.txt`

Useful signals:

- near-white paper canvas and white inner surfaces;
- charcoal ink, quiet graphite text, one clear signal blue;
- pastel washes used as meaningful surfaces and as a substitute for elevation;
- spacious section rhythm, generous object padding, compact controls;
- large soft modules paired with tighter inner surfaces and pill actions;
- system typography with controlled tracking and comfortable density;
- editorial, calm, and human rather than marketing-loud.

### Evernote

Source reference supplied by the user:
`/Users/kelechiodom/.codex/attachments/8307bb10-4f9f-4927-8d2e-0d0821d4013e/pasted-text.txt`

Useful signals:

- warm cream paper, ivory/white cards, and hairline borders;
- charcoal and graphite with one restrained accent;
- airy editorial hierarchy and generous vertical rhythm;
- flat surfaces, subtle rounding, rare shadows;
- a calm, lived-in notebook character rather than glossy software chrome.

### How to reconcile them

Aboard's larger radii, pills, and controlled pastels can give Home its joyful
object-based composition. Evernote's flatter hierarchy, warmth, quieter borders,
and editorial rhythm can discipline Timeline. Do not average the two into an
indistinct beige dashboard. Derive a small set of explicit project rules for
surface hierarchy, radii, spacing, colour roles, typography, and motion, then
show how both pages use those same rules for different jobs.

## Design skills to use

Read and apply these public skills before the audit:

- [Apple design](https://www.ui-skills.com/skills/emilkowalski/apple-design):
  purpose, agency, directness, immediate response, spatial consistency,
  interruptibility, accessibility settings, and delight as the result of craft.
- [Emil design engineering](https://www.ui-skills.com/skills/emilkowalski/emil-design-eng):
  detail quality, motion frequency/purpose, press feedback, origin-aware
  transitions, short UI timing, reduced motion, and frame-by-frame inspection.
- [Better interface](https://www.ui-skills.com/skills/jakubkrehel/better-interface):
  holistic evidence-based interface review.
- [Interaction design](https://www.ui-skills.com/skills/wshobson/interaction-design):
  feedback, orientation, continuity, loading/state patterns, and accessible
  purposeful motion.

Also load the installed local `better-interface` skill and all six domain-owner
skills it requires: accessibility, layout, writing, typography, colours, and UI.
Use its evidence standard: inspect runtime behaviour and code, cover narrow and
non-happy states, cite exact locations, rank findings, and separate defects from
preference. The audit should produce at most 15 high-value findings.

Motion should respond immediately, preserve spatial relationships, and normally
finish within 300 ms. Frequent or keyboard-driven actions may need no transition.
Use transform/opacity where animation adds orientation or feedback, support
`prefers-reduced-motion`, avoid hover-only meaning, and inspect meaningful motion
in slow motion or frame by frame.

## Required execution sequence

### 1. Reconnaissance

- Read the product and implementation context above.
- Inspect the actual authenticated pages and relevant components/primitives.
- Record screenshots and runtime observations at mobile, tablet, and desktop.
- Exercise navigation, filters, evidence controls, capture entry points, focus
  order, keyboard use, and reduced motion.

Completion: every ranked finding cites runtime evidence and an owning code path.

### 2. Direction

- Produce one concise visual/interaction direction for the selected Home and
  Timeline—not multiple new variants.
- Define the shared rules for page rhythm, content width, type hierarchy,
  surface levels, radii, borders/shadows, colour roles, control density, and
  motion.
- For Timeline, explicitly define the page grid, maximum reading width, filter
  placement, date-rail width, marker alignment, spacing within an event, spacing
  between events and month groups, and how each relationship changes at mobile,
  tablet, and desktop widths.
- Explain how Home and Timeline express different jobs within those rules.
- Prioritise the smallest set of changes with the highest user impact.

Completion: the direction resolves the ranked findings without contradicting
the settled product model.

### 3. Implementation

- Implement the direction through semantic tokens, shared primitives, and clear
  component structure.
- Keep interactions real: buttons and links need purposeful destinations or
  honest disabled/non-interactive presentation.
- Preserve source activity as evidence beneath meaningful moments.
- Keep Search, Date, and Project understandable at every breakpoint.
- Add motion only where it improves feedback, orientation, or continuity.

Completion: the implemented pages match the direction and introduce no invented
features, metrics, or product promises.

### 4. Browser proof

Verify at minimum:

- populated Home and Timeline;
- empty Home and Timeline;
- loading and failure presentation;
- Timeline no-results state and filter reset;
- keyboard focus and keyboard-operable controls;
- reduced-motion behaviour;
- 320–390 px mobile, tablet around 768 px, and desktop around 1280 px;
- 200% zoom where practical;
- real navigation between Home, Timeline, and capture.

Completion: screenshots and notes demonstrate the states above; visual checks are
paired with build/lint validation.

## Acceptance criteria

- Home feels joyful and invitational without becoming a pastel card dashboard.
- Timeline reads immediately as a chronological body of meaningful work.
- Timeline's layout and spacing form a legible system: page header, controls,
  dates, markers, event bodies, context, and evidence align intentionally and
  maintain a useful scan rhythm across multiple entries.
- Home and Timeline are visibly related while retaining their distinct jobs.
- Timeline uses its desktop width intentionally; there is no unexplained empty
  rail or permanently costly filter panel without corresponding utility.
- The Timeline reading column is neither needlessly cramped nor stretched; its
  event density supports both scanning and reflective reading. Mobile removes
  ornamental whitespace before it compresses content or tap targets.
- Search, Date, and Project are findable, comprehensible, and usable on mobile.
- Event type, date, title, narrative, project/goal context, and evidence have a
  clear hierarchy. Evidence is visibly subordinate but recoverable.
- Page and object spacing form a coherent rhythm; surfaces do not stack borders,
  rounding, and shadows without a hierarchy reason.
- Copy is concise, human, and action-oriented. It does not explain the product
  back to the user or imply fake certainty.
- All interactive elements have visible focus, useful hover/pressed states, and
  adequate targets. No information or action depends only on hover.
- Motion is brief, interruptible where relevant, and reduced-motion safe.
- Every page remains fully usable on mobile and at zoom.
- The existing semantic design system is refined rather than bypassed.
- Existing auth, onboarding, company switching, achievement routes, and
  unrelated user changes continue to work.

## Validation and known constraints

Run from the repository root unless noted:

```sh
bun run format:check
cd frontend && bun run build
cd frontend && bun run lint
```

The frontend build currently passes. Lint previously passed with zero errors and
seven existing Fast Refresh warnings in design-system files. Do not quietly
expand that warning set.

The current server-only TypeScript check has a pre-existing configuration/file
list failure tracked by GitHub issue #3. Record it accurately if encountered; do
not conflate it with this polish pass.

Delivery sequencing and the live backlog are at:
<https://github.com/KelechiOdom10/work-achievements-tracker/issues>

No commit has been made for the current working-tree changes. Preserve unrelated
changes, especially the pre-existing edits to `docker-compose.yml`,
`RegisterForm.tsx`, and achievement routes.

## Handoff result

Leave behind:

1. the ranked evidence-based audit;
2. the concise shared design direction;
3. the implemented Home, Timeline, and necessary shared-shell refinements;
4. browser proof for the required states and breakpoints; and
5. a short record of commands run, known residual issues, and any follow-up that
   belongs in GitHub rather than this visual-polish pass.
