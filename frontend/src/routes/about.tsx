import { createFileRoute } from "@tanstack/react-router";

import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <GuestLayout showNav showFooter>
      <h1>About</h1>
    </GuestLayout>
  );
}
