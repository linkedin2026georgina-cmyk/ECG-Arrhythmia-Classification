import React, { createContext, useContext, useId, useMemo, forwardRef } from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

/**
 * I am using this Chart component to visualize the ECG signals.
 * I want to show the patient's heart rate and the classification 
 * results from the MIT-BIH database using professional graphs.
 */

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `ecg-chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ECG_Chart_Container";

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      indicator?: "line" | "dot" | "dashed";
    }
>(
  (
    { active, payload, className, indicator = "dot", hideLabel = false, label },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[9rem] gap-1.5 rounded-lg border bg-white p-2.5 shadow-xl", // Custom style
          className
        )}
      >
        {!hideLabel && <div className="font-bold border-b pb-1 mb-1">{label}</div>}
        <div className="grid gap-1.5">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-slate-500">{item.name}:</span>
              </div>
              <span className="font-mono font-bold text-blue-600">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ECG_Chart_Tooltip";

// I simplified ChartStyle and helpers to make it more readable
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, conf]) => conf.theme || conf.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
              ${colorConfig.map(([key, item]) => `--color-${key}: ${item.color};`).join("\n")}
            }
          `).join("\n"),
      }}
    />
  );
};

export { ChartContainer, ChartTooltipContent, ChartStyle };