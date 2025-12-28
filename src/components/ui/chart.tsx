"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

// Theme selectors
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within <ChartContainer />");
  return ctx;
}

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
};

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: ChartContainerProps) {
  const reactId = React.useId();
  const chartId = `chart-${id ?? reactId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config).filter(
    ([, v]) => v.color || v.theme,
  );

  if (!entries.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, selector]) => {
            const vars = entries
              .map(([key, cfg]) => {
                const value =
                  cfg.theme?.[theme as keyof typeof cfg.theme] ?? cfg.color;
                return value ? `--color-${key}: ${value};` : null;
              })
              .filter(Boolean)
              .join("\n");

            return `${selector} [data-chart="${id}"] { ${vars} }`;
          })
          .join("\n"),
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartLegend = RechartsPrimitive.Legend;

function ChartTooltipContent(
  props: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "dot" | "line" | "dashed";
      nameKey?: string;
      labelKey?: string;
    },
) {
  const {
    active,
    payload,
    className,
    hideLabel,
    indicator = "dot",
  } = props;

  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "bg-background border border-border rounded-lg px-3 py-2 shadow-xl text-xs",
        className,
      )}
    >
      {payload.map((item, i) => {
        const key = String(item.dataKey ?? item.name ?? i);
        const cfg = config[key];

        return (
          <div key={i} className="flex items-center gap-2">
            {!hideLabel && (
              <span className="text-muted-foreground">
                {cfg?.label ?? item.name}
              </span>
            )}
            <span className="ml-auto font-mono">
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ChartLegendContent(
  props: React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload"> & {
      hideIcon?: boolean;
    },
) {
  const { payload, className, hideIcon } = props;
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {payload.map((item) => {
        const key = String(item.dataKey);
        const cfg = config[key];

        return (
          <div key={key} className="flex items-center gap-2 text-xs">
            {!hideIcon && cfg?.icon ? (
              <cfg.icon />
            ) : (
              <span
                className="h-2 w-2 rounded"
                style={{ backgroundColor: item.color }}
              />
            )}
            {cfg?.label ?? item.value}
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};