import type { MiddlewareHandler } from "hono";

import { type ErrorResponse } from "~/shared/types";
import { prisma } from "~/db";
import type { ModelName } from "~/types";

export function requireOwnership({
  model,
  idParam = "id",
  userIdField = "userId",
}: {
  model: ModelName;
  idParam: string;
  userIdField?: string;
}): MiddlewareHandler {
  return async (c, next) => {
    const user = c.get("user");
    const resourceId = c.req.param(idParam);

    if (!user || !resourceId) {
      return c.json<ErrorResponse>(
        {
          success: false,
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        },
        401
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resource = await (prisma[model] as any)?.findUnique({
      where: { id: resourceId },
      select: { [userIdField]: true },
    });

    if (!resource || resource[userIdField] !== user.id) {
      return c.json<ErrorResponse>(
        {
          success: false,
          code: "FORBIDDEN",
          message: "Forbidden",
        },
        403
      );
    }

    return next();
  };
}
