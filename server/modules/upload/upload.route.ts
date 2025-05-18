import { createRoute, z } from "@hono/zod-openapi";

import { ErrorResponseSchema, SuccessResponseSchema } from "~/shared/types";
import { requireAuth } from "~/middlewares";

// File upload constraints
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

// File schema for validation
export const FileSchema = z.object({
  filename: z.string(),
  mimetype: z.string().refine((type) => ALLOWED_FILE_TYPES.includes(type), {
    message:
      "File type not supported. Please upload an image (JPEG, PNG, GIF, WebP, or SVG).",
  }),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
  data: z.any(), // This will contain the actual file data
  encoding: z.string(),
  truncated: z.boolean(),
  done: z.boolean(),
});

export type UploadTempFileRouteType = typeof uploadTempFileRoute;
export type FinalizeUploadRouteType = typeof finalizeUploadRoute;
export type DeleteUploadRouteType = typeof deleteUploadRoute;

const TempUploadResponseSchema = z
  .object({
    tempUrl: z.string(),
    fileId: z.string(),
  })
  .openapi({
    title: "TempUploadResponse",
    description: "Schema for temporary upload response",
    example: {
      tempUrl: "https://example.com/temp-file",
      fileId: "1234567890",
    },
  });

const FinalizeUploadResponseSchema = z
  .object({
    url: z.string(),
  })
  .openapi({
    title: "FinalizeUploadResponse",
    description: "Schema for finalizing upload response",
    example: {
      url: "https://example.com/file",
    },
  });

export const uploadTempFileRoute = createRoute({
  method: "post",
  path: "/temp",
  description: "Upload a file temporarily",
  tags: ["Upload"],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.instanceof(File),
            upload_preset: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "File uploaded temporarily",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(TempUploadResponseSchema).openapi(
            "TempUploadSuccessResponse"
          ),
        },
      },
    },
    400: {
      description: "Validation error or invalid file",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          examples: {
            "Invalid file type": {
              value: {
                error: "File type not supported. Please upload an image.",
              },
            },
            "File too large": {
              value: { error: "File size must be less than 5MB" },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

export const finalizeUploadRoute = createRoute({
  method: "post",
  path: "/finalize",
  description: "Finalize a temporary file upload",
  tags: ["Upload"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fileId: z.string().min(1, "File ID is required"),
            entityType: z.enum(["company", "user", "achievement"], {
              required_error: "Entity type is required",
              invalid_type_error: "Invalid entity type",
            }),
            entityId: z.string().min(1, "Entity ID is required"),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "File upload finalized",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(FinalizeUploadResponseSchema).openapi(
            "FinalizeUploadSuccessResponse"
          ),
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          examples: {
            "Missing fields": {
              value: {
                error: "Missing required fields: fileId, entityType, entityId",
              },
            },
            "Invalid entity type": {
              value: {
                error:
                  "Invalid entity type. Must be one of: company, user, achievement",
              },
            },
            "Invalid file ID": {
              value: { error: "Invalid file ID format" },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    404: {
      description: "Temporary file not found",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

export const deleteUploadRoute = createRoute({
  method: "delete",
  path: "/temp/:fileId",
  description: "Delete a temporary file upload",
  tags: ["Upload"],
  request: {
    params: z.object({
      fileId: z.string(),
    }),
  },
  responses: {
    200: {
      description: "File deleted successfully",
      content: {
        "application/json": {
          schema: SuccessResponseSchema(z.object({})).openapi(
            "DeleteUploadSuccessResponse"
          ),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    404: {
      description: "Temporary file not found",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": { schema: ErrorResponseSchema },
      },
    },
  },
  middleware: [requireAuth],
});

export type UploadTempFileRoute = typeof uploadTempFileRoute;
export type FinalizeUploadRoute = typeof finalizeUploadRoute;
export type DeleteUploadRoute = typeof deleteUploadRoute;
