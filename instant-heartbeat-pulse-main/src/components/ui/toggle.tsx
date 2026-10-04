import React, { forwardRef } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * I am using this Toggle component for standalone actions in the ECG viewer.
 * It's ideal for functions like 'Freeze Signal' or 'Toggle Grid', 
 * providing immediate visual feedback when a tool is active.
 */

const toggleStyles = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all outline-none disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent text-slate-600 hover:bg-slate-100",
        // Custom medical outline style
        outline: "border border-slate-200 bg-transparent hover:bg-blue-50 hover:text-blue-700",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-2",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleStyles>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      toggleStyles({ variant, size }),
      // Adding custom active state styling
      "data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-inner",
      className
    )}
    {...props}
  />
));

Toggle.displayName = "ECG_Action_Toggle";

export { Toggle, toggleStyles as toggleVariants };