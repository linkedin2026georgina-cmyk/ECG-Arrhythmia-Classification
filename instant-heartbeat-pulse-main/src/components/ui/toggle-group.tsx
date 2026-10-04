import React, { createContext, useContext, forwardRef } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

/**
 * I am using the ToggleGroup to create an interactive toolbar for the ECG viewer.
 * It allows doctors to toggle between different visualization tools like 
 * zooming, panning, or displaying grid lines over the heart signal.
 */

// Custom context to pass styles to group items
const ECGToggleContext = createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root 
    ref={ref} 
    className={cn("flex items-center justify-center gap-1.5 p-1 bg-slate-50 rounded-lg", className)} 
    {...props}
  >
    <ECGToggleContext.Provider value={{ variant, size }}>
      {children}
    </ECGToggleContext.Provider>
  </ToggleGroupPrimitive.Root>
));

const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ECGToggleContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        // Custom styling to make selected items stand out in a medical theme
        "data-[state=on]:bg-blue-600 data-[state=on]:text-white transition-all duration-200 shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

// Setting custom display names for clarity
ToggleGroup.displayName = "ECG_Toolbar_Group";
ToggleGroupItem.displayName = "ECG_Toolbar_Item";

export { ToggleGroup, ToggleGroupItem };