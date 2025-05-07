import { createHonoApp } from "./lib/create-app";
import { authRoute } from "./modules/auth";

const app = createHonoApp();

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

export default app;
