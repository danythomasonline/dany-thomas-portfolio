import { createElement, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import { useMagneticInteraction } from '../../hooks/useMagneticInteraction';
import './MagneticButton.scss';

type MagneticButtonProps<T extends ElementType> = {
  as: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'children'>;

// Reusable magnetic-hover wrapper for primary CTAs (see useMagneticInteraction for the
// pointer physics). Renders `as` unchanged — same element, same hit area — and only adds
// an inner span that reads the --magnetic-* custom properties the hook writes on it.
// Mark an icon inside `children` with className="magnetic-btn__icon" to give it the
// extra few px of travel beyond the text (see MagneticButton.scss).
//
// Built with createElement (not JSX) — a JSX tag whose type is a generic `T extends
// ElementType` can't be resolved against a real prop type, so TS collapses its props to
// `never`. createElement sidesteps that; the public API (MagneticButtonProps) stays typed.
export function MagneticButton<T extends ElementType = 'button'>({
  as,
  className = '',
  children,
  ...rest
}: MagneticButtonProps<T>) {
  const ref = useMagneticInteraction<HTMLElement>();

  return createElement(
    as,
    { ref, className: `magnetic-btn ${className}`.trim(), ...rest },
    createElement('span', { className: 'magnetic-btn__inner' }, children),
  );
}
