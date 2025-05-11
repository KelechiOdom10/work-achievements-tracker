import { z } from "@hono/zod-openapi";

export const SuccessResponseSchema = <T extends z.ZodTypeAny = z.ZodVoid>(
  dataSchema: T
) =>
  z
    .object({
      success: z.literal(true),
      message: z.string(),
      data: dataSchema,
    })
    .openapi("SuccessResponse");
export type SuccessResponse<T extends z.ZodTypeAny = z.ZodVoid> = z.infer<
  ReturnType<typeof SuccessResponseSchema<T>>
>;

export const ErrorResponseSchema = z
  .object({
    success: z.literal(false),
    message: z.string(),
    code: z.string(),
    isFormError: z.boolean().optional(),
  })
  .openapi("ErrorResponse");
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
