import { createFileRoute } from "@tanstack/react-router";

import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

function Onboarding() {
  // ... component logic stays the same

  return (
    <GuestLayout showNav navProps={{ logoOnly: true }} showFooter={false}>
      <div className="max-w-md mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to AchieveLog!</h1>
            <p className="text-gray-600 mt-2">
              Let's set up your first company to start tracking achievements.
            </p>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
