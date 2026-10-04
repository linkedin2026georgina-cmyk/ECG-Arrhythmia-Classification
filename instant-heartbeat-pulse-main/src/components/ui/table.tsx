import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * This Table component is the backbone of data visualization in my ECG app.
 * It's used to list patient records, heart beat classifications, and diagnostic results
 * in a clear, scannable format for medical staff.
 */

const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-lg border border-slate-100 shadow-sm">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
);

const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-slate-50/50 [&_tr]:border-b", className)} {...props} />
  )
);

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-blue-50/50 data-[state=selected]:bg-blue-50", 
        className
      )}
      {...props}
    />
  )
);

const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-bold text-slate-700 uppercase tracking-wider text-[11px]",
        className
      )}
      {...props}
    />
  )
);

const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle text-slate-600", className)} {...props} />
  )
);

// Specific names for my ECG project
Table.displayName = "ECG_Data_Table";
TableRow.displayName = "Table_Record_Row";

export { 
  Table, 
  TableHeader, 
  TableBody: forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ), 
  TableFooter: forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tfoot ref={ref} className={cn("border-t bg-slate-50 font-medium", className)} {...props} />
  ), 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption: forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
    ({ className, ...props }, ref) => <caption ref={ref} className={cn("mt-4 text-sm text-slate-400 italic", className)} {...props} />
  )
};