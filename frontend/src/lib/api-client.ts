import type { AppType } from "~/index";
import { hc } from "hono/client";

export const apiClient = hc<AppType>("/api");
