import { Link, useLocation, useParams } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { History, House } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
import { authClient } from "@/lib/auth-client";

import { CompanySwitcher } from "./CompanySwitcher";
import { NavUser } from "./NavUser";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.matchMedia("(min-width: 1100px)").matches
  );

  useEffect(() => {
    const roomyLayout = window.matchMedia("(min-width: 1100px)");
    const updateForWidth = (event: MediaQueryListEvent) =>
      setSidebarOpen(event.matches);
    roomyLayout.addEventListener("change", updateForWidth);
    return () => roomyLayout.removeEventListener("change", updateForWidth);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <AppShell>{children}</AppShell>
      </SidebarProvider>
    </MotionConfig>
  );
};

function AppShell({ children }: AppLayoutProps) {
  const { companySlug } = useParams({ strict: false });
  const { data: session } = authClient.useSession();
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      mainRef.current?.focus();
    }
  }, [location.pathname]);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: House,
      path: `/app/companies/${companySlug}`,
      activePath: `/app/companies/${companySlug}`,
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: History,
      path: `/app/companies/${companySlug}/timeline`,
      activePath: `/app/companies/${companySlug}/timeline`,
    },
  ];

  return (
    <div className="flex min-h-svh w-full font-sans">
      <a
        href="#app-content"
        className="sr-only fixed left-3 top-3 z-50 rounded-md bg-background px-3 py-2 text-foreground focus:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        Skip to content
      </a>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <CompanySwitcher />
        </SidebarHeader>
        <SidebarContent>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={item.activePath === location.pathname}
              >
                <Link
                  to={item.path}
                  onClick={() => {
                    if (isMobile) setOpenMobile(false);
                  }}
                >
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
              key={session.user.id}
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
        id="app-content"
        ref={mainRef}
        tabIndex={-1}
        className="min-w-0 flex-1 bg-background px-4 pb-10 pt-4 outline-none sm:px-6 md:m-3 md:rounded-lg md:border lg:px-8"
      >
        <SidebarTrigger className="-ml-2" />
        {children}
      </main>
    </div>
  );
}
