import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function CreateTodoModal({ isOpen, onClose, onSubmit }: CreateTodoModalProps) {
  const [content, setContent] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
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
              <div className="mt-4">
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
                disabled={!content.trim()}
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