import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { activeCompanyQueryOptions } from "@/hooks/use-companies";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      return redirect({
        to: "/login",
        search: {
          next: location.pathname,
        },
      });
    }

    const activeCompanyData = await context.queryClient.ensureQueryData(
      activeCompanyQueryOptions
    );

    if (!activeCompanyData) {
      throw redirect({ to: "/onboarding" });
    }

    // If user has no companies, redirect to onboarding
    if (!activeCompanyData.hasCompanies) {
      throw redirect({ to: "/onboarding" });
    }

    // If user visits /app directly, try to get active company from session
    if (location.pathname === "/app") {
      if (activeCompanyData.company) {
        // Redirect to the active company if available
        const company = activeCompanyData.company;
        throw redirect({
          to: "/app/companies/$companySlug",
          params: {
            companySlug: company.slug || company.id,
          },
        });
      }
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
