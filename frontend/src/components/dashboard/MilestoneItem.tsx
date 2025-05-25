export const MilestoneItem = ({
  days,
  title,
  daysRemaining,
}: {
  days: number;
  title: string;
  daysRemaining: number;
}) => (
  <div className="flex items-start gap-4 py-4 border-b last:border-b-0">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
      {days}d
    </div>
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">
        {daysRemaining} days remaining
      </div>
    </div>
  </div>
);
