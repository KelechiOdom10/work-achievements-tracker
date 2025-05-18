import { createFileRoute, notFound } from "@tanstack/react-router";

import { CompanyNotFound } from "@/components/company/CompanyNotFound";
import { AppLayout } from "@/components/layouts/app-layout/AppLayout";
import { GuestLayout } from "@/components/layouts/GuestLayout";
import { getCompanyBySlugOptions } from "@/hooks/use-companies";

export const Route = createFileRoute("/app/companies/$companySlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { companySlug } = params;

    const companyData = await context.queryClient.ensureQueryData(
      getCompanyBySlugOptions(companySlug)
    );

    if (!companyData) {
      throw notFound();
    }

    return {
      companyData,
    };
  },
  notFoundComponent: () => (
    <GuestLayout showNav navProps={{ logoOnly: true }} showFooter={false}>
      <CompanyNotFound />
    </GuestLayout>
  ),
});

function RouteComponent() {
  const { companyData } = Route.useLoaderData();
  return <AppLayout>{companyData?.name}</AppLayout>;
}
