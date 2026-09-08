import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { navLinks, siteMeta } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useSectionHref } from '../../hooks/useSectionHref';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { ResumeButton } from './ResumeButton';
import { CommandPalette } from '../CommandPalette/CommandPalette';
import { CommandPaletteTrigger } from '../CommandPalette/CommandPaletteTrigger';
import { useCommandPalette } from '../../hooks/useCommandPalette';
import { MobileNavOverlay } from './MobileNavOverlay';
import './Navigation.scss';

const sectionIds = navLinks.map((link) => link.href.replace('#', ''));

export function Navigation() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeSection = useActiveSection(isHome ? sectionIds : []);
  const sectionHref = useSectionHref();
  const prefersReduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const palette = useCommandPalette();
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useBodyScrollLock(palette.isOpen);

  useEffect(() => {
    if (palette.isOpen) setMenuOpen(false);
  }, [palette.isOpen]);

  return (
    <motion.header
      className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}
      initial={prefersReduced ? undefined : { y: -16, opacity: 0 }}
      animate={prefersReduced ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="site-nav__inner">
        <a className="site-nav__wordmark" href={sectionHref('#home')}>
          {siteMeta.name}
        </a>

        <nav className="site-nav__links" aria-label="Primary">
          <ul>
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = isHome && activeSection === id;
              return (
                <li key={link.href}>
                  <a href={sectionHref(link.href)} aria-current={isActive ? 'true' : undefined}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-nav__actions">
          <CommandPaletteTrigger onClick={palette.toggle} />
          <ThemeToggle />
          <ResumeButton className="site-nav__resume" />
          <button
            ref={menuTriggerRef}
            type="button"
            className="site-nav__menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileNavOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuTriggerRef}
        navLinks={navLinks}
        sectionHref={sectionHref}
        isLinkActive={(id) => isHome && activeSection === id}
        onCommandPaletteOpen={palette.toggle}
      />

      <CommandPalette palette={palette} />
    </motion.header>
  );
}
