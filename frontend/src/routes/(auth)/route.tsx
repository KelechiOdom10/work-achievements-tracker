import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { GuestLayout } from "@/components/layouts/GuestLayout";

type AuthSearchParams = {
  next?: string;
};

export const Route = createFileRoute("/(auth)")({
  component: AuthLayoutComponent,
  validateSearch: (search: Record<string, unknown>): AuthSearchParams => {
    return {
      next: (search.next as string) || "/app",
    };
  },
  beforeLoad: (ctx) => {
    if (ctx.context.auth?.isAuthenticated) {
      return redirect({
        to: ctx.search.next,
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
