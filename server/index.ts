import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

import { type ErrorResponse } from "~/shared/types";

import type { AuthType } from "./lib/auth";
import auth from "./modules/auth";

const app = new Hono<{ Bindings: AuthType }>();

const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errorResponse =
      err.res ??
      c.json<ErrorResponse>(
        {
          // Whether the response is a success or not
          success: false,
          // A message about the error
          message: err.message,
          // The error status code
          code: String(err.status),
          // Whether the error is a form error or not
          isFormError:
            // Check if the error object exists and has a formErrors property
            // If it does, check if the value of that property is true
            err.cause &&
            typeof err.cause === "object" &&
            "formErrors" in err.cause
              ? err.cause.formErrors === true
              : false,
        },
        err.status
      );

    return errorResponse;
  }

  if (err instanceof ZodError) {
    return c.json<ErrorResponse>(
      {
        success: false,
        code: "VALIDATION_ERROR",
        message: err.message,
        isFormError: true,
      },
      400
    );
  }

  return c.json<ErrorResponse>(
    {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (err.stack ?? err.message),
    },
    500
  );
});

export default app;
