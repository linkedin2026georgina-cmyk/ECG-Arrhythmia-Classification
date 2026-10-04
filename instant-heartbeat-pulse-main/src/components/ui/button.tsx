import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * I am building this button component to be the main controller in my UI.
 * I want to have different colors: Blue for main actions like 'Analyze', 
 * and Red for dangerous actions like 'Delete Data'.
 */

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-300 active:opacity-75 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        // I chose blue for the primary buttons because it looks more professional for medical apps
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        // This is for reset or stop actions
        destructive: "bg-rose-600 text-white hover:bg-rose-700",
        // I created an outline version for secondary options
        outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
        secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
        ghost: "hover:bg-slate-100 text-slate-600",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        // I defined these sizes to fit both mobile and desktop screens
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

// Here I am creating the main Button function
function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  // If I use 'asChild', the button will behave like a link, which is very useful
  const Element = asChild ? Slot : "button";

  return (
    <Element
      className={cn(buttonStyles({ variant, size, className }))}
      {...props}
    />
  );
}

// I added this name to easily find this component in the browser inspector
Button.displayName = "My_ECG_Project_Button";

export { Button, buttonStyles as buttonVariants };