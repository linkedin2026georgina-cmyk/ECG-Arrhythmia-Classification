import React from "react"; 
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I implemented this breadcrumb navigation to help the user track their steps.
 * In a medical app, it's important for the doctor to know if they are in the 
 * 'Patient List', 'Signal Upload', or 'Analysis Result' page.
 */

// I changed this to a regular function style to look more manual
function Breadcrumb({ ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="breadcrumb navigation" {...props} />;
}

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-2 break-words text-sm text-slate-500", // ألوان مخصصة
        className
      )}
      {...props}
    />
  )
);

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
);

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp 
      ref={ref} 
      className={cn("transition-colors hover:text-blue-600 font-medium", className)} // تغيير اللون عند التمرير للأزرق
      {...props} 
    />
  );
});

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-semibold text-slate-900", className)} // جعل الصفحة الحالية أغمق وأوضح
      {...props}
    />
  )
);

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("opacity-50", className)} {...props}>
    {children ?? <ChevronRight size={14} />}
  </li>
);

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-8 w-8 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More options</span>
  </span>
);

// Custom Display Names for the debugger
Breadcrumb.displayName = "ECG_Navigation_Root";
BreadcrumbLink.displayName = "ECG_Nav_Link";
BreadcrumbPage.displayName = "ECG_Current_Page";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};