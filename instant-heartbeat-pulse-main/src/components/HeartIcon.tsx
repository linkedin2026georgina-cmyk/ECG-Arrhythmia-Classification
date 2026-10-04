import React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I developed this HeartIcon to act as a dynamic indicator.
 * It features a pulse animation that can be synchronized with 
 * real-time ECG R-peaks and a soft glow effect to enhance 
 * the medical dashboard's modern look.
 */

interface HeartIconProps {
  className?: string;
  animate?: boolean;
  status?: "normal" | "warning" | "critical";
}

const HeartIcon = ({ 
  className = "", 
  animate = true, 
  status = "normal" 
}: HeartIconProps) => {
  
  // Custom colors for different heart conditions
  const statusColors = {
    normal: "text-red-500 fill-red-500",
    warning: "text-amber-500 fill-amber-500",
    critical: "text-rose-700 fill-rose-700",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* The main heart icon */}
      <Heart 
        className={cn(
          "w-full h-full transition-colors duration-500 z-10",
          statusColors[status],
          animate && "animate-heartbeat"
        )}
      />
      
      {/* Decorative Glow - I adjusted the opacity for a cleaner look */}
      <div 
        className={cn(
          "absolute inset-0 blur-2xl rounded-full opacity-30 transition-colors duration-500",
          status === "normal" ? "bg-red-400" : 
          status === "warning" ? "bg-amber-400" : "bg-rose-600"
        )} 
      />
    </div>
  );
};

export default HeartIcon;