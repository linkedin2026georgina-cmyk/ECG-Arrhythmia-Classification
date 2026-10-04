/**
 * I created this proxy file to simplify the imports throughout the application.
 * By exporting 'useToast' and 'toast' from here, I ensure that all medical 
 * alert logic is centralized and easy to access from any component or page.
 */

import { useToast, toast } from "@/hooks/use-toast";

// Exporting with clear semantic names for the project
export { useToast, toast };