import { Search } from 'lucide-react';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform ?? navigator.userAgent);

interface CommandPaletteTriggerProps {
  onClick: () => void;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function CommandPaletteTrigger({ onClick, variant = 'desktop', className = '' }: CommandPaletteTriggerProps) {
  if (variant === 'mobile') {
    return (
      <button
        type="button"
        className={`command-palette-trigger command-palette-trigger--mobile ${className}`}
        onClick={onClick}
        aria-label="Open command palette"
      >
        <Search size={18} aria-hidden="true" />
        <span>Search commands</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`command-palette-trigger ${className}`}
      onClick={onClick}
      aria-label="Open command palette"
    >
      <Search size={16} aria-hidden="true" />
      <span className="command-palette-trigger__kbd" aria-hidden="true">
        {isMac ? '⌘ K' : 'Ctrl K'}
      </span>
    </button>
  );
}
