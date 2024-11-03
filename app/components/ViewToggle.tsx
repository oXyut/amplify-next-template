import { Squares2X2Icon as ViewListIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface ViewToggleProps {
  isCalendarView: boolean;
  onToggle: (isCalendarView: boolean) => void;
}

export function ViewToggle({ isCalendarView, onToggle }: ViewToggleProps) {
  return (
    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 w-full">
      <button
        onClick={() => onToggle(false)}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors w-1/2 ${
          !isCalendarView
            ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        <ViewListIcon className="w-5 h-5" />
        <span className="text-sm font-medium">List</span>
      </button>

      <button
        onClick={() => onToggle(true)}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors w-1/2 ${
          isCalendarView
            ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        <CalendarIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Calendar</span>
      </button>
    </div>
  );
} 