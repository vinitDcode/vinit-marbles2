"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 backdrop-blur-xl transition-colors resize-none min-h-[110px] focus:outline-none focus:ring-0",
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
Textarea.displayName = "Textarea";

export { Textarea };
