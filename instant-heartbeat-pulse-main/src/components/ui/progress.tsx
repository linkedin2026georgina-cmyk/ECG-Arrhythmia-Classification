import React, { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

/**
 * I am using this Progress component to show the status of the ECG analysis.
 * Since medical data processing can take a few seconds, it's important to 
 * show the doctor that the system is currently classifying the heart beats.
 */

const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    // I made the bar slightly thinner (h-2.5) for a more modern look
    className={cn(
      "relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner", 
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // I changed the color to a medical blue and added a smooth cubic-bezier transition
      className="h-full w-full flex-1 bg-blue-600 transition-all duration-500 ease-in-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

// Adding a custom display name for my specific project theme
Progress.displayName = "ECG_Processing_Bar";

export { Progress };