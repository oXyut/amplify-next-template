import { Schema } from "@/amplify/data/resource";
import { Dialog } from "@headlessui/react";
import { FaTimes } from 'react-icons/fa';
import { Priority } from "../types/priority";
import { getPriorityClasses } from "../utils/priorityUtils";
import { useState, useEffect } from "react";

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  todos: Array<Schema["Todo"]["type"]>;
  onComplete: (todoId: string) => void;
}

export function DayDetailModal({ isOpen, onClose, date, todos, onComplete }: DayDetailModalProps) {
  const [localTodos, setLocalTodos] = useState(todos);
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  const handleComplete = async (todoId: string) => {
    try {
      setIsDeleting(prev => ({ ...prev, [todoId]: true }));
      setLocalTodos(localTodos.filter(todo => todo.id !== todoId));
      onComplete(todoId);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setLocalTodos(todos);
    } finally {
      setIsDeleting(prev => ({ ...prev, [todoId]: false }));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full rounded-xl bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              {date.toLocaleDateString(undefined, { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tasks for this day
            </h3>
            <div className="space-y-2">
              {localTodos.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tasks scheduled for this day
                </p>
              ) : (
                localTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`
                      p-3 rounded-lg
                      bg-gray-50 dark:bg-gray-900/50
                      border border-gray-100 dark:border-gray-800
                      border-l-2
                      ${getPriorityClasses(todo.priority as Priority).border}
                      group
                      hover:bg-gray-100 dark:hover:bg-gray-900
                      transition-colors
                      cursor-pointer
                    `}
                    onClick={() => handleComplete(todo.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {todo.content}
                        </p>
                        {todo.dueDate && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Due: {new Date(todo.dueDate).toLocaleTimeString([], { 
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 