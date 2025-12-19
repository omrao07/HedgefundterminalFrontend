import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[#666] selection:bg-[#2979FF] selection:text-white bg-[#0D0D0F] border-[#2F2F33] flex h-9 w-full min-w-0 rounded-lg border px-4 py-2 text-sm text-[#E8E8E8] font-mono transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 shadow-sm",
        "focus:border-[#2979FF] focus:ring-2 focus:ring-[#2979FF]/20 focus:shadow-[0_0_20px_rgba(41,121,255,0.15)]",
        "hover:border-[#2979FF]/30",
        "aria-invalid:border-[#FF5252] aria-invalid:ring-2 aria-invalid:ring-[#FF5252]/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };