import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayoutComponent,
  beforeLoad: (ctx) => {
    if (ctx.context.auth?.isAuthenticated) {
      return redirect({
        to: "/",
      });
    }
  },
});

function AuthLayoutComponent() {
  return (
    <GuestLayout
      showNav
      navProps={{
        logoOnly: true,
        showAuthLinks: false,
      }}
      showFooter={false}
    >
      <div className="w-full max-w-sm mx-auto pt-24">
        <Outlet />
      </div>
    </GuestLayout>
  );
}
