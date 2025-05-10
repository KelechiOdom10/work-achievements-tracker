import { CheckCircle } from "lucide-react";

import { Button } from "../ui/button";

export function PricingSection() {
  return (
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
  );
}
