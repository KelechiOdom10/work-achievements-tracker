import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layouts/AppLayout";

const Index = () => {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState([
    { id: "1", label: "Design", color: "blue" as const },
    { id: "2", label: "UI", color: "purple" as const },
    { id: "3", label: "macOS", color: "pink" as const },
  ]);

  const handleCreateProject = () => {
    if (!projectName) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project Created",
      description: `Your project "${projectName}" has been created successfully!`,
    });

    setProjectName("");
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <Card
          variant="transparent"
          bordered={false}
          className="text-center mb-8"
        >
          <CardHeader className="text-3xl font-bold tracking-tight">
            macOS Design System
          </CardHeader>
          <CardContent className="text-muted-foreground mt-2">
            A beautiful, minimalist interface inspired by macOS design
            principles
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Buttons">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Danger</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" size="sm">
                  Small
                </Button>
                <Button variant="default" size="default">
                  Default
                </Button>
                <Button variant="default" size="lg">
                  Large
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Tags">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="red">Red</Badge>
                <Badge variant="orange">Orange</Badge>
                <Badge variant="yellow">Yellow</Badge>
                <Badge variant="green">Green</Badge>
                <Badge variant="blue">Blue</Badge>
                <Badge variant="purple">Purple</Badge>
                <Badge variant="pink">Pink</Badge>
                <Badge variant="gray">Gray</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge
                    key={tag.id}
                    variant={tag.color}
                    onRemove={() => removeTag(tag.id)}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Input Fields">
            <div className="space-y-4">
              <Input
                label="Project Name"
                placeholder="My Awesome Project"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                placeholder="example@email.com"
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                helperText="Must be at least 8 characters"
                fullWidth
              />
              <Input
                label="Invalid Input"
                placeholder="Error state"
                error="This field is required"
                fullWidth
              />
            </div>
          </Card>

          <Card title="Card Variants">
            <div className="space-y-4">
              <Card title="Default Card" variant="default">
                <p className="text-sm text-muted-foreground">
                  This is a default card with a border and subtle shadow.
                </p>
              </Card>
              <Card title="Elevated Card" variant="elevated">
                <p className="text-sm text-muted-foreground">
                  This card has a stronger shadow for elevation.
                </p>
              </Card>
              <Card title="Transparent Card" variant="transparent" bordered>
                <p className="text-sm text-muted-foreground">
                  This is a transparent card with only a border.
                </p>
              </Card>
            </div>
          </Card>
        </div>

        <Card
          variant="elevated"
          title="Create a Project"
          className="col-span-1 md:col-span-2"
        >
          <div className="space-y-4">
            <Input
              label="Project Name"
              placeholder="My Awesome Project"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              fullWidth
            />
            <div className="flex flex-wrap gap-2">
              <p className="text-sm font-medium w-full mb-1">Tags:</p>
              {tags.map(tag => (
                <Badge
                  variant={tag.color}
                  key={tag.id}
                  color={tag.color}
                  onRemove={() => removeTag(tag.id)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
