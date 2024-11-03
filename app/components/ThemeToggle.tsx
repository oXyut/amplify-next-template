import { useTheme } from '../contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-primary-100 dark:bg-primary-900
        hover:bg-primary-200 dark:hover:bg-primary-800
        transform transition-all duration-500 ease-in-out
        hover:scale-110 active:scale-95
        shadow-lg hover:shadow-xl
        group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <FaSun 
          className={`w-6 h-6 text-primary-600 dark:text-primary-300
            absolute inset-0
            transform transition-all duration-500 ease-in-out
            ${theme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}
        />
        <FaMoon 
          className={`w-6 h-6 text-primary-600 dark:text-primary-300
            absolute inset-0
            transform transition-all duration-500 ease-in-out
            ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
        />
      </div>
    </button>
  )
} 