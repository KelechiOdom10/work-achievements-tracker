import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconColorVariant?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "cyan"
    | "amber";
}

export function FeatureCard({
  icon,
  title,
  description,
  iconColorVariant,
}: FeatureCardProps) {
  // Map color variant to Tailwind classes
  const colorClassMap: Record<string, string> = {
    red: "text-red-500/90 bg-red-100/50 dark:bg-red-100/5",
    orange: "text-orange-500/90 bg-orange-100/50 dark:bg-orange-100/5",
    yellow: "text-yellow-500/90 bg-yellow-100/50 dark:bg-yellow-100/5",
    green: "text-green-500/90 bg-green-100/50 dark:bg-green-100/5",
    blue: "text-blue-500/90 bg-blue-100/50 dark:bg-blue-100/5",
    purple: "text-purple-500/90 bg-purple-100/50 dark:bg-purple-100/5",
    pink: "text-pink-500/90 bg-pink-100/50 dark:bg-pink-100/5",
    cyan: "text-cyan-500/90 bg-cyan-100/50 dark:bg-cyan-100/5",
    amber: "text-amber-500/90 bg-amber-100/50 dark:bg-amber-100/5",
  };
  const colorClass =
    colorClassMap[iconColorVariant || "blue"] || colorClassMap["blue"];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:translate-y-[-4px] duration-300">
      <CardHeader className="p-6 pb-2">
        <div
          className={`mb-4 ${colorClass} p-2.5 rounded-lg w-fit [&>svg]:size-7`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
