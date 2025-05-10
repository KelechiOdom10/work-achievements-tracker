import { Testimonial } from "./Testimonial";

const testimonials = [
  {
    quote:
      "Achieve has transformed how I track my work wins. It's beautiful and easy to use!",
    author: "Jane Doe",
    role: "Product Manager, Acme Inc.",
  },
  {
    quote:
      "I love the analytics and how I can showcase my growth to my manager.",
    author: "John Smith",
    role: "Software Engineer, BetaTech",
  },
  {
    quote: "The perfect tool for performance reviews and promotions!",
    author: "Samantha Lee",
    role: "UX Designer, Creativa",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What our users say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professionals love using Achieve to track and showcase their growth.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Testimonial
              key={i}
              quote={t.quote}
              author={t.author}
              role={t.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
