import React, { forwardRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * I am using this OTP input component for secure doctor authentication.
 * It provides a clean interface for entering verification codes, 
 * ensuring that only authorized personnel can access sensitive ECG data.
 */

const InputOTP = forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-3 has-[:disabled]:opacity-40", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
);

const InputOTPGroup = forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
);

const InputOTPSlot = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-12 w-10 items-center justify-center border-2 border-slate-200 text-base font-bold transition-all rounded-md", // I made the borders thicker and changed font
        isActive && "z-10 border-blue-600 ring-2 ring-blue-100", // Custom focus color
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 bg-blue-600 animate-pulse duration-700" /> {/* Customized the caret */}
        </div>
      )}
    </div>
  );
});

const InputOTPSeparator = forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" className="text-slate-300" {...props}>
      <Dot size={32} />
    </div>
  )
);

// Customizing display names to match my project identity
InputOTP.displayName = "ECG_Auth_OTP";
InputOTPSlot.displayName = "OTP_Single_Slot";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };