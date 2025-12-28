import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium font-mono w-fit whitespace-nowrap shrink-0 gap-1.5 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00E0A4] transition-all duration-300 overflow-hidden uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "border-[#2979FF]/40 bg-[#2979FF]/10 text-[#2979FF] shadow-sm hover:bg-[#2979FF]/20 hover:border-[#2979FF]/60 hover:shadow-[0_0_15px_rgba(41,121,255,0.2)]",
        secondary:
          "border-[#2F2F33] bg-[#151519] text-[#A0A0A5] hover:bg-[#1F1F23] hover:border-[#2979FF]/30 hover:text-[#E8E8E8] shadow-sm",
        destructive:
          "border-[#FF5252]/40 bg-[#FF5252]/10 text-[#FF5252] hover:bg-[#FF5252]/20 hover:border-[#FF5252]/60 shadow-sm hover:shadow-[0_0_15px_rgba(255,82,82,0.2)]",
        outline:
          "border-[#2F2F33] text-[#E8E8E8] bg-transparent hover:bg-[#151519] hover:border-[#2979FF]/50 shadow-sm",
        success:
          "border-[#00E0A4]/40 bg-[#00E0A4]/10 text-[#00E0A4] hover:bg-[#00E0A4]/20 hover:border-[#00E0A4]/60 shadow-sm hover:shadow-[0_0_15px_rgba(0,224,164,0.2)]",
        warning:
          "border-[#FFB84D]/40 bg-[#FFB84D]/10 text-[#FFB84D] hover:bg-[#FFB84D]/20 hover:border-[#FFB84D]/60 shadow-sm hover:shadow-[0_0_15px_rgba(255,184,77,0.2)]",
        purple:
          "border-[#9D4EDD]/40 bg-[#9D4EDD]/10 text-[#9D4EDD] hover:bg-[#9D4EDD]/20 hover:border-[#9D4EDD]/60 shadow-sm hover:shadow-[0_0_15px_rgba(157,78,221,0.2)]",
        cyan:
          "border-[#06FFA5]/40 bg-[#06FFA5]/10 text-[#06FFA5] hover:bg-[#06FFA5]/20 hover:border-[#06FFA5]/60 shadow-sm hover:shadow-[0_0_15px_rgba(6,255,165,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps =
  React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };