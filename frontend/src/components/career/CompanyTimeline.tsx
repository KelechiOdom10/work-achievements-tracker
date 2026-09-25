import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Link2,
  Search,
  SlidersHorizontal,
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
import { cn } from "@/lib/utils";

import {
  momentKinds,
  monthNames,
  sampleMoments,
  sampleProjects,
  type PreviewState,
  type TimelineMoment,
  type TimelineMonth,
} from "./fixtures";

type MonthFilter = TimelineMonth | "all";

const months = Object.keys(monthNames) as TimelineMonth[];

interface CompanyTimelineProps {
  initialMonth?: MonthFilter;
  highlightId?: string;
  preview?: PreviewState;
  onAddNote: () => void;
  onRetry: () => void;
  onMonthChange?: (month: MonthFilter) => void;
}

export function CompanyTimeline({
  initialMonth = "all",
  highlightId,
  preview = "empty",
  onAddNote,
  onRetry,
  onMonthChange,
}: CompanyTimelineProps) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState<MonthFilter>(initialMonth);
  const [project, setProject] = useState("all");
  const [highlighted, setHighlighted] = useState<string | undefined>();

  useEffect(() => setMonth(initialMonth), [initialMonth]);

  useEffect(() => {
    if (!highlightId || preview !== "populated") return;
    const element = document.getElementById(`moment-${highlightId}`);
    if (!element) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    element.scrollIntoView({
      block: "center",
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setHighlighted(highlightId);
  }, [highlightId, preview]);

  const changeMonth = (nextMonth: MonthFilter) => {
    setMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  const normalisedQuery = query.trim().toLowerCase();
  const visibleMoments = (preview === "populated" ? sampleMoments : []).filter(
    (moment) => {
      const searchable = [
        moment.title,
        moment.detail,
        moment.project,
        moment.goal ?? "",
        ...moment.evidence,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (month === "all" || moment.month === month) &&
        (project === "all" || moment.project === project) &&
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
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3",
          activeFilters
            ? "lg:grid-cols-[minmax(0,1fr)_10rem_10rem_auto]"
            : "lg:grid-cols-[minmax(0,1fr)_10rem_10rem]"
        )}
      >
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
        <div className="hidden lg:contents">
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
            className="hidden min-h-10 lg:inline-flex"
            onClick={resetFilters}
          >
            Clear
          </Button>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="pressable min-h-10 hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary lg:hidden"
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
            className="w-[min(18rem,calc(100vw-2rem))] space-y-3"
          >
            <TimelineSelects
              idPrefix="compact"
              month={month}
              onMonthChange={changeMonth}
              project={project}
              onProjectChange={setProject}
            />
            {activeFilters && (
              <Button variant="ghost" className="w-full" onClick={resetFilters}>
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
            : `${visibleMoments.length} ${visibleMoments.length === 1 ? "moment" : "moments"} found`}
      </p>

      {preview === "loading" ? (
        <div className="mt-9 space-y-8" aria-busy="true">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4">
              <div className="size-7 shrink-0 animate-pulse rounded-full bg-secondary motion-reduce:animate-none" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-28 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
                <div className="h-14 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
              </div>
            </div>
          ))}
        </div>
      ) : preview === "error" ? (
        <div className="py-16 text-center" role="alert">
          <h2 className="text-xl font-semibold">Timeline is unavailable</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button variant="outline" className="mt-5" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : visibleMoments.length === 0 ? (
        <div className="py-16 text-center">
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
        <div className="mt-9">
          <AnimatePresence initial={false} mode="popLayout">
            {months.map((monthKey) => {
              const moments = visibleMoments.filter(
                (moment) => moment.month === monthKey
              );
              if (moments.length === 0) return null;
              return (
                <motion.section
                  key={monthKey}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="mb-12 last:mb-0"
                >
                  <div className="mb-6 flex items-baseline justify-between gap-3 border-b pb-3">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {monthNames[monthKey]}
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {moments.length}{" "}
                      {moments.length === 1 ? "moment" : "moments"}
                    </span>
                  </div>
                  <AnimatePresence initial={false} mode="popLayout">
                    {moments.map((moment, index) => (
                      <MomentRow
                        key={moment.id}
                        moment={moment}
                        isLast={index === moments.length - 1}
                        highlighted={highlighted === moment.id}
                        onHighlightEnd={() => setHighlighted(undefined)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.section>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

function MomentRow({
  moment,
  isLast,
  highlighted,
  onHighlightEnd,
}: {
  moment: TimelineMoment;
  isLast: boolean;
  highlighted: boolean;
  onHighlightEnd: () => void;
}) {
  const { icon: Icon, markerClassName } = momentKinds[moment.kind];

  return (
    <motion.article
      id={`moment-${moment.id}`}
      layout="position"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
      className="grid scroll-mt-24 grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[3.25rem_1.75rem_minmax(0,1fr)]"
    >
      <time
        dateTime={moment.dateTime}
        className="hidden pt-1.5 text-right text-xs tabular-nums text-muted-foreground sm:block"
      >
        {moment.date}
      </time>
      <div className="flex flex-col items-center" aria-hidden="true">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full text-foreground/80 ring-4 ring-background",
            markerClassName
          )}
        >
          <Icon className="size-3.5" />
        </span>
        {!isLast && <span className="my-1.5 w-px flex-1 bg-border" />}
      </div>
      <div
        className={cn(
          "-mx-3 -mt-2 min-w-0 rounded-lg px-3 pt-3.5",
          isLast ? "pb-2" : "pb-10",
          highlighted && "moment-highlight"
        )}
        onAnimationEnd={onHighlightEnd}
      >
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <time dateTime={moment.dateTime} className="tabular-nums sm:hidden">
            {moment.date}
          </time>
          <span className="sm:hidden" aria-hidden="true">
            ·
          </span>
          {moment.kind}
        </p>
        <h3 className="mt-1.5 text-balance text-lg font-semibold leading-snug tracking-tight">
          {moment.title}
        </h3>
        <p className="mt-2 max-w-[68ch] text-sm leading-6 text-muted-foreground">
          {moment.detail}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {moment.project}
          </span>
          {moment.goal && (
            <span className="inline-flex items-center gap-1.5">
              <Target className="size-3.5" aria-hidden="true" />
              {moment.goal}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground">Evidence</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {moment.evidence.map((item) => (
              <li
                key={item}
                className="inline-flex min-h-7 items-center gap-1.5 rounded-md bg-secondary px-2 text-xs text-secondary-foreground"
              >
                <Link2 className="size-3" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

const selectClassName =
  "flex h-10 w-full appearance-none rounded-md border border-input bg-background pr-9 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm";

function TimelineSelects({
  idPrefix,
  month,
  onMonthChange,
  project,
  onProjectChange,
}: {
  idPrefix: string;
  month: MonthFilter;
  onMonthChange: (month: MonthFilter) => void;
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
              onMonthChange(event.target.value as MonthFilter)
            }
            className={cn(selectClassName, "pl-9")}
          >
            <option value="all">All time</option>
            {months.map((key) => (
              <option key={key} value={key}>
                {monthNames[key]}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
      </div>
      <div>
        <label
          htmlFor={`${idPrefix}-timeline-project`}
          className="text-xs font-medium"
        >
          Project
        </label>
        <div className="relative mt-1.5">
          <select
            id={`${idPrefix}-timeline-project`}
            value={project}
            onChange={(event) => onProjectChange(event.target.value)}
            className={cn(selectClassName, "pl-3")}
          >
            <option value="all">All projects</option>
            {sampleProjects.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
      </div>
    </>
  );
}

function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      aria-hidden="true"
    />
  );
}
