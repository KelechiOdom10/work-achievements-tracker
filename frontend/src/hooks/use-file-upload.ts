import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";

import { useUpdateCompanyLogo } from "./use-companies";

type UploadResponse =
  | {
      fileId: string;
      tempUrl: string;
    }
  | undefined;

type FinalizeUploadParams = {
  fileId: string;
  entityType: "company" | "user" | "achievement";
  entityId: string;
};

export function useFileUpload() {
  // Upload a temporary file
  const uploadFile = useMutation<UploadResponse, Error, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await apiClient.uploads.temp.$post({
        form: {
          file: formData.get("file") as File,
          upload_preset: formData.get("upload_preset") as string,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            "We couldn't upload your file. Please try again or continue without it for now."
        );
      }

      const data = await response.json();
      return data.data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Finalize a file upload
  const { mutate: updateCompanyLogo } = useUpdateCompanyLogo();

  // Finalize a temporary file upload
  const finalizeUpload = useMutation<
    { url: string } | undefined,
    Error,
    FinalizeUploadParams
  >({
    mutationFn: async ({ fileId, entityType, entityId }) => {
      const response = await apiClient.uploads.finalize.$post({
        json: { fileId, entityType, entityId },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to finalize file upload");
      }

      const { data } = await response.json();

      // Update company with the final logo URL
      if (entityType === "company" && data?.url) {
        updateCompanyLogo({
          companyId: entityId,
          logo: data.url,
        });
      }

      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to finalize file upload");
    },
  });

  // Delete a temporary file
  const deleteUpload = useMutation<void, Error, string>({
    mutationFn: async (fileId) => {
      const response = await apiClient.uploads.temp[":fileId"].$delete({
        param: { fileId },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to remove file. Please try again."
        );
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    uploadFile,
    finalizeUpload,
    deleteUpload,
  };
}

export function useLogoUpload() {
  const { uploadFile, finalizeUpload } = useFileUpload();

  const uploadLogo = async (file: File) => {
    try {
      const result = await uploadFile.mutateAsync(file);
      return result;
    } catch (error) {
      console.error("Logo upload failed:", error);
      throw error;
    }
  };

  const finalizeLogo = async (
    fileId: string,
    companyId: string
  ): Promise<string | null> => {
    try {
      const result = await finalizeUpload.mutateAsync({
        fileId,
        entityType: "company",
        entityId: companyId,
      });
      return result?.url || null;
    } catch (error) {
      console.error("Logo finalization failed:", error);
      return null;
    }
  };

  return {
    uploadLogo,
    finalizeLogo,
    isLoading: uploadFile.isPending || finalizeUpload.isPending,
    error: uploadFile.error || finalizeUpload.error,
  };
}
