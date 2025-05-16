import { prisma } from "~/db";
import type { AppRouteHandler } from "~/types";

import {
  type CreateCompanyRoute,
  type DeleteCompanyRoute,
  type GetActiveCompanyRoute,
  type GetCompaniesRoute,
  type SetActiveCompanyRoute,
  type UpdateCompanyRoute,
} from "./company.route";

export const getUserCompaniesHandler: AppRouteHandler<
  GetCompaniesRoute
> = async (c) => {
  const user = c.var.user;
  const filters = c.req.valid("query");

  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: user?.id,
        ...filters.where,
      },
      orderBy: { ...filters.orderBy },
    });

    return c.json(
      {
        success: true,
        message: "Fetched companies",
        data: { companies },
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to fetch companies",
        code: "COMPANY_FETCH_ERROR",
      },
      500
    );
  }
};

export const createCompanyHandler: AppRouteHandler<CreateCompanyRoute> = async (
  c
) => {
  const user = c.var.user;
  const body = c.req.valid("json");

  try {
    const company = await prisma.company.create({
      data: {
        ...body,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return c.json(
      {
        success: true,
        message: "Company created",
        data: { company },
      },
      201
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to create company",
        code: "COMPANY_CREATE_ERROR",
      },
      500
    );
  }
};

export const updateCompanyHandler: AppRouteHandler<UpdateCompanyRoute> = async (
  c
) => {
  const user = c.var.user;
  const body = c.req.valid("json");
  const { companyId } = c.req.valid("param");

  try {
    const company = await prisma.company.update({
      where: {
        id: companyId,
        userId: user?.id,
      },
      data: body,
    });

    return c.json(
      {
        success: true,
        message: "Company updated",
        data: { company },
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to update company",
        code: "COMPANY_UPDATE_ERROR",
      },
      500
    );
  }
};

export const deleteCompanyHandler: AppRouteHandler<DeleteCompanyRoute> = async (
  c
) => {
  const user = c.var.user;
  const { companyId } = c.req.valid("param");

  try {
    await prisma.company.delete({
      where: {
        id: companyId,
        userId: user?.id,
      },
    });

    return c.json(
      {
        success: true,
        message: "Company deleted",
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to delete company",
        code: "COMPANY_DELETE_ERROR",
      },
      500
    );
  }
};

export const getUserActiveCompanyHandler: AppRouteHandler<
  GetActiveCompanyRoute
> = async (c) => {
  const user = c.var.user;
  const session = c.var.session;

  try {
    // Check if user has an active company in session
    let company = null;
    let hasCompanies = false;

    // Get all user companies
    const companies = await prisma.company.findMany({
      where: { userId: user?.id },
    });

    hasCompanies = companies.length > 0;

    // If user has an active company in session, fetch it
    if (session?.activeCompanyId) {
      company = await prisma.company.findFirst({
        where: {
          id: session.activeCompanyId,
          userId: user?.id,
        },
      });
    }

    // If no active company but user has companies, use the first one
    if (!company && hasCompanies) {
      company = companies[0];

      // Update session with this company
      if (session) {
        await prisma.session.update({
          where: { id: session.id },
          data: { activeCompanyId: company?.id },
        });
      }
    }

    return c.json(
      {
        success: true,
        message: "Fetched active company",
        data: { company: company ?? null, hasCompanies },
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to fetch active company",
        code: "COMPANY_FETCH_ERROR",
      },
      500
    );
  }
};

export const setActiveCompanyHandler: AppRouteHandler<
  SetActiveCompanyRoute
> = async (c) => {
  const user = c.var.user;
  const session = c.var.session;
  const { companyId } = c.req.valid("param");

  try {
    // Verify company belongs to user
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId: user?.id,
      },
    });

    if (!company) {
      return c.json(
        {
          success: false,
          message: "Company not found",
          code: "COMPANY_NOT_FOUND",
        },
        404
      );
    }

    if (session) {
      await prisma.session.update({
        where: { id: session.id },
        data: { activeCompanyId: companyId },
      });
    }

    return c.json(
      {
        success: true,
        message: "Active company updated",
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to update active company",
        code: "COMPANY_UPDATE_ERROR",
      },
      500
    );
  }
};
