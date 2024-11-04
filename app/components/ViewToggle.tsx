import { FaList, FaCalendar } from 'react-icons/fa';

interface ViewToggleProps {
  isCalendarView: boolean;
  onToggle: (isCalendarView: boolean) => void;
}

export function ViewToggle({ isCalendarView, onToggle }: ViewToggleProps) {
  return (
    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-full relative">
      <div
        className={`
          absolute top-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white dark:bg-gray-700 
          rounded-md shadow-sm transition-transform duration-300 ease-in-out
          ${isCalendarView ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}
        `}
      />

      <button
        onClick={() => onToggle(false)}
        className={`
          flex items-center justify-center gap-2 px-3 py-2 rounded-md w-1/2
          transition-colors duration-300 relative z-10
          ${!isCalendarView
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }
        `}
      >
        <FaList className="w-4 h-4" />
        <span>List</span>
      </button>

      <button
        onClick={() => onToggle(true)}
        className={`
          flex items-center justify-center gap-2 px-3 py-2 rounded-md w-1/2
          transition-colors duration-300 relative z-10
          ${isCalendarView
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }
        `}
      >
        <FaCalendar className="w-4 h-4" />
        <span>Calendar</span>
      </button>
    </div>
  );
} 