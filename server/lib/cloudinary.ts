import { v2 as cloudinary, type UploadApiOptions } from "cloudinary";

import env from "~/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
  // Enable unsigned uploads with a default preset
  upload_preset: "ml_default", // This should match a preset you've created in your Cloudinary settings
});

// Define the response type based on Cloudinary's API
type CloudinaryUploadResponse = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
};

/**
 * Upload a file to Cloudinary
 * @param file The file buffer to upload
 * @param options Upload options
 * @returns The upload result
 */
export const uploadToCloudinary = async (
  buffer: Buffer,
  options: UploadApiOptions
) => {
  return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.public_id,
        resource_type: options.resource_type || "image",
        upload_preset: options.upload_preset,
        tags: options.tags,
        overwrite: options.overwrite,
        invalidate: options.invalidate,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Move a file from one location to another in Cloudinary
 * @param fromPublicId The source public_id
 * @param toPublicId The destination public_id
 * @returns The rename result
 */
export const moveCloudinaryFile = async (
  fromPublicId: string,
  toPublicId: string
) => {
  return cloudinary.uploader.rename(fromPublicId, toPublicId);
};

/**
 * Delete a file from Cloudinary
 * @param publicId The public_id of the file to delete
 * @returns The deletion result
 */
export const deleteFromCloudinary = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
