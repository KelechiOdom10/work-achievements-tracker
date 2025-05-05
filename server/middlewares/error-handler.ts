import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

import { type ErrorResponse } from "~/shared/types";

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    const errorResponse = c.json<ErrorResponse>(
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
};
