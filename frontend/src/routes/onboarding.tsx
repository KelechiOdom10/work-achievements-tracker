import { createFileRoute, redirect } from "@tanstack/react-router";

import { CreateCompanyForm } from "@/components/company/CreateCompanyForm";
import { GuestLayout } from "@/components/layouts/GuestLayout";
import { activeCompanyQueryOptions } from "@/hooks/use-companies";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: "/login", search: { next: location.pathname } });
    }

    const activeCompanyData = await context.queryClient.ensureQueryData(
      activeCompanyQueryOptions
    );

    if (activeCompanyData?.company) {
      throw redirect({
        to: "/app/companies/$companySlug",
        params: {
          companySlug:
            activeCompanyData.company.slug || activeCompanyData.company.id,
        },
      });
    }
  },
});

function Onboarding() {
  return (
    <GuestLayout
      showNav
      navProps={{ logoOnly: true, showAuthLinks: false }}
      showFooter={false}
    >
      <CreateCompanyForm />
    </GuestLayout>
  );
}
