import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * I am building this Input component to handle all text entries in the app.
 * It's used for patient details, searching the MIT-BIH records, and 
 * entering manual configuration for the ECG analysis.
 */

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // I adjusted the padding and border color to look more professional
          "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm transition-all shadow-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-bold",
          "placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none",
          "disabled:bg-slate-50 disabled:cursor-not-allowed opacity-100",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

// I renamed the display name to reflect the project theme
Input.displayName = "ECG_Data_Input";

export { Input };