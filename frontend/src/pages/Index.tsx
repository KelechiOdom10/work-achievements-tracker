import { AchievementCard } from "@/components/landing/AchievementCard";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { FloatingElements } from "@/components/landing/FloatingElements";
import { HeroAnimation } from "@/components/landing/HeroAnimation";
import { Testimonial } from "@/components/landing/Testimonial";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              Achieve
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
          <FloatingElements />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium">
                Track your professional journey
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Document your achievements,{" "}
                <span className="text-primary">elevate your career</span>
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                A beautiful, intuitive platform to track, organize, and leverage
                your professional accomplishments throughout your career
                journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-12 px-8">
                  Start tracking for free
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Watch demo
                </Button>
              </div>
            </div>
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-xl">
                <HeroAnimation />
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  width={1000}
                  height={600}
                  alt="Achievement tracker dashboard"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

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
                Designed for professionals who want to document their journey
                and leverage their accomplishments.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Achievement Tracking"
                description="Document and organize your work accomplishments with rich media attachments and contextual tags."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Real-time Updates"
                description="Add achievements as they happen with our mobile app, ensuring nothing gets forgotten."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Growth Analytics"
                description="Visualize your professional growth with beautiful charts and insights about your progress."
              />
              <FeatureCard
                icon={<Award className="h-10 w-10 text-primary" />}
                title="Milestone Marking"
                description="Highlight significant career milestones and celebrate your professional journey."
              />
              <FeatureCard
                icon={<Target className="h-10 w-10 text-primary" />}
                title="Goal Setting"
                description="Set career goals and track your progress toward achieving them with actionable steps."
              />
              <FeatureCard
                icon={<ArrowRight className="h-10 w-10 text-primary" />}
                title="Export & Share"
                description="Generate beautiful reports for performance reviews or share achievements with your network."
              />
            </div>
          </div>
        </section>

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
                        intuitive interface. Add context, metrics, and
                        supporting materials.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        Organize and categorize
                      </h3>
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
                        analytics that highlight your strengths and growth
                        areas.
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
                        Generate reports for performance reviews, update your
                        resume with precision, or share achievements with your
                        network.
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

        <section
          id="testimonials"
          className="py-20 md:py-24 lg:py-32 bg-muted/30"
        >
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Loved by professionals
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See how Achieve has helped professionals across industries
                advance their careers.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Testimonial
                quote="Achieve has completely transformed how I prepare for performance reviews. I used to scramble to remember my accomplishments, but now I have everything documented and organized."
                author="Sarah Chen"
                role="Product Manager"
              />
              <Testimonial
                quote="As someone who's changed jobs three times in five years, having a continuous record of my achievements has been invaluable. I can easily reference past work and demonstrate my growth."
                author="Marcus Johnson"
                role="Marketing Director"
              />
              <Testimonial
                quote="The analytics feature helped me identify that I was focusing too much on one skill area and neglecting others. This insight helped me diversify my experience and ultimately land a promotion."
                author="Priya Patel"
                role="Software Engineer"
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start for free and upgrade as your career grows.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-border/50 bg-background p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 text-lg font-semibold">Free</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Perfect for getting started with achievement tracking.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 50 achievements</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic categorization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Export to PDF</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </div>
              <div className="rounded-2xl border border-primary bg-background p-8 shadow-md relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
                <div className="mb-4 text-lg font-semibold">Pro</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mb-6 text-muted-foreground">
                  For professionals serious about career growth.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited achievements</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced categorization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Growth analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Goal tracking</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 text-lg font-semibold">Teams</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
                <p className="mb-6 text-muted-foreground">
                  For managers and teams looking to grow together.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Team dashboards</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Manager insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Performance review tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-32 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Start documenting your professional journey today
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of professionals who are leveraging their
                achievements to advance their careers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-12 px-8">
                  Get started for free
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Schedule a demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 md:max-w-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold tracking-tight">
                  Achieve
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                The professional achievement tracking platform that helps you
                document, organize, and leverage your work accomplishments.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-sm font-semibold">Product</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Changelog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-semibold">Resources</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-semibold">Company</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Achieve. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
