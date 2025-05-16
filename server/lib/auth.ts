import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink, openAPI } from "better-auth/plugins";

import { siteConfig } from "~/shared/constants";
import env from "~/env";

import { PrismaClient } from "../../prisma/generated/prisma/client";
import { sendMagicLinkEmail } from "./emails";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Allow requests from the frontend development server
  trustedOrigins: ["http://localhost:8080"],
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  rateLimit: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes in seconds
    },
    additionalFields: {
      activeCompanyId: {
        type: "string",
        required: false,
      },
    },
  },
  //   advanced: {
  //     cookies: {
  //       sessionToken: {
  //         attributes: {
  //           sameSite: "none",
  //           secure: true,
  //           partitioned: true, // New browser standards will mandate this for foreign cookies
  //         },
  //       },
  //     },
  //   },
  plugins: [
    openAPI(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log("Sending magic link to", email);
        console.log("Magic link URL:", url);

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
