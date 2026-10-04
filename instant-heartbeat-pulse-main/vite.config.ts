import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite configuration file
export default defineConfig(() => ({
  // Local development server settings
  server: {
    host: "::",
    port: 5173,
  },

  // React plugin
  plugins: [react()],

  // Path alias for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
