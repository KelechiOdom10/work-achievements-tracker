import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { GuestLayout } from "@/components/layouts/GuestLayout";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  slug: z
    .string()
    .min(1, "Company URL is required")
    .max(10, "Company URL must be at most 10 characters long")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens are allowed"
    ),
  logo: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

function Onboarding() {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Initialize form
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
    },
  });

  // Watch company name to generate slug suggestion
  const companyName = form.watch("name");

  // Generate slug from company name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Update slug when company name changes
  const updateSlug = () => {
    if (companyName) {
      form.setValue("slug", generateSlug(companyName));
    }
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, just create a preview URL
      // In a real app, you'd upload this to a server and get back a URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setLogoPreview(reader.result);
          form.setValue("logo", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const createCompanyMutation = useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      const response = await apiClient.companies.$post({
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create company");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Company created successfully!");

      // Redirect to the company dashboard
      navigate({
        to: `/app/companies/${data?.company?.slug || data?.company?.id}`,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create company");
    },
  });

  // Form submission handler
  const onSubmit = (data: CompanyFormValues) => {
    createCompanyMutation.mutate(data);
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
                    <Label
                      htmlFor="logo-upload"
                      className={buttonVariants({
                        variant: "outline",
                        className:
                          "cursor-pointer hover:bg-transparent hover:text-primary w-32",
                      })}
                    >
                      {logoPreview ? "Replace" : "Upload"} image
                    </Label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />

                    <Button
                      variant="link"
                      disabled={!logoPreview}
                      onClick={() => {
                        if (!logoPreview) return;

                        setLogoPreview(null);
                        form.setValue("logo", "");
                      }}
                    >
                      Remove
                    </Button>
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
                          // Update slug when name changes if user hasn't manually edited slug
                          if (
                            !form.getValues("slug") ||
                            form.getValues("slug") === generateSlug(field.value)
                          ) {
                            updateSlug();
                          }
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
                        <div className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground text-sm border border-r-0 border-input">
                          app.achievelog.com/
                        </div>
                        <Input
                          className="rounded-l-none"
                          placeholder="my-workspace"
                          fullWidth
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This will be your company's unique URL.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={createCompanyMutation.isPending}
              >
                {createCompanyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </GuestLayout>
  );
}
