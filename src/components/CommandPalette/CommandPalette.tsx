import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect } from 'react';
import { CommandItem } from './CommandItem';
import { useCommandPalette } from '../../hooks/useCommandPalette';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { commandGroupLabels, type CommandGroupId } from '../../types/commandPalette';
import './CommandPalette.scss';

const GROUP_ORDER: CommandGroupId[] = ['navigation', 'actions'];

export function CommandPalette({ palette }: { palette: ReturnType<typeof useCommandPalette> }) {
  const {
    isOpen,
    close,
    suppressExitAnimation,
    query,
    setQuery,
    commands,
    activeId,
    activeIndex,
    setActiveIndex,
    executeCommand,
    dialogRef,
    inputRef,
    onDialogKeyDown,
  } = palette;
  const prefersReduced = useReducedMotion();
  const skipExit = prefersReduced || suppressExitAnimation;

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    root.inert = isOpen;
    return () => {
      root.inert = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !activeId) return;
    document.getElementById(`command-option-${activeId}`)?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeId]);

  const groups = GROUP_ORDER.map((group) => ({
    id: group,
    label: commandGroupLabels[group],
    items: commands.filter((command) => command.group === group),
  })).filter((group) => group.items.length > 0);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-palette-overlay"
          initial={prefersReduced ? undefined : { opacity: 0 }}
          animate={prefersReduced ? undefined : { opacity: 1 }}
          exit={skipExit ? undefined : { opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.01 : 0.2, ease: 'easeOut' }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            ref={dialogRef}
            className="command-palette"
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            aria-describedby="command-palette-description"
            onKeyDown={onDialogKeyDown}
            initial={prefersReduced ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={skipExit ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="command-palette__header">
              <div className="command-palette__heading">
                <h2 id="command-palette-title">Quick navigation</h2>
                <p id="command-palette-description">Navigate anywhere in the portfolio.</p>
              </div>
              <button
                type="button"
                className="command-palette__close"
                onClick={() => close()}
                aria-label="Close command palette"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="command-palette__search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={activeId ? `command-option-${activeId}` : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Search pages and actions…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="command-palette__body">
              {commands.length === 0 ? (
                <p className="command-palette__empty">No matching command found.</p>
              ) : (
                <div id="command-palette-list" role="listbox" aria-label="Commands">
                  {groups.map((group) => (
                    <div key={group.id} className="command-palette__group" role="group" aria-labelledby={`command-group-${group.id}`}>
                      <span id={`command-group-${group.id}`} className="command-palette__group-label">
                        {group.label}
                      </span>
                      <ul role="presentation" className="command-palette__group-list">
                        {group.items.map((command, groupIndex) => {
                          const index = commands.indexOf(command);
                          return (
                            <CommandItem
                              key={command.id}
                              command={command}
                              active={index === activeIndex}
                              groupIndex={groupIndex}
                              onSelect={() => executeCommand(command)}
                              onHover={() => setActiveIndex(index)}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="command-palette__footer">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> Navigate
              </span>
              <span>
                <kbd>↵</kbd> Select
              </span>
              <span>
                <kbd>Esc</kbd> Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
