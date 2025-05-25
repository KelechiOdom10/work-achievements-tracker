import { prisma } from "~/db";
import type { AppRouteHandler } from "~/types";

import {
  type CreateCompanyRoute,
  type DeleteCompanyRoute,
  type GetActiveCompanyRoute,
  type GetCompaniesRoute,
  type GetCompanyDashboardRoute,
  type GetCompanyRoute,
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

export const getCompanyHandler: AppRouteHandler<GetCompanyRoute> = async (
  c
) => {
  const user = c.var.user;
  const { companySlug } = c.req.valid("param");

  try {
    const company = await prisma.company.findFirst({
      where: {
        slug: companySlug,
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

    return c.json(
      {
        success: true,
        message: "Company found",
        data: { company },
      },
      200
    );
  } catch {
    return c.json(
      {
        success: false,
        message: "Failed to fetch company",
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
    if (body.slug) {
      const existingCompany = await prisma.company.findFirst({
        where: {
          userId: user?.id,
          slug: body.slug,
        },
      });

      if (existingCompany) {
        return c.json(
          {
            success: false,
            message:
              "You already have a company with this handle. Please choose a different one.",
            code: "COMPANY_SLUG_EXISTS",
            isFormError: true,
          },
          400
        );
      }
    }

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
  } catch (error) {
    console.error("Error creating company:", error);
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

export const getCompanyDashboardHandler: AppRouteHandler<
  GetCompanyDashboardRoute
> = async (c) => {
  const user = c.var.user;
  const { companySlug } = c.req.valid("param");

  try {
    // Get company
    const company = await prisma.company.findFirst({
      where: {
        slug: companySlug,
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

    // Get achievements for the company
    const achievements = await prisma.achievement.findMany({
      where: {
        companyId: company.id,
        userId: user?.id,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Get goals for the company
    const goals = await prisma.goal.findMany({
      where: {
        companyId: company.id,
        userId: user?.id,
      },
      include: {
        achievements: true,
      },
    });

    // Calculate total achievements
    const totalAchievements = achievements.length;

    // Calculate days tracked (days since first achievement or company creation)
    const firstAchievementDate = achievements.length > 0
      ? new Date(Math.min(...achievements.map(a => new Date(a.achievedAt).getTime())))
      : new Date(company.createdAt);
    const daysTracked = Math.ceil(
      (new Date().getTime() - firstAchievementDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate average achievements per week
    const weeksTracked = daysTracked / 7;
    const avgAchievementsPerWeek = weeksTracked > 0
      ? parseFloat((totalAchievements / weeksTracked).toFixed(1))
      : 0;

    // Calculate achievement categories
    const tagCounts = new Map();
    achievements.forEach(achievement => {
      achievement.tags.forEach(tagRel => {
        const tagName = tagRel.tag.name;
        tagCounts.set(tagName, (tagCounts.get(tagName) || 0) + 1);
      });
    });
    
    const achievementCategories = Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 categories

    // Calculate upcoming milestones (using goals as milestones)
    const today = new Date();
    const upcomingMilestones = goals
      .filter(goal => goal.updatedAt > today) // Only future goals
      .map(goal => {
        const daysRemaining = Math.ceil(
          (new Date(goal.updatedAt).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        return {
          id: goal.id,
          title: goal.title,
          daysRemaining,
        };
      })
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 3); // Top 3 upcoming milestones

    // Calculate goal progress
    const goalProgress = goals.map(goal => {
      // Simple calculation: achievements count / target (assuming 10 achievements = 100%)
      const targetAchievements = 10;
      const achievementsCount = goal.achievements.length;
      const progress = Math.min(100, Math.round((achievementsCount / targetAchievements) * 100));
      
      return {
        id: goal.id,
        title: goal.title,
        category: goal.description?.split(' ')[0] || undefined, // Use first word of description as category
        progress,
        achievementsCount,
        targetDate: goal.updatedAt.toISOString(),
      };
    });

    const dashboardData = {
      totalAchievements,
      daysTracked,
      avgAchievementsPerWeek,
      achievementCategories,
      upcomingMilestones,
      goalProgress,
    };

    return c.json(
      {
        success: true,
        message: "Dashboard data fetched",
        data: { dashboardData },
      },
      200
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
        code: "DASHBOARD_FETCH_ERROR",
      },
      500
    );
  }
};

export const getUserActiveCompanyHandler: AppRouteHandler<
  GetActiveCompanyRoute
> = async (c) => {
  const user = c.var.user;
  const sessionId = c.var.session?.id;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

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
