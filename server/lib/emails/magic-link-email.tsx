import { Text } from "@react-email/components";

import { siteConfig } from "~/shared/constants";

import { EmailButton } from "./components/button";
import { EmailWrapper, type EmailWrapperProps } from "./components/wrapper";

type MagicLinkEmailProps = EmailWrapperProps & {
  url: string;
};

export const MagicLinkEmail = ({
  url,
  signature = true,
  ...props
}: MagicLinkEmailProps) => {
  return (
    <EmailWrapper signature={signature} {...props}>
      <Text>Welcome to {siteConfig.name}!</Text>

      <Text>Please click the magic link below to sign in to your account.</Text>

      <EmailButton href={url}>Sign in to {siteConfig.name}</EmailButton>

      <Text>
        This link will expire in 10 minutes and can only be used once.
      </Text>
    </EmailWrapper>
  );
};

export default MagicLinkEmail;
