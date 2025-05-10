import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "~/types";

import packageJSON from "../../package.json";

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc31("/openapi.json", {
    openapi: "3.1.0",
    info: {
      version: packageJSON.version,
      title: "Work Achievements Tracker API ",
      description: "Work Achievements Tracker API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      url: "/openapi.json",
    })
  );
}
