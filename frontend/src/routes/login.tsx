import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/components/auth/LoginForm";
import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
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
        <LoginForm />
      </div>
    </GuestLayout>
  );
}
