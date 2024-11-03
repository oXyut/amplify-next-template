import { Priority } from '@/app/types/priority';
import { BoltIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface PrioritySliderProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}

export function PrioritySlider({ value, onChange }: PrioritySliderProps) {
  const priorities = [Priority.Low, Priority.Medium, Priority.High, Priority.Critical];
  const currentIndex = priorities.indexOf(value);

  const getColor = (priority: Priority) => {
    switch (priority) {
      case Priority.Low:
        return 'bg-green-500';
      case Priority.Medium:
        return 'bg-yellow-500';
      case Priority.High:
        return 'bg-orange-500';
      case Priority.Critical:
        return 'bg-red-500';
    }
  };

  return (
    <div className="mb-8">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <span className={clsx(
          "inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium",
          getColor(value),
          "text-white"
        )}>
          <BoltIcon className="w-4 h-4" />
          {value}
        </span>
      </div>
      
      {/* スライダー */}
      <div className="relative h-2 mx-8">
        {/* バックグラウンドトラック */}
        <div className="absolute inset-x-0 inset-y-0 bg-gray-200 dark:bg-gray-700 rounded-full" />
        
        {/* プログレスバー */}
        <div
          className={clsx(
            "absolute h-full rounded-full transition-all duration-200 ease-in-out",
            getColor(value)
          )}
          style={{
            left: '0',
            right: `calc(100% - ${(currentIndex / (priorities.length - 1)) * 100}%)`
          }}
        />

        {/* ハンドル */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out"
          style={{
            left: `${(currentIndex / (priorities.length - 1)) * 100}%`
          }}
        >
          <div className={clsx(
            "w-4 h-4 -ml-2 rounded-full shadow-md border-2 border-white transition-colors duration-200",
            getColor(value)
          )} />
        </div>
        
        {/* スライダー入力 */}
        <input
          type="range"
          min="0"
          max="3"
          value={currentIndex}
          onChange={(e) => onChange(priorities[parseInt(e.target.value)])}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      {/* ラベル */}
      <div className="flex justify-between mt-2">
        {priorities.map((priority) => (
          <div
            key={priority}
            className="w-16 text-center"
          >
            <span
              className={clsx(
                "text-xs font-medium cursor-pointer",
                value === priority
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              )}
              onClick={() => onChange(priority)}
            >
              {priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 