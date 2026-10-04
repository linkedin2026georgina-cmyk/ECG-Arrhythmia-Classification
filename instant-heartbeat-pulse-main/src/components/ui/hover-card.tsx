import React, { forwardRef } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

/**
 * I am using this HoverCard to show quick medical tips.
 * For example, if a doctor hovers over a classification label (N, V, S, etc.),
 * I want to display the full name of that beat type from the MIT-BIH dataset.
 */

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => ( // I increased sideOffset for better spacing
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-72 rounded-xl border border-slate-100 bg-white p-4 text-slate-950 shadow-xl outline-none backdrop-blur-md", 
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className
    )}
    {...props}
  />
));

// I gave it a custom name to match my ECG project components
HoverCardContent.displayName = "ECG_Info_HoverCard";

export { HoverCard, HoverCardTrigger, HoverCardContent };