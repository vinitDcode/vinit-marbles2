"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "peer w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 backdrop-blur-xl transition-colors focus:outline-none focus:ring-0",
          error
            ? "border-red-400/50 focus:border-red-400/70"
            : "border-white/[0.1] focus:border-gold/60",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
