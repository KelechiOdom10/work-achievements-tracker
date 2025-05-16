import { RouterProvider } from "@tanstack/react-router";

import { type AuthContext } from "./context";
import { authClient } from "./lib/auth-client";
import { queryClient } from "./lib/query-client";
import { router } from "./lib/router";

export const App = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) return null;

  const isAuthenticated = {
    isAuthenticated: !!data,
    user: data?.user ?? null,
    session: data?.session ?? null,
  } satisfies AuthContext;

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        auth: isAuthenticated || undefined,
      }}
    />
  );
};
