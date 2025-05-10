import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink, openAPI } from "better-auth/plugins";

import { siteConfig } from "~/shared/constants";
import env from "~/env";

import { sendMagicLinkEmail } from "./emails";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Allow requests from the frontend development server
  trustedOrigins: ["http://localhost:3000"],
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  rateLimit: {
    enabled: true,
  },
  account: {
    accountLinking: { enabled: true },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes in seconds
    },
  },
  plugins: [
    openAPI(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const to = email;
        const subject = `Your ${siteConfig.name} Login Link`;

        await sendMagicLinkEmail({
          to,
          subject,
          url,
        });
      },
    }),
  ],
});

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
