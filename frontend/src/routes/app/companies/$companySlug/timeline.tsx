import { createFileRoute, notFound } from "@tanstack/react-router";

import { CompanyTimeline } from "@/components/career/CompanyTimeline";
import { getCompanyBySlugOptions } from "@/hooks/use-companies";

export const Route = createFileRoute("/app/companies/$companySlug/timeline")({
  component: CompanyTimelinePage,
  validateSearch: (
    search: Record<string, unknown>
  ): {
    month?: "sep" | "aug";
    preview?: "empty" | "loading" | "error";
  } => ({
    ...(search.month === "sep" || search.month === "aug"
      ? { month: search.month }
      : {}),
    ...(import.meta.env.DEV &&
    (search.preview === "empty" ||
      search.preview === "loading" ||
      search.preview === "error")
      ? { preview: search.preview }
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
  const navigate = Route.useNavigate();

  return (
    <div className="mx-auto max-w-[960px] pb-20 pt-5 sm:pt-8">
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
            to: "/app/companies/$companySlug/achievements/new",
            params: { companySlug },
          });
        }}
      />
    </div>
  );
}
