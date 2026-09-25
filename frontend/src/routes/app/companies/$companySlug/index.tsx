import { createFileRoute, notFound } from "@tanstack/react-router";

import { CompanyHome } from "@/components/career/CompanyHome";
import { getCompanyBySlugOptions } from "@/hooks/use-companies";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/app/companies/$companySlug/")({
  component: CompanyHomePage,
  validateSearch: (
    search: Record<string, unknown>
  ): { preview?: "empty" | "loading" | "error" } =>
    import.meta.env.DEV &&
    (search.preview === "empty" ||
      search.preview === "loading" ||
      search.preview === "error")
      ? { preview: search.preview }
      : {},
  loader: async ({ context, params }) => {
    const company = await context.queryClient.ensureQueryData(
      getCompanyBySlugOptions(params.companySlug)
    );
    if (!company) throw notFound();
    return company;
  },
});

function CompanyHomePage() {
  const company = Route.useLoaderData();
  const { companySlug } = Route.useParams();
  const { preview } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name?.split(" ")[0] || "there";

  return (
    <CompanyHome
      companyName={company.name}
      userName={firstName}
      preview={preview}
      onRetry={() => {
        void navigate({ search: { preview: undefined }, replace: true });
      }}
      onAddNote={() => {
        void navigate({
          to: "/app/companies/$companySlug/achievements/new",
          params: { companySlug },
        });
      }}
      onOpenTimeline={(month) => {
        void navigate({
          to: "/app/companies/$companySlug/timeline",
          params: { companySlug },
          search: { month },
        });
      }}
    />
  );
}
