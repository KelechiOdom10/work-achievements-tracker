import { createRoute, z } from "@hono/zod-openapi";

import { ErrorResponseSchema, SuccessResponseSchema } from "~/shared/types";
import { requireAuth, requireOwnership } from "~/middlewares";

import {
  CompanyCreateWithoutUserInputSchema,
  CompanyOrderByWithRelationInputSchema,
  CompanySchema,
  CompanyUpdateInputSchema,
  CompanyWhereInputSchema,
} from "../../../prisma/generated/zod";

// Dashboard data schema
const DashboardDataSchema = z.object({
  totalAchievements: z.number(),
  daysTracked: z.number(),
  avgAchievementsPerWeek: z.number(),
  achievementCategories: z.array(
    z.object({
      name: z.string(),
      count: z.number(),
    })
  ),
  upcomingMilestones: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      daysRemaining: z.number(),
    })
  ),
  goalProgress: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      category: z.string().optional(),
      progress: z.number(),
      achievementsCount: z.number(),
      targetDate: z.string().optional(),
    })
  ),
});

const requireCompanyOwner = requireOwnership({
  model: "company",
  idParam: "companyId",
});

// GET /companies
export const getUserCompaniesRoute = createRoute({
  method: "get",
  path: "/",
  description: "Get all companies for a user",
  tags: ["Company"],
  request: {
    query: z
      .object({
        where: CompanyWhereInputSchema.optional().openapi({
          title: "CompanyWhereInput",
          type: "object",
          example: {
            id: "1",
          },
        }),
        orderBy: CompanyOrderByWithRelationInputSchema.optional().openapi({
          title: "CompanyOrderByWithRelationInput",
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
      description: "Companies list",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ companies: z.array(CompanySchema) })
          ).openapi("CompaniesSuccessResponse"),
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

// GET /companies/:companySlug/dashboard
export const getCompanyDashboardRoute = createRoute({
  method: "get",
  path: "/{companySlug}/dashboard",
  description: "Get dashboard data for a company",
  tags: ["Company"],
  request: {
    params: z.object({ companySlug: z.string() }).openapi({
      param: {
        name: "companySlug",
        in: "path",
      },
      example: {
        companySlug: "acme-inc",
      },
    }),
  },
  responses: {
    200: {
      description: "Dashboard data",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ dashboardData: DashboardDataSchema })
          ).openapi("DashboardDataSuccessResponse"),
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
      description: "Company not found",
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

// GET /companies/:companySlug
export const getCompanyRoute = createRoute({
  method: "get",
  path: "/{companySlug}",
  description: "Get a company by slug",
  tags: ["Company"],
  request: {
    params: z.object({ companySlug: z.string() }).openapi({
      param: {
        name: "companySlug",
        in: "path",
      },
      example: {
        companySlug: "1",
      },
    }),
  },
  responses: {
    200: {
      description: "Company found",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ company: CompanySchema })
          ).openapi("CompanySuccessResponse"),
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
      description: "Company not found",
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

// POST /companies
export const createCompanyRoute = createRoute({
  method: "post",
  path: "/",
  description: "Create a new company for a user",
  tags: ["Company"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CompanyCreateWithoutUserInputSchema.openapi({
            type: "object",
            title: "CompanyCreateInput",
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Company created",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ company: CompanySchema })
          ).openapi("CompanySuccessResponse"),
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

// PATCH /companies/:companyId
export const updateCompanyRoute = createRoute({
  method: "patch",
  path: "/{companyId}",
  description: "Update a company",
  tags: ["Company"],
  request: {
    params: z.object({ companyId: z.string() }).openapi({
      param: {
        name: "companyId",
        in: "path",
      },
      example: {
        companyId: "1",
      },
    }),
    body: {
      content: {
        "application/json": {
          schema: CompanyUpdateInputSchema.openapi({
            type: "object",
            title: "CompanyUpdateInput",
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Company updated",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({ company: CompanySchema })
          ).openapi("CompanyUpdateSuccessResponse"),
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
      description: "Company not found",
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
  middleware: [requireAuth, requireCompanyOwner],
});

// DELETE /companies/:companyId
export const deleteCompanyRoute = createRoute({
  method: "delete",
  path: "/{companyId}",
  description: "Delete a company",
  tags: ["Company"],
  request: {
    params: z.object({ companyId: z.string() }).openapi({
      param: {
        name: "companyId",
        in: "path",
      },
      example: {
        companyId: "1",
      },
    }),
  },
  responses: {
    200: {
      description: "Company deleted",
      content: {
        "application/json": {
          schema: SuccessResponseSchema().openapi({
            type: "object",
            title: "CompanyDeleteSuccessResponse",
            example: {
              success: true,
              message: "Company deleted",
            },
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
      description: "Company not found",
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
  middleware: [requireAuth, requireCompanyOwner],
});

// GET /companies/active
export const getUserActiveCompanyRoute = createRoute({
  method: "get",
  path: "/active",
  description: "Get user's active company or first company",
  tags: ["Company"],
  responses: {
    200: {
      description: "Active company",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(
            z.object({
              company: CompanySchema.nullable(),
              hasCompanies: z.boolean(),
            })
          ).openapi("ActiveCompanySuccessResponse"),
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

// POST /companies/active/{companyId}
export const setActiveCompanyRoute = createRoute({
  method: "post",
  path: "/active/{companyId}",
  description: "Set active company for user session",
  tags: ["Company"],
  request: {
    params: z.object({ companyId: z.string() }),
  },
  responses: {
    200: {
      description: "Active company updated",
      content: {
        "application/json": {
          schema: SuccessResponseSchema().openapi({
            type: "object",
            title: "SetActiveCompanySuccessResponse",
            example: {
              success: true,
              message: "Active company updated",
            },
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
      description: "Company not found",
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

export type GetCompaniesRoute = typeof getUserCompaniesRoute;
export type GetCompanyRoute = typeof getCompanyRoute;
export type CreateCompanyRoute = typeof createCompanyRoute;
export type UpdateCompanyRoute = typeof updateCompanyRoute;
export type DeleteCompanyRoute = typeof deleteCompanyRoute;
export type GetCompanyDashboardRoute = typeof getCompanyDashboardRoute;
export type GetActiveCompanyRoute = typeof getUserActiveCompanyRoute;
export type SetActiveCompanyRoute = typeof setActiveCompanyRoute;
