import {
  BookOpen,
  CalendarDays,
  Flag,
  Link2,
  MessageSquareText,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TimelineMonth = "all" | "sep" | "aug";
type PreviewState = "populated" | "empty" | "loading" | "error";

const monthNames: Record<Exclude<TimelineMonth, "all">, string> = {
  sep: "September 2026",
  aug: "August 2026",
};

const timelineEvents = [
  {
    month: "sep" as const,
    date: "18 Sep",
    dateTime: "2026-09-18",
    icon: Sparkles,
    kind: "Achievement",
    title: "Made payroll corrections safer to review",
    detail:
      "Separated correction reasons from pay-impacting changes, so reviewers can see what will change before approving it.",
    project: "Payroll corrections",
    evidence: ["PR #2841", "PAY-462"],
  },
  {
    month: "sep" as const,
    date: "16 Sep",
    dateTime: "2026-09-16",
    icon: Flag,
    kind: "Project checkpoint",
    title: "Internal permissions pilot completed",
    detail:
      "The first rollout group completed migration without a Support escalation.",
    project: "Permissions redesign",
    goal: "Lead the permissions rollout",
    evidence: ["2 pull requests", "Support feedback"],
  },
  {
    month: "sep" as const,
    date: "11 Sep",
    dateTime: "2026-09-11",
    icon: MessageSquareText,
    kind: "Decision",
    title: "Changed the permissions rollout plan",
    detail:
      "A migration edge case changed the rollout from one release to a staged internal-first approach.",
    project: "Permissions redesign",
    evidence: ["Architecture note", "3 linked issues"],
  },
  {
    month: "aug" as const,
    date: "29 Aug",
    dateTime: "2026-08-29",
    icon: Sparkles,
    kind: "Achievement",
    title: "Simplified the new-starter setup flow",
    detail:
      "Removed a repeated setup step and documented the compliance trade-offs for the next iteration.",
    project: "Onboarding improvements",
    evidence: ["PR #2798", "Notion note"],
  },
];

interface CompanyTimelineProps {
  initialMonth?: TimelineMonth;
  preview?: PreviewState;
  onAddNote: () => void;
  onRetry: () => void;
  onMonthChange?: (month: TimelineMonth) => void;
}

export function CompanyTimeline({
  initialMonth = "all",
  preview = "populated",
  onAddNote,
  onRetry,
  onMonthChange,
}: CompanyTimelineProps) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState<TimelineMonth>(initialMonth);
  const [project, setProject] = useState("all");

  useEffect(() => setMonth(initialMonth), [initialMonth]);

  const changeMonth = (nextMonth: TimelineMonth) => {
    setMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  const normalisedQuery = query.trim().toLowerCase();
  const visibleEvents = (preview === "empty" ? [] : timelineEvents).filter(
    (event) => {
      const searchable = [
        event.title,
        event.detail,
        event.project,
        "goal" in event ? event.goal : "",
        ...event.evidence,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (month === "all" || event.month === month) &&
        (project === "all" || event.project === project) &&
        (!normalisedQuery || searchable.includes(normalisedQuery))
      );
    }
  );

  const activeFilters = Boolean(query || month !== "all" || project !== "all");
  const resetFilters = () => {
    setQuery("");
    changeMonth("all");
    setProject("all");
  };

  return (
    <section className="mt-7" aria-label="Work timeline">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end xl:grid-cols-[minmax(0,1fr)_12rem_12rem_auto]">
        <div className="min-w-0">
          <label htmlFor="timeline-search" className="text-xs font-medium">
            Search
          </label>
          <div className="relative mt-1.5">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="timeline-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Work, project, or evidence"
              className="h-10 pl-9 text-base sm:text-sm"
            />
          </div>
        </div>
        <div className="hidden xl:contents">
          <TimelineSelects
            idPrefix="desktop"
            month={month}
            onMonthChange={changeMonth}
            project={project}
            onProjectChange={setProject}
          />
        </div>
        {activeFilters && (
          <Button
            variant="ghost"
            className="hidden min-h-10 xl:inline-flex"
            onClick={resetFilters}
          >
            Clear filters
          </Button>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="pressable min-h-10 justify-center xl:hidden"
              aria-label={
                activeFilters ? "Filters active, change filters" : "Filters"
              }
            >
              <SlidersHorizontal /> Filters
              {activeFilters && (
                <span
                  className="size-1.5 rounded-full bg-foreground"
                  aria-hidden="true"
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-[min(18rem,calc(100vw-2rem))]"
          >
            <TimelineSelects
              idPrefix="compact"
              month={month}
              onMonthChange={changeMonth}
              project={project}
              onProjectChange={setProject}
            />
            {activeFilters && (
              <Button
                variant="ghost"
                className="mt-3 w-full"
                onClick={resetFilters}
              >
                Clear filters
              </Button>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <p className="sr-only" role="status">
        {preview === "loading"
          ? "Loading Timeline"
          : preview === "error"
            ? "Timeline unavailable"
            : `${visibleEvents.length} ${visibleEvents.length === 1 ? "moment" : "moments"} found`}
      </p>

      {preview === "loading" ? (
        <div
          className="mt-9 max-w-[760px] space-y-8"
          role="status"
          aria-label="Loading Timeline"
        >
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-3">
              <div className="h-4 w-28 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
              <div className="h-14 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
            </div>
          ))}
          <span className="sr-only">Loading Timeline…</span>
        </div>
      ) : preview === "error" ? (
        <div className="max-w-[760px] py-16 text-center" role="alert">
          <h2 className="text-xl font-semibold">Timeline is unavailable</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button variant="outline" className="mt-5" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : visibleEvents.length === 0 ? (
        <div className="max-w-[760px] py-16 text-center">
          <Search
            className="mx-auto size-5 text-muted-foreground"
            aria-hidden="true"
          />
          {preview === "empty" && !activeFilters ? (
            <>
              <h2 className="mt-3 text-lg font-semibold">
                Your timeline starts here
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Add a note about work you want to remember.
              </p>
              <Button className="pressable mt-5" onClick={onAddNote}>
                Add a note
              </Button>
            </>
          ) : (
            <>
              <h2 className="mt-3 text-lg font-semibold">No moments found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another search, date, or project.
              </p>
              <Button variant="outline" className="mt-5" onClick={resetFilters}>
                Clear filters
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-9 max-w-[760px]">
          {(["sep", "aug"] as const).map((monthKey) => {
            const events = visibleEvents.filter(
              (event) => event.month === monthKey
            );
            if (events.length === 0) return null;
            return (
              <section key={monthKey} className="mb-12 last:mb-0">
                <div className="mb-6 flex items-baseline justify-between gap-3 border-b pb-3">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {monthNames[monthKey]}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {events.length} {events.length === 1 ? "moment" : "moments"}
                  </span>
                </div>
                <div className="relative space-y-8 sm:before:absolute sm:before:bottom-6 sm:before:left-[5.5rem] sm:before:top-3 sm:before:w-px sm:before:bg-border">
                  {events.map((event) => {
                    const Icon = event.icon;
                    return (
                      <article
                        key={event.dateTime}
                        className="relative sm:grid sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8"
                      >
                        <time
                          dateTime={event.dateTime}
                          className="hidden pt-0.5 text-xs tabular-nums text-muted-foreground sm:block"
                        >
                          {event.date}
                        </time>
                        <span className="absolute left-[4.75rem] top-0 hidden size-6 items-center justify-center rounded-full border bg-background text-muted-foreground sm:flex">
                          <Icon className="size-3.5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 border-b pb-7 last:border-b-0">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <time
                              dateTime={event.dateTime}
                              className="tabular-nums sm:hidden"
                            >
                              {event.date}
                            </time>
                            <span className="sm:hidden" aria-hidden="true">
                              ·
                            </span>
                            <Icon
                              className="size-3.5 sm:hidden"
                              aria-hidden="true"
                            />
                            <span>{event.kind}</span>
                          </div>
                          <h3 className="mt-2 text-balance text-lg font-semibold leading-snug tracking-tight">
                            {event.title}
                          </h3>
                          <p className="mt-2 max-w-[68ch] text-sm leading-6 text-muted-foreground">
                            {event.detail}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <BookOpen
                                className="size-3.5"
                                aria-hidden="true"
                              />
                              {event.project}
                            </span>
                            {"goal" in event && event.goal && (
                              <span className="inline-flex items-center gap-1.5">
                                <Target
                                  className="size-3.5"
                                  aria-hidden="true"
                                />
                                {event.goal}
                              </span>
                            )}
                          </div>
                          <div className="mt-4">
                            <p className="text-xs font-medium text-muted-foreground">
                              Evidence
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {event.evidence.map((item) => (
                                <span
                                  key={item}
                                  className="inline-flex min-h-7 items-center gap-1.5 rounded-md bg-secondary px-2 text-xs text-secondary-foreground"
                                >
                                  <Link2
                                    className="size-3"
                                    aria-hidden="true"
                                  />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}

function TimelineSelects({
  idPrefix,
  month,
  onMonthChange,
  project,
  onProjectChange,
}: {
  idPrefix: string;
  month: TimelineMonth;
  onMonthChange: (month: TimelineMonth) => void;
  project: string;
  onProjectChange: (project: string) => void;
}) {
  return (
    <>
      <div>
        <label
          htmlFor={`${idPrefix}-timeline-date`}
          className="text-xs font-medium"
        >
          Date
        </label>
        <div className="relative mt-1.5">
          <CalendarDays
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <select
            id={`${idPrefix}-timeline-date`}
            value={month}
            onChange={(event) =>
              onMonthChange(event.target.value as TimelineMonth)
            }
            className="flex h-10 w-full appearance-none rounded-md border border-input bg-background pl-9 pr-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            <option value="all">All time</option>
            <option value="sep">September 2026</option>
            <option value="aug">August 2026</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor={`${idPrefix}-timeline-project`}
          className="text-xs font-medium"
        >
          Project
        </label>
        <select
          id={`${idPrefix}-timeline-project`}
          value={project}
          onChange={(event) => onProjectChange(event.target.value)}
          className="mt-1.5 flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
        >
          <option value="all">All projects</option>
          <option value="Payroll corrections">Payroll corrections</option>
          <option value="Permissions redesign">Permissions redesign</option>
          <option value="Onboarding improvements">
            Onboarding improvements
          </option>
        </select>
      </div>
    </>
  );
}
