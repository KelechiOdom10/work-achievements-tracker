import { createRouter } from "~/lib/create-app";

const userRoute = createRouter().basePath("/user");

userRoute.get("/", (c) => {
  return c.json({
    message: "Welcome to the Work Achievements Tracker API",
  });
});

export { userRoute };
