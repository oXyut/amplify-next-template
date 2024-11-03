interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function ActionButton({ onClick, children }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-primary-700 text-white px-4 py-2 rounded-lg 
        hover:bg-primary-800 hover:ring-primary-500 hover:ring-2 transition-colors
        dark:bg-primary-600 dark:hover:bg-primary-700 dark:hover:ring-primary-400 flex items-center justify-center"
    >
      {children}
    </button>
  );
} 