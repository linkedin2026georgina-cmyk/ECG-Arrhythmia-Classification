import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * I am using this component to save space on the dashboard.
 * I want to hide extra medical details or configuration settings
 * so the doctor can focus primarily on the ECG signal analysis.
 */

// I'm exporting these with their original names to keep the project working
const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

// Custom display names for better debugging in my project
Collapsible.displayName = "ECG_Collapsible_Section";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };