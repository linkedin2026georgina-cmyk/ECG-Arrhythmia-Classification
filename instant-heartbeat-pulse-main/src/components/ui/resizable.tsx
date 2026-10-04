import React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/utils";

/**
 * I am implementing resizable panels to give doctors more control over the workspace.
 * This is particularly useful when they need to expand the ECG chart area 
 * to examine small beat details by shrinking the sidebar or info panels.
 */

const ResizablePanelGroup = ({ 
  className, 
  ...props 
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col", 
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // I customized the handle area to be slightly wider for easier grabbing
      "relative flex w-1.5 items-center justify-center bg-slate-100 transition-colors hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400",
      "data-[panel-group-direction=vertical]:h-1.5 data-[panel-group-direction=vertical]:w-full",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-4 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm transition-transform active:scale-95">
        <GripVertical className="h-3 w-3 text-slate-400" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

// I renamed the exports slightly for internal clarity
export { 
  ResizablePanelGroup as PanelGroup, 
  ResizablePanel as Panel, 
  ResizableHandle as PanelHandle 
};