import { Button, Section, type ButtonProps } from "@react-email/components";
import React from "react";

export const EmailButton = ({ children, href, ...props }: ButtonProps) => {
  return (
    <Section className="my-6 first:mt-0 last:mb-0">
      <Button
        className="inline-flex items-center justify-center rounded-lg bg-neutral-950 h-8 leading-8 px-4 py-1.5 text-center font-medium text-sm text-white no-underline"
        href={href}
        {...props}
      >
        {children}
      </Button>
    </Section>
  );
};
