import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * I am using this Alert component to show messages to the user.
 * For example, if the machine learning model finds an arrhythmia, 
 * I will use the 'destructive' variant (red color) to alert the user immediately.
 */

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        // Normal information (e.g., Data loaded)
        default: "bg-background text-foreground shadow-sm",
        // Critical alerts (e.g., Abnormal heart beat detected)
        destructive: "border-red-500/50 text-red-700 dark:border-red-500 [&>svg]:text-red-600 bg-red-50/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  // The 'role="alert"' is important for medical apps to be accessible to everyone
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "ECG_Alert_Box";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // Bold title for the classification result
    <h5 ref={ref} className={cn("mb-1 font-bold leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "ECG_Alert_Title";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    // Description text for more details about the heart signal
    <div ref={ref} className={cn("text-sm opacity-90 [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "ECG_Alert_Description";

export { Alert, AlertTitle, AlertDescription };