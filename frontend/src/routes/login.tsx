import { GuestLayout } from "@/components/layouts/GuestLayout";
import { createFileRoute } from "@tanstack/react-router";

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
      showFooter
    >
      <h1>Login</h1>
    </GuestLayout>
  );
}
