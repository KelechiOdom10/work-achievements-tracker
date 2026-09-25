import { createFileRoute, notFound, useLocation } from "@tanstack/react-router";

import { CompanyTimeline } from "@/components/career/CompanyTimeline";
import type { TimelineMonth } from "@/components/career/fixtures";
import { parsePreview } from "@/components/career/preview";
import { getCompanyBySlugOptions } from "@/hooks/use-companies";

export const Route = createFileRoute("/app/companies/$companySlug/timeline")({
  component: CompanyTimelinePage,
  validateSearch: (
    search: Record<string, unknown>
  ): {
    month?: TimelineMonth;
    preview?: ReturnType<typeof parsePreview>;
  } => ({
    ...(search.month === "sep" || search.month === "aug"
      ? { month: search.month }
      : {}),
    ...(parsePreview(search.preview)
      ? { preview: parsePreview(search.preview) }
      : {}),
  }),
  loader: async ({ context, params }) => {
    const company = await context.queryClient.ensureQueryData(
      getCompanyBySlugOptions(params.companySlug)
    );
    if (!company) throw notFound();
    return company;
  },
});

function CompanyTimelinePage() {
  const company = Route.useLoaderData();
  const { companySlug } = Route.useParams();
  const { month, preview } = Route.useSearch();
  const hash = useLocation({ select: (location) => location.hash });
  const navigate = Route.useNavigate();

  return (
    <div className="mx-auto max-w-[800px] pb-20 pt-5 sm:pt-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          {company.name}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Timeline
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Meaningful work, decisions, and checkpoints.
        </p>
      </header>
      <CompanyTimeline
        initialMonth={month}
        highlightId={hash.startsWith("moment-") ? hash.slice(7) : undefined}
        preview={preview}
        onRetry={() => {
          void navigate({
            search: (previous) => ({ ...previous, preview: undefined }),
            replace: true,
          });
        }}
        onMonthChange={(nextMonth) => {
          void navigate({
            search: (previous) => ({
              ...previous,
              month: nextMonth === "all" ? undefined : nextMonth,
            }),
            replace: true,
          });
        }}
        onAddNote={() => {
          void navigate({
            to: "/app/companies/$companySlug",
            params: { companySlug },
            search: { capture: true, preview },
          });
        }}
      />
    </div>
  );
}
