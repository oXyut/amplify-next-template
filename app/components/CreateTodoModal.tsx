import { useState, useRef, useEffect } from 'react';
import { XMarkIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Calendar } from './Calendar';
import { Priority } from "@/app/types/priority";
import { PrioritySlider } from './PrioritySlider';

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, dueDate?: string, includeTime?: boolean, priority?: Priority) => void;
}

export function CreateTodoModal({ isOpen, onClose, onSubmit }: CreateTodoModalProps) {
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [includeTime, setIncludeTime] = useState(false);
  const [hasDueDate, setHasDueDate] = useState(false);
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(
        content,
        hasDueDate ? dueDate : undefined,
        includeTime,
        priority
      );
      setContent('');
      setDueDate('');
      setIncludeTime(false);
      setHasDueDate(false);
      onClose();
    }
  };

  const today = new Date().toISOString().slice(0, includeTime ? 16 : 10);

  const handleDateChange = (date: Date) => {
    setDueDate(date.toISOString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 
            px-4 pb-4 pt-5 shadow-xl transition-all w-full max-w-md"
        >
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="text-center sm:mt-0 sm:text-left">
              <h3 
                className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Create New Todo
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 
                      p-3 text-sm focus:border-primary-500 focus:outline-none
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hasDueDate}
                        onChange={(e) => {
                          setHasDueDate(e.target.checked);
                          if (!e.target.checked) {
                            setDueDate('');
                            setIncludeTime(false);
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 
                          focus:ring-primary-500 h-4 w-4 mr-2"
                      />
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
                        Set due date
                      </span>
                    </label>
                    
                    {hasDueDate && (
                      <label className="flex items-center ml-auto">
                        <input
                          type="checkbox"
                          checked={includeTime}
                          onChange={(e) => {
                            setIncludeTime(e.target.checked);
                            setDueDate('');
                          }}
                          className="rounded border-gray-300 text-primary-600 
                            focus:ring-primary-500 h-4 w-4 mr-2"
                        />
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
                          Include time
                        </span>
                      </label>
                    )}
                  </div>

                  {hasDueDate && (
                    <div className="mt-4">
                      <Calendar
                        selectedDate={dueDate ? new Date(dueDate) : null}
                        onChange={handleDateChange}
                        includeTime={includeTime}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <PrioritySlider
                    value={priority}
                    onChange={setPriority}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 
                  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                  focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim() || (hasDueDate && !dueDate)}
                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold 
                  text-white shadow-sm hover:bg-primary-500 
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}