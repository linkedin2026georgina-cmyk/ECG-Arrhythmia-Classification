import React, { forwardRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

/**
 * I am using this Separator to create a clear visual hierarchy in the dashboard.
 * It helps to separate patient metadata from the ECG charts, making the 
 * medical report much easier to scan and read for the doctor.
 */

const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-slate-200", // I replaced the generic 'bg-border' with a soft slate gray
      orientation === "horizontal" ? "h-[1px] w-full my-4" : "h-full w-[1px] mx-4", 
      className
    )}
    {...props}
  />
));

// A custom name for my specific project theme
Separator.displayName = "ECG_UI_Separator";

export { Separator };