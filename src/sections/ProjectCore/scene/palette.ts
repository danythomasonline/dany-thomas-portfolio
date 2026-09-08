// Hardcoded to match the approved design tokens in src/styles/_theme.scss — Three.js
// materials can't read CSS custom properties, so the same hex values used there (and
// already duplicated the same way in src/components/ProjectVisuals/*.tsx) are repeated here.
export const CORE_PALETTE = {
  brass: '#D4A657',
  brassHover: '#E1B86B',
  pine: '#4C6E5D',
  dark: {
    body: '#1B2026',
    edge: '#2A3138',
    particle: '#8B9198',
  },
  light: {
    body: '#EDE7D9',
    edge: '#C9C2B2',
    particle: '#8B9198',
  },
} as const;
