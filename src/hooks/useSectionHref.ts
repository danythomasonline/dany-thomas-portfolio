import { useLocation } from 'react-router-dom';

/**
 * Section links are in-page anchors on the Home route. From any other route
 * (e.g. a project case study) they need to resolve back to "/" first so the
 * anchor actually lands on a rendered section.
 */
export function useSectionHref(): (hash: string) => string {
  const { pathname } = useLocation();
  return (hash: string) => (pathname === '/' ? hash : `/${hash}`);
}
