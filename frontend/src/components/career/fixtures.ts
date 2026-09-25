import {
  Flag,
  MessageSquareText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Development-only sample content. Rendered only through `?preview=populated`
// until Home and Timeline read real career records (#7, #8).

export type TimelineMonth = "sep" | "aug";
export type PreviewState = "populated" | "empty" | "loading" | "error";

export type MomentKind = "Achievement" | "Project checkpoint" | "Decision";

export interface TimelineMoment {
  id: string;
  month: TimelineMonth;
  date: string;
  dateTime: string;
  kind: MomentKind;
  title: string;
  shortTitle: string;
  detail: string;
  project: string;
  goal?: string;
  evidence: string[];
}

export const monthNames: Record<TimelineMonth, string> = {
  sep: "September 2026",
  aug: "August 2026",
};

export const momentKinds: Record<
  MomentKind,
  { icon: LucideIcon; markerClassName: string }
> = {
  Achievement: { icon: Sparkles, markerClassName: "bg-desk-feature" },
  "Project checkpoint": { icon: Flag, markerClassName: "bg-desk-focus" },
  Decision: { icon: MessageSquareText, markerClassName: "bg-desk-source" },
};

export const sampleMoments: TimelineMoment[] = [
  {
    id: "payroll-corrections",
    month: "sep",
    date: "18 Sep",
    dateTime: "2026-09-18",
    kind: "Achievement",
    title: "Made payroll corrections safer to review",
    shortTitle: "Safer payroll reviews",
    detail:
      "Separated correction reasons from pay-impacting changes, so reviewers can see what will change before approving it.",
    project: "Payroll corrections",
    evidence: ["PR #2841", "PAY-462"],
  },
  {
    id: "permissions-pilot",
    month: "sep",
    date: "16 Sep",
    dateTime: "2026-09-16",
    kind: "Project checkpoint",
    title: "Internal permissions pilot completed",
    shortTitle: "Permissions pilot",
    detail:
      "The first rollout group completed migration without a Support escalation.",
    project: "Permissions redesign",
    goal: "Lead the permissions rollout",
    evidence: ["2 pull requests", "Support feedback"],
  },
  {
    id: "permissions-rollout-plan",
    month: "sep",
    date: "11 Sep",
    dateTime: "2026-09-11",
    kind: "Decision",
    title: "Changed the permissions rollout plan",
    shortTitle: "Staged rollout plan",
    detail:
      "A migration edge case changed the rollout from one release to a staged internal-first approach.",
    project: "Permissions redesign",
    evidence: ["Architecture note", "3 linked issues"],
  },
  {
    id: "new-starter-setup",
    month: "aug",
    date: "29 Aug",
    dateTime: "2026-08-29",
    kind: "Achievement",
    title: "Simplified the new-starter setup flow",
    shortTitle: "New-starter setup",
    detail:
      "Removed a repeated setup step and documented the compliance trade-offs for the next iteration.",
    project: "Onboarding improvements",
    evidence: ["PR #2798", "Notion note"],
  },
];

export const sampleProjects = [
  ...new Set(sampleMoments.map((moment) => moment.project)),
];
