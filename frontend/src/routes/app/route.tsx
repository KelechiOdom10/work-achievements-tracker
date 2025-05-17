import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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

    try {
      const activeCompanyData = await context.queryClient.ensureQueryData({
        queryKey: ["companies"],
        queryFn: async () => {
          const response = await apiClient.companies.active.$get();

          if (!response.ok) {
            throw new Error((await response.json()).message);
          }

          const { data } = await response.json();
          return data;
        },
      });

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
        } else {
          // If no active company, go to selection page
          throw redirect({ to: "/app/companies" });
        }
      }
    } catch {
      throw redirect({ to: "/onboarding" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
