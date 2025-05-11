import { createRoute, z } from "@hono/zod-openapi";

import { ErrorResponseSchema, SuccessResponseSchema } from "~/shared/types";

const UserDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getUserRoute = createRoute({
  method: "get",
  path: "/{id}",
  description: "Get user",
  tags: ["User"],
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: "id",
          in: "path",
        },
        example: "1212121",
      }),
    }),
  },
  responses: {
    200: {
      description: "Get user",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({
              user: UserDataSchema,
            })
          ).openapi("UserSuccessResponse"),
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

export type GetUserRoute = typeof getUserRoute;
