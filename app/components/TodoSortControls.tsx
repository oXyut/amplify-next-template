import { type SortType, type SortOrder } from '../types/sort';
import {
  BoltIcon,
  CalendarDaysIcon,
  ClockIcon,
  ChevronDownIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TodoSortControlsProps {
  sortType: SortType;
  sortOrder: SortOrder;
  onSortTypeChange: (type: SortType) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

const sortButtons = [
  {
    type: 'priority' as SortType,
    label: 'Priority',
    Icon: BoltIcon,
  },
  {
    type: 'created' as SortType,
    label: 'Created',
    Icon: CalendarDaysIcon,
  },
  {
    type: 'due' as SortType,
    label: 'Due',
    Icon: ClockIcon,
  },
] as const;

export function TodoSortControls({
  sortType,
  sortOrder,
  onSortTypeChange,
  onSortOrderChange,
}: TodoSortControlsProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
        Sort by
      </div>
      <div className="inline-flex rounded-lg shadow-sm w-full">
        {sortButtons.map(({ type, label, Icon }) => (
          <div key={type} className="relative group flex-1">
            <button
              onClick={() => onSortTypeChange(type)}
              className={clsx(
                'px-2 sm:px-4 py-2 text-sm font-medium w-full h-10',
                'border border-gray-200 dark:border-gray-600',
                'focus:z-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                'dark:focus:ring-primary-400 dark:focus:border-primary-400',
                'transition-colors duration-200 flex items-center',
                
                type === sortType
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
                
                {
                  'rounded-l-lg': type === 'priority',
                  'rounded-r-lg': type === 'due',
                }
              )}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Icon className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
                <span className="flex-shrink-0">{label}</span>
                <span className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center">
                  {type === sortType && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={clsx(
                        'rounded-full w-full h-full',
                        'bg-white/20 hover:bg-white/30',
                        'transition-all duration-200',
                        'active:scale-90',
                        'transform',
                        'flex items-center justify-center',
                        sortOrder === 'asc' && 'rotate-180'
                      )}
                    >
                      <ArrowDownIcon className="w-5 h-5" />
                    </button>
                  )}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 