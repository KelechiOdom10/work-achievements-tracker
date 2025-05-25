import { Card, CardContent } from "@/components/ui/card";

export const StatCard = ({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
}) => (
  <Card className="h-full">
    <CardContent className="flex flex-col p-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {subtitle && (
        <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>
      )}
    </CardContent>
  </Card>
);
