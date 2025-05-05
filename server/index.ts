import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { type ErrorResponse } from "~/shared/types";

const app = new Hono();

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
          // The error message
          error: err.message,
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
        err.status,
      );

    return errorResponse;
  }

  return c.json<ErrorResponse>(
    {
      success: false,
      message: "Internal Server Error",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (err.stack ?? err.message),
    },
    500,
  );
});

export default app;
