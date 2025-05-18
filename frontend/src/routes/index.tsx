import { createFileRoute, redirect, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { GuestLayout } from "@/components/layouts/GuestLayout";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad({ context }) {
    if (context.auth?.isAuthenticated) {
      return redirect({ to: "/app" });
    }
  },
});

function Index() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  return (
    <GuestLayout showNav showFooter>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
    </GuestLayout>
  );
}
