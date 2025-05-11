import { prisma } from "~/db";
import type { AppRouteHandler } from "~/types";

import {
  type CreateAchievementRoute,
  type DeleteAchievementRoute,
  type GetAchievementsRoute,
  type UpdateAchievementRoute,
} from "./achievement.route";

// GET /achievements
export const getUserAchievementsHandler: AppRouteHandler<
  GetAchievementsRoute
> = async (c) => {
  const user = c.var.user;
  const filters = c.req.valid("query");

  try {
    const achievements = await prisma.achievement.findMany({
      where: {
        userId: user?.id,
        ...filters.where,
      },
      orderBy: { ...filters.orderBy },
    });

    return c.json(
      {
        success: true,
        message: "Fetched achievements",
        data: { achievements },
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to fetch achievements",
        code: "ACHIEVEMENT_FETCH_ERROR",
      },
      500
    );
  }
};

// POST /achievements
export const createAchievementHandler: AppRouteHandler<
  CreateAchievementRoute
> = async (c) => {
  const body = c.req.valid("json");

  try {
    const achievement = await prisma.achievement.create({
      data: {
        ...body,
        user: {
          connect: {
            id: c.var.user?.id,
          },
        },
      },
    });
    return c.json(
      {
        success: true,
        message: "Achievement created",
        data: { achievement },
      },
      201
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to create achievement",
        code: "ACHIEVEMENT_CREATE_ERROR",
      },
      500
    );
  }
};

// PATCH /achievements/:achievementId
export const updateAchievementHandler: AppRouteHandler<
  UpdateAchievementRoute
> = async (c) => {
  const { achievementId } = c.req.valid("param");
  const body = c.req.valid("json");

  try {
    const achievement = await prisma.achievement.update({
      where: { id: achievementId, userId: c.var.user?.id },
      data: body,
    });

    if (!achievement) {
      return c.json(
        {
          success: false,
          message: "Achievement not found",
          code: "ACHIEVEMENT_NOT_FOUND",
          isFormError: false,
        },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Achievement updated",
        data: { achievement },
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to update achievement",
        code: "ACHIEVEMENT_UPDATE_ERROR",
      },
      500
    );
  }
};

// DELETE /achievements/:achievementId
export const deleteAchievementHandler: AppRouteHandler<
  DeleteAchievementRoute
> = async (c) => {
  const { achievementId } = c.req.valid("param");

  const achievement = await prisma.achievement.findUnique({
    where: { id: achievementId },
  });

  if (!achievement) {
    return c.json(
      {
        success: false,
        message: "Achievement not found",
        code: "ACHIEVEMENT_NOT_FOUND",
        isFormError: false,
      },
      404
    );
  }

  try {
    await prisma.achievement.delete({ where: { id: achievementId } });

    return c.json(
      {
        success: true,
        message: "Achievement deleted",
        data: undefined,
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to delete achievement",
        code: "ACHIEVEMENT_DELETE_ERROR",
        isFormError: false,
      },
      500
    );
  }
};
