import { OpenAPIHono } from "@hono/zod-openapi";

import type { AuthType } from "./lib/auth";
import type { PinoLoggerType } from "./middlewares";

export interface AppBindings {
  Variables: AuthType["Variables"] & PinoLoggerType["Variables"];
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;
