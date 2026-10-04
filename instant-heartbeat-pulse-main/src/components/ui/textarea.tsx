import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * I am using this Textarea component for medical reporting and clinical notes.
 * It's essential for allowing cardiologists to write their final diagnosis 
 * and recommendations after reviewing the ECG analysis results.
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // I increased the minimum height and updated the border colors
        "flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition-all",
        "placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none",
        "disabled:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

// Using a custom display name to fit the ECG project theme
Textarea.displayName = "ECG_Diagnosis_Area";

export { Textarea };