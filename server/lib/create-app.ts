import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import {
  errorHandler,
  notFoundHandler,
  pinoLoggerMiddleware,
  serveEmojiFavicon,
  type PinoLoggerType,
} from "~/middlewares";

import type { AuthType } from "./auth";

interface AppBindings {
  Variables: AuthType["Variables"] & PinoLoggerType["Variables"];
}

export const createHonoApp = () => {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });

  // Serve emoji favicon
  app.use(serveEmojiFavicon("🏆"));

  // Logger middleware
  app.use(pinoLoggerMiddleware());

  // CORS configuration (tightened for security)
  app.use(
    "*",
    cors({
      origin: ["http://localhost:3000"], // Specify allowed origins (update for production)
      credentials: true,
      maxAge: 86400, // Cache preflight for 1 day
    })
  );

  // Error handlers
  app.onError(errorHandler);
  app.notFound(notFoundHandler);

  return app;
};
