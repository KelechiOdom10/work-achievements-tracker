# Product direction

## Product promise

Help an individual professional turn scattered evidence of their work into a
meaningful career history, then use that history to prepare trustworthy
performance reviews and other career material without reconstructing months of
work from memory.

The product is a private career record, not an employer performance-management
system. The user owns the account, their career history, and every company
workspace inside it.

## Product principles

1. **Remember first, polish later.** Capturing work must be fast. Structure and
   enrichment appear progressively when they become useful.
2. **Activity is not achievement.** GitHub, Linear, and Notion supply evidence.
   They do not decide what is meaningful.
3. **The system manages attention; the user decides meaning.** Suggestions may
   be ranked, combined, deferred, or dismissed without silently deleting the
   underlying activity.
4. **Pride comes from substance.** Work should be presented beautifully, but
   without streaks, leaderboards, guilt, empty praise, or childish gamification.
5. **AI assists; the user authors.** AI can organise, ask, suggest, and draft. It
   cannot invent contribution, outcomes, or metrics.
6. **Private by default.** Sharing creates a deliberate snapshot or export. It
   never exposes the live workspace.
7. **Every page works on mobile.** Long-form review writing may be more
   comfortable on desktop, but no route is a desktop-only dead end.

## Audience and tenancy

- The first user is the product's creator; the broader audience is individual
  professionals.
- The **user account is the tenant**.
- A user owns multiple private company workspaces.
- A company workspace may contain several role periods over time.
- There is no shared employer tenant or employer-controlled career record in
  the initial product.
- The personal home spans the user's career. Company workspaces provide a
  focused context for work, projects, goals, integrations, and reviews.

## Agreed language

| Term            | Meaning                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Work            | The broad umbrella for the user's professional history.                                             |
| Source activity | Raw material imported from a connected tool, such as a PR, review, issue, or document.              |
| Achievement     | A user-curated account of meaningful contribution, learning, influence, or outcome.                 |
| Evidence        | A source activity, link, file, note, feedback item, or metric supporting an achievement.            |
| Project         | An evolving body of work that may contain several achievements and evidence items.                  |
| Review queue    | A product concept, not necessarily the final UI label: source activity that may deserve reflection. |
| Review period   | A company-scoped interval with employer questions and material selected for a performance review.   |
| Review document | An editable, evidence-backed output for one review period.                                          |
| Role period     | A title, team, and date range held within a company workspace.                                      |

Capture copy should not demand that the user manufacture an impressive
achievement. Prefer a prompt such as **“What do you want to remember?”**

## Core experience

### Personal home

The personal home combines:

1. Recent meaningful work across the career.
2. A quiet indication that newly discovered work is ready for reflection.
3. Active projects with unresolved outcomes or useful follow-ups.
4. Review preparation when a review period approaches.

Statistics are secondary and must not imply that more logged activity equals
better performance.

Within a company workspace, Home uses the joyful personal-desk composition: it
supports quick capture, current focus, source material awaiting reflection, and
review preparation. Timeline is a separate first-level destination in the left
sidebar rather than a tab inside Home. Home can link into a pre-filtered month
or project on Timeline.

### Capture and enrichment

- Quick capture is available throughout the product.
- The initial capture asks for the smallest useful amount of information.
- Saving opens or creates a draft achievement.
- A focused, document-like editor supports progressive enrichment.
- Contextual prompts may ask about contribution, trade-offs, evidence, outcome,
  feedback, or learning.
- Substantial review preparation may use a guided, one-question-at-a-time flow.
- Chat is optional and must not become the product's entire interaction model.

### Activity and suggestions

- GitHub, Linear, and later Notion connect to a specific company workspace.
- No provider is the canonical source of an achievement.
- Explicit cross-tool links are combined automatically while preserving each
  original source.
- Less certain relationships are suggestions that explain their reasoning.
- All imported activity remains available in an unranked chronological view.
- Low-priority activity may be collapsed, never silently discarded.
- Dismissal archives an activity; only explicit deletion removes it.
- Re-importing is idempotent and must not overwrite the user's edited writing.

### Projects and timeline

- The career timeline is chronological.
- Timeline has its own company-workspace page and left-sidebar destination.
- The timeline contains meaningful career moments rather than every imported
  source event. Achievements, important project checkpoints, decisions,
  learning, concrete goal progress, and role changes may appear as entries.
- Pull requests, tickets, documents, feedback, and metrics normally appear as
  supporting evidence inside a timeline entry. They remain independently
  recoverable in source activity and search.
- Timeline retrieval starts with search, date range, and project. Search covers
  the meaningful entry, its project and goal context, and attached evidence.
- Standalone achievements may appear directly in the timeline.
- Related achievements and evidence may belong to an evolving project story.
- Projects can be created manually or suggested by the product.
- A project can accumulate architectural decisions, implementation work,
  launch evidence, feedback, and later outcomes without becoming several
  disconnected stories.

### Performance reviews

- A company can store a reusable review template.
- A review period can override or add questions without changing old reviews.
- The user selects the achievements and evidence included in a review.
- The first output is an inspectable evidence pack.
- The product can then draft editable answers or narrative from that pack.
- Generated claims remain traceable to the underlying achievements and
  evidence.
- Missing information stays visibly unresolved instead of being invented.

### Goals

Goals are not one generic concept. The future model distinguishes:

- company objectives;
- promotion or level expectations;
- competency development;
- personal career aspirations.

Company objectives and promotion evidence are the first useful goal types
because they connect directly to performance reviews.

Goals remain forward-looking and appear as current focus on the company
overview. A dedicated goal detail view is useful for editing expectations,
progress, and evidence, but goals do not need to compete with the daily work
record as a primary home navigation item.

Milestones become dated checkpoints within a goal or project. Reaching one is
visible in the chronological timeline; milestones do not need a separate
top-level destination. Calendar becomes a date lens over the same work record,
goals, checkpoints, and reviews rather than an independent content type.

### Sharing and export

- The live workspace is private.
- A share action creates an intentional snapshot containing only selected
  material.
- Exports may include rich text, Markdown, PDF, CSV, or structured data as the
  relevant workflow earns them.
- Private notes and excluded evidence must never leak into a shared output.

### AI boundary

- AI runs only after an explicit user action.
- The first AI action presents one concise consent notice.
- Only the material relevant to the requested action is sent.
- Raw repositories and whole workspaces are never sent implicitly.
- Submitted data uses a provider/API configuration that does not train on it.
- AI can be disabled with one account-level setting.
- The core product remains usable without AI.

## Experience direction

The product should feel **calm, playful, warm, and fast**.

It must not feel like LinkedIn, corporate HR software, a productivity guilt
machine, or a childish gamified app. Browsing the record should make the user
feel proud because their real work is presented with care.

Preserve the existing product's strongest visual work:

- company creation and onboarding;
- company switcher;
- authenticated application shell;
- warm ivory and charcoal palette;
- restrained elevation and rounded surfaces;
- compact controls and gentle motion.

Aboard — Joyful HR is a reference for modular composition, controlled pastel
colour, human language, spaciousness, and compact interactions. It is not a
template to copy.

## Release sequence

### Release 1 — trustworthy manual foundation

- Account-owned company workspaces and role periods.
- Fast manual capture and progressive achievement editing.
- Mobile-ready career and company timelines.
- Projects and evidence.
- Search and retrieval.
- Review periods, evidence packs, and editable review drafts.
- Export sufficient to use the result outside the product.

The release succeeds when one month of real data can produce a credible review
evidence pack and draft in under ten minutes, and maintaining the record feels
light enough to continue.

### Release 2 — connected memory

- A narrow first source connector, implemented against a provider-neutral
  source-activity model.
- A second connector quickly follows so linked Linear and GitHub work can be
  reconciled.
- Explainable suggestions, non-destructive triage, and idempotent re-import.
- Optional weekly reflection and outcome follow-ups.

### Release 3 — richer career use

- Selected-page Notion import.
- Promotion and competency evidence.
- Resume bullets and interview stories.
- Private share snapshots and richer exports.

## Deliberately deferred

- Employer-owned or shared organisational tenancy.
- Public profiles.
- Billing.
- Native mobile applications.
- Broad automatic Notion crawling.
- Social features.
- Analytics that reward logging volume.
- Multiple integrations before the first connected workflow is trustworthy.

## Immediate sequence

1. Preserve this product and domain direction.
2. Prototype the personal home, quick capture, timeline/project story, and
   review preparation inside the existing shell.
3. Validate the interaction direction before changing the production data
   model and APIs.
4. Implement a vertical slice with production-quality validation and tests.
