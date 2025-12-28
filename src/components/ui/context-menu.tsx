"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "./utils";

/* -------------------------------------------------------------------------------------------------
 * Root
 * ------------------------------------------------------------------------------------------------- */

function ContextMenu(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Root>
) {
  return (
    <ContextMenuPrimitive.Root
      data-slot="context-menu"
      {...props}
    />
  );
}

function ContextMenuTrigger(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>
) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Content
 * ------------------------------------------------------------------------------------------------- */

function ContextMenuContent(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Content>
) {
  const { className, ...rest } = props;

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...rest}
      />
    </ContextMenuPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Items
 * ------------------------------------------------------------------------------------------------- */

function ContextMenuItem(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  }
) {
  const {
    className,
    inset,
    variant = "default",
    ...rest
  } = props;

  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        variant === "destructive" &&
          "text-destructive focus:bg-destructive/10",
        className,
      )}
      {...rest}
    />
  );
}

function ContextMenuCheckboxItem(
  props: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>
) {
  const { className, children, ...rest } = props;

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm",
        "focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...rest}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem(
  props: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>
) {
  const { className, children, ...rest } = props;

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm",
        "focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...rest}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Submenus
 * ------------------------------------------------------------------------------------------------- */

function ContextMenuSub(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Sub>
) {
  return (
    <ContextMenuPrimitive.Sub
      data-slot="context-menu-sub"
      {...props}
    />
  );
}

function ContextMenuSubTrigger(
  props: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
) {
  const { className, inset, children, ...rest } = props;

  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex items-center rounded-sm px-2 py-1.5 text-sm select-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[inset]:pl-8",
        className,
      )}
      {...rest}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent(
  props: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>
) {
  const { className, ...rest } = props;

  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-lg",
        className,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Misc
 * ------------------------------------------------------------------------------------------------- */

function ContextMenuLabel(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
) {
  const { className, inset, ...rest } = props;

  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className,
      )}
      {...rest}
    />
  );
}

function ContextMenuSeparator(
  props: React.ComponentProps<typeof ContextMenuPrimitive.Separator>
) {
  const { className, ...rest } = props;

  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...rest}
    />
  );
}

function ContextMenuShortcut(
  props: React.ComponentProps<"span">
) {
  const { className, ...rest } = props;

  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------- */

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};