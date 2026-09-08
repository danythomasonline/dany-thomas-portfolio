import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { runThemeTransition } from '../utils/viewTransition';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'dt-portfolio-theme';

interface ThemeContextValue {
  theme: Theme;
  toggleThemeWithTransition: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // useLayoutEffect (not useEffect) so this commits synchronously — flushSync inside
  // toggleThemeWithTransition relies on that to make the DOM reflect the new theme
  // before the view transition captures its "after" snapshot.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleThemeWithTransition = useCallback((origin?: { x: number; y: number }) => {
    runThemeTransition(origin, () => {
      flushSync(() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')));
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggleThemeWithTransition }), [theme, toggleThemeWithTransition]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
