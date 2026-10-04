import React, { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

/**
 * I am using Tooltips to provide instant context for icons and medical terms.
 * This keeps the ECG dashboard clean by using icons while ensuring the 
 * doctor always knows exactly what each tool does.
 */

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => ( // Increased sideOffset for a floating effect
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      // Custom styling: Dark medical theme for high contrast
      "z-50 overflow-hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      className
    )}
    {...props}
  />
));

// Setting a custom display name to reflect our project identity
TooltipContent.displayName = "ECG_Help_Tooltip";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };