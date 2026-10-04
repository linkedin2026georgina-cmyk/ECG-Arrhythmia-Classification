import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * Root application component.
 * Global providers and routing are configured here.
 */

// Query client used for data fetching and caching
const clinicalQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={clinicalQueryClient}>
    <TooltipProvider delayDuration={300}>
      {/* Global notification components */}
      <Toaster />
      <Sonner position="top-right" />

      <BrowserRouter>
        <Routes>
          {/* Main page */}
          <Route path="/" element={<Index />} />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
