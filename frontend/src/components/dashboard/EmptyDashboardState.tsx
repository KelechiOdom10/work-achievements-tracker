import { Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const instructions = [
  {
    title: "Log Your First Achievement",
    description:
      "Record a recent work accomplishment to start building your portfolio.",
    button: {
      text: "Add Achievement",
      variant: "default",
    },
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Set a Career Goal",
    description: "Define what you want to accomplish and track your progress.",
    button: {
      text: "Create Goal",
      variant: "outline",
    },
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Add Achievement Tags",
    description:
      "Categorize your achievements to identify patterns in your work.",
    button: {
      text: "Manage Tags",
      variant: "outline",
    },
    color: "bg-green-100 text-green-600",
  },
] as const;

export const EmptyDashboardState = () => (
  <div className="py-12 flex flex-col items-center justify-center text-center">
    <div className="bg-primary/10 p-4 rounded-full mb-4">
      <Award className="h-10 w-10 text-primary" />
    </div>
    <h2 className="text-2xl font-bold mb-2">
      Welcome to Your Achievement Dashboard
    </h2>
    <p className="text-muted-foreground max-w-md mb-8">
      Start tracking your professional achievements to unlock insights and
      visualize your growth over time.
    </p>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl">
      {instructions.map((instruction, index) => (
        <Card key={index} className="flex flex-col">
          <CardContent className="pt-6 flex flex-col flex-1">
            <div className="flex justify-center mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${instruction.color} shadow-sm transition-transform hover:scale-110`}>
                <span className="text-sm font-bold">
                  {index + 1}
                </span>
              </div>
            </div>
            <h3 className="font-semibold mb-2 text-center line-clamp-2 min-h-12">
              {instruction.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 text-balance">
              {instruction.description}
            </p>
            <Button
              className="w-full"
              size="sm"
              variant={instruction.button.variant}
            >
              {instruction.button.text}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
