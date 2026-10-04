import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * I am building this sidebar as the main navigation hub for the medical platform.
 * It's designed to be highly responsive, supporting both desktop expanded views 
 * and mobile-friendly slide-outs for ECG data management.
 */

const SIDEBAR_STATE_KEY = "ecg_app_sidebar_state";
const SIDEBAR_WIDTH_DESKTOP = "260px"; // Custom width
const SIDEBAR_WIDTH_ICON_ONLY = "64px";
const TOGGLE_KEY = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

const SidebarProvider = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void; }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const nextState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(nextState); else _setOpen(nextState);
      localStorage.setItem(SIDEBAR_STATE_KEY, String(nextState)); // Used localStorage instead of cookies
    },
    [setOpenProp, open]
  );

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev);
  }, [isMobile, setOpen]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === TOGGLE_KEY && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";
  const contextValue = useMemo(() => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }), 
  [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{ "--sidebar-width": SIDEBAR_WIDTH_DESKTOP, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON_ONLY, ...style } as React.CSSProperties}
          className={cn("group/sidebar-wrapper flex min-h-screen w-full", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});

// Simplified the rest of the components to be more readable
const SidebarHeader = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-3 p-4", className)} {...props} />
));

const SidebarContent = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden", className)} {...props} />
));

// I renamed the display names to be more specific to our ECG project
SidebarProvider.displayName = "ECG_Sidebar_Provider";
SidebarHeader.displayName = "ECG_Sidebar_Header";

export {
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  useSidebar,
  // ... rest of exports (similar to original but with your logic)
};