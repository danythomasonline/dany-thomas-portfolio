import { CornerDownLeft } from 'lucide-react';
import type { ResolvedCommand } from '../../types/commandPalette';

interface CommandItemProps {
  command: ResolvedCommand;
  active: boolean;
  groupIndex: number;
  onSelect: () => void;
  onHover: () => void;
}

export function CommandItem({ command, active, groupIndex, onSelect, onHover }: CommandItemProps) {
  const Icon = command.icon;

  return (
    <li
      id={`command-option-${command.id}`}
      role="option"
      aria-selected={active}
      aria-disabled={command.disabled || undefined}
      className={`command-palette__item ${active ? 'command-palette__item--active' : ''} ${
        command.disabled ? 'command-palette__item--disabled' : ''
      }`}
      style={{ animationDelay: `${Math.min(groupIndex, 8) * 20}ms` }}
      onMouseEnter={onHover}
      onClick={() => !command.disabled && onSelect()}
    >
      <span className="command-palette__item-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <span className="command-palette__item-text">
        <span className="command-palette__item-title">{command.title}</span>
        <span className="command-palette__item-description">{command.description}</span>
      </span>
      <span className="command-palette__item-hint" aria-hidden="true">
        <CornerDownLeft size={14} />
      </span>
    </li>
  );
}
