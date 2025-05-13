import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { siteConfig } from "@/shared/constants";
import { buttonVariants } from "@/components/ui/button";

export interface NavProps {
  logoOnly?: boolean;
  showAuthLinks?: boolean;
  navLinks?: Array<{ label: string; to: string }>;
}

export function Nav({
  logoOnly = false,
  showAuthLinks = true,
  navLinks,
}: NavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>
        {!logoOnly && (
          <nav className="hidden md:flex items-center gap-6">
            {(
              navLinks || [
                { label: "Features", to: "/#features" },
                { label: "How It Works", to: "/#how-it-works" },
                { label: "Testimonials", to: "/#testimonials" },
                { label: "Pricing", to: "/#pricing" },
              ]
            ).map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        {showAuthLinks && (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className={buttonVariants({ variant: "default" })}
            >
              Get Started
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
