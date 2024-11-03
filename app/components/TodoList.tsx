import type { Schema } from "@/amplify/data/resource";
import { format } from "date-fns";

interface TodoListProps {
  todos: Array<Schema["Todo"]["type"]>;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onDelete }: TodoListProps) {
  return (
    <ul className="bg-black rounded-lg overflow-hidden divide-y divide-black">
      {todos.map((todo) => (
        <li 
          key={todo.id} 
          onClick={() => onDelete(todo.id)}
          className="bg-white dark:bg-gray-800 p-3 
            hover:bg-primary-50 dark:hover:bg-primary-900/50 
            cursor-pointer transition-colors group"
        >
          <div className="flex justify-between items-start">
            <span className="text-gray-900 dark:text-white">
              {todo.content}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {todo.createdAt ? format(new Date(todo.createdAt), 'MMM d, yyyy HH:mm') : ''}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
} 