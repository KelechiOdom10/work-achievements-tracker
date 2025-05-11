import type { AppRouteHandler } from "~/types";

import { type GetUserRoute } from "./user.route";

export const getUserHandler: AppRouteHandler<GetUserRoute> = (c) => {
  const { id } = c.req.param();

  if (!id) {
    return c.json(
      {
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
        isFormError: false,
      },
      404
    );
  }

  return c.json(
    {
      success: true,
      message: "User found",
      data: {
        user: {
          id,
          name: "",
          email: "",
          emailVerified: false,
          image: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    },
    200
  );
};
