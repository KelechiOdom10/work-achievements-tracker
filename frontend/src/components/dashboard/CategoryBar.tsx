import { Progress } from "../ui/progress";

export const CategoryBar = ({
  name,
  count,
  total,
}: {
  name: string;
  count: number;
  total: number;
}) => {
  const percentage = Math.min(100, Math.round((count / total) * 100));
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{count}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
