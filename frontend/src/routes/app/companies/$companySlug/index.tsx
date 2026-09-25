import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";

import { CompanyHome } from "@/components/career/CompanyHome";
import { parsePreview } from "@/components/career/preview";
import { getCompanyBySlugOptions } from "@/hooks/use-companies";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/app/companies/$companySlug/")({
  component: CompanyHomePage,
  validateSearch: (
    search: Record<string, unknown>
  ): { capture?: true; preview?: ReturnType<typeof parsePreview> } => ({
    ...(search.capture === true || search.capture === 1
      ? { capture: true as const }
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

function CompanyHomePage() {
  const company = Route.useLoaderData();
  const { companySlug } = Route.useParams();
  const { capture, preview } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name?.split(" ")[0] || "there";

  // `capture` only opens the note on arrival; drop it so a refresh after
  // closing the note does not reopen it.
  useEffect(() => {
    if (!capture) return;
    void navigate({
      search: (previous) => ({ ...previous, capture: undefined }),
      replace: true,
    });
  }, [capture, navigate]);

  return (
    <CompanyHome
      companyName={company.name}
      userName={firstName}
      preview={preview}
      captureOpen={capture}
      onRetry={() => {
        void navigate({
          search: (previous) => ({ ...previous, preview: undefined }),
          replace: true,
        });
      }}
      onOpenTimeline={(month, momentId) => {
        void navigate({
          to: "/app/companies/$companySlug/timeline",
          params: { companySlug },
          search: { month, preview },
          hash: momentId ? `moment-${momentId}` : undefined,
        });
      }}
    />
  );
}
