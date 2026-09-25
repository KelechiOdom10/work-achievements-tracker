# Frontend design brief

## User and task

- **Audience:** an individual professional maintaining a private career record.
- **Primary job:** quickly remember meaningful work, understand it in context,
  and retrieve it for a performance review.
- **Primary action:** capture or revisit work without being forced through a
  large publishing form.
- **Product constraints:** preserve the existing warm design system, company
  onboarding, switcher, and application shell. Every route must work on mobile.
  The interface must not resemble LinkedIn, corporate HR software, a metrics
  dashboard, or a gamified productivity tool.

## Direction

### Visual direction

**Warm personal archive with controlled playfulness.**

The interface should give real work the care of a personal collection while
remaining fast enough for weekly use. Aboard — Joyful HR is a reference for
modular composition, human language, selective pastel surfaces, and compact
interactions. The product retains its own warmer ivory/charcoal identity.

### Content and action hierarchy

1. Meaningful recent work and evolving projects.
2. A single fast capture affordance.
3. New source material ready for reflection.
4. Outcomes worth following up and reviews worth preparing.
5. Secondary statistics only when they help interpretation.

The home must not become a configurable widget dashboard. Modules earn space
only when they advance the core job.

### Typography, spacing, colour, and responsive choices

- Preserve semantic colour tokens and warm neutral surfaces.
- Use playful pastel colour for meaningful objects or states, not arbitrary
  decoration or rainbow tagging.
- Preserve restrained shadows, twelve-pixel radii, compact controls, and clear
  typography hierarchy.
- Prefer a spacious reading column with modular adjacent content on wide
  screens.
- Collapse to one reading column on mobile; primary actions remain reachable
  and no information depends on hover.
- Correct the current font-token declaration before treating typography as a
  stable implementation contract.

### Interaction character and motion

- Fast capture from anywhere; focused editing when the user chooses to enrich.
- Drawers and popovers preserve context for compact secondary interactions.
- Motion is brief, purposeful, and respects reduced-motion preferences.
- Success acknowledgement is gentle. There are no streaks, points, confetti,
  overdue shame, or accumulating warning states.
- Suggestions explain why they appeared and never conceal the chronological
  source history.

### Prototype decision

The first prototype compared an editorial timeline, living projects, and a
reflective home. It was rejected: all three used the same heavy card-dashboard
grammar, included too much invented explanatory copy, and treated delight as
pastel decoration. The variants looked generated rather than considered.

The revised prototype is one A/C hybrid:

1. A lightweight capture surface is the only prominent module.
2. A calm chronological record is the primary reading experience.
3. Source review and performance-review preparation are quiet secondary tools.
4. Entries use open rows, whitespace, and typography instead of nested cards.
5. Copy names the work or the next action; it does not explain the product back
   to the user.
6. Delight must eventually come from the capture interaction and the feeling of
   seeing a real body of work take shape—not gradients, badges, or fake metrics.

### Second prototype cycle

The restrained hybrid was a meaningful improvement but still lacked a strong
interaction and visual character. Keep it as the baseline and compare it with
two intentionally stronger alternatives:

1. **Joyful desk:** an Aboard-inspired personal workspace with a centred welcome,
   compact action pills, one large monthly module, a personal-note surface, and
   an asymmetric arrangement of controlled pastel modules. The colour belongs
   to whole meaningful objects rather than tags or decoration.
2. **Work log:** an incident.io-inspired chronological activity log with explicit
   event types, timestamps, a visible sequence, nested evidence, filters, and a
   compact role-level summary. This version prioritises traceability over
   reflection.

These are structural alternatives, not palettes. The decision to make is
whether the product's home should feel primarily like a personal desk, a factual
work log, or the quieter reading record retained as variant A.

### Combined workspace exploration

Variant D combines the strongest parts of the joyful desk and work log without
placing them on one overloaded canvas:

- **Overview** is the reflective, warm composition for capture, recent work,
  current focus, the latest checkpoint, and review preparation.
- **Timeline** is the factual chronological view for achievements, evidence,
  decisions, goal progress, and reached checkpoints.
- Goals remain forward-looking objects surfaced as current focus.
- Milestones are project or goal checkpoints and become timeline events when
  reached.
- Calendar is a month or date-range lens inside Timeline, not a separate body of
  duplicated records.

After review, the Overview hierarchy was tightened further:

- The latest checkpoint is part of Current focus rather than a competing card.
- New GitHub and Linear material occupies the freed module when it exists.
- Review preparation is conditional on an active or approaching review period.
- The capture prompt is immediate: “What happened this week?”
- Timeline contains meaningful career moments: achievements, important project
  checkpoints, decisions, learning, goal progress, and role changes. Imported
  PRs, tickets, notes, feedback, and metrics appear inside those moments as
  supporting evidence rather than as peer events.
- Raw source activity remains in “From your tools” and the searchable activity
  history. Timeline navigation uses Search, Date, and Project because those map
  to concrete retrieval tasks. Desktop gives them a quiet utility rail; mobile
  keeps Search visible and places Date and Project behind one filter control.
- Header achievement/evidence totals were removed because they did not help a
  decision and made the workspace feel quantified.
- “See the month” and recent-moment actions move from Overview into Timeline
  with the relevant month selected.

### Selected information architecture

The tabbed Variant D exploration clarified the relationship between the two
views, but it is not the selected navigation model:

- **Home uses the Joyful desk direction (Variant B).** It is the warm, useful
  starting point for capture, current focus, newly discovered source material,
  and review preparation.
- **Timeline is a separate company page in the left sidebar.** It is the more
  focused chronological record for returning to and finding meaningful work.
- Home may deep-link into Timeline with date or project context, but the two
  pages do not appear as local tabs and do not compete inside one canvas.
- Goals remain visible through current focus; reached milestones remain dated
  Timeline moments; calendar remains a date lens rather than a third page.

This preserves the different job and visual character of each page: Home can be
joyful and invitational while Timeline can stay calm, factual, and searchable.

## Proof

- **Target breakpoints:** narrow mobile (~360 px), tablet (~768 px), and wide
  desktop (~1280 px).
- **Existing system reused:** semantic colours, Button, Dialog, Sidebar, form
  primitives, and current application shell. Cards and badges are deliberately
  absent from the main record.
- **States to review:** populated, no achievements, unreviewed source activity,
  capture open, keyboard focus, loading, failure, and reduced motion.
- **Accessibility checks:** semantic landmarks, heading order, visible focus,
  keyboard-operable capture controls, adequate contrast, and no hover-only
  information.
