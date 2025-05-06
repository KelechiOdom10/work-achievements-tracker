import { createMiddleware } from "hono/factory";

import { type ErrorResponse } from "~/shared/types";
import { prisma } from "~/db";
import { auth } from "~/lib/auth";

export const requireAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

export const requireOrganizationAccess = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
      401
    );
  }

  const organizationId = c.req.param("organizationId");

  if (!organizationId) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Company ID is required",
      },
      400
    );
  }

  const hasAccess = await prisma.member.findFirst({
    where: {
      userId: session.user.id,
      organizationId,
    },
  });

  if (!hasAccess) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "You do not have access to this company",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

export const requireAdmin = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
      401
    );
  }

  const organizationId = c.req.param("organizationId");

  if (!organizationId) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Company ID is required",
      },
      400
    );
  }

  const hasAccess = await prisma.member.findFirst({
    where: {
      userId: session.user.id,
      organizationId,
      role: "admin",
    },
  });

  if (!hasAccess) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "You do not have access to this company",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
