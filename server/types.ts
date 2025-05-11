import {
  OpenAPIHono,
  type RouteConfig,
  type RouteHandler,
} from "@hono/zod-openapi";
import type { Schema } from "hono";

import type { PrismaClient } from "../prisma/generated/prisma/client";
import type { AuthType } from "./lib/auth";
import type { PinoLoggerType } from "./middlewares";

export interface AppBindings {
  Variables: AuthType["Variables"] & PinoLoggerType["Variables"];
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

type IgnorePrismaBuiltins<S extends string> = string extends S
  ? string
  : S extends ""
    ? S
    : S extends `$${string}`
      ? never
      : S;

export type ModelName = IgnorePrismaBuiltins<keyof PrismaClient & string>;
