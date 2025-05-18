import { zodResolver } from "@hookform/resolvers/zod";
import { siteConfig } from "@shared/constants";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { GuestLayout } from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { companyKeys, useCreateCompany } from "@/hooks/use-companies";
import { useLogoUpload } from "@/hooks/use-file-upload";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: "/login", search: { next: location.pathname } });
    }

    const activeCompanyData = await context.queryClient.ensureQueryData({
      queryKey: companyKeys.active(),
      queryFn: async () => {
        const response = await apiClient.companies.active.$get();

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message, {
            cause: error,
          });
        }

        const { data } = await response.json();
        return data;
      },
    });

    if (activeCompanyData?.company) {
      //   throw redirect({
      //     to: "/app/companies/$companySlug",
      //     params: {
      //       companySlug:
      //         activeCompanyData.company.slug || activeCompanyData.company.id,
      //     },
      //   });
    }
  },
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .max(15, {
      message: "Slug must be at most 15 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  logo: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof formSchema>;

function Onboarding() {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
    },
  });

  const { uploadLogo, finalizeLogo } = useLogoUpload();
  const { mutate: createCompany, isPending: isCreating } = useCreateCompany();

  form.watch("slug");

  console.log(form.getValues("logo"));

  // Generate slug from company name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);

    // Only auto-generate slug if it hasn't been manually modified
    if (!isSlugManuallyEdited) {
      form.setValue("slug", generateSlug(name));
    }
  };

  const handleSlugChange = () => {
    setIsSlugManuallyEdited(true);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);

      // Upload the file
      const result = await uploadLogo(file);
      form.setValue("logo", result?.fileId || "");
    } catch (error) {
      console.error("Logo upload failed:", error);
      toast.error("Failed to upload logo. Please try again.");
    }
  };

  // Form submission handler
  const onSubmit = async (data: CompanyFormValues) => {
    createCompany(
      {
        name: data.name,
        slug: data.slug,
        logo: data.logo || "",
      },
      {
        onSuccess: async (result) => {
          const companyId = result.data?.company?.id;
          const logoId = data.logo;

          // If we have both company ID and logo, finalize the upload
          if (companyId && logoId) {
            try {
              await finalizeLogo(logoId, companyId);
              // The company update is handled by the finalizeLogo function
            } catch (error) {
              console.error("Logo finalization failed:", error);
              // Continue even if logo finalization fails
            }
          }

          // Redirect to the company dashboard
          const companySlug = result.data?.company?.slug || companyId;
          if (companySlug) {
            navigate({ to: `/app/companies/${companySlug}` });
          }
        },
        onError: (error: Error) => {
          const apiError = error.cause as {
            code?: string;
          };
          if (apiError?.code === "COMPANY_SLUG_EXISTS") {
            form.setError("slug", {
              type: "manual",
              message: error.message,
            });
          } else {
            toast.error("Failed to create company. Please try again.");
          }
        },
      }
    );
  };

  return (
    <GuestLayout
      showNav
      navProps={{ logoOnly: true, showAuthLinks: false }}
      showFooter={false}
    >
      <div className="max-w-md mx-auto py-8 px-4">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your workspace</h1>
            <p className="text-muted-foreground mt-2">
              Set up your company to start tracking achievements.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-5 items-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center overflow-hidden border border-border">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Company logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="text-muted-foreground cursor-pointer"
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
                    >
                      <Upload size={24} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start space-y-3">
                  {/* Company Logo */}
                  <div className="text-sm font-medium opacity-80">
                    Company logo
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "cursor-pointer hover:bg-transparent hover:text-primary w-32"
                      )}
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
                    >
                      {logoPreview ? "Replace" : "Upload"} image
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />

                    {logoPreview && (
                      <Button
                        type="button"
                        variant="link"
                        onClick={async () => {
                          const fileId = form.getValues("logo");
                          if (fileId) {
                            // Delete the temporary file from the server
                            try {
                              await apiClient.uploads.temp[":fileId"].$delete({
                                param: { fileId },
                              });
                            } catch (error) {
                              console.error("Error deleting temp file:", error);
                            }
                          }
                          setLogoPreview(null);
                          form.setValue("logo", "");
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    *png, *jpeg files up to 10MB at least 400px by 400px
                  </p>
                </div>
              </div>

              {/* Company Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your company name..."
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleNameChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Slug/URL */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace handle</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <div className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground text-sm border border-r-0 border-input whitespace-nowrap">
                          {siteConfig.url}/
                        </div>
                        <Input
                          className="rounded-l-none"
                          placeholder="my-workspace"
                          fullWidth
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleSlugChange();
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This will be your company's unique URL. You can use the
                      same handle for different companies if they belong to
                      different accounts.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Company"
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </GuestLayout>
  );
}
