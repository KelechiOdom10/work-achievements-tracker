import { createRouter } from "~/lib/create-app";

import { getUserRoute } from "./user.route";

export const userRoute = createRouter()
  .basePath("/user")
  .openapi(getUserRoute, (c) => {
    const { id } = c.req.param();

    return c.json({
      success: true,
      data: {
        user: {
          id,
          name: "",
          email: "",
          emailVerified: false,
          image: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    });
  });
