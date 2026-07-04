import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-[var(--radius-btn)] border border-[var(--border-default)] bg-[var(--surface-page-base)] px-3 py-2.5 text-[15px] font-normal transition-colors duration-200 ease-out outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-body-muted)] focus-visible:border-[var(--border-brand)] focus-visible:ring-0 focus-visible:shadow-[0_0_0_2px_var(--border-brand)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--bg-disabled)] disabled:text-[var(--text-fg-disabled)] disabled:opacity-100 aria-invalid:border-[var(--border-danger)] aria-invalid:shadow-[0_0_0_2px_var(--border-danger)]",
        className
      )}
      style={{ color: 'var(--text-heading)', letterSpacing: '-0.002em' }}
      {...props}
    />
  )
}

export { Input }
