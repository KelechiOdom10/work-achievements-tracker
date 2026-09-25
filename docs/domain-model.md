# Domain model

## Outcome and language

- **User outcome:** build a trustworthy, portable history of work from manual
  reflection and connected evidence, then turn it into useful career material.
- **Terms and agreed meanings:** see `docs/product-direction.md#agreed-language`.
- **Owning boundary:** one modular application owns the private career record.
  Provider connectors supply source activity but do not own achievements,
  projects, reviews, or goals.

## Model

### Identities and lifecycles

#### User account

The tenant and owner of the career record. A user account owns every company
workspace and every cross-career view derived from them.

#### Company workspace

A stable private context representing one company in the user's career. It can
outlive individual roles and source connections.

Lifecycle: `active -> archived`. Archiving removes it from the default working
set without deleting its career history.

#### Role period

A title and date range held within a company workspace, optionally including a
team, manager, level, and review cadence.

Role periods have identity because achievements and reviews may need to retain
their historical role context after the user's current role changes.

#### Source connection

Authorised access from one company workspace to an external provider account or
workspace. Tokens, scopes, sync cursors, and connection health belong here.

Lifecycle: `connected -> needs_attention -> disconnected`.

#### Source activity

An imported fact such as a pull request, review, Linear issue, or selected
Notion page. Provider content remains distinguishable from user-authored text.

Lifecycle for attention state:

`unreviewed -> linked | deferred | dismissed`

These states affect presentation, not existence. A dismissed activity remains
searchable until explicitly deleted.

#### Achievement

A user-authored, company-scoped account of meaningful work. It may stand alone
or belong to a project and may reference multiple evidence items.

Lifecycle: `draft -> complete -> archived`, with `complete -> draft` allowed
when the user wants to revise it. “Complete” means sufficiently useful to the
user, not objectively finished work.

#### Evidence

A relationship between an achievement or project and supporting material. Its
origin may be a source activity, URL, uploaded file, feedback item, metric, or
user note.

Evidence earns identity when it can be reused, independently removed, or
included/excluded from outputs. Provider metadata captured at import time is a
value snapshot attached to that evidence.

#### Project

An evolving company-scoped story containing related achievements and evidence.
Projects can accumulate decisions, delivery, feedback, and outcomes over time.

Lifecycle: `active -> completed -> archived`; a completed project may reopen if
later outcomes or follow-up work arrive.

#### Review template

A reusable set of employer questions owned by a company workspace. Updating the
template never mutates an existing review period.

#### Review period

A dated company-scoped preparation context. It snapshots the relevant template
questions, selected achievements, selected evidence, and draft answers.

Lifecycle: `preparing -> finalised -> archived`. Finalisation is reversible by
explicit user action.

#### Review document

An editable output belonging to one review period. Generated drafts are saved
as revisions so regeneration does not destroy user edits.

#### Goal

A company objective, promotion expectation, competency-development target, or
personal aspiration. Goal type is explicit; types do not pretend to share one
progress calculation.

#### Milestone

A dated checkpoint attached to a goal or project. It is forward-looking while
planned and becomes a historical timeline event when reached. Milestones do not
own evidence or achievements; those records may reference the milestone they
helped reach.

Lifecycle: `planned -> reached | cancelled`. Reopening a reached milestone
requires an explicit correction rather than silently rewriting career history.

#### Calendar view

The calendar is a read model over dated achievements, source activity, review
periods, goals, and milestones. It does not own career records and is not a
separate write boundary. Changing a date edits the owning record.

#### Share snapshot

An immutable, explicitly selected representation of career material. It is
separate from the live records so later edits cannot silently expose new data.

### Values

- Date ranges and review periods.
- Provider identity and external resource keys.
- Source metadata snapshots.
- Achievement prompts and completeness hints.
- Review questions copied from a template.
- AI consent state and generation inputs.
- Share visibility and expiry configuration.

### State transitions

1. A user captures a note, creating a draft achievement.
2. The user progressively enriches it and may mark it complete.
3. A connector imports or refreshes source activity idempotently.
4. Source activity can be linked to evidence, combined under a project,
   deferred, dismissed, or restored.
5. The user creates a project manually or accepts a project suggestion.
6. The user defines a goal, plans milestones, and records a reached milestone
   as a dated event in the company timeline.
7. A review period snapshots its questions and explicitly selected source
   material.
8. The user requests an AI draft from those selections, accepts or edits the
   result, and may finalise the review.
9. The user creates a share snapshot or export from an explicit selection.

### Invariants and where they are enforced

- Every company-scoped write is authorised through the authenticated user's
  ownership of that company. Enforce in the application service transaction,
  not through client-provided `userId` filters.
- Role periods, projects, achievements, goals, milestones, reviews,
  connections, and source activity cannot cross company workspaces. Enforce on
  every relationship mutation.
- A source activity is unique by source connection, provider resource type,
  and external identifier. Enforce with a database unique constraint.
- Import refreshes provider-owned fields but never overwrites user-authored
  achievement or project text. Enforce in connector upsert services.
- Linking or combining source activity preserves the original provider identity
  and source URL. Enforce in the evidence relationship model.
- Attention ranking cannot delete source activity. Only an explicit deletion or
  connection-retention decision can do so.
- Review generation can use only material explicitly included in that review
  period. Enforce when constructing the generation request.
- A share snapshot contains only its explicit selection and is immutable after
  publication. Enforce at snapshot creation.
- Template edits do not mutate review-period questions already copied from the
  template.
- Goal progress is type-specific; there is no universal count-based progress
  calculation.
- A milestone belongs to exactly one goal or project and reaching it adds a
  dated timeline event without manufacturing an achievement.

## Integration

### Callers and consuming contexts

- Personal home consumes company summaries, recent achievements, project
  follow-ups, and review reminders.
- Company timelines consume achievements, projects, and source-attention state.
- Review preparation consumes explicit achievement and evidence selections.
- Provider connectors create or refresh source activity only.
- AI generation consumes a bounded snapshot assembled for an explicit action.
- Export and sharing consume explicit selections, never unrestricted queries.

### Contracts

#### Source import

Input: company, source connection, date/cursor boundary, provider resources.

Output: created/updated source activity plus explicit provider links and import
diagnostics. It does not create achievements automatically.

#### Relationship suggestion

Input: source activities and existing projects/achievements.

Output: a reasoned, confidence-bearing proposal. Acceptance is a separate user
action and uncertain suggestions do not mutate the career record.

#### Review generation

Input: review questions, selected achievements/evidence, requested tone or
format, and the user's explicit action.

Output: an editable revision with claim-to-source references and unresolved
questions where facts are missing.

### Ordering, retry, and duplicate behaviour

- Imports are at-least-once and safe to retry.
- External identity uniqueness prevents duplicates.
- Provider update timestamps or cursors prevent an older delivery overwriting a
  newer provider snapshot.
- Cross-provider relationship suggestions may arrive in any order and are
  recomputed when relevant source activity changes.
- Failed imports retain their last successful cursor and expose retryable error
  state without deleting previous activity.

## Proof

### Invalid states covered by tests

- Accessing or relating records from another user's company.
- Moving evidence or source activity across company workspaces.
- Importing the same provider resource twice.
- Refreshing an import after the user has edited an achievement.
- Generating a review from evidence outside its explicit selection.
- Mutating an existing review when its template changes.
- Publishing private or unselected material in a share snapshot.
- Treating dismissal or low ranking as deletion.
- Applying one generic progress formula to incompatible goal types.

### Decisions deliberately deferred

- Exact relational schema and migration sequence.
- Connector chosen for the first technical implementation.
- Ranking and relationship-suggestion implementation.
- Review AI provider and prompt design.
- Public profiles and shared organisational tenancy.
