import { Progress } from "../ui/progress";

export const GoalItem = ({
  title,
  category,
  progress,
  achievements,
  targetDate,
}: {
  title: string;
  category?: string;
  progress: number;
  achievements: number;
  targetDate?: string;
}) => {
  const formattedDate = targetDate
    ? new Date(targetDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between mb-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm">{progress}%</div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        {category && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
            {category}
          </span>
        )}
        <span className="text-xs text-muted-foreground">
          {achievements} achievements
        </span>
      </div>
      <Progress value={progress} className="h-2 mb-1" />
      {targetDate && (
        <div className="text-xs text-muted-foreground text-right">
          Target: {formattedDate}
        </div>
      )}
    </div>
  );
};
