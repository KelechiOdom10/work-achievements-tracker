# Home and Timeline polish: audit and direction

## Scope and evidence

Reviewed the selected company Home, Timeline, shared sidebar, filter flow, and
capture entry in the authenticated development app. The stack is React,
TanStack Router, Tailwind, shadcn/Radix, and the existing HSL semantic tokens.
Product conventions came from `docs/product-direction.md`, `docs/domain-model.md`,
`docs/frontend-design-brief.md`, and the polish handoff. No `AGENTS.md` or
separate design-system document was present in this worktree.

The baseline was inspected at 1280 × 900, 768 × 900, 360 × 780, and 320 × 780
in the real signed-in UI for the `bp` company. Both routes were inspected in the
dark theme active in that session. Browser screenshots and DOM geometry were
captured during the audit. Timeline Search, Filters, no results, Clear filters,
sidebar navigation, and Home's capture entry were exercised. Empty, loading,
and failure views do not exist in the current fixture components; they are part
of the implementation and verification scope below.

| Domain        | Baseline evidence                                                                         | Result              |
| ------------- | ----------------------------------------------------------------------------------------- | ------------------- |
| Accessibility | Keyboard-capable native filters, Radix popover, focus path, mobile sheet, source controls | Findings 2, 4, 7    |
| Layout        | Screenshots and element widths at four widths                                             | Findings 1, 3, 5, 6 |
| Writing       | All visible Home/Timeline labels and no-results copy                                      | Finding 2           |
| Typography    | Rendered event wrapping and line lengths at four widths                                   | Findings 1, 3       |
| Colours       | Existing semantic tokens and rendered dark surfaces                                       | Finding 8           |
| UI            | Surface nesting, hover and control states                                                 | Findings 3, 4, 8    |

## Ranked findings before the change

| Severity | Owner         | Location                                                                                              | Before                                                                                                                                                     | After                                                                                                             | Why                                                                                          |
| -------- | ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| HIGH     | Accessibility | `frontend/src/components/career/CompanyHome.tsx:42`, `:45`, `:137`, `:161`; `CompanyTimeline.tsx:191` | Five controls look actionable but have no destination or action. Clicking them in the authenticated UI changes nothing.                                    | Render unavailable fixture destinations as honest, noninteractive content; retain only working links and buttons. | They mislead the user about what can be opened, including every evidence item.               |
| HIGH     | Layout        | `frontend/src/components/career/CompanyTimeline.tsx:152`, `:158`, `:170`                              | At 320 px, the article is 246 px wide but its card body falls near 164 px; the first event becomes 464 px tall.                                            | Put date/type above the event on mobile, remove nested card padding, and give narrative the full reading width.   | Mobile compresses the work itself before removing ornamental space.                          |
| MEDIUM   | Layout        | `frontend/src/components/layouts/app-layout/AppLayout.tsx:47`, `:83`                                  | At 768 px, the expanded 256 px sidebar leaves a 488 px shell and a 424 px Home/Timeline column. The inset main adds a border and shadow around every page. | Collapse the sidebar to icons at tablet widths; retain the inset panel's spacing and border without a shadow.     | The expanded sidebar consumes reading width; the inset itself is a valued part of the shell. |
| MEDIUM   | Layout        | `frontend/src/components/career/CompanyTimeline.tsx:112`, `:226`                                      | At 1280 px, the fixed filter rail costs 272 px, while events occupy a 590 px article column.                                                               | Place Search, Date, and Project in one toolbar above the record; cap the reading width independently.             | A permanent utility rail sacrifices space without adding proportionate utility.              |
| MEDIUM   | UI            | `frontend/src/components/career/CompanyTimeline.tsx:113`, `:170`, `:175`                              | Main panel, event card, context divider, evidence chips, and filter card stack borders in the authenticated dark view.                                     | Use one open chronology with quiet row separators and subordinate evidence.                                       | Card nesting hides date/event cadence and gives evidence comparable weight to the moment.    |
| MEDIUM   | Layout        | `frontend/src/components/career/CompanyTimeline.tsx:98`, `:151`                                       | Selecting All time yields one undifferentiated list headed “All time”; August has no month boundary.                                                       | Group events under month headings whenever more than one month is visible.                                        | Chronological retrieval loses a major scanning cue.                                          |
| MEDIUM   | Layout        | `frontend/src/components/career/CompanyHome.tsx:38`, `:51`, `:52`                                     | At 320 px, the three header pills wrap to three rows and the first meaningful module starts at y=328.                                                      | Give capture one clear header action; move secondary information into the composition.                            | The most useful work is pushed well below the first viewport.                                |
| MEDIUM   | Colours       | `frontend/src/components/career/CompanyHome.tsx:52`, `:95`, `:109`, `:132`, `:146`                    | Five one-off pastel backgrounds stay bright in dark mode and make all modules similarly loud.                                                              | Map a small set of desk surface roles through semantic tokens and reserve the strongest tint for capture.         | Home loses hierarchy and does not adapt to the selected theme.                               |
| MEDIUM   | Accessibility | `frontend/src/components/layouts/app-layout/AppLayout.tsx:60`                                         | After selecting Home from the mobile sidebar, the sheet remains open over the destination.                                                                 | Close the mobile sheet on navigation and restore focus to the page.                                               | The page change occurs behind an overlay, obscuring the result.                              |
| LOW      | Writing       | `frontend/src/routes/app/companies/$companySlug/timeline.tsx:26`, `CompanyTimeline.tsx:228`           | The page and rail both explain the timeline, while the result count repeats what the month heading implies.                                                | Keep one brief page description and concise control labels.                                                       | Repeated explanatory copy slows scanning.                                                    |

## Shared direction

Use the existing warm paper and charcoal system as the canvas. Home is a
personal desk: one prominent monthly object, a clear capture action, and quieter
focus, source, and review information. Timeline is a reading record: open rows,
dates, type, title, narrative, context, then evidence in descending weight. Both
pages use the same page inset, heading scale, 12 px object radius, hairline
separators, compact controls, and visible focus ring. The application shell
retains its inset panel on tablet and desktop, using spacing and a border but
no shadow; shadows are reserved for floating overlays. Semantic tokens provide the small number of warm/tinted
surfaces in light and dark themes. Press feedback is immediate and any movement
is brief, interruptible, and removed for reduced motion.

Timeline's page container uses at most about 960 px after the shell. Search,
Date, and Project sit above the record as a full-width toolbar on desktop;
Search stays visible and the other two move behind one labelled Filters control
on small screens. The record itself is capped near 760 px for readable lines.
At roomy widths, an event uses a 72 px date rail, a 16 px marker aligned to the
type/title start, and a body that fills the remainder. The date rail and body
share one row; 12–16 px separates content within an event, 28–32 px separates
events, and 40–48 px separates month groups. At tablet widths the sidebar
collapses and the record retains its reading measure. Below the width where the
rail would crowd the body, date/type move above the title and the event becomes
one full-width text column. Evidence remains visibly nested and can wrap without
shrinking the narrative.

The implementation remains a fixture prototype. It does not claim to save
records, open reviews, or navigate to source evidence until those routes/data
exist. Development-only fixture states will allow the required empty, loading,
and failure browser checks without implying a production backend integration.

## Post-change browser verification

Verified in the authenticated worktree build at `localhost:8081` in dark and
light themes. At 1280 px, Home keeps one primary monthly object and Timeline
has a full-width filter toolbar with a narrower reading record. At 768 px the
sidebar collapses to icons. At 360 px and 320 px, the record uses one text
column, the date sits above the title, and neither page has horizontal overflow.
The first Timeline event at 320 px is about 282 px tall (464 px before the
change). The Home monthly object begins around y=226 at 360 px (the baseline
at 320 px began at y=328).

| Check                    | Observed result                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home → September         | Opens Timeline with `month=sep` and three September moments.                                                                                                                             |
| Search                   | Finds `PAY-462` from an evidence label; unmatched search shows a clearable no-results state.                                                                                             |
| Date and project filters | August shows one moment; Permissions redesign shows two. Clearing filters restores all four and removes the month URL parameter.                                                         |
| Mobile navigation        | Sidebar sheet opens, closes on Timeline selection, and focus moves to the destination main region.                                                                                       |
| Keyboard                 | First Tab reaches Skip to content; Enter focuses the main region. Native selects and Radix filter popover remain operable.                                                               |
| Preview states           | Home and Timeline render populated, empty, loading, and failure states. Empty Home has one capture action; Try again exits the error fixture and restores populated content.             |
| Theme and motion         | Semantic Home surfaces adapt in light and dark themes. CSS disables press feedback and loading animation under reduced motion; the browser session did not have that preference enabled. |

The remaining boundary is the existing capture route: the Add a note action
reaches `/achievements/new`, but that form's save flow is still a prototype and
was not expanded as part of this Home/Timeline polish. Evidence and review
items are intentionally text rather than links until real destinations exist.
Screen-reader narration and forced-colors rendering were not independently
tested. The in-app browser's zoom shortcut did not change its CSS viewport, so
200% zoom was approximated by narrow viewport checks rather than claimed as a
separate zoom pass.

`bun run build` and `bun run lint` pass in `frontend` (lint retains seven
pre-existing Fast Refresh warnings). `bunx tsc -b` has no Home/Timeline errors,
but remains red on the pre-existing server project file-list configuration and
the `Outlook.tsx`/`outlook.tsx` casing collision. The targeted Prettier check
passes. The repository-wide `bun run format:check` remains red on 26 unrelated
files, including generated Prisma output and previously modified files.
