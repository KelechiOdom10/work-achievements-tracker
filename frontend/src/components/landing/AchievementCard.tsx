import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AchievementCardProps {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export function AchievementCard({
  title,
  date,
  description,
  tags,
}: AchievementCardProps) {
  // List of color variants from badge.tsx
  const colorVariants = [
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "pink",
  ] as const;

  // Helper to pick a random variant
  function getRandomVariant() {
    const idx = Math.floor(Math.random() * colorVariants.length);
    return colorVariants[idx];
  }
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex justify-between items-start">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-muted-foreground">{date}</span>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant={getRandomVariant()} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
