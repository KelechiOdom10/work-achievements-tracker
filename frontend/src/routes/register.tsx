import { createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/register")({
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
        <RegisterForm />
      </div>
    </GuestLayout>
  );
}
