import React, { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

/**
 * I am using this Pagination component to handle large datasets.
 * Since the MIT-BIH database has many records, I need this to navigate 
 * through patient lists or ECG segments without overloading the page.
 */

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination navigation"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-2", className)} {...props} /> // Increased gap
  )
);

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("list-none", className)} {...props} />
  )
);

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> & React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        // I changed the active variant to 'default' (blue) to make it stand out more
        variant: isActive ? "default" : "ghost",
        size,
      }),
      isActive && "pointer-events-none shadow-sm", // Add subtle shadow to active page
      className
    )}
    {...props}
  />
);

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Previous page"
    size="default"
    className={cn("gap-1 pl-2.5 font-medium", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Back</span> 
  </PaginationLink>
);

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Next page"
    size="default"
    className={cn("gap-1 pr-2.5 font-medium", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center text-slate-400", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

// Customizing Display Names
Pagination.displayName = "ECG_Pagination_Root";
PaginationContent.displayName = "Pagination_List";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};