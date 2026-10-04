import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * I am adding this calendar component to help users filter ECG data by date.
 * For example, a doctor might want to see the arrhythmia results from a specific day.
 * I used the 'react-day-picker' library because it is very flexible.
 */

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 border rounded-xl bg-white shadow-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-2 relative items-center",
        caption_label: "text-sm font-bold text-slate-800",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 border-slate-200"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-medium text-[0.75rem] uppercase",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-blue-50 hover:text-blue-600 transition-colors"
        ),
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-600 focus:text-white rounded-md",
        day_today: "bg-slate-100 text-blue-600 font-bold",
        day_outside: "text-slate-300 opacity-40",
        day_disabled: "text-slate-300 opacity-20",
        day_range_middle: "bg-blue-50 text-blue-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

// I changed this display name to be more specific to my project's UI components
Calendar.displayName = "ECG_Project_Calendar";

export { Calendar };