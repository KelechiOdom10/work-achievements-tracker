import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",

        // Color variants
        gray: "bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200",
        red: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
        orange:
          "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100",
        yellow:
          "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
        green:
          "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
        blue: "bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100",
        purple:
          "bg-violet-50 text-violet-700 border-violet-100 hover:bg-violet-100",
        pink: "bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onRemove?: () => void;
}

function Badge({
  className,
  variant,
  size,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        "flex items-center gap-1",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 rounded-full hover:bg-opacity-80 p-0.5 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
