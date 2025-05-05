import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import type { AuthType } from "./lib/auth";
import { errorHandler, notFoundHandler } from "./middlewares";
import { authRoute } from "./modules/auth";

const app = new Hono<{ Bindings: AuthType }>({
  strict: false,
});

// Logger middleware
app.use(logger());

// Compress middleware
app.use(compress({ encoding: "gzip" }));

// CORS configuration (tightened for security)
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"], // Specify allowed origins (update for production)
    credentials: true,
    maxAge: 86400, // Cache preflight for 1 day
  })
);

// Home Route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Work Achievements Tracker API",
  });
});

const routes = [authRoute] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

// Error handlers
app.onError(errorHandler);
app.notFound(notFoundHandler);

export default app;
