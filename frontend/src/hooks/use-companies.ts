import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";

type CompanyFormValues = {
  name: string;
  slug: string;
  logo?: string;
};

export const companyKeys = {
  all: ["companies"] as const,
  active: () => [...companyKeys.all, "active"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (filters = {}) => [...companyKeys.lists(), { filters }] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
  bySlug: (slug: string) => [...companyKeys.all, "slug", slug] as const,
};

export function useCompanies(filters = {}) {
  return useQuery({
    queryKey: companyKeys.list(filters),
    queryFn: async () => {
      const response = await apiClient.companies.$get({ query: filters });
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      return response.json();
    },
  });
}

export function useCompany(id?: string) {
  return useQuery({
    queryKey: companyKeys.detail(id || ""),
    queryFn: async () => {
      if (!id) return null;
      const response = await apiClient.companies[":id"].$get({ param: { id } });
      if (!response.ok) {
        throw new Error(`Failed to fetch company with ID: ${id}`);
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCompanyBySlug(slug?: string) {
  return useQuery({
    queryKey: companyKeys.bySlug(slug || ""),
    queryFn: async () => {
      if (!slug) return null;
      const response = await apiClient.companies.$get({
        query: { where: { slug } },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch company with slug: ${slug}`);
      }
      const data = await response.json();
      return data[0] || null; // Assuming we get an array and want the first match
    },
    enabled: !!slug,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      const response = await apiClient.companies.$post({
        json: {
          name: data.name,
          slug: data.slug,
          logo: data.logo || "",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "We couldn't create your company. Please try again."
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
      toast.success("Company created successfully!");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Something went wrong while creating your company"
      );
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CompanyFormValues>;
    }) => {
      const response = await apiClient.companies[":id"].$patch({
        param: { id },
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to update company. Please try again."
        );
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
      toast.success("Company updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update company");
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.companies[":id"].$delete({
        param: { id },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to delete company. Please try again."
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
      toast.success("Company deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete company");
    },
  });
}

export function useUpdateCompanyLogo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      companyId,
      logo,
    }: {
      companyId: string;
      logo: string;
    }) => {
      const response = await apiClient.companies[":id"].$patch({
        param: { id: companyId },
        json: { logo },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update company logo");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
      queryClient.invalidateQueries({
        queryKey: companyKeys.detail(data.data.id),
      });
      toast.success("Company logo updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update company logo");
    },
  });
}
