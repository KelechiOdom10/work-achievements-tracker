import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6 pt-8 relative">
        <Quote className="absolute top-6 left-6 h-8 w-8 text-muted-foreground/20" />
        <div className="pl-8">
          <p className="text-muted-foreground">{quote}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col items-start">
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </CardFooter>
    </Card>
  );
}
