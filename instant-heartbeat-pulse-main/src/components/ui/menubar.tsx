import React, { forwardRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I implemented this Menubar to act as the primary control hub for the app.
 * It groups all major functions like 'Data Management', 'AI Analysis', and 
 * 'System Settings' in a clean, desktop-like navigation bar.
 */

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-11 items-center space-x-1 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm", // Custom height and radius
      className
    )}
    {...props}
  />
));

const MenubarTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-md px-4 py-2 text-sm font-semibold outline-none focus:bg-blue-50 focus:text-blue-700 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-700",
      className
    )}
    {...props}
  />
));

const MenubarContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[13rem] overflow-hidden rounded-xl border bg-white p-1 shadow-xl animate-in fade-in-80", 
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));

const MenubarItem = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none focus:bg-blue-600 focus:text-white data-[disabled]:opacity-40",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));

const MenubarSeparator = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-slate-100", className)} {...props} />
));

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs font-medium text-slate-400 tracking-tighter", className)} {...props} />;
};

// I used a descriptive name for my project
Menubar.displayName = "ECG_Top_Navigation";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel: MenubarPrimitive.Label, // Simplified export
  MenubarCheckboxItem: MenubarPrimitive.CheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem: MenubarPrimitive.RadioItem,
  MenubarPortal,
  MenubarSubContent: MenubarPrimitive.SubContent,
  MenubarSubTrigger: MenubarPrimitive.SubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};