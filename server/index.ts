import { configureOpenAPI } from "./lib/configure-openapi";
import { createHonoApp } from "./lib/create-app";
import { achievementRoute } from "./modules/achievement";
import { authRoute } from "./modules/auth";
import { companyRoute } from "./modules/company";
import { userRoute } from "./modules/user";

const app = createHonoApp();

configureOpenAPI(app);

// Home Route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Work Achievements Tracker API",
  });
});

const routes = [authRoute, userRoute, achievementRoute, companyRoute] as const;

routes.forEach((route) => {
  app.route("/api", route);
});

export type AppType = (typeof routes)[number];

export default app;
