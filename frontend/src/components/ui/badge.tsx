import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "rounded-none border-[var(--border-default)] bg-[var(--surface-page-base)] text-[var(--text-heading)]",
        secondary:
          "rounded-none border-transparent bg-[var(--surface-warm-card)] text-[var(--text-heading)]",
        destructive:
          "rounded-none border-[var(--border-danger-subtle)] bg-[var(--bg-danger-soft)] text-[var(--text-fg-danger-strong)]",
        outline:
          "rounded-none border-[var(--border-brand)] bg-transparent text-[var(--text-heading)]",
        accent:
          "rounded-none border-[var(--border-clay)] bg-transparent text-[var(--text-fg-clay)]",
        muted:
          "rounded-none border-[var(--border-default-subtle)] bg-[var(--surface-elevated)] text-[var(--text-body-subtle)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
