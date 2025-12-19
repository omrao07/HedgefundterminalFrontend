import React, { createContext, useContext, useState } from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export function SimpleTabs({
  value,
  onValueChange,
  className = "",
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function SimpleTabsList({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function SimpleTabsTrigger({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("SimpleTabsTrigger must be used within SimpleTabs");
  }

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange(value)}
      data-state={isActive ? "active" : "inactive"}
      className={className}
    >
      {children}
    </button>
  );
}

export function SimpleTabsContent({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("SimpleTabsContent must be used within SimpleTabs");
  }

  if (context.value !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
}
