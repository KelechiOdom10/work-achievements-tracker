import {
  ArrowRight,
  BookOpen,
  Check,
  CircleDot,
  GitPullRequest,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  sampleMoments,
  sampleProjects,
  type PreviewState,
  type TimelineMonth,
} from "./fixtures";
import { NoteCapture } from "./NoteCapture";

interface CompanyHomeProps {
  companyName: string;
  userName: string;
  captureOpen?: boolean;
  onOpenTimeline: (month?: TimelineMonth, momentId?: string) => void;
  onRetry: () => void;
  preview?: PreviewState;
}

const recentMoments = sampleMoments.filter((moment) => moment.month === "sep");

export function CompanyHome({
  companyName,
  userName,
  captureOpen = false,
  onOpenTimeline,
  onRetry,
  preview = "empty",
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
      </header>

      {preview === "loading" ? (
        <div className="mt-10 space-y-4" aria-busy="true">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="h-56 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none lg:col-span-8" />
            <div className="h-56 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none lg:col-span-4" />
          </div>
          <div className="h-40 animate-pulse rounded-xl bg-secondary motion-reduce:animate-none" />
          <span className="sr-only" role="status">
            Loading Home…
          </span>
        </div>
      ) : preview === "error" ? (
        <section
          className="mt-10 rounded-xl border bg-card px-6 py-12 text-center"
          role="alert"
        >
          <h2 className="text-xl font-semibold">Home is unavailable</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button className="mt-5" variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </section>
      ) : preview === "empty" ? (
        <NoteCapture
          variant="hero"
          projects={[]}
          initiallyOpen={captureOpen}
          className="mx-auto mt-10 max-w-2xl"
        />
      ) : (
        <div className="mt-9 grid gap-4 lg:grid-cols-12">
          <section className="rounded-xl bg-desk-feature p-5 sm:p-7 lg:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
              <div className="min-w-0 flex-1 basis-56">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  September
                </p>
                <h2 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  Three moments worth keeping
                </h2>
              </div>
              <Button
                variant="secondary"
                size="default"
                className="pressable"
                onClick={() => onOpenTimeline("sep")}
              >
                See September <ArrowRight />
              </Button>
            </div>
            <ul className="mt-6 grid gap-2 sm:mt-7 sm:grid-cols-3">
              {recentMoments.map((moment) => (
                <li key={moment.id}>
                  <button
                    type="button"
                    onClick={() => onOpenTimeline(moment.month, moment.id)}
                    className="pressable flex min-h-11 w-full items-baseline gap-3 rounded-lg bg-card/80 px-3 py-2.5 text-left text-card-foreground outline-none transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-desk-feature sm:block sm:min-h-20 sm:p-3"
                  >
                    <span className="w-12 shrink-0 text-xs tabular-nums text-muted-foreground sm:block sm:w-auto">
                      {moment.date}
                    </span>
                    <span className="text-sm font-semibold leading-snug sm:mt-1 sm:block">
                      {moment.shortTitle}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <NoteCapture
            projects={sampleProjects}
            defaultProject="Permissions redesign"
            initiallyOpen={captureOpen}
            className="order-first lg:order-none lg:col-span-4"
          />

          <section className="rounded-xl bg-desk-focus p-5 sm:p-6 lg:col-span-7">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="size-4" aria-hidden="true" />
              <span>Current focus</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight">
              Permissions redesign
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Architecture agreed
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Migration path shipped
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <CircleDot
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                Rollout in progress
              </li>
            </ul>
          </section>

          <div className="grid content-start gap-4 self-start sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <DeskRow
              icon={GitPullRequest}
              iconClassName="bg-desk-source"
              title="From your tools"
              meta={["6 to review", "4 GitHub", "2 Linear"]}
            />
            <DeskRow
              icon={Sparkles}
              iconClassName="bg-desk-review"
              title="Mid-year review"
              meta={["6 weeks away", "9 pieces of work selected"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DeskRow({
  icon: Icon,
  iconClassName,
  title,
  meta,
}: {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  meta: string[];
}) {
  return (
    <section className="flex items-start gap-3 rounded-xl border p-4">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          iconClassName
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {meta.join(" · ")}
        </p>
      </div>
    </section>
  );
}
