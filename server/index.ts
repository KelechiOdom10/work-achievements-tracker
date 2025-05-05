import { Hono } from "hono";

import type { AuthType } from "./lib/auth";
import { errorHandler } from "./middlewares/error-handler";
import auth from "./modules/auth";

const app = new Hono<{ Bindings: AuthType }>();

const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.onError(errorHandler);

export default app;
