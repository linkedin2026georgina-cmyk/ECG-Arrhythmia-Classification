import React, { forwardRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

/**
 * I am using this Popover component to hold small interactive elements.
 * It's perfect for things like date pickers or quick edit forms where 
 * I don't want to open a full dialog and distract the doctor.
 */

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => ( // Increased offset for a cleaner look
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 rounded-xl border border-slate-100 bg-white p-4 text-slate-950 shadow-2xl outline-none", 
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

// I used a specific name to reflect my project's UI identity
PopoverContent.displayName = "ECG_Action_Popover";

export { Popover, PopoverTrigger, PopoverContent };