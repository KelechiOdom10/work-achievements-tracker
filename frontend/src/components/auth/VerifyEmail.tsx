import { Link, useRouterState } from "@tanstack/react-router";

import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Gmail } from "./email-providers/Gmail";
import { Outlook } from "./email-providers/outlook";

const providers = [
  {
    id: "gmail",
    icon: Gmail,
    label: "Gmail",
    getUrl: () =>
      "https://mail.google.com/mail/u/0/#search/from:no-reply@useplunk.net",
  },
  {
    id: "outlook",
    icon: Outlook,
    label: "Outlook",
    getUrl: () =>
      "https://outlook.live.com/mail/0/inbox?search=from%3Ano-reply@useplunk.net",
  },
];

export const VerifyEmail = () => {
  const { email } = useRouterState({ select: (state) => state.location.state });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-header text-2xl md:text-3xl">
          Check your inbox
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          We&apos;ve sent you a magic link to{" "}
          <span className="font-medium text-foreground">{email}</span>. Please
          click the link to confirm your address.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex gap-4">
          {providers.map(({ id, icon: Icon, label, getUrl }) => (
            <a
              key={id}
              href={getUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <Icon className="size-6" />
              <span className="font-medium text-sm">{label}</span>
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          No email in your inbox?{" "}
          <span className="font-medium">Check your spam folder</span> or{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            try a different email address
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
};
