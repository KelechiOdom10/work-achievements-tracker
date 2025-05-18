import type { UploadApiOptions } from "cloudinary";
import { nanoid } from "nanoid";

import { prisma } from "~/db";
import {
  deleteFromCloudinary,
  moveCloudinaryFile,
  uploadToCloudinary,
} from "~/lib/cloudinary";
import type { AppRouteHandler } from "~/types";

import {
  type DeleteUploadRouteType,
  type FinalizeUploadRouteType,
  type UploadTempFileRouteType,
} from "./upload.route";

// Database table for temporary uploads
interface TempUpload {
  fileId: string;
  publicId: string;
  url: string;
  userId: string;
  createdAt: Date;
}

// In-memory store for temporary uploads (in a real app, this would be in the database)
const tempUploads = new Map<string, TempUpload>();

export const uploadTempFileHandler: AppRouteHandler<
  UploadTempFileRouteType
> = async (c) => {
  const user = c.var.user;

  try {
    // Parse the multipart form data
    const { file, upload_preset } = await c.req.parseBody();

    console.log("upload_preset", upload_preset);
    console.log("file", file);

    if (!file || !(file instanceof File)) {
      return c.json(
        {
          success: false,
          message: "No file provided",
          code: "FILE_REQUIRED",
        },
        400
      );
    }

    // Validate file type (only allow images)
    if (!file.type.startsWith("image/")) {
      return c.json(
        {
          success: false,
          message: "Only image files are allowed",
          code: "INVALID_FILE_TYPE",
        },
        400
      );
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return c.json(
        {
          success: false,
          message: "File size exceeds the 5MB limit",
          code: "FILE_TOO_LARGE",
        },
        400
      );
    }

    // Generate a unique file ID
    const fileId = nanoid();

    // Read file data
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure upload_preset is always set and valid
    const preset =
      typeof upload_preset === "string" && upload_preset.trim() !== ""
        ? upload_preset.trim()
        : "ml_default";

    const uploadOptions = {
      folder: "temp",
      public_id: fileId,
      resource_type: "image" as const,
      upload_preset: preset,
      tags: ["temp", `user_${user?.id}`],
      overwrite: false,
      invalidate: true,
    } satisfies UploadApiOptions;

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, uploadOptions);

    // Store the temp upload info
    const tempUpload: TempUpload = {
      fileId,
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      userId: user?.id || "",
      createdAt: new Date(),
    };

    tempUploads.set(fileId, tempUpload);

    // Return the temporary URL and file ID
    return c.json(
      {
        success: true,
        message: "File uploaded temporarily",
        data: {
          tempUrl: uploadResult.secure_url,
          fileId,
        },
      },
      200
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return c.json(
      {
        success: false,
        message: "Failed to upload file",
        code: "UPLOAD_ERROR",
      },
      500
    );
  }
};

export const finalizeUploadHandler: AppRouteHandler<
  FinalizeUploadRouteType
> = async (c) => {
  const user = c.var.user;
  const { fileId, entityType, entityId } = c.req.valid("json");

  try {
    // Check if the temporary upload exists
    const tempUpload = tempUploads.get(fileId);

    if (!tempUpload) {
      return c.json(
        {
          success: false,
          message: "Temporary file not found",
          code: "TEMP_FILE_NOT_FOUND",
        },
        404
      );
    }

    // Check if the user owns this upload
    if (tempUpload.userId !== user?.id) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
          code: "UNAUTHORIZED",
        },
        401
      );
    }

    // Move the file from temporary to permanent storage in Cloudinary
    const newPublicId = `${entityType}/${entityId}/${fileId}`;
    const moveResult = await moveCloudinaryFile(
      tempUpload.publicId,
      newPublicId
    );

    // Update the entity with the new file URL
    if (entityType === "company") {
      await prisma.company.update({
        where: { id: entityId },
        data: { logo: moveResult.secure_url },
      });
    }

    // Remove the temporary upload from our store
    tempUploads.delete(fileId);

    return c.json(
      {
        success: true,
        message: "File upload finalized",
        data: {
          url: moveResult.secure_url,
        },
      },
      200
    );
  } catch (error) {
    console.error("Error finalizing upload:", error);
    return c.json(
      {
        success: false,
        message: "Failed to finalize upload",
        code: "FINALIZE_ERROR",
      },
      500
    );
  }
};

export const deleteUploadHandler: AppRouteHandler<
  DeleteUploadRouteType
> = async (c) => {
  const user = c.var.user;
  const { fileId } = c.req.valid("param");

  try {
    // Check if the temporary upload exists
    const tempUpload = tempUploads.get(fileId);

    if (!tempUpload) {
      return c.json(
        {
          success: false,
          message: "Temporary file not found",
          code: "TEMP_FILE_NOT_FOUND",
        },
        404
      );
    }

    // Check if the user owns this upload
    if (tempUpload.userId !== user?.id) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
          code: "UNAUTHORIZED",
        },
        401
      );
    }

    // Delete the file from Cloudinary
    await deleteFromCloudinary(tempUpload.publicId);

    // Remove the temporary upload from our store
    tempUploads.delete(fileId);

    return c.json(
      {
        success: true,
        message: "File deleted successfully",
        data: {},
      },
      200
    );
  } catch (error) {
    console.error("Error deleting upload:", error);
    return c.json(
      {
        success: false,
        message: "Failed to delete upload",
        code: "DELETE_ERROR",
      },
      500
    );
  }
};
