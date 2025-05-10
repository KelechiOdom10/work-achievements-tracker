import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to track your career growth
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Designed for professionals who want to document their journey and
            leverage their accomplishments.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<CheckCircle />}
            iconColorVariant="green"
            title="Achievement Tracking"
            description="Document and organize your work accomplishments with rich media attachments and contextual tags."
          />
          <FeatureCard
            icon={<Clock />}
            iconColorVariant="blue"
            title="Real-time Updates"
            description="Add achievements as they happen with our mobile app, ensuring nothing gets forgotten."
          />
          <FeatureCard
            icon={<BarChart3 />}
            iconColorVariant="orange"
            title="Growth Analytics"
            description="Visualize your professional growth with beautiful charts and insights about your progress."
          />
          <FeatureCard
            icon={<Award />}
            iconColorVariant="purple"
            title="Milestone Marking"
            description="Highlight significant career milestones and celebrate your professional journey."
          />
          <FeatureCard
            icon={<Target />}
            iconColorVariant="pink"
            title="Goal Setting"
            description="Set career goals and track your progress toward achieving them with actionable steps."
          />
          <FeatureCard
            icon={<ArrowRight />}
            iconColorVariant="cyan"
            title="Export & Share"
            description="Generate beautiful reports for performance reviews or share achievements with your network."
          />
        </div>
      </div>
    </section>
  );
}
