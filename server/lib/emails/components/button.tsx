import { Button, Section, type ButtonProps } from "@react-email/components";

export const EmailButton = ({ children, href, ...props }: ButtonProps) => {
  return (
    <Section className="my-6 first:mt-0 last:mb-0">
      <Button
        className="rounded-md bg-neutral-950 px-5 py-3 text-center font-medium text-sm text-white no-underline"
        href={href}
        {...props}
      >
        {children}
      </Button>
    </Section>
  );
};
