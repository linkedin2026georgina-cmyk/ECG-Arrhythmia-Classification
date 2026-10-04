import React, { forwardRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I am using this Navigation Menu to create a professional header for the ECG app.
 * It helps the user navigate between the dashboard, patient records, 
 * and analysis settings with smooth animated transitions.
 */

const NavigationMenu = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));

const NavigationMenuList = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex list-none items-center justify-center space-x-2", className)}
    {...props}
  />
));

const navTriggerStyles = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-700 focus:outline-none disabled:opacity-50 data-[active]:bg-blue-50/50 data-[state=open]:bg-blue-50/50"
);

const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navTriggerStyles(), "group", className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));

const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center mt-2">
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));

// Display name to mark my component
NavigationMenu.displayName = "ECG_Nav_Root";

export {
  navTriggerStyles as navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem: NavigationMenuPrimitive.Item,
  NavigationMenuContent: NavigationMenuPrimitive.Content,
  NavigationMenuTrigger,
  NavigationMenuLink: NavigationMenuPrimitive.Link,
  NavigationMenuIndicator: NavigationMenuPrimitive.Indicator,
  NavigationMenuViewport,
};