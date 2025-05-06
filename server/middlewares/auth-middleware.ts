import { createMiddleware } from "hono/factory";

import { type ErrorResponse } from "~/shared/types";
import { auth } from "~/lib/auth";

export const requireAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
