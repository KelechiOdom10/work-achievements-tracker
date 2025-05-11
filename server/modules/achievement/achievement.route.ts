import { createRoute, z } from "@hono/zod-openapi";

import { ErrorResponseSchema, SuccessResponseSchema } from "~/shared/types";
import { requireAuth } from "~/middlewares";

import {
  AchievementCreateInputSchema,
  AchievementOrderByWithRelationInputSchema,
  AchievementSchema,
  AchievementUpdateInputSchema,
  AchievementWhereInputSchema,
} from "../../../prisma/generated/zod";

// GET /achievements
export const getUserAchievementsRoute = createRoute({
  method: "get",
  path: "/",
  description: "Get all achievements for a user",
  tags: ["Achievement"],
  request: {
    query: z
      .object({
        where: AchievementWhereInputSchema.optional().openapi({
          title: "AchievementWhereInput",
          type: "object",
          example: {
            id: "1",
          },
        }),
        orderBy: AchievementOrderByWithRelationInputSchema.optional().openapi({
          title: "AchievementOrderByWithRelationInput",
          type: "object",
          example: {
            createdAt: "desc",
          },
        }),
      })
      .partial()
      .openapi({
        example: {
          where: {
            id: "1",
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      }),
  },
  responses: {
    200: {
      description: "Achievements list",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ achievements: z.array(AchievementSchema) })
          ).openapi("AchievementsSuccessResponse"),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

// POST /achievements
export const createAchievementRoute = createRoute({
  method: "post",
  path: "/",
  description: "Create a new achievement for a user",
  tags: ["Achievement"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: AchievementCreateInputSchema.openapi({
            type: "object",
            title: "AchievementCreateInput",
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Achievement created",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ achievement: AchievementSchema })
          ).openapi("AchievementSuccessResponse"),
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

// PATCH /achievements/:achievementId
export const updateAchievementRoute = createRoute({
  method: "patch",
  path: "/{achievementId}",
  description: "Update an achievement",
  tags: ["Achievement"],
  request: {
    params: z.object({ achievementId: z.string() }).openapi({
      param: {
        name: "achievementId",
        in: "path",
      },
      example: {
        achievementId: "1",
      },
    }),
    body: {
      content: {
        "application/json": {
          schema: AchievementUpdateInputSchema.openapi({
            type: "object",
            title: "AchievementUpdateInput",
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Achievement updated",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ achievement: AchievementSchema })
          ).openapi("AchievementSuccessResponse"),
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    404: {
      description: "Achievement not found",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

// DELETE /achievements/:achievementId
export const deleteAchievementRoute = createRoute({
  method: "delete",
  path: "/{achievementId}",
  description: "Delete an achievement",
  tags: ["Achievement"],
  request: {
    params: z.object({ achievementId: z.string() }).openapi({
      param: {
        name: "achievementId",
        in: "path",
      },
      example: {
        achievementId: "1",
      },
    }),
  },
  responses: {
    200: {
      description: "Achievement deleted",
      content: {
        "application/json": {
          schema: SuccessResponseSchema().openapi({
            type: "object",
            title: "AchievementDeleteSuccessResponse",
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    404: {
      description: "Achievement not found",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

export type GetAchievementsRoute = typeof getUserAchievementsRoute;
export type CreateAchievementRoute = typeof createAchievementRoute;
export type UpdateAchievementRoute = typeof updateAchievementRoute;
export type DeleteAchievementRoute = typeof deleteAchievementRoute;
