import { AchievementCard } from "./AchievementCard";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Build your professional story
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A seamless experience that grows with you throughout your career
            journey.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Document your achievements
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Capture your accomplishments as they happen with our
                    intuitive interface. Add context, metrics, and supporting
                    materials.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold">Organize and categorize</h3>
                  <p className="mt-2 text-muted-foreground">
                    Group achievements by projects, skills, or time periods.
                    Create a structured record that tells your professional
                    story.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold">Analyze your growth</h3>
                  <p className="mt-2 text-muted-foreground">
                    Gain insights into your professional development with
                    analytics that highlight your strengths and growth areas.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Leverage for career advancement
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Generate reports for performance reviews, update your resume
                    with precision, or share achievements with your network.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 h-full w-full rounded-2xl border border-border/50 bg-muted/30"></div>
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg">
                <div className="flex h-8 items-center gap-2 border-b border-border/50 bg-muted/30 px-4">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <AchievementCard
                      title="Led cross-functional team project"
                      date="May 2025"
                      description="Coordinated a team of 8 across 3 departments to deliver project ahead of schedule, resulting in 15% cost savings."
                      tags={["Leadership", "Project Management"]}
                    />
                    <AchievementCard
                      title="Optimized customer onboarding process"
                      date="March 2025"
                      description="Redesigned the customer onboarding workflow, reducing time-to-value by 40% and increasing customer satisfaction scores."
                      tags={["Process Improvement", "Customer Success"]}
                    />
                    <AchievementCard
                      title="Presented at industry conference"
                      date="January 2025"
                      description="Delivered keynote presentation on emerging industry trends to an audience of 500+ professionals."
                      tags={["Public Speaking", "Thought Leadership"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
