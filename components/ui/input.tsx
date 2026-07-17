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
          "peer w-full bg-transparent border-0 border-b py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 transition-colors",
          error ? "border-red-400/60" : "border-white/15 focus:border-gold",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
