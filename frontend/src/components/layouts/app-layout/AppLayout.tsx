import {
  BarChart,
  Briefcase,
  Calendar,
  ChevronDown,
  Milestone,
  Target,
  Trophy,
} from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { NavUser } from "./NavUser";

const CompanySwitcher: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full text-left justify-between px-2 py-2",
                  isCollapsed && "justify-center -ml-2.5"
                )}
              >
                <Briefcase className="h-5 w-5" />
                {!isCollapsed && (
                  <>
                    <span className="flex-grow ml-2">Current Company</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Current Company</TooltipContent>
          )}
        </Tooltip>
        <DropdownMenuContent>
          <DropdownMenuItem>Company A</DropdownMenuItem>
          <DropdownMenuItem>Company B</DropdownMenuItem>
          <DropdownMenuItem>Add New Company</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

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
