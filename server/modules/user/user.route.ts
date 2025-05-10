import { createRoute, z } from "@hono/zod-openapi";

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
          schema: z
            .object({
              user: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                emailVerified: z.boolean(),
                image: z.string().optional(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .openapi("UserResponse"),
        },
      },
    },
  },
});
