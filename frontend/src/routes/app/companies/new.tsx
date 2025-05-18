import { createFileRoute } from "@tanstack/react-router";

import { CreateCompanyForm } from "@/components/company/CreateCompanyForm";
import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/app/companies/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GuestLayout showNav navProps={{ logoOnly: true }} showFooter={false}>
      <CreateCompanyForm />
    </GuestLayout>
  );
}
