import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import type { AuthType } from "./lib/auth";
import {
  errorHandler,
  notFoundHandler,
  pinoLoggerMiddleware,
  type PinoLoggerType,
} from "./middlewares";
import { authRoute } from "./modules/auth";

interface AppBindings {
  Variables: AuthType["Variables"] & PinoLoggerType["Variables"];
}

const app = new OpenAPIHono<AppBindings>({
  strict: false,
});

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

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Work Achievements Tracker API",
  },
});

// Error handlers
app.onError(errorHandler);
app.notFound(notFoundHandler);

export default app;
