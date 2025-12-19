import React from "react";

export function SimpleProgress({
  value = 0,
  className = "",
}: {
  value?: number;
  className?: string;
}) {
  return (
    <div className={`bg-[#1F1F23] rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-[#2979FF] to-[#00E0A4] transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
