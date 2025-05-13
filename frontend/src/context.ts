import type { QueryClient } from "@tanstack/react-query";

import type { AuthSession, AuthUser } from "./lib/auth-client";

export type AuthContext = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  session: AuthSession | null;
};

export type RouterContext = {
  queryClient: QueryClient;
  auth: AuthContext | undefined;
};
