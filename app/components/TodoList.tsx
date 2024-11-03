import type { Schema } from "@/amplify/data/resource";
import { format, isPast, isValid } from "date-fns";

interface TodoListProps {
  todos: Array<Schema["Todo"]["type"]>;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onDelete }: TodoListProps) {
  const formatDueDate = (date: Date) => {
    const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;
    return format(date, hasTime ? 'MMM d, yyyy HH:mm' : 'MMM d, yyyy');
  };

  return (
    <ul className="bg-black rounded-lg overflow-hidden divide-y divide-black">
      {todos.map((todo) => {
        const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
        const isOverdue = dueDate ? isPast(dueDate) : false;

        return (
          <li 
            key={todo.id}
            onClick={() => onDelete(todo.id)}
            className="bg-white dark:bg-gray-800 p-3 
              hover:bg-primary-50 dark:hover:bg-primary-900/50 
              cursor-pointer transition-colors group"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <span className="text-gray-900 dark:text-white">
                  {todo.content}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {`Created: ${format(new Date(todo.createdAt), 'MMM d, yyyy HH:mm')}`}
                </span>
              </div>
              {dueDate && (
                <div className={`text-xs ${
                  isOverdue 
                    ? 'text-status-danger-light dark:text-status-danger-dark' 
                    : 'text-status-success-light dark:text-status-success-dark'
                }`}>
                  Due: {formatDueDate(dueDate)}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
} 