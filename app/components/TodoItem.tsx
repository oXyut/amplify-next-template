import { format, isPast } from "date-fns";
import { Priority } from '../types/priority';

interface TodoItemProps {
  priority: Priority;
  content: string;
  dueDate?: Date;
  createdAt: Date;
  onDelete: () => void;
}

const getPriorityClasses = (priority: Priority) => {
  const priorityMap = {
    [Priority.Critical]: {
      containerClass: "border-l-4 border-l-priority-critical-border",
      badge: "bg-priority-critical-bg text-priority-critical-text",
    },
    [Priority.High]: {
      containerClass: "border-l-4 border-l-priority-high-border",
      badge: "bg-priority-high-bg text-priority-high-text",
    },
    [Priority.Medium]: {
      containerClass: "border-l-4 border-l-priority-medium-border",
      badge: "bg-priority-medium-bg text-priority-medium-text",
    },
    [Priority.Low]: {
      containerClass: "border-l-4 border-l-priority-low-border",
      badge: "bg-priority-low-bg text-priority-low-text",
    },
  } as const;

  return priorityMap[priority];
};

export function TodoItem({ priority, content, dueDate, createdAt, onDelete }: TodoItemProps) {
  const config = getPriorityClasses(priority);
  const isOverdue = dueDate ? isPast(dueDate) : false;

  return (
    <div 
      className={`
        relative rounded-lg p-4
        ${config.containerClass}
        bg-white dark:bg-gray-800
        hover:bg-gray-50 dark:hover:bg-gray-700
        transition-colors duration-200
        cursor-pointer
      `}
      onClick={onDelete}
    >
      <div className="flex items-center gap-3">
        <span className={`
          ${config.badge}
          px-2 py-1 rounded-full text-xs font-semibold
        `}>
          {priority}
        </span>
        
        <h3 className="text-gray-900 dark:text-gray-100 font-medium">
          {content}
        </h3>
      </div>

      <div className="mt-2 flex justify-between items-center text-sm">
        <div className="text-gray-600 dark:text-gray-400">
          Created: {format(createdAt, 'MMM d, yyyy HH:mm')}
        </div>
        
        {dueDate && (
          <div className={`
            ${isOverdue 
              ? 'text-status-danger-light dark:text-status-danger-dark' 
              : 'text-status-success-light dark:text-status-success-dark'
            }
          `}>
            Due: {format(dueDate, 'MMM d, yyyy HH:mm')}
          </div>
        )}
      </div>
    </div>
  );
} 