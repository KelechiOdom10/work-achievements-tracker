import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AppLayout } from "@/components/layouts/app-layout/AppLayout";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: (ctx) => {
    if (!ctx.context.auth?.isAuthenticated) {
      return redirect({
        to: "/login",
        search: {
          next: ctx.location.pathname,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
