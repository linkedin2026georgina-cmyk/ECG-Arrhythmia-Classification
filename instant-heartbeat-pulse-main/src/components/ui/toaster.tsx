import { useToast } from "@/hooks/use-toast";
import { 
  Toast, 
  ToastClose, 
  ToastDescription, 
  ToastProvider, 
  ToastTitle, 
  ToastViewport 
} from "@/components/ui/toast";

/**
 * This Toaster component is the global manager for all system notifications.
 * It listens to the useToast hook and renders any pending alerts, 
 * such as ECG upload status or heart rate abnormality warnings.
 */

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {/* Mapping through active notifications to display them in order */}
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="border-l-4 border-l-blue-600"> 
          {/* I added a blue left border for a more medical/professional look */}
          <div className="grid gap-1">
            {title && <ToastTitle className="text-sm font-bold">{title}</ToastTitle>}
            {description && (
              <ToastDescription className="text-xs opacity-80">
                {description}
              </ToastDescription>
            )}
          </div>
          {action}
          <ToastClose className="text-slate-400 hover:text-slate-900" />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}