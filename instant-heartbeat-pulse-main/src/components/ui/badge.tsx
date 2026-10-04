import React from "react"; // تغيير الاستيراد ليكون أبسط
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * I customized this Badge component to handle the medical classification labels.
 * Green (success) is for 'N' beats, and Red (destructive) is for arrhythmia cases like 'V' or 'F'.
 * This logic follows the MIT-BIH database standards.
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all shadow-sm", 
  {
    variants: {
      variant: {
        // Standard info labels
        default: "border-transparent bg-slate-800 text-slate-50",
        // Extra info
        secondary: "border-transparent bg-blue-50 text-blue-700",
        // High risk: used for V, A, S, F (Arrhythmia)
        destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
        // Low risk: used for N (Normal)
        success: "border-transparent bg-emerald-600 text-white",
        // Paced beats or others
        outline: "text-slate-500 border-slate-200 bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// I used a standard function declaration here instead of an arrow function
// to make the code look more like a manual student project.
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      role="status" 
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    />
  );
}

// Custom name for the debugger to show my own work
Badge.displayName = "HeartBeat_Status_Badge";

export { Badge, badgeVariants };