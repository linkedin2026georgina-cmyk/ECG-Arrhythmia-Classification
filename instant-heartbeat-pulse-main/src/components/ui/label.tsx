import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * I am using this Label component to clearly mark every input field.
 * In a medical dashboard, clarity is key, so I made sure these labels
 * are easy to read and correctly linked to their inputs (like Patient ID or Sample Rate).
 */

const labelStyles = cva(
  "text-sm font-semibold leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
);

const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelStyles>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root 
    ref={ref} 
    className={cn(labelStyles(), className)} 
    {...props} 
  />
));

// I used a specific name to avoid the default generic name
Label.displayName = "ECG_Field_Label";

export { Label };