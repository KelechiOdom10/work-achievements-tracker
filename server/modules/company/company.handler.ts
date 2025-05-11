import { prisma } from "~/db";
import type { AppRouteHandler } from "~/types";

import {
  type CreateCompanyRoute,
  type DeleteCompanyRoute,
  type GetCompaniesRoute,
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
