import { Button } from "@/components/ui/button";

import { FloatingElements } from "./FloatingElements";
import { HeroAnimation } from "./HeroAnimation";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 md:pb-32">
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
            your professional accomplishments throughout your career journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">Start tracking for free</Button>
            <Button size="lg" variant="outline">
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
              className="w-full object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
