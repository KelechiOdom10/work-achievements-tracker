import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import * as React from "react";

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
  try {
    const body = await render(
      <MagicLinkEmail to={to} subject={subject} url={url} />
    );

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
