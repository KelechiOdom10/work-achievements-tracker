import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthContext } from "./context";
import { authClient } from "./lib/auth-client";
import { queryClient } from "./lib/query-client";
import { router } from "./lib/router";

export const App = () => {
  const { data } = authClient.useSession();

  const isAuthenticated = {
    isAuthenticated: !!data,
    user: data?.user ?? null,
    session: data?.session ?? null,
  } satisfies AuthContext;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      themes={["light", "dark"]}
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider
            router={router}
            context={{
              queryClient,
              auth: isAuthenticated || undefined,
            }}
          />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
