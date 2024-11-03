interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function ActionButton({ onClick, children }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-primary-700 text-white px-4 py-2 rounded-lg 
        hover:bg-primary-800 hover:border-primary-500 hover:border transition-colors
        dark:bg-primary-600 dark:hover:bg-primary-700 dark:hover:border-primary-400"
    >
      {children}
    </button>
  );
} 