import { BarChart, Calendar, Milestone, Target, Trophy } from "lucide-react";
import React, { useState } from "react";

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
  const [activeItem, setActiveItem] = useState("dashboard");
  const { data: session } = authClient.useSession();

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen font-sans w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <CompanySwitcher />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleItemClick("dashboard")}
                isActive={activeItem === "dashboard"}
              >
                <BarChart className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleItemClick("achievements")}
                isActive={activeItem === "achievements"}
              >
                <Trophy className="h-4 w-4" />
                <span>Achievements</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleItemClick("goals")}
                isActive={activeItem === "goals"}
              >
                <Target className="h-4 w-4" />
                <span>Goals</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleItemClick("milestones")}
                isActive={activeItem === "milestones"}
              >
                <Milestone className="h-4 w-4" />
                <span>Milestones</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleItemClick("calendar")}
                isActive={activeItem === "calendar"}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
