import { z } from "zod";

export const SuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema?: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    ...(dataSchema ? { data: dataSchema } : {}),
  });

export type SuccessResponse<T extends z.ZodTypeAny = z.ZodVoid> = z.infer<
  ReturnType<typeof SuccessResponseSchema<T>>
>;

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  code: z.string(),
  isFormError: z.boolean().optional(),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
