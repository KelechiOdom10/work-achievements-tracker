import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/shared/constants";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { SocialLoginButton } from "./SocialLoginButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              to="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <Sparkles className="size-6" />
            </Link>
            <h1 className="text-lg font-bold">Welcome to {siteConfig.name}</h1>
            <div className="text-center text-base">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SocialLoginButton
              provider="google"
              label="Google"
              redirectURL="/app"
            />
            <SocialLoginButton
              provider="github"
              label="GitHub"
              redirectURL="/app"
            />
          </div>
        </div>
      </form>
      <p className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
}
