import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-mono transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00E0A4] relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#2979FF] to-[#00E0A4] text-white shadow-elevated hover:shadow-elevated-hover hover:from-[#3d8aff] hover:to-[#00f5b8] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        destructive:
          "bg-gradient-to-r from-[#FF5252] to-[#FF6B9D] text-white shadow-elevated hover:shadow-elevated-hover hover:from-[#ff6b6b] hover:to-[#ff7eb0] focus-visible:ring-[#FF5252]",
        outline:
          "border border-[#2F2F33] bg-[#0D0D0F] text-[#E8E8E8] hover:bg-[#151519] hover:border-[#2979FF]/50 hover:text-white shadow-sm hover:shadow-elevated",
        secondary:
          "bg-[#151519] text-[#E8E8E8] border border-[#2F2F33] hover:bg-[#1F1F23] hover:border-[#2979FF]/30 shadow-sm hover:shadow-elevated",
        ghost:
          "text-[#A0A0A5] hover:bg-[#151519] hover:text-[#E8E8E8] hover:shadow-sm",
        link:
          "text-[#2979FF] underline-offset-4 hover:underline hover:text-[#00E0A4]",
        premium:
          "bg-gradient-to-r from-[#9D4EDD] via-[#2979FF] to-[#00E0A4] text-white shadow-elevated hover:shadow-[0_8px_30px_rgba(41,121,255,0.4)] hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        success:
          "bg-gradient-to-r from-[#00E0A4] to-[#06FFA5] text-[#0D0D0F] font-semibold shadow-elevated hover:shadow-elevated-hover hover:from-[#00f5b8] hover:to-[#1bffb4]",
        warning:
          "bg-gradient-to-r from-[#FFB84D] to-[#FF9800] text-white shadow-elevated hover:shadow-elevated-hover",
      },
      size: {
        default: "h-9 px-5 py-2 has-[>svg]:px-4 text-sm tracking-tight",
        sm: "h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs tracking-tight",
        lg: "h-11 rounded-lg px-7 has-[>svg]:px-5 text-base tracking-tight",
        icon: "size-9 rounded-lg",
        xs: "h-6 rounded-md px-2 has-[>svg]:px-1.5 text-xs tracking-tight",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps =
  React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };