import React from "react";

export function SimpleScrollArea({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`overflow-auto ${className}`}>
      {children}
    </div>
  );
}
