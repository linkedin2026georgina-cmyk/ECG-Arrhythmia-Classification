import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeartIcon from "@/components/HeartIcon";

/**
 * NotFound page shown when the user visits an unknown route.
 * It provides a simple message and a way to return to the main page.
 */

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log missing route for debugging
    console.error(`404 Route Not Found: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="space-y-6 animate-in fade-in zoom-in duration-500">
        
        {/* Visual icon for the error page */}
        <div className="flex justify-center">
          <div className="relative">
            <HeartIcon className="w-24 h-24 opacity-20" animate={false} />
            <AlertCircle className="absolute bottom-0 right-0 w-8 h-8 text-rose-500 bg-white rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-black text-slate-200">404</h1>
          <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
          <p className="text-slate-500 max-w-xs mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <footer className="absolute bottom-8 text-xs text-slate-400 font-medium">
        ECG Diagnostics | 404
      </footer>
    </div>
  );
};

export default NotFound;
