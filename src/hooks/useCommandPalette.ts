import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from 'react';
import { Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useSectionHref } from './useSectionHref';
import { useResumeAvailability } from './useResumeAvailability';
import { commandDefinitions } from '../data/commands';
import { commandGroupLabels, type ResolvedCommand } from '../types/commandPalette';

const FOCUSABLE_SELECTOR = 'input, button:not([disabled]), a[href]';

export interface UseCommandPaletteResult {
  isOpen: boolean;
  toggle: () => void;
  close: (options?: { immediate?: boolean }) => void;
  suppressExitAnimation: boolean;
  query: string;
  setQuery: (value: string) => void;
  commands: ResolvedCommand[];
  activeId: string | null;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  executeCommand: (command: ResolvedCommand) => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  onDialogKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
}

export function useCommandPalette(): UseCommandPaletteResult {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [suppressExitAnimation, setSuppressExitAnimation] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);

  const navigate = useNavigate();
  const sectionHref = useSectionHref();
  const { theme, toggleThemeWithTransition } = useTheme();
  const resumeAvailable = useResumeAvailability();

  const commands = useMemo<ResolvedCommand[]>(
    () =>
      commandDefinitions.map((command) => {
        if (command.id === 'toggle-theme') {
          return {
            ...command,
            description: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
            icon: theme === 'dark' ? Sun : Moon,
            disabled: false,
          };
        }
        if (command.id === 'download-resume') {
          return {
            ...command,
            description: resumeAvailable ? command.description : 'Résumé unavailable',
            disabled: !resumeAvailable,
          };
        }
        return { ...command, disabled: false };
      }),
    [theme, resumeAvailable],
  );

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;

    return commands.filter((command) => {
      const haystack = [command.title, command.description, commandGroupLabels[command.group], ...(command.keywords ?? [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    triggerElRef.current?.focus();
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) return false;
      triggerElRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      return true;
    });
    setQuery('');
    setSuppressExitAnimation(false);
  }, []);

  const close = useCallback((options?: { immediate?: boolean }) => {
    setSuppressExitAnimation(!!options?.immediate);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
      if (!isShortcut) return;
      event.preventDefault();
      toggle();
    }

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [toggle]);

  const executeCommand = useCallback(
    (command: ResolvedCommand) => {
      if (command.disabled) return;

      if (command.action.type === 'theme-toggle') {
        // Capture the command row's position before it's removed, and skip the
        // palette's own fade-out so its snapshot can't linger over the new theme.
        const rect = document.getElementById(`command-option-${command.id}`)?.getBoundingClientRect();
        const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined;
        close({ immediate: true });
        toggleThemeWithTransition(origin);
        return;
      }

      close();

      switch (command.action.type) {
        case 'scroll':
          navigate(sectionHref(command.action.target));
          break;
        case 'download': {
          const link = document.createElement('a');
          link.href = command.action.href;
          link.download = command.action.fileName;
          link.click();
          break;
        }
        case 'external':
          window.open(command.action.href, '_blank', 'noopener,noreferrer');
          break;
        case 'mailto':
          window.location.href = `mailto:${command.action.email}`;
          break;
      }
    },
    [close, navigate, sectionHref, toggleThemeWithTransition],
  );

  const onDialogKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          close();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter': {
          event.preventDefault();
          const command = filteredCommands[activeIndex];
          if (command) executeCommand(command);
          break;
        }
        case 'Tab': {
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
          if (!focusables || focusables.length === 0) return;
          const list = Array.from(focusables);
          const first = list[0];
          const last = list[list.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    },
    [close, executeCommand, filteredCommands, activeIndex],
  );

  const activeId = filteredCommands[activeIndex]?.id ?? null;

  return {
    isOpen,
    toggle,
    close,
    suppressExitAnimation,
    query,
    setQuery,
    commands: filteredCommands,
    activeId,
    activeIndex,
    setActiveIndex,
    executeCommand,
    dialogRef,
    inputRef,
    onDialogKeyDown,
  };
}
