import {
  ArrowRight,
  BookOpen,
  Check,
  CircleDot,
  GitPullRequest,
  NotebookPen,
  Plus,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type PreviewState = "populated" | "empty" | "loading" | "error";

interface CompanyHomeProps {
  companyName: string;
  userName: string;
  onAddNote: () => void;
  onOpenTimeline: (month?: "sep") => void;
  onRetry: () => void;
  preview?: PreviewState;
}

const recentMoments = [
  { date: "18 Sep", title: "Safer payroll reviews" },
  { date: "11 Sep", title: "Permissions rollout" },
  { date: "03 Sep", title: "New-starter setup" },
];

export function CompanyHome({
  companyName,
  userName,
  onAddNote,
  onOpenTimeline,
  onRetry,
  preview = "populated",
}: CompanyHomeProps) {
  return (
    <div className="mx-auto max-w-[960px] pb-20 pt-5 sm:pt-8">
      <header className="text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {companyName}
        </p>
        <h1 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Hello, {userName} <span aria-hidden="true">👋</span>
        </h1>
        {preview !== "empty" && (
          <Button
            className="pressable mt-5 min-h-10 rounded-full px-5"
            onClick={onAddNote}
          >
            <Plus /> Add a note
          </Button>
        )}
      </header>

      {preview === "loading" ? (
        <div
          className="mt-10 space-y-4"
          role="status"
          aria-label="Loading Home"
        >
          <div className="h-56 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-40 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none" />
            <div className="h-40 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none" />
          </div>
          <span className="sr-only">Loading Home…</span>
        </div>
      ) : preview === "error" ? (
        <section className="mt-10 rounded-xl border bg-card px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">Home is unavailable</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button className="mt-5" variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </section>
      ) : preview === "empty" ? (
        <section className="mt-10 rounded-xl bg-desk-feature px-6 py-12 text-center sm:px-10">
          <NotebookPen className="mx-auto size-6" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            Start with one thing you want to remember
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            A small note is enough. You can add context and evidence later.
          </p>
          <Button className="pressable mt-6 rounded-full" onClick={onAddNote}>
            <Plus /> Add a note
          </Button>
        </section>
      ) : (
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <section className="rounded-xl bg-desk-feature p-5 sm:col-span-2 sm:p-7 lg:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  September
                </p>
                <h2 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  Three moments worth keeping
                </h2>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="pressable min-h-10 rounded-full"
                onClick={() => onOpenTimeline("sep")}
              >
                See September <ArrowRight />
              </Button>
            </div>
            <div className="mt-7 grid gap-2 sm:grid-cols-3">
              {recentMoments.map((moment) => (
                <button
                  type="button"
                  key={moment.title}
                  onClick={() => onOpenTimeline("sep")}
                  className="pressable min-h-20 rounded-lg bg-card/80 p-3 text-left text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-desk-feature"
                >
                  <span className="block text-xs text-muted-foreground">
                    {moment.date}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-snug">
                    {moment.title}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={onAddNote}
            className="pressable relative flex min-h-56 flex-col rounded-xl bg-desk-note p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:col-span-1 lg:col-span-4"
          >
            <NotebookPen className="size-5" aria-hidden="true" />
            <span className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Personal note
            </span>
            <span className="mt-2 max-w-64 text-xl font-medium leading-snug">
              What should future you remember from this week?
            </span>
            <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold">
              Add a note <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </button>

          <section className="rounded-xl border bg-desk-focus p-5 sm:col-span-1 lg:col-span-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="size-4" aria-hidden="true" />
              <span>Current focus</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight">
              Permissions redesign
            </h2>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Architecture agreed
              </p>
              <p className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Migration path shipped
              </p>
              <p className="flex items-start gap-2 text-muted-foreground">
                <CircleDot
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                Rollout in progress
              </p>
            </div>
          </section>

          <section className="rounded-xl border bg-desk-source p-5 sm:col-span-1 lg:col-span-3">
            <GitPullRequest className="size-5" aria-hidden="true" />
            <h2 className="mt-5 text-lg font-semibold">From your tools</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              6 items to review · 4 GitHub, 2 Linear
            </p>
          </section>

          <section className="rounded-xl border bg-desk-review p-5 sm:col-span-2 lg:col-span-4">
            <Sparkles className="size-5" aria-hidden="true" />
            <h2 className="mt-5 text-lg font-semibold">Mid-year review</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              6 weeks away · 9 pieces of work selected
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
