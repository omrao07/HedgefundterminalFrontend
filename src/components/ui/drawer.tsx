"use client";

import * as React from "react";
import { Drawer } from "vaul";

import { cn } from "./utils";

/* -----------------------------------------------------------------------------
 * Root
 * ---------------------------------------------------------------------------*/
function DrawerRoot(props: React.ComponentProps<typeof Drawer.Root>) {
  return <Drawer.Root data-slot="drawer" {...props} />;
}

/* -----------------------------------------------------------------------------
 * Trigger
 * ---------------------------------------------------------------------------*/
function DrawerTrigger(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Drawer.Trigger data-slot="drawer-trigger" {...props} />
  );
}

/* -----------------------------------------------------------------------------
 * Portal
 * ---------------------------------------------------------------------------*/
function DrawerPortal(
  props: React.ComponentPropsWithoutRef<"div">
) {
  return (
    <Drawer.Portal data-slot="drawer-portal" {...props} />
  );
}

/* -----------------------------------------------------------------------------
 * Close
 * ---------------------------------------------------------------------------*/
function DrawerClose(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Drawer.Close data-slot="drawer-close" {...props} />
  );
}

/* -----------------------------------------------------------------------------
 * Overlay
 * ---------------------------------------------------------------------------*/
function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Drawer.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Content
 * ---------------------------------------------------------------------------*/
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <Drawer.Content
        data-slot="drawer-content"
        className={cn(
          "fixed z-50 flex flex-col bg-background",
          "data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:rounded-t-lg",
          "data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:rounded-b-lg",
          "data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:w-3/4 sm:max-w-sm",
          "data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:w-3/4 sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-muted" />
        {children}
      </Drawer.Content>
    </DrawerPortal>
  );
}

/* -----------------------------------------------------------------------------
 * Header / Footer
 * ---------------------------------------------------------------------------*/
function DrawerHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto p-4", className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Title / Description
 * ---------------------------------------------------------------------------*/
function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <Drawer.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <Drawer.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Exports
 * ---------------------------------------------------------------------------*/
export {
  DrawerRoot as Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};