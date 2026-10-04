import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/**
 * I am using this Avatar component to display the profile picture of the user (e.g., the doctor or lab technician).
 * This adds a professional touch to the ECG analysis dashboard.
 */

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  // I defined a fixed size (h-10 w-10) to make sure the profile icon looks consistent
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200", className)}
    {...props}
  />
));
Avatar.displayName = "User_Profile_Avatar";

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  // The aspect-square ensures the image is a perfect circle
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = "User_Profile_Image";

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  /**
   * I added a fallback background (bg-muted).
   * This is helpful if the user's image fails to load, so the UI still looks good.
   */
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-500", className)}
    {...props}
  />
));
AvatarFallback.displayName = "User_Profile_Fallback";

export { Avatar, AvatarImage, AvatarFallback };