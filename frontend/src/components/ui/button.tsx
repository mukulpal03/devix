import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "btn-brand",
        outline:
          "bg-transparent border-[var(--border-brand)] text-[var(--text-heading)] hover:bg-[var(--surface-elevated)]",
        secondary:
          "bg-[var(--surface-elevated)] text-[var(--text-heading)] border-[var(--border-default)] hover:bg-[var(--surface-warm-card)]",
        ghost:
          "bg-transparent border-transparent text-[var(--text-heading)] hover:bg-[var(--surface-elevated)]",
        destructive:
          "bg-[var(--bg-danger)] text-[var(--text-white)] border-transparent hover:bg-[var(--accent-clay-ember)]",
        link: "text-[var(--text-heading)] underline-offset-4 hover:underline border-transparent bg-transparent",
      },
      size: {
        default: "h-8 gap-1.5 px-4 text-[15px] rounded-[var(--radius-btn)]",
        xs: "h-6 gap-1 px-3 text-xs rounded-[var(--radius-btn)]",
        sm: "h-7 gap-1 px-3 text-[14px] rounded-[var(--radius-btn)]",
        lg: "h-9 gap-1.5 px-6 py-3 text-[15px] rounded-[var(--radius-btn)]",
        icon: "size-8 rounded-[var(--radius-btn)]",
        "icon-xs": "size-6 rounded-[var(--radius-btn)]",
        "icon-sm": "size-7 rounded-[var(--radius-btn)]",
        "icon-lg": "size-9 rounded-[var(--radius-btn)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
