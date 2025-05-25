import { createFileRoute, notFound } from "@tanstack/react-router";
import { Award, BarChart, Calendar, Plus } from "lucide-react";

import { CompanyNotFound } from "@/components/company/CompanyNotFound";
import { CategoryBar } from "@/components/dashboard/CategoryBar";
import { EmptyDashboardState } from "@/components/dashboard/EmptyDashboardState";
import { GoalItem } from "@/components/dashboard/GoalItem";
import { MilestoneItem } from "@/components/dashboard/MilestoneItem";
import { StatCard } from "@/components/dashboard/Statcard";
import { AppLayout } from "@/components/layouts/app-layout/AppLayout";
import { GuestLayout } from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCompanyBySlugOptions,
  getCompanyDashboardOptions,
} from "@/hooks/use-companies";

export const Route = createFileRoute("/app/companies/$companySlug")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { companySlug } = params;

    const companyData = await context.queryClient.ensureQueryData(
      getCompanyBySlugOptions(companySlug)
    );

    if (!companyData) {
      throw notFound();
    }

    const dashboardData = await context.queryClient.ensureQueryData(
      getCompanyDashboardOptions(companySlug)
    );

    return {
      companyData,
      dashboardData,
    };
  },
  notFoundComponent: () => (
    <GuestLayout showNav navProps={{ logoOnly: true }} showFooter={false}>
      <CompanyNotFound />
    </GuestLayout>
  ),
});

function RouteComponent() {
  const { dashboardData } = Route.useLoaderData();

  // Calculate total achievements for category percentages
  const totalCategoryCount =
    dashboardData?.achievementCategories?.reduce(
      (sum, category) => sum + category.count,
      0
    ) || 1; // Avoid division by zero

  // Check if user has any data
  const hasNoData =
    !dashboardData?.totalAchievements &&
    !dashboardData?.achievementCategories?.length &&
    !dashboardData?.upcomingMilestones?.length &&
    !dashboardData?.goalProgress?.length;

  return (
    <AppLayout>
      <div className="container py-1">
        {!hasNoData && (
          <h1 className="text-2xl font-bold mb-6">Achievement Dashboard</h1>
        )}

        {hasNoData ? (
          <EmptyDashboardState />
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatCard
                icon={<Award />}
                title="Total Achievements"
                value={dashboardData?.totalAchievements || 0}
                subtitle={
                  dashboardData?.totalAchievements > 0
                    ? `+2 in the last week`
                    : undefined
                }
              />

              <StatCard
                icon={<Calendar />}
                title="Days Tracked"
                value={dashboardData?.daysTracked || 0}
                subtitle="Since you started"
              />

              <StatCard
                icon={<BarChart />}
                title="Avg. Achievements/Week"
                value={dashboardData?.avgAchievementsPerWeek || 0}
                subtitle="Consistent progress"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Achievement Categories */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Achievement Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData?.achievementCategories?.map((category) => (
                    <CategoryBar
                      key={category.name}
                      name={category.name}
                      count={category.count}
                      total={totalCategoryCount}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Milestones */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Upcoming Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData?.upcomingMilestones?.map((milestone) => (
                    <MilestoneItem
                      key={milestone.id}
                      days={
                        milestone.daysRemaining < 30
                          ? 30
                          : milestone.daysRemaining < 60
                            ? 60
                            : 90
                      }
                      title={milestone.title}
                      daysRemaining={milestone.daysRemaining}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Goal Progress */}
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Goal Progress
                </CardTitle>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Plus className="h-3 w-3" />
                  <span>View All Goals</span>
                </Button>
              </CardHeader>
              <CardContent>
                {dashboardData?.goalProgress?.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    title={goal.title}
                    category={goal.category}
                    progress={goal.progress}
                    achievements={goal.achievementsCount}
                    targetDate={goal.targetDate}
                  />
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered insights will be available once you've collected
                  more achievements. Continue adding your daily wins to unlock
                  personalized summaries and growth patterns.
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-md">
                  <h4 className="font-medium mb-2">Coming Soon:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">
                        Achievement pattern recognition
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">
                        Skill development tracking
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">
                        Personalized milestone summaries
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">
                        Growth opportunity suggestions
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
}
