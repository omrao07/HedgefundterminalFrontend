import React from "react";

export function SimpleDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

export function SimpleDialogContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-[#0D0D0F] border border-[#1F1F23] rounded-lg p-6 w-full max-w-md ${className}`}>
      {children}
    </div>
  );
}

export function SimpleDialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mb-4">{children}</div>;
}

export function SimpleDialogTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className="text-lg mb-2">{children}</h2>;
}

export function SimpleDialogDescription({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={className}>{children}</p>;
}
