# Product delivery roadmap

GitHub Issues are the source of truth for delivery status. This document records
the dependency order and product intent so individual issues do not become a
disconnected feature list.

## Product loop

The first complete loop is:

1. Capture a small piece of work from Home.
2. Save it as a private draft in the correct company workspace.
3. See it immediately on Home and in Timeline.
4. Enrich it later with context and evidence.
5. Reuse the same record in a performance-review evidence pack.

Work that does not strengthen this loop should not enter the first release.

## Delivery order

### Phase 0 — trustworthy foundation

1. [#1 Establish the clean product foundation](https://github.com/KelechiOdom10/work-achievements-tracker/issues/1).
2. [#2 Harden authorization and replace generated Prisma request inputs](https://github.com/KelechiOdom10/work-achievements-tracker/issues/2).
3. [#3 Add CI and an end-to-end test foundation](https://github.com/KelechiOdom10/work-achievements-tracker/issues/3).

### Phase 1 — useful manual product

4. [#4 Model projects, role periods, drafts, and source activity](https://github.com/KelechiOdom10/work-achievements-tracker/issues/4).
5. [#5 Create a deep career-record module](https://github.com/KelechiOdom10/work-achievements-tracker/issues/5).
6. [#6 Ship quick capture and achievement editing end to end](https://github.com/KelechiOdom10/work-achievements-tracker/issues/6).
7. [#7 Connect the joyful Home to real company data](https://github.com/KelechiOdom10/work-achievements-tracker/issues/7).
8. [#8 Connect Timeline to real career records and retrieval](https://github.com/KelechiOdom10/work-achievements-tracker/issues/8).
9. [#9 Model goals as focus and milestones as checkpoints](https://github.com/KelechiOdom10/work-achievements-tracker/issues/9).

### Phase 2 — reduce manual maintenance

10. [#10 Build the source-activity inbox and review workflow](https://github.com/KelechiOdom10/work-achievements-tracker/issues/10).
11. [#11 Import GitHub activity safely and idempotently](https://github.com/KelechiOdom10/work-achievements-tracker/issues/11).
12. [#12 Import Linear activity and preserve GitHub relationships](https://github.com/KelechiOdom10/work-achievements-tracker/issues/12).
13. [#13 Capture selected Notion pages as evidence](https://github.com/KelechiOdom10/work-achievements-tracker/issues/13).

### Phase 3 — create the career payoff

14. [#14 Build a performance-review evidence pack and editable draft](https://github.com/KelechiOdom10/work-achievements-tracker/issues/14).
15. [#15 Export and intentionally share selected career documents](https://github.com/KelechiOdom10/work-achievements-tracker/issues/15).
16. [#16 Create resume bullets and interview stories from trusted records](https://github.com/KelechiOdom10/work-achievements-tracker/issues/16).

## Sequencing rules

- Authorization and narrow server-owned input contracts block new write flows.
- The career-record module blocks real Home and Timeline data.
- Manual capture must work before imported source activity is introduced.
- Source activity remains distinct from user-authored career records.
- GitHub proves the import architecture before Linear or Notion are added.
- Performance-review output is the first generated artifact; resume and
  interview outputs follow only after it is trustworthy.
- Every page shipped in these phases must remain usable on mobile.

## Issue standard

Every implementation issue should include:

- the user outcome;
- the module and interface being changed;
- acceptance criteria, including empty, loading, failure, and mobile states
  where relevant;
- authorization and privacy considerations;
- verification commands and the real browser or integration boundary to test;
- explicit dependencies and non-goals.

The issue title describes an outcome, not an implementation task. An issue is
ready to pick up only when its dependencies and acceptance criteria are clear.
