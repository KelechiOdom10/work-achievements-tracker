import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

import { auth } from "~/lib/auth";

const privateRoutesMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

export default privateRoutesMiddleware;
