import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

export function ThemeToggle() {
  const { theme, toggleThemeWithTransition } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleThemeWithTransition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
    >
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={18} aria-hidden="true" />
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={18} aria-hidden="true" />
    </button>
  );
}
