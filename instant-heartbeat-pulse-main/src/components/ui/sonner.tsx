import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

/**
 * I am using this Toaster component to provide real-time feedback to the doctor.
 * Whether it's a successful ECG classification or an error in data processing, 
 * these notifications keep the user informed without interrupting their workflow.
 */

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // I added 'richColors' to make success/error messages more visually distinct
      richColors 
      // I changed the position to top-right which is common in medical dashboards
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-2xl rounded-xl",
          description: "group-[.toast]:text-slate-500 font-medium",
          actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white rounded-md",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-600 rounded-md",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };