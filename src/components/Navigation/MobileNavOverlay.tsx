import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { siteMeta } from '../../data/portfolioData';
import type { NavLink } from '../../types/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { CommandPaletteTrigger } from '../CommandPalette/CommandPaletteTrigger';
import { ResumeButton } from './ResumeButton';

const FOCUSABLE_SELECTOR = 'input, button:not([disabled]), a[href]';

interface MobileNavOverlayProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  navLinks: NavLink[];
  sectionHref: (href: string) => string;
  isLinkActive: (id: string) => boolean;
  onCommandPaletteOpen: () => void;
}

export function MobileNavOverlay({
  open,
  onClose,
  triggerRef,
  navLinks,
  sectionHref,
  isLinkActive,
  onCommandPaletteOpen,
}: MobileNavOverlayProps) {
  const prefersReduced = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (open) return;
    triggerRef.current?.focus();
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
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
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="mobile-nav-overlay">
          <motion.div
            className="mobile-nav-overlay__backdrop"
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={prefersReduced ? undefined : { opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
          />
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            className="mobile-nav-overlay__drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={prefersReduced ? undefined : { x: '100%' }}
            animate={prefersReduced ? undefined : { x: 0 }}
            exit={prefersReduced ? undefined : { x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-nav-overlay__header">
              <span className="mobile-nav-overlay__wordmark">{siteMeta.name}</span>
              <div className="mobile-nav-overlay__header-actions">
                <ThemeToggle />
                <button
                  type="button"
                  className="mobile-nav-overlay__close"
                  aria-label="Close menu"
                  onClick={onClose}
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mobile-nav-overlay__body">
              <nav aria-label="Primary">
                <ul>
                  {navLinks.map((link) => {
                    const id = link.href.replace('#', '');
                    const active = isLinkActive(id);
                    return (
                      <li key={link.href}>
                        <a href={sectionHref(link.href)} aria-current={active ? 'true' : undefined} onClick={onClose}>
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <CommandPaletteTrigger
                onClick={() => {
                  onClose();
                  onCommandPaletteOpen();
                }}
                variant="mobile"
                className="mobile-nav-overlay__command"
              />
              <ResumeButton className="mobile-nav-overlay__resume" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
