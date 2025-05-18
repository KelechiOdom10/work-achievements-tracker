import { v2 as cloudinary, type UploadApiOptions } from "cloudinary";

import env from "~/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

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
 * @param buffer The file buffer to upload
 * @param options Upload options
 * @returns The upload result
 */
export const uploadToCloudinary = async (
  buffer: Buffer,
  options: UploadApiOptions & { upload_preset: string }
) => {
  const uploadOptions: UploadApiOptions = {
    folder: options.folder,
    public_id: options.public_id,
    resource_type: options.resource_type || "auto",
    upload_preset: options.upload_preset,
    tags: options.tags,
    overwrite: options.overwrite ?? false,
    invalidate: options.invalidate ?? true,
  };

  return new Promise<CloudinaryUploadResponse>((resolve, reject) => {
    // Using upload_stream which is ideal for buffer uploads
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        if (!result)
          return reject(new Error("Upload failed: No result returned"));
        resolve(result);
      }
    );

    // Handle potential stream errors
    uploadStream.on("error", (error) => {
      console.error("Stream error during upload:", error);
      reject(error);
    });

    // Pipe the buffer to the upload stream
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
