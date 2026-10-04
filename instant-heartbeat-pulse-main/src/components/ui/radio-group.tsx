import React, { forwardRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I am using the RadioGroup for single-choice selections.
 * This is useful in the ECG app for selecting specific display modes
 * or choosing which Lead signal (e.g., Lead II) to analyze at a time.
 */

const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root 
      className={cn("grid gap-3", className)} // Increased gap for better touch targets
      {...props} 
      ref={ref} 
    />
  );
});

const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // I customized the border and focus ring to match the medical blue theme
        "aspect-square h-5 w-5 rounded-full border-2 border-slate-300 text-blue-600 shadow-sm",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:border-blue-600",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* I made the center circle slightly larger for better visibility */}
        <Circle className="h-2.5 w-2.5 fill-blue-600 text-blue-600" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

// I used custom display names for my project debugging
RadioGroup.displayName = "ECG_RadioGroup_Root";
RadioGroupItem.displayName = "ECG_Option_Item";

export { RadioGroup, RadioGroupItem };