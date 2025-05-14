import { createFileRoute } from "@tanstack/react-router";

import { VerifyEmail } from "@/components/auth/VerifyEmail";

export const Route = createFileRoute("/(auth)/verify")({
  component: VerifyEmail,
});
