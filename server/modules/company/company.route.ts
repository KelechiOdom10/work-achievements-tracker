import { createRoute, z } from "@hono/zod-openapi";

import { ErrorResponseSchema, SuccessResponseSchema } from "~/shared/types";
import { requireAuth, requireOwnership } from "~/middlewares";

import {
  CompanyCreateInputSchema,
  CompanyOrderByWithRelationInputSchema,
  CompanySchema,
  CompanyUpdateInputSchema,
  CompanyWhereInputSchema,
} from "../../../prisma/generated/zod";

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
          schema: CompanyCreateInputSchema.openapi({
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

export type GetCompaniesRoute = typeof getUserCompaniesRoute;
export type CreateCompanyRoute = typeof createCompanyRoute;
export type UpdateCompanyRoute = typeof updateCompanyRoute;
export type DeleteCompanyRoute = typeof deleteCompanyRoute;
