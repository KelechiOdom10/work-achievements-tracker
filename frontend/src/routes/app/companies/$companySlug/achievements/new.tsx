import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute(
  "/app/companies/$companySlug/achievements/new"
)({
  component: AchievementCreatePage,
});

const EMOJI_ICONS = [
  "🏆",
  "🚀",
  "💡",
  "📝",
  "👥",
  "🎯",
  "🛠️",
  "🌱",
  "🏅",
  "🧠",
  "🏗️",
  "🧩",
  "⭐",
  "📚",
  "🎉",
];
const CATEGORIES = [
  "Onboarding",
  "Collaboration",
  "Learning",
  "Documentation",
  "Development",
  "Leadership",
  "Innovation",
  "Setup",
  "Product",
  "Research",
  "Communication",
  "Other",
];
const IMPACT_LEVELS = ["Low", "Medium", "High"];
const TAG_COLORS = [
  "#60a5fa",
  "#fbbf24",
  "#34d399",
  "#f87171",
  "#a78bfa",
  "#f472b6",
  "#facc15",
  "#38bdf8",
  "#f87171",
];
const GOALS = [
  { id: "1", title: "Ship MVP" },
  { id: "2", title: "Grow Userbase" },
];

// Types for tags and form values
type Tag = {
  id: string;
  label: string;
  color: string;
};

const createAchievementSchema = z.object({
  icon: z.string(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  category: z.string(),
  impactLevel: z.string(),
  goalId: z.string(),
  description: z
    .string()
    .min(10, { message: "Please provide a more detailed description" }),
  date: z.string(),
  impact: z.string(),
  skills: z.string(),
  tags: z.array(
    z.object({ label: z.string(), color: z.string(), id: z.string() })
  ),
});

type CreateAchievementSchemaType = z.infer<typeof createAchievementSchema>;

export default function AchievementCreatePage() {
  // Default date to today
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<CreateAchievementSchemaType>({
    defaultValues: {
      icon: EMOJI_ICONS[0],
      title: "",
      category: CATEGORIES[0],
      impactLevel: IMPACT_LEVELS[1],
      goalId: "",
      description: "",
      date: today,
      impact: "",
      skills: "",
      tags: [],
    },
    resolver: zodResolver(createAchievementSchema),
  });

  const { control, handleSubmit, watch, setValue } = form;

  // For tag creation
  const [tagInput, setTagInput] = useState("");
  const [tagColor, setTagColor] = useState(TAG_COLORS[0]);
  const tags = watch("tags");

  // Live preview values
  const icon = watch("icon");
  const title = watch("title");
  const category = watch("category");
  const impactLevel = watch("impactLevel");
  const goalId = watch("goalId");
  const description = watch("description");
  const date = watch("date");
  const impact = watch("impact");
  const skills = watch("skills");

  const onSubmit = (data: CreateAchievementSchemaType) => {
    // TODO: handle create
    console.log(data);
  };

  return (
    <div className="container mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">New Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Launched new feature"
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe what you achieved and how you did it..."
                          className="min-h-[120px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category & Impact Level (2 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <FormField
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Impact Level */}
                  <FormField
                    control={control}
                    name="impactLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select impact level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {IMPACT_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Icon Picker */}
                <FormField
                  control={control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {EMOJI_ICONS.map((emo) => (
                            <button
                              key={emo}
                              type="button"
                              className={`rounded text-2xl px-2 py-1 border ${field.value === emo ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                              onClick={() => field.onChange(emo)}
                              aria-label={emo}
                            >
                              {emo}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags with color picker */}
                <FormField
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {field.value &&
                              field.value.map((tag: Tag, idx: number) => (
                                <span
                                  key={tag.id}
                                  className="flex items-center px-2 py-1 rounded-full text-xs"
                                  style={{
                                    background: tag.color,
                                    color: "#fff",
                                  }}
                                >
                                  {tag.label}
                                  <button
                                    type="button"
                                    className="ml-1 text-white"
                                    onClick={() => {
                                      setValue(
                                        "tags",
                                        field.value.filter((_, i) => i !== idx)
                                      );
                                    }}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              placeholder="Add tag"
                              className="h-8 w-32"
                            />
                            <input
                              type="color"
                              value={tagColor}
                              onChange={(e) => setTagColor(e.target.value)}
                              className="h-8 w-8 p-0 border-none"
                              title="Pick tag color"
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => {
                                if (tagInput.trim()) {
                                  setValue("tags", [
                                    ...(field.value as Tag[]),
                                    {
                                      label: tagInput.trim(),
                                      color: tagColor,
                                      id: Date.now().toString(),
                                    },
                                  ]);
                                  setTagInput("");
                                  setTagColor(TAG_COLORS[0]);
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Select from existing or add new tags. Pick a color for
                        new tags.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Related Goal */}
                <FormField
                  control={control}
                  name="goalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Goal (Optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Link to a goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {GOALS.map((goal) => (
                            <SelectItem key={goal.id} value={goal.id}>
                              {goal.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="date" className="h-10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Skills */}
                  <FormField
                    control={control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills Demonstrated</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., React, Leadership"
                            className="h-10"
                          />
                        </FormControl>
                        <FormDescription>
                          Separate multiple skills with commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Impact */}
                  <FormField
                    control={control}
                    name="impact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Increased performance by 30%"
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button type="submit">Save Achievement</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      {/* Right Column - Preview */}
      <div className="lg:sticky lg:top-6 h-fit">
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-2xl">
                <span>{icon}</span>
                <span className="font-semibold text-lg">
                  {title || "Achievement Title"}
                </span>
              </div>
              <div className="flex gap-2 text-xs mt-1">
                <span className="bg-muted px-2 py-0.5 rounded">{category}</span>
                <span
                  className={`px-2 py-0.5 rounded ${impactLevel === "High" ? "bg-red-200" : impactLevel === "Medium" ? "bg-yellow-200" : "bg-green-200"}`}
                >
                  {impactLevel} Impact
                </span>
                {goalId && (
                  <span className="bg-blue-100 px-2 py-0.5 rounded">
                    Goal: {GOALS.find((g) => g.id === goalId)?.title}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: tag.color, color: "#fff" }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {description || "Description will appear here..."}
              </div>
              <div className="flex gap-4 text-xs mt-2">
                <span>Date: {date || "--/--/----"}</span>
                <span>Impact: {impact || "—"}</span>
              </div>
              <div className="text-xs mt-2">Skills: {skills || "—"}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
