import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { App } from "./app";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { queryClient } from "./lib/query-client";
import { router } from "./lib/router";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    email?: string;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
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
            <App />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
