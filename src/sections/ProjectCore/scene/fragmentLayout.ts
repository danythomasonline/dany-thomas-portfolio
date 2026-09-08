export const PROJECT_CORE_SLUGS = ['sedres', 'sgivs', 'proposal-management', 'balance-life-calendar'] as const;

export type ProjectCoreSlug = (typeof PROJECT_CORE_SLUGS)[number];

export interface FragmentLayout {
  slug: ProjectCoreSlug;
  /** Resting position once fully separated, desktop scene. */
  desktop: [number, number, number];
  /** Resting position once fully separated, compact mobile scene. */
  mobile: [number, number, number];
  /** Resting rotation (radians) once settled. */
  rotation: [number, number, number];
  /** CSS overlay grid quadrant the DOM link sits in — mirrors the resting position above. */
  quadrant: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// Four resting positions arranged around the core in a loose ring, each mapped to a
// screen quadrant so the DOM link overlay (positioned via CSS, not 3D projection) lines
// up with where its fragment actually settles at the end of the scroll sequence.
export const FRAGMENT_LAYOUT: FragmentLayout[] = [
  {
    slug: 'sedres',
    desktop: [-2.6, 1.4, 0.6],
    mobile: [-1.1, 2.4, 0.3],
    rotation: [0.3, 0.6, 0],
    quadrant: 'top-left',
  },
  {
    slug: 'sgivs',
    desktop: [2.7, 1.1, -0.4],
    mobile: [1.1, 0.8, -0.2],
    rotation: [-0.2, -0.5, 0.1],
    quadrant: 'top-right',
  },
  {
    slug: 'proposal-management',
    desktop: [-2.3, -1.6, -0.5],
    mobile: [-1.1, -0.8, -0.3],
    rotation: [0.15, 0.4, -0.1],
    quadrant: 'bottom-left',
  },
  {
    slug: 'balance-life-calendar',
    desktop: [2.4, -1.5, 0.5],
    mobile: [1.1, -2.4, 0.2],
    rotation: [-0.25, -0.3, 0.15],
    quadrant: 'bottom-right',
  },
];
