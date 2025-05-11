import Plunk from "@plunk/node";
import { render } from "@react-email/components";

import env from "~/env";

import { MagicLinkEmail } from "./magic-link-email";

const plunk = new Plunk(env.PLUNK_API_KEY || "");

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
    // @ts-expect-error - render is not typed
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
