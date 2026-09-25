import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

import { CompanyNotFound } from "@/components/company/CompanyNotFound";
import { AppLayout } from "@/components/layouts/app-layout/AppLayout";
import { getCompanyBySlugOptions } from "@/hooks/use-companies";

export const Route = createFileRoute("/app/companies/$companySlug")({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    const { companySlug } = params;

    const companyData = await context.queryClient.ensureQueryData(
      getCompanyBySlugOptions(companySlug)
    );

    if (!companyData) {
      throw notFound();
    }
  },
  notFoundComponent: () => <CompanyNotFound />,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
