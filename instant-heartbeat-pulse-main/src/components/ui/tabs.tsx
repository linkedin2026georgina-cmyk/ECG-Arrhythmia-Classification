import React, { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * I am using these Tabs to organize the ECG dashboard.
 * It allows the doctor to switch between the raw signal view, 
 * AI classification results, and the final patient report within the same area.
 */

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-xl bg-slate-100 p-1.5 text-slate-500", // Increased height and changed color
      className
    )}
    {...props}
  />
));

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all outline-none",
      "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md", // Active state with medical blue
      "focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:opacity-50",
      className
    )}
    {...props}
  />
));

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 p-2 ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-blue-500", 
      className
    )}
    {...props}
  />
));

// Setting custom display names for my ECG project
TabsList.displayName = "ECG_Tabs_List";
TabsTrigger.displayName = "ECG_Tab_Button";

export { Tabs, TabsList, TabsTrigger, TabsContent };