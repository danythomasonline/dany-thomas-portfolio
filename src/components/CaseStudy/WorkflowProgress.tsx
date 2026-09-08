import { useEffect, useRef, type KeyboardEvent } from 'react';
import type { WorkflowStage } from '../../types/caseStudy';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WorkflowProgressProps {
  stages: WorkflowStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  idPrefix: string;
}

export function WorkflowProgress({ stages, activeIndex, onSelect, idPrefix }: WorkflowProgressProps) {
  const prefersReduced = useReducedMotion();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Keeps the active tab in view on the horizontally-scrollable mobile/tablet track.
  // A no-op in the desktop grid layout (nothing to scroll there).
  useEffect(() => {
    buttonRefs.current[activeIndex]?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeIndex, prefersReduced]);

  const focusAndSelect = (index: number) => {
    const next = (index + stages.length) % stages.length;
    onSelect(next);
    buttonRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusAndSelect(index + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusAndSelect(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusAndSelect(0);
        break;
      case 'End':
        event.preventDefault();
        focusAndSelect(stages.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="workflow-progress">
      <div className="workflow-progress__track" role="tablist" aria-label="Workflow stages">
        {stages.map((stage, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={stage.number}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${index}`}
              aria-selected={active}
              aria-controls={`${idPrefix}-stage-${index}`}
              tabIndex={active ? 0 : -1}
              className={`workflow-progress__step ${active ? 'workflow-progress__step--active' : ''}`}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="workflow-progress__number">{stage.number}</span>
              <span className="workflow-progress__label">{stage.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
