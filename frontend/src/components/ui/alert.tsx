import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-none border px-4 py-3 text-[15px]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border-default)] bg-[var(--surface-page-base)] text-[var(--text-heading)]",
        success:
          "border-[var(--border-success-subtle)] bg-[var(--bg-success-soft)] text-[var(--text-fg-success-strong)]",
        destructive:
          "border-[var(--border-danger-subtle)] bg-[var(--bg-danger-soft)] text-[var(--text-fg-danger-strong)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));

Alert.displayName = "Alert";

export { Alert };
