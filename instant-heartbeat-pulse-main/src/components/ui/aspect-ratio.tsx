import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * I am using this component to maintain the correct proportions for the ECG signal displays.
 * It is important to keep a fixed ratio (like 16:9 or 2:1) so the heartbeat waves 
 * don't look distorted on different screen sizes (mobile vs desktop).
 */

// I renamed the root to be more specific to my project structure
const AspectRatio = AspectRatioPrimitive.Root;

// Using a custom name for the export to show it's part of the ECG UI kit
export { AspectRatio as ECG_AspectRatio };