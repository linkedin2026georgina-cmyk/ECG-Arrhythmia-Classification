import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I am using Radix UI primitives here to build an Accordion component.
 * This is useful for the "FAQ" section or to show ECG classification details 
 * in a clean, collapsible way without crowding the screen.
 */

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  // I added a bottom border here to separate different heart rhythm categories clearly
  <AccordionPrimitive.Item 
    ref={ref} 
    className={cn("border-b border-slate-200", className)} 
    {...props} 
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-blue-600 [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {/* This part handles the clickable header of the accordion */}
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 opacity-50" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "ECG_AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    {/* I used padding here to make sure the classification text is easy to read for the user */}
    <div className={cn("pb-4 pt-1 text-slate-600", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = "ECG_AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };