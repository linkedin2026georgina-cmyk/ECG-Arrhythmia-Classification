import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * I created this NavLink wrapper to handle active and pending states easily.
 * It ensures that the doctor always has a visual cue of their current location
 * within the ECG analysis system, improving navigation clarity.
 */

// I renamed the props interface to be more descriptive
interface CustomNavLinkProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClass?: string;  // I shortened the name to make it unique
  pendingClass?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, CustomNavLinkProps>(
  ({ className, activeClass, pendingClass, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        // I used a more readable function body for the className logic
        className={({ isActive, isPending }) => {
          return cn(
            "transition-all duration-200", // Added a default smooth transition
            className, 
            isActive && (activeClass || "text-blue-600 font-bold"), // Default fallback styles
            isPending && (pendingClass || "opacity-50 cursor-wait")
          );
        }}
        {...props}
      />
    );
  }
);

// Changed the display name for my specific project context
NavLink.displayName = "ECG_Navigation_Link";

export { NavLink };