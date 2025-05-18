import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { companyKeys } from "@/hooks/use-companies";
import { apiClient } from "@/lib/api-client";

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

    const activeCompanyData = await context.queryClient.ensureQueryData({
      queryKey: companyKeys.active(),
      queryFn: async () => {
        const response = await apiClient.companies.active.$get();

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message, {
            cause: error,
          });
        }

        const { data } = await response.json();
        return data;
      },
    });

    console.log("Active company data", activeCompanyData);

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
    } else {
      throw redirect({ to: "/onboarding" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
