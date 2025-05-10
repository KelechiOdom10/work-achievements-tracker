import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";

import {
  errorHandler,
  notFoundHandler,
  pinoLoggerMiddleware,
  serveEmojiFavicon,
} from "~/middlewares";
import type { AppBindings } from "~/types";

export const createRouter = () => {
  const router = new OpenAPIHono<AppBindings>({
    strict: false,
  });

  return router;
};

export const createHonoApp = () => {
  const app = createRouter();

  // Request ID middleware
  app.use(requestId());

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

  // Pretty JSON middleware
  app.use("/doc/*", prettyJSON());

  // Error handlers
  app.onError(errorHandler);
  app.notFound(notFoundHandler);

  return app;
};
