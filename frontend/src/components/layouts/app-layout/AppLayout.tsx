import { Link, useLocation, useParams } from "@tanstack/react-router";
import { BarChart, Calendar, Milestone, Target, Trophy } from "lucide-react";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { CompanySwitcher } from "./CompanySwitcher";
import { NavUser } from "./NavUser";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { companySlug } = useParams({ strict: false });
  const { data: session } = authClient.useSession();
  const location = useLocation();
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart,
      path: `/app/companies/${companySlug}`,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
      path: `/app/companies/${companySlug}/achievements`,
    },
    {
      id: "goals",
      label: "Goals",
      icon: Target,
      path: `/app/companies/${companySlug}/goals`,
    },
    {
      id: "milestones",
      label: "Milestones",
      icon: Milestone,
      path: `/app/companies/${companySlug}/milestones`,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      path: `/app/companies/${companySlug}/calendar`,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen font-sans w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <CompanySwitcher />
          </SidebarHeader>
          <SidebarContent>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={item.path === location.pathname}
                >
                  <Link to={item.path}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarContent>
          <SidebarFooter className="list-none">
            {session && (
              <NavUser
                user={{
                  name: session.user.name,
                  email: session.user.email,
                  avatar: session.user.image ?? "",
                }}
              />
            )}
          </SidebarFooter>
        </Sidebar>
        <main
          className={cn(
            "border-none flex-grow md:m-3 md:border w-full rounded-lg shadow-md bg-background p-4"
          )}
        >
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
