import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/layouts/app-layout/AppLayout";

export const Route = createFileRoute("/app/companies/$companySlug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppLayout>Hello "/app/companies/$companySlug"!</AppLayout>;
}
