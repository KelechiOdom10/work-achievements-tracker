import { createRouter } from "~/lib/create-app";

import { getUserHandler } from "./user.handler";
import { getUserRoute } from "./user.route";

export const userRoute = createRouter()
  .basePath("/user")
  .openapi(getUserRoute, getUserHandler);
