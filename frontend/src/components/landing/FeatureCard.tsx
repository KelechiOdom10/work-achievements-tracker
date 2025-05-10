import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:translate-y-[-4px] duration-300">
      <CardHeader className="p-6 pb-2">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
