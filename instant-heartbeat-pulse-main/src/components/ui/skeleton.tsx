import { cn } from "@/lib/utils";

/**
 * I am using this Skeleton component to improve the user experience (UX).
 * Since ECG signals and patient records take time to load from the database,
 * these pulsating placeholders keep the UI stable and inform the doctor 
 * that the content is being fetched.
 */

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // I kept the pulse animation but used a slightly different slate color
        "animate-pulse rounded-lg bg-slate-200/60", 
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };