import { configureOpenAPI } from "./lib/configure-openapi";
import { createHonoApp } from "./lib/create-app";
import { achievementRoute } from "./modules/achievement";
import { authRoute } from "./modules/auth";
import { companyRoute } from "./modules/company";
import { uploadRoute } from "./modules/upload";
import { userRoute } from "./modules/user";

const app = createHonoApp();

configureOpenAPI(app);

// Home Route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Work Achievements Tracker API",
  });
});

const routes = [
  authRoute,
  userRoute,
  achievementRoute,
  companyRoute,
  uploadRoute,
] as const;

routes.forEach((route) => {
  app.route("/api", route);
});

export type AppType = (typeof routes)[number];

// const router = app
//   .basePath("/api")
//   .route("/auth", authRoute)
//   .route("/user", userRoute)
//   .route("/achievements", achievementRoute)
//   .route("/companies", companyRoute);

// // Export the router with its type
// export { router };

// // Export the router type for frontend usage
// type RouterType = typeof router;
// export type { RouterType as Router };

export default app;
