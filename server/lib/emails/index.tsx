import plunkImport from "@plunk/node";
import { render } from "@react-email/components";
import type { ReactElement } from "react";
import { MagicLinkEmail } from "./magic-link-email";

const Plunk = (
  plunkImport as unknown as {
    default: typeof plunkImport;
  }
).default;

// See https://github.com/useplunk/node/issues/2 for why Plunk.default
const plunk = new Plunk(process.env.PLUNK_API_KEY || "");

export const sendMagicLinkEmail = async ({
  to,
  subject,
  url,
}: {
  to: string;
  subject: string;
  url: string;
}) => {
  const body = await render(
    <MagicLinkEmail to={to} subject={subject} url={url} />
  );

  try {
    const message = await plunk.emails.send({
      to,
      subject,
      body,
    });

    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
