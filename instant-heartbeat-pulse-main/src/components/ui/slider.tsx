import React, { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

/**
 * I am using this Slider component to allow doctors to interactively
 * adjust the zoom level of the ECG signal or set detection thresholds.
 * It provides a more natural way to fine-tune parameters compared to text inputs.
 */

const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* The track - I made it a bit thinner for a more modern look */}
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-100">
      <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
    </SliderPrimitive.Track>

    {/* The handle (Thumb) - I made it larger and added a shadow for better UX */}
    <SliderPrimitive.Thumb 
      className={cn(
        "block h-6 w-6 rounded-full border-2 border-blue-600 bg-white shadow-md transition-transform",
        "hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50"
      )} 
    />
  </SliderPrimitive.Root>
));

// Setting a custom name for the project
Slider.displayName = "ECG_Param_Slider";

export { Slider };